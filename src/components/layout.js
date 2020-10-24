import React from "react"
import Nav from "./nav"
// import { motion, AnimatePresence } from "framer-motion"

const Layout = props => {
  return (
    <>
      <Nav
        route={props.route}
        current={props.current}
        next={props.next}
        offset={props.offset}
        exit={props.exit}
        about={props.about}
      />
      <div className="container">{props.children}</div>
    </>
  )
}

export default Layout
