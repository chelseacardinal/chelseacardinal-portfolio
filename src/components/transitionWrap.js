import React from "react"
import { TransitionState } from "gatsby-plugin-transition-link"
import { AnimatePresence } from "framer-motion"

const TransitionWrap = props => {
  return (
    <TransitionState>
      {({ mount }) => {
        return (
          <AnimatePresence initial={false}>{mount && <>{props.children}</>}</AnimatePresence>
        )
      }}
    </TransitionState>
  )
}

export default TransitionWrap
