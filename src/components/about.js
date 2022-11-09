import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { about } from "../styles/modules/about.module.css"
import { motion } from "framer-motion"

const variants = {
  hidden: {
    height: "0vh",
  },
  visible: {
    height: "auto",
    transition: {
      ease: "easeInOut",
      duration: 0.5,
      when: "beforeChildren",
    },
  },
  visibleMobile: {
    height: "auto",
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
          siteJson {
            bio
            id
          }
        }
      `}
      render={data => (
        <motion.div
          className={about}
          variants={variants}
          initial="hidden"
          animate={width > 844 ? "visible" : "visibleMobile"}
          exit="out"
        >
          <motion.p
            variants={variantsInner}
            dangerouslySetInnerHTML={{ __html: data.siteJson.bio }}
          />
        </motion.div>
      )}
    />
  )
}

export default About
