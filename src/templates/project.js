import React, { useEffect, useRef } from "react"
import { graphql } from "gatsby"
import ProjectNav from "../components/projectNav"
import "../styles/project.css"
// import 'smooth-scrollbar/dist/smooth-scrollbar.css';
import { motion } from "framer-motion"
import Scrollbar from "react-smooth-scrollbar"
import SmoothScrollbar, { ScrollbarPlugin } from "smooth-scrollbar"

// SmoothScrollbar.use(OverscrollPlugin)
// import Scrollbar from 'smooth-scrollbar';
// import locomotiveScroll from "locomotive-scroll";

class HorizontalScrollPlugin extends ScrollbarPlugin {
  static pluginName = "horizontalScroll"

  transformDelta(delta, fromEvent) {
    if (!/wheel/.test(fromEvent.type)) {
      return delta
    }

    const { x, y } = delta

    return {
      y: 0,
      x: Math.abs(x) > Math.abs(y) ? x : y,
    }
  }
}
SmoothScrollbar.use(HorizontalScrollPlugin)

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
  // const scrollRef = React.createRef()
  // useEffect(() => {})
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
        <p dangerouslySetInnerHTML={{ __html: project.description }}></p>
        <Scrollbar>
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
        </Scrollbar>
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
