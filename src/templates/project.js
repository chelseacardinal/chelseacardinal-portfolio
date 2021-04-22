import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import ProjectNav from "../components/projectNav"
import "../styles/project.css"
import { motion } from "framer-motion"
// import LazyImage from "../utils/lazy-image"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Mousewheel, Keyboard } from "swiper"
import "swiper/swiper-bundle.css"

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
  console.log(pageContext)
  const [paginator, setPaginator] = useState("project")
  const project = data.markdownRemark.frontmatter
  return (
    <>
      <ProjectNav category={project.category} title={project.title} />
      <motion.div
        className="project-container"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="out"
      >
        <div className="project-description">
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
          speed={400}
          spaceBetween={30}
          slidesPerView="auto"
          mousewheel
          keyboard
          onSlideChange={() => console.log("slide change")}
          onSwiper={swiper => console.log(swiper)}
        >
          {project.image_gallery.map((item, index) => {
            return (
              <SwiperSlide key={index} tag="figure">
                <div className="wrapper">
                  <img
                    src={item.image.childImageSharp.fluid.src}
                    sizes={item.image.childImageSharp.fluid.sizes}
                    alt=""
                    srcSet={item.image.childImageSharp.fluid.srcSet}
                    loading="lazy"
                  />
                </div>
                <figcaption style={{ flex: 0 }}>{item.caption}</figcaption>
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
    </>
  )
}

export default Project

export const data = graphql`
  query ProjectQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        description
        category
        color
        image_gallery {
          caption
          image {
            childImageSharp {
              fluid(maxHeight: 813) {
                aspectRatio
                presentationWidth
                presentationHeight
                ...GatsbyImageSharpFluid
              }
              fixed(height: 813) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`
