import React from "react"
import { motion, AnimatePresence } from "framer-motion"

const TransitionWrap = ({ children, location }) => {
  return (
    <>
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.main key={location.pathname}>{children}</motion.main>
      </AnimatePresence>
    </>
  )
}

export default TransitionWrap
