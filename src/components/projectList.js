import React from "react"
import TransitionLink from "gatsby-plugin-transition-link"
import { motion } from "framer-motion"

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

const ProjectList = ({ projects }) => {
  return (
    <ul>
      {projects.map((project, i) => {
        return (
          <motion.li
            key={i}
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
            >
              <p>{project.node.frontmatter.category}</p>
            </motion.div>
            <TransitionLink
              to={`${project.node.fields.slug}`}
              exit={{ length: 0.5, state: { pass: -100 } }}
              entry={{ delay: 0.5 }}
            >
              <motion.h2
                variants={variantsInner}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + i * 0.2,
                }}
              >
                {project.node.frontmatter.title}
              </motion.h2>
            </TransitionLink>
          </motion.li>
        )
      })}
    </ul>
  )
}

export default ProjectList
