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
      duration: 0.5,
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
    //   duration: 1,
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

const ImageIndex = ({ data }) => {
  const [about, setAbout] = useState(false)
  const projects = data.allMarkdownRemark.edges
  const [projectList, setProjectList] = useState(projects)
  const [storeList, setStoreList] = useState(projects)
  const [animationTime, setanimationTime] = useState(
    1.65 + storeList.length * 0.2 + (0.5 - storeList.length * 0.2)
  )
  const { width } = useWindowSize()
  // const siteTitle = data.site.siteMetadata.title
  // const animationTime =
  //   1.65 + storeList.length * 0.2 + (0.5 - storeList.length * 0.2)

  const categoryColors = data.siteJson.category_color
  const categoryTags = data.siteJson.category_tags

  const filterProject = name => {
    setProjectList([])
    let newList
    let oldList = projects
    let combineList
    if (name !== "all") {
      newList = projects.filter(project =>
        project.node.frontmatter.categories.includes(name)
      )

      newList.forEach((project, index) => {
        const foundCategories = project.node.frontmatter.categories
        if (foundCategories.length > 1 && foundCategories[0] !== name) {
          let tagIndex = foundCategories.indexOf(name)
          foundCategories.splice(tagIndex, 1)
          foundCategories.unshift(name)
        }
      })

      oldList = projects.filter(
        project => !project.node.frontmatter.categories.includes(name)
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

  return (
    <>
      <Nav
        about={() => setAbout(!about)}
        animationTime={animationTime}
        imageIndex={false}
        category={categoryTags}
        filterProject={filterProject}
        width={width}
      />
      <motion.div
        variants={variantsOuterWrap}
        initial="hidden"
        animate="visible"
        exit="out"
        className="container image-index"
      >
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
                    key={project.node.id}
                    style={{
                      color:
                        categoryColors.find(
                          tag =>
                            tag.select_category ===
                            project.node.frontmatter.categories[0]
                        ).tag_color || "#000000",
                    }}
                    variants={variantsList}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 1.5, delay: i * 0.2 }}
                    exit="out"
                  >
                    <Link to={`${project.node.fields.slug}`}>
                      <motion.div
                        className="inner-info-wrap"
                        variants={variantsInner}
                        transition={{ duration: 0.5, delay: 0.4 + i * 0.2 }}
                        exit="out"
                      >
                        <p>{project.node.frontmatter.categories.join(", ")}</p>

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
                      </motion.div>
                    </Link>
                  </motion.li>
                )
              })}
          </AnimatePresence>
        </ul>
      </motion.div>
    </>
  )
}

export default ImageIndex

export const data = graphql`
  query ImageIndexQuery {
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
            categories
            color
            description
            image_gallery {
              image {
                childImageSharp {
                  fluid(maxHeight: 159) {
                    aspectRatio
                    presentationWidth
                    presentationHeight
                    ...GatsbyImageSharpFluid
                  }
                  fixed(height: 159) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      }
    }
    siteJson {
      category_color {
        select_category
        tag_color
      }
      category_tags
    }
  }
`
