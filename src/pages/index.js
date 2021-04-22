import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Nav from "../components/nav"
import About from "../components/about"
import "../styles/main.css"
import { motion, AnimatePresence } from "framer-motion"
import useWindowSize from "../utils/useWindowSize"

const variantsOuterWrap = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { 
      // delay: 1, 
      duration: 0.5 
    },
  },
  out: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
}

const variantsList = {
  hidden: {
    // x: 0,
    // width: "0%",
  },
  visible: {
    // x: 0,
    // width: "100%",
  },
  out: {
    // x: "100vw",
    // transition: {
    //   duration: 1
    // },
  },
}

const variantsMobileList = {
  hidden: {
    // x: 0,
    // width: "0%",
  },
  visible: {
    // x: 0,
    // width: "100%",
  },
  out: {
    // x: "100vw",
    // transition: {
    //   duration: 0.45,
    //   when: "afterChildren",
    // },
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

const Index = ({ data }) => {
  // const siteTitle = data.site.siteMetadata.title
  // const animationTime =
  //   1.65 + storeList.length * 0.2 + (0.5 - storeList.length * 0.2)
  // console.log(data)

  const [about, setAbout] = useState(false)
  const projects = data.allMarkdownRemark.edges
  const [projectList, setProjectList] = useState(projects)
  const [storeList, setStoreList] = useState(projects)
  const [imageIndex, setImageIndex] = useState({ index: 0, visible: false })
  const [animationTime, setanimationTime] = useState(
    1.65 + storeList.length * 0.2 + (0.5 - storeList.length * 0.2)
  )
  const { width } = useWindowSize()

  const filterProject = name => {
    setProjectList([])
    let newList
    let oldList = projects
    let combineList
    if (name !== "all") {
      newList = projects.filter(project =>
        project.node.frontmatter.category.includes(name)
      )
      oldList = projects.filter(
        project => !project.node.frontmatter.category.includes(name)
      )
      combineList = newList.concat(oldList)
      setStoreList(combineList)
    } else if (name === "all") {
      newList = projects
      setStoreList(newList)
    }
    setanimationTime(
      10.65 + storeList.length * 0.2 + (0.5 - storeList.length * 0.2)
    )
  }

  console.log(projectList)

  return (
    <>
      <Nav
        about={() => setAbout(!about)}
        animationTime={animationTime}
        imageIndex={true}
        category={projects}
        filterProject={filterProject}
        width={width}
      />
      <motion.div
        variants={variantsOuterWrap}
        initial="hidden"
        animate="visible"
        exit="out"
        className="container"
      >
        {width > 844 && (
          <div className="feature-image-overlay">
            {projectList &&
              projectList.map((project, i) => {
                return (
                  <img
                    key={project.node.id}
                    style={{
                      display:
                        imageIndex.index === project.node.id ? "block" : "none",
                    }}
                    src={
                      project.node.frontmatter.image_gallery.find(
                        item => item.featured_image
                      )
                        ? project.node.frontmatter.image_gallery.find(
                            item => item.featured_image
                          ).image.childImageSharp.fluid.src
                        : project.node.frontmatter.image_gallery[0].image
                            .childImageSharp.fluid.src
                    }
                    sizes={
                      project.node.frontmatter.image_gallery.find(
                        item => item.featured_image
                      )
                        ? project.node.frontmatter.image_gallery.find(
                            item => item.featured_image
                          ).image.childImageSharp.fluid.src
                        : project.node.frontmatter.image_gallery[0].image
                            .childImageSharp.fluid.sizes
                    }
                    srcSet={
                      project.node.frontmatter.image_gallery.find(
                        item => item.featured_image
                      )
                        ? project.node.frontmatter.image_gallery.find(
                            item => item.featured_image
                          ).image.childImageSharp.fluid.src
                        : project.node.frontmatter.image_gallery[0].image
                            .childImageSharp.fluid.srcSet
                    }
                    alt=""
                  />
                )
              })}
          </div>
        )}

        <ul key="index">
          <AnimatePresence>{about && <About width={width} />}</AnimatePresence>
          <AnimatePresence
            initial={false}
            onExitComplete={() => setProjectList(storeList)}
          >
            {width > 844
              ? projectList &&
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
                        transition={{ duration: 0.5, delay: i * 0.2 }}
                        exit="out"
                      >
                        <p>{project.node.frontmatter.category.join(", ")}</p>
                      </motion.div>
                      <Link
                        onMouseEnter={() =>
                          setImageIndex({
                            index: project.node.id,
                            visible: true,
                          })
                        }
                        onMouseLeave={() => setImageIndex({ visible: false })}
                        to={`${project.node.fields.slug}`}
                      >
                        <motion.h2
                          variants={variantsInner}
                          transition={{
                            duration: 0.5,
                            delay: i * 0.2,
                          }}
                          exit="out"
                        >
                          {project.node.frontmatter.title}
                        </motion.h2>
                      </Link>
                    </motion.li>
                  )
                })
              : projectList &&
                projectList.map((project, i) => {
                  return (
                    <motion.li
                      key={project.node.id}
                      style={{
                        color: project.node.frontmatter.color || "#000000",
                      }}
                      variants={variantsMobileList}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.45, delay: i * 0.2 }}
                      exit="out"
                    >
                      <motion.div
                        className="inner-info-wrap"
                        variants={variantsInner}
                        transition={{ duration: 0.35, delay: 0.4 + i * 0.2 }}
                        exit="out"
                      >
                        <p>{project.node.frontmatter.category}</p>
                        <h2>{project.node.frontmatter.title}</h2>
                      </motion.div>
                      <motion.div
                        className="inner-image-wrap"
                        variants={variantsInner}
                        transition={{ duration: 0.5, delay: 0.4 + i * 0.2 }}
                        exit="out"
                      >
                        {project.node.frontmatter.image_gallery.map(
                          (item, index) => {
                            return (
                              <figure key={index}>
                                <div className="wrapper">
                                  <img
                                    src={item.image.childImageSharp.fluid.src}
                                    sizes={
                                      item.image.childImageSharp.fluid.sizes
                                    }
                                    alt=""
                                    srcSet={
                                      item.image.childImageSharp.fluid.srcSet
                                    }
                                  />
                                </div>
                                <figcaption>{item.caption}</figcaption>
                              </figure>
                            )
                          }
                        )}
                        <p>{project.node.frontmatter.description}</p>
                      </motion.div>
                    </motion.li>
                  )
                })}
          </AnimatePresence>
        </ul>
      </motion.div>
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
              featured_image
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
