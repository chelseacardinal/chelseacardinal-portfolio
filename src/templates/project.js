import React from "react"
import { graphql } from "gatsby"
import TransitionWrap from "../components/transitionWrap"
import ProjectNav from "../components/projectNav"
import "../styles/project.css"
import { motion } from "framer-motion"

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1.5,
      duration: 0.5,
    },
  },
  out: {
    opacity: 0,
    transition: {
      delay: 0,
      duration: 0.5,
    },
  },
}

const Project = props => {
  const project = props.data.markdownRemark.frontmatter
  console.log(project)
  return (
    <TransitionWrap>
      <div className="project-page-wrap">
        <ProjectNav category={project.category} title={project.title} />
        <div className="container">
          <motion.div
            className="project-container"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="out"
          >
            <p dangerouslySetInnerHTML={{ __html: project.description }}></p>
            <div className="image-overflow">
              {project.image_gallery.map((item, index) => {
                return (
                  <figure key={index}>
                    <div className="wrapper">
                      <img
                        src={item.image.childImageSharp.fluid.src}
                        sizes={item.image.childImageSharp.sizes}
                        alt=""
                        srcSet={item.image.childImageSharp.fluid.srcset}
                      />
                    </div>
                    <figcaption>{item.caption}</figcaption>
                  </figure>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </TransitionWrap>
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
