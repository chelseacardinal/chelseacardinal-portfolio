import React from "react"
import { AnimatePresence } from "framer-motion"

const TransitionWrap = ({ children, location }) => {
  return (
    <>
      <AnimatePresence initial={false} exitBeforeEnter>
        <main key={location.pathname}>{children}</main>
      </AnimatePresence>
    </>
  )
}

export default TransitionWrap
