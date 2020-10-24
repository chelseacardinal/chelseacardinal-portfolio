import React from "react"
import Styles from "../styles/modules/about.module.css"
import { motion } from "framer-motion"

const variants = {
  hidden: {
    height: "0vh",
  },
  visible: {
    height: "89vh",
    transition: {
      duration: 0.5,
      when: "beforeChildren",
    },
  },
  out: {
    height: "0vh",
    transition: {
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
      duration: 0.2
    },
  },
  out: {
    opacity: 0,
  },
}

const About = () => {
  return (
    <motion.div
      className={Styles.about}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="out"
    >
      <motion.p variants={variantsInner}>
        Chelsea Cardinal is a graphic designer, illustrator and fashion
        designer. She grew up on the canadian prairies, attended the Alberta
        College of Art + Design, moved to New York in 2005, worked at GQ
        Magazine for many years and is now freelancing. Chelsea Cardinal is a
        graphic designer, illustrator and fashion designer. She grew up on the
        canadian prairies, attended the Alberta College of Art + Design, moved
        to New York in 2005, worked at GQ Magazine for many years and is now
        freelancing.
      </motion.p>
    </motion.div>
  )
}

export default About
