import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Styles from "../styles/modules/about.module.css"
import { motion } from "framer-motion"

const variants = {
  hidden: {
    height: "0vh",
  },
  visible: {
    height: "89vh",
    transition: {
      ease: "easeInOut",
      duration: 0.5,
      when: "beforeChildren",
    },
  },
  visibleMobile: {
    height: "83vh",
    transition: {
      ease: "easeInOut",
      duration: 0.5,
      when: "beforeChildren",
    },
  },
  out: {
    height: "0vh",
    transition: {
      ease: "easeInOut",
      duration: 0.5,
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
    transition: {
      duration: 0.2,
    },
  },
  visibleMobile: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  out: {
    opacity: 0,
  },
}

const About = ({ width }) => {
  return (
    <StaticQuery
      query={graphql`
        query AboutQuery {
          aboutJson {
            bio
            color
            id
          }
        }
      `}
      render={data => (
        <motion.div
          className={Styles.about}
          variants={variants}
          initial="hidden"
          animate={width > 844 ? "visible" : "visibleMobile" }
          exit="out"
        >
          <motion.p variants={variantsInner}>{data.aboutJson.bio}</motion.p>
        </motion.div>
      )}
    />
  )
}

export default About