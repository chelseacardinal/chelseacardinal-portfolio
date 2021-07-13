import React, { useState } from "react"
import { Link } from "gatsby"
import { motion } from "framer-motion"
import useWindowSize from "../components/utils/useWindowSize"

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
  setAbout,
  imageIndex,
  borderColor,
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
    setAbout(!about)
    if (size.width < 845) {
      setActiveAbout(!activeAbout)
    }
  }

  function menuHandler() {
    setAbout(false)
    setActiveAbout(false)
    setMobileMenu(!mobileMenu)
  }

  return (
    <>
      {mobileMenu && size.width < 845 && (
        <div
          className="menu-fixed-placeholder"
          style={{ height: "36px" }}
        ></div>
      )}
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
            mobileMenu && size.width < 845
              ? {
                  backgroundColor: menuColor,
                  borderBottom: `solid 1px ${
                    borderColor ? borderColor : "#9879b0"
                  }`,
                }
              : {
                  borderBottom: `solid 1px ${
                    borderColor ? borderColor : "#9879b0"
                  }`,
                }
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
                onClick={mobileMenu ? null : aboutHandler}
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
            onClick={menuHandler}
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
            <li
              key={i}
              style={{
                borderBottom: `solid 1px ${
                  borderColor ? borderColor : "#9879b0"
                }`,
              }}
            >
              <button
                style={{ color: menuItemColorFilter(category) }}
                onClick={() => mobileMenuButtons(category)}
              >
                {category}
              </button>
            </li>
          )
        })}
        <li
          style={{
            borderBottom: `solid 1px ${borderColor ? borderColor : "#9879b0"}`,
          }}
        >
          <button
            style={{ color: textColor }}
            onClick={() => mobileMenuButtons("all")}
          >
            all
          </button>
        </li>
      </motion.ul>
    </>
  )
}

export default Nav
