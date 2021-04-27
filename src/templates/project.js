import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import ProjectNav from "../components/projectNav"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Mousewheel, Keyboard } from "swiper"
import LazyImagePicture from "../utils/lazy-image-picture"
import "swiper/swiper-bundle.css"
import "../styles/project.css"

SwiperCore.use([Mousewheel, Keyboard])

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      // delay: 1.5,
      duration: 0.5,
    },
  },
  out: {
    opacity: 0,
    transition: {
      // delay: 0,
      duration: 0.5,
    },
  },
}

const Project = ({ data, pageContext }) => {
  const [paginator, setPaginator] = useState("project")
  const project = data.markdownRemark.frontmatter
  const site = data.siteJson
  return (
    <motion.div
      className="page-rapper"
      initial={{ backgroundColor: site.index_color }}
      animate={{ backgroundColor: project.color }}
      transition={{ duration: 0.5 }}
      exit={{ backgroundColor: site.index_color }}
    >
      <ProjectNav
        category={project.categories}
        title={project.title}
        textColor={project.text_color}
      />
      <motion.div
        className="project-container"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="out"
      >
        <div
          className="project-description"
          style={{ color: project.text_color || "#000000" }}
        >
          <p dangerouslySetInnerHTML={{ __html: project.description }}></p>
          <div className="project-paginator">
            <Link
              onMouseEnter={() => setPaginator("previous")}
              onMouseLeave={() => setPaginator("project")}
              to={pageContext.previous ? pageContext.previous.fields.slug : "/"}
            >
              {"<<"}
            </Link>
            <span>{paginator}</span>
            <Link
              onMouseEnter={() => setPaginator("next")}
              onMouseLeave={() => setPaginator("project")}
              to={pageContext.next ? pageContext.next.fields.slug : "/"}
            >
              {">>"}
            </Link>
          </div>
        </div>

        <Swiper
          observer="true"
          observeParents="true"
          key={project.image_gallery.length}
          speed={500}
          spaceBetween={30}
          slidesPerView="auto"
          mousewheel
          grabCursor="true"
          keyboard
          onSlideChange={() => console.log("slide change")}
          onSwiper={swiper => console.log(swiper)}
        >
          {project.image_gallery.map((item, index) => {
            return (
              <SwiperSlide key={index} tag="figure">
                <LazyImagePicture
                  src={
                    item.image.childImageSharp.gatsbyImageData.images.fallback
                      .src
                  }
                  media={
                    item.image.childImageSharp.gatsbyImageData.images.fallback
                      .sizes
                  }
                  srcSet={
                    item.image.childImageSharp.gatsbyImageData.images.fallback
                      .srcSet
                  }
                  wpSrcSet={
                    item.image.childImageSharp.gatsbyImageData.images.sources[0]
                      .srcSet
                  }
                />
                <figcaption
                  style={{ flex: 0, color: project.text_color || "#000000" }}
                >
                  {item.caption}
                </figcaption>
              </SwiperSlide>
            )
          })}
          <SwiperSlide className="next-link">
            {pageContext.next ? (
              <Link to={pageContext.next.fields.slug}>
                next project <span> </span>
                {">"}
              </Link>
            ) : (
              <Link to="/">
                back to index <span> </span>
                {">"}
              </Link>
            )}
          </SwiperSlide>
        </Swiper>
      </motion.div>
    </motion.div>
  )
}

export default Project

export const data = graphql`
  query ProjectQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        description
        categories
        color
        text_color
        image_gallery {
          caption
          image {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
    siteJson {
      category_tags
      index_text_color
      index_color
    }
  }
`
