import React, { useState } from "react"
import { Link } from "gatsby"
import { motion } from "framer-motion"

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
    y: "-100%",
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
    y: "-100%",
    transition: {
      duration: 0.5,
    },
  },
}

const Nav = props => {
  const [mobileMenu, setMobileMenu] = useState(false)
  const categoriesArrays = props.category
  const categoriesRaw = [].concat.apply([], categoriesArrays)
  const categories = [...new Set(categoriesRaw)]
  function mobileMenuButtons(filter) {
    props.filterProject(filter)
    setMobileMenu(!mobileMenu)
  }
  return (
    <>
      <motion.nav
        style={mobileMenu ? { backgroundColor: props.menuColor } : {}}
        className="index"
        variants={variantsList}
        initial="hidden"
        animate="visible"
        exit="out"
      >
        <motion.div className="wrapper" style={mobileMenu ? { backgroundColor: props.menuColor } : {}}>
          <motion.div
            className="about"
            variants={variantsInner}
            initial="hidden"
            animate="visible"
            exit="out"
          >
            <h1>
              <button style={{ color: props.textColor }} onClick={props.about}>
                Studio of Chelsea Cardinal
              </button>
            </h1>
          </motion.div>
          <motion.ul
            variants={variantsInner}
            initial="hidden"
            animate="visible"
            exit="out"
            className="desktop-menu"
          >
            {categories.map((category, i) => {
              return (
                <li key={i}>
                  <button
                    style={{ color: props.textColor }}
                    onClick={() => props.filterProject(category)}
                  >
                    {category}
                  </button>
                </li>
              )
            })}
            <li>
              <button
                style={{ color: props.textColor }}
                onClick={() => props.filterProject("all")}
              >
                all
              </button>
            </li>
          </motion.ul>
          <motion.button
            style={{ color: props.textColor }}
            initial={false}
            animate={{ rotate: mobileMenu ? 45 : 0 }}
            transition={{ ease: "easeInOut", duration: 0.25 }}
            className="mobile-menu-btn"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <span>+</span>
          </motion.button>
          <motion.span
            style={{ color: props.textColor }}
            variants={variantsInner}
            initial="hidden"
            animate="visible"
            exit="out"
          >
            <Link to={props.imageIndex ? "/image-index" : "/"}>
              {props.imageIndex ? "— image index" : "— titles"}
            </Link>
          </motion.span>
        </motion.div>
      </motion.nav>
      <motion.ul
        style={{
          backgroundColor: props.menuColor,
          display: mobileMenu ? "block" : "none",
        }}
        initial={false}
        animate={{ opacity: mobileMenu ? 1 : 0 }}
        transition={{
          ease: "easeInOut",
          duration: 0.35,
        }}
        className="mobile-menu"
      >
        {categories.map((category, i) => {
          return (
            <li key={i}>
              <button onClick={() => mobileMenuButtons(category)}>
                {category}
              </button>
            </li>
          )
        })}
        <li>
          <button onClick={() => mobileMenuButtons("all")}>all</button>
        </li>
      </motion.ul>
    </>
  )
}

export default Nav
