import React, { useState } from "react"
import { graphql } from "gatsby"
import Nav from "../components/nav"
import TransitionWrap from "../components/transitionWrap"
import About from "../components/about"
import "../styles/main.css"
import TransitionLink from "gatsby-plugin-transition-link"
import { motion, AnimatePresence } from "framer-motion"

const variantsOuterWrap = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 1, duration: 0.5 },
  },
  out: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
}

const variantsList = {
  hidden: {
    x: 0,
    width: "0%",
  },
  visible: {
    x: 0,
    width: "100%",
  },
  out: {
    x: "100vw",
    transition: {
      duration: 1,
      when: "afterChildren",
    },
  },
}

const variantsInner = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
}

const Index = ({ data, exit }) => {
  const [about, setAbout] = useState(false)
  const projects = data.allMarkdownRemark.edges
  const [projectList, setProjectList] = useState(projects)
  const [storeList, setStoreList] = useState(projects)
  const [imageIndex, setImageIndex] = useState({ index: 0, visible: false })
  const [animationTime, setanimationTime] = useState(
    1.65 + storeList.length * 0.2 + (0.5 - storeList.length * 0.2)
  )
  // const siteTitle = data.site.siteMetadata.title
  // const animationTime =
  //   1.65 + storeList.length * 0.2 + (0.5 - storeList.length * 0.2)
  // console.log(projectList)

  const filterProject = name => {
    setProjectList([])
    let newList
    if (name !== "all") {
      newList = projects.filter(
        project => project.node.frontmatter.category[0] === name
      )
      setStoreList(newList)
    } else if (name === "all") {
      newList = projects
      setStoreList(newList)
    }
    setanimationTime(
      10.65 + storeList.length * 0.2 + (0.5 - storeList.length * 0.2)
    )
  }

  return (
    <>
      <TransitionWrap>
        <Nav
          about={() => setAbout(!about)}
          animationTime={animationTime}
          imageIndex={true}
          category={projects}
          filterProject={filterProject}
        />
        <motion.div
          variants={variantsOuterWrap}
          initial="hidden"
          animate="visible"
          exit="out"
          className="container"
        >
          <div className="feature-image-overlay">
            {projectList &&
              projectList.map((project, i) => {
                return (
                  <img
                    key={project.node.id}
                    style={{display: imageIndex.index === project.node.id ? "block" : "none"}}
                    src={
                      project &&
                      project.node.frontmatter.image_gallery[0].image
                        .childImageSharp.fluid.src
                    }
                    sizes={
                      project &&
                      project.node.frontmatter.image_gallery[0].image
                        .childImageSharp.sizes
                    }
                    srcSet={
                      project &&
                      project.node.frontmatter.image_gallery[0].image
                        .childImageSharp.fluid.srcset
                    }
                    alt=""
                  />
                )
              })}
          </div>

          <ul key="index">
            <AnimatePresence>{about && <About />}</AnimatePresence>
            <AnimatePresence
              initial={false}
              onExitComplete={() => setProjectList(storeList)}
            >
              {projectList &&
                projectList.map((project, i) => {
                  return (
                    <motion.li
                      className={project.node.frontmatter.category[0]}
                      key={project.node.id}
                      style={{
                        color: project.node.frontmatter.color || "#000000",
                      }}
                      variants={variantsList}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 1.5, delay: i * 0.2 }}
                      exit="out"
                    >
                      <motion.div
                        variants={variantsInner}
                        transition={{ duration: 0.5, delay: 0.4 + i * 0.2 }}
                        exit="out"
                      >
                        <p>{project.node.frontmatter.category[0]}</p>
                      </motion.div>
                      <TransitionLink
                        onMouseEnter={() =>
                          setImageIndex({ index: project.node.id, visible: true })
                        }
                        onMouseLeave={() => setImageIndex({ visible: false })}
                        to={`${project.node.fields.slug}`}
                        exit={{ length: 2.25 }}
                        entry={{ delay: 1.7 }}
                      >
                        <motion.h2
                          variants={variantsInner}
                          transition={{
                            duration: 0.5,
                            delay: 0.4 + i * 0.2,
                          }}
                          exit="out"
                        >
                          {project.node.frontmatter.title}
                        </motion.h2>
                      </TransitionLink>
                    </motion.li>
                  )
                })}
            </AnimatePresence>
          </ul>
        </motion.div>
      </TransitionWrap>
    </>
  )
}

export default Index

export const data = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            date
            title
            category
            color
            description
            image_gallery {
              image {
                childImageSharp {
                  fluid(maxHeight: 504) {
                    aspectRatio
                    presentationWidth
                    presentationHeight
                    ...GatsbyImageSharpFluid
                  }
                  fixed(height: 504) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
