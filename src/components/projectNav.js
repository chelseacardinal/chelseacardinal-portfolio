import React from "react"
import { Link } from "gatsby"
import { motion } from "framer-motion"
// import X from "../images/x.svg"
import X from "../components/X"

const variantsList = {
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
    transition: {
      // delay: 1,
      duration: 0.5,
    },
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
      <div
        className="wrapper"
        style={{
          borderBottom: `solid 1px ${
            props.lineColor ? props.lineColor : "#9879b0"
          }`,
        }}
      >
        <motion.span
          style={{ color: props.textColor || "#000000" }}
          variants={variantsInner}
          initial="hidden"
          animate="visible"
          exit="out"
        >
          {props.category ? props.category.join(", ") : "category"}
        </motion.span>

        <motion.h2
          style={{ color: props.textColor || "#000000" }}
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
            <X color={props.textColor || "#000000"} />
          </Link>
        </motion.span>
      </div>
    </motion.nav>
  )
}

export default projectNav
