import React from "react"
import { Link } from "gatsby"
import { motion } from "framer-motion"
import X from "../images/x.svg"

const variantsList = {
  hidden: {
    // x: 0,
    // width: "0%",
  },
  visible: {
    // x: 0,
    // width: "100%",
    // transition: {
    //   duration: 1,
    //   when: "beforeChildren",
    // },
  },
  out: {
    // x: "100vw",
    // width: "100%",
    // transition: {
    //   delay: 0.5,
    //   duration: 1,
    //   when: "afterChildren",
    // },
  },
}

const variantsInner = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      // delay: 1,
      duration: 0.5,
    },
  },
  out: {
    y: "100%",
    transition: {
      duration: 0.5,
    },
  },
}

const projectNav = props => {
  return (
    <motion.nav
      className="project"
      variants={variantsList}
      initial="hidden"
      animate="visible"
      exit="out"
    >
      <div className="wrapper">
        <motion.span
          variants={variantsInner}
          initial="hidden"
          animate="visible"
          exit="out"
        >
          {props.category ? props.category.join(", ") : "category"}
        </motion.span>

        <motion.h2
          variants={variantsInner}
          initial="hidden"
          animate="visible"
          exit="out"
        >
          {props.title ? props.title : "Project Title"}
        </motion.h2>
        <motion.span
          variants={variantsInner}
          initial="hidden"
          animate="visible"
          exit="out"
        >
          <Link to="/">
            <img src={X} alt="close project" />
          </Link>
        </motion.span>
      </div>
    </motion.nav>
  )
}

export default projectNav
