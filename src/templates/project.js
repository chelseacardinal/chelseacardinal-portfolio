import React, { useState, useEffect } from "react"
import { navigate } from "@reach/router"
import { graphql, Link } from "gatsby"
import ProjectNav from "../components/projectNav"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Mousewheel, Keyboard } from "swiper"
import { GatsbyImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import useWindowSize from "../components/utils/useWindowSize"
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
  const size = useWindowSize()
  let checkWidth = size.width < 845 ? true : false

  useEffect(() => {
    if (checkWidth) {
      navigate("/")
    }
  }, [checkWidth])

  return (
    <>
      <Seo metaTitle={project.title} metaDescription={project.description} />
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
          lineColor={project.project_line_color}
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
                to={
                  pageContext.previous ? pageContext.previous.fields.slug : "/"
                }
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

          {size && (
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
              // onSlideChange={() => console.log("slide change")}
              // onSwiper={swiper => console.log(swiper)}
            >
              {project.image_gallery.map((item, index) => {
                return (
                  <SwiperSlide key={index} tag="figure">
                    <div
                      className="wrapper"
                      style={{
                        width:
                          item?.image?.childImageSharp.gatsbyImageData &&
                          item?.image?.childImageSharp?.gatsbyImageData
                            .height &&
                          size.elheight &&
                          (item?.image?.childImageSharp.gatsbyImageData.width /
                            item?.image?.childImageSharp.gatsbyImageData
                              .height) *
                            size.elheight,
                      }}
                    >
                      <GatsbyImage
                        image={item?.image?.childImageSharp.gatsbyImageData}
                        alt={item?.alt_text}
                      />
                    </div>
                    <figcaption
                      style={{
                        color: project.text_color || "#000000",
                        maxWidth:
                          item?.image?.childImageSharp.gatsbyImageData &&
                          item?.image?.childImageSharp.gatsbyImageData.height &&
                          size.elheight &&
                          (item?.image?.childImageSharp.gatsbyImageData.width /
                            item?.image?.childImageSharp.gatsbyImageData
                              .height) *
                            size.elheight,
                      }}
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
          )}
        </motion.div>
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
        categories
        color
        text_color
        project_line_color
        image_gallery {
          alt_text
          caption
          image {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                height: 813
                placeholder: NONE
                formats: [AUTO, WEBP, AVIF]
                quality: 75
              )
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
