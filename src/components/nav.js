import React, { useState } from "react"
import { Link } from "gatsby"
import { motion } from "framer-motion"
import useWindowSize from "../components/utils/useWindowSize"

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

const Nav = ({
  category,
  catColors,
  filterProject,
  menuColor,
  textColor,
  about,
  imageIndex,
}) => {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [activeAbout, setActiveAbout] = useState(false)
  const size = useWindowSize()
  const categoriesArrays = category
  const categoriesRaw = [].concat.apply([], categoriesArrays)
  const categories = [...new Set(categoriesRaw)]
  function mobileMenuButtons(filter) {
    filterProject(filter)
    setMobileMenu(!mobileMenu)
  }
  function menuItemColorFilter(item) {
    const itemColor = catColors.find(color => color.select_category === item)
    if (itemColor) {
      return itemColor.tag_color
    } else {
      return "#000000"
    }
  }

  function aboutHandler() {
    about()
    if (size.width < 845) {
      setActiveAbout(!activeAbout)
    }
  }
  return (
    <>
      <motion.nav
        style={
          mobileMenu && size.width < 845
            ? { backgroundColor: menuColor, position: "fixed" }
            : {}
        }
        className="index"
        variants={variantsList}
        initial="hidden"
        animate="visible"
        exit="out"
      >
        <motion.div
          className="wrapper"
          style={
            mobileMenu && size.width < 845 ? { backgroundColor: menuColor } : {}
          }
        >
          <motion.div
            className="about"
            variants={variantsInner}
            initial="hidden"
            animate="visible"
            exit="out"
          >
            <h1>
              <button
                style={{ color: textColor }}
                onClick={!mobileMenu ? aboutHandler : null}
              >
                {activeAbout ? <span>+</span> : "Studio of Chelsea Cardinal"}
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
                    style={{ color: textColor }}
                    onClick={() => filterProject(category)}
                  >
                    {category}
                  </button>
                </li>
              )
            })}
            <li>
              <button
                style={{ color: textColor }}
                onClick={() => filterProject("all")}
              >
                all
              </button>
            </li>
          </motion.ul>
          <motion.button
            style={{ color: textColor }}
            initial={false}
            animate={{ rotate: mobileMenu && size.width < 845 ? 45 : 0 }}
            transition={{ ease: "easeInOut", duration: 0.25 }}
            className="mobile-menu-btn"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <span>+</span>
          </motion.button>
          <motion.span
            style={{ color: textColor }}
            variants={variantsInner}
            initial="hidden"
            animate="visible"
            exit="out"
          >
            <Link to={imageIndex ? "/image-index" : "/"}>
              {imageIndex ? "— image index" : "— titles"}
            </Link>
          </motion.span>
        </motion.div>
      </motion.nav>
      <motion.ul
        style={{
          backgroundColor: menuColor,
          display: mobileMenu && size.width < 845 ? "block" : "none",
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
              <button
                style={{ color: menuItemColorFilter(category) }}
                onClick={() => mobileMenuButtons(category)}
              >
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
