import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Nav from "../components/nav"
import About from "../components/about"
import { motion, AnimatePresence } from "framer-motion"
import useWindowSize from "../utils/useWindowSize"
import { GatsbyImage } from "gatsby-plugin-image"
import "../styles/main.css"

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

  const categoryColors = data.siteJson.category_color
  const categoryTags = data.siteJson.category_tags
  const indexTextColor = data.siteJson.index_text_color
  const IndexColor = data.siteJson.index_color
  const IndexLineColor = data.siteJson.index_line_color
  const mobileMenuColor = data.siteJson.mobile_menu_background_color

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
    <div
      className="page-rapper"
      style={{ backgroundColor: IndexColor, minHeight: "100vh" }}
    >
      <Nav
        about={about}
        setAbout={setAbout}
        animationTime={animationTime}
        imageIndex={false}
        category={categoryTags}
        catColors={categoryColors}
        filterProject={filterProject}
        width={width}
        textColor={indexTextColor}
        menuColor={mobileMenuColor}
        borderColor={IndexLineColor}
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
                  <li
                    key={project.node.id}
                    style={{
                      color: project.node.frontmatter.categories
                        ? categoryColors.find(
                            tag =>
                              tag.select_category ===
                              project.node.frontmatter.categories[0]
                          ).tag_color || "#000000"
                        : "#000000",
                    }}
                  >
                    <Link to={`${project.node.fields.slug}`}>
                      <motion.div
                        className="inner-info-wrap"
                        variants={variantsInner}
                        initial="hidden"
                        animate="visible"
                        exit="out"
                        transition={{ duration: 0.5 }}
                      >
                        <p>{project.node.frontmatter.categories.join(", ")}</p>

                        <h2>{project.node.frontmatter.title}</h2>
                      </motion.div>
                      <motion.div
                        className="inner-image-wrap"
                        variants={variantsInner}
                        initial="hidden"
                        animate="visible"
                        exit="out"
                        transition={{ duration: 0.5 }}
                      >
                        {project.node.frontmatter.image_gallery.map(
                          (item, index) => {
                            return (
                              <div key={index} className="wrapper">
                                <GatsbyImage
                                  image={
                                    item.image.childImageSharp.gatsbyImageData
                                  }
                                  alt={item.alt_text}
                                />
                              </div>
                            )
                          }
                        )}
                      </motion.div>
                    </Link>
                  </li>
                )
              })}
          </AnimatePresence>
        </ul>
      </motion.div>
    </div>
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
              alt_text
              caption
              image {
                childImageSharp {
                  gatsbyImageData(
                    height: 189
                    placeholder: NONE
                    formats: [AUTO, WEBP, AVIF]
                  )
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
      index_text_color
      index_color
      index_line_color
      mobile_menu_background_color
    }
  }
`
