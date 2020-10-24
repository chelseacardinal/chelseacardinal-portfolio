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
    transition: {
      duration: 1,
      when: "beforeChildren",
    },
  },
  out: {
    x: "100vw",
    width: "100%",
    transition: {
      delay: 0.5,
      duration: 1,
      when: "afterChildren",
    },
  },
}

const variantsInner = {
  hidden: {
    y: "-100%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      delay: 1,
      duration: 0.5,
    },
  },
  out: {
    y: "-100%",
    transition: {
      duration: 0.5,
    },
  },
}

const Nav = props => {
  return (
    <motion.nav
      variants={variantsList}
      initial="hidden"
      animate="visible"
      exit="out"
    >
      <motion.div className="wrapper">
        <motion.div
          className="about"
          onClick={props.about}
          variants={variantsInner}
          initial="hidden"
          animate="visible"
          exit="out"
        >
          <button>Studio of Chelsea Cardinal</button>
        </motion.div>
        <motion.ul
          variants={variantsInner}
          initial="hidden"
          animate="visible"
          exit="out"
        >
          {props.category.map((project, i) => {
            return (
              <li key={i}>
                <button
                  onClick={() =>
                    props.filterProject(project.node.frontmatter.category[0])
                  }
                >
                  {project.node.frontmatter.category}
                </button>
              </li>
            )
          })}
          <li>
            <button onClick={() => props.filterProject("all")}>all</button>
          </li>
        </motion.ul>
        <motion.span
          variants={variantsInner}
          initial="hidden"
          animate="visible"
          exit="out"
        >
          <TransitionLink
            to={props.imageIndex ? "/image-index" : "/"}
            exit={{ length: 1.65 }}
            entry={{ delay: 1.65 }}
          >
            {props.imageIndex ? "— image index" : "— titles"}
          </TransitionLink>
        </motion.span>
      </motion.div>
    </motion.nav>
  )
}

export default Nav
