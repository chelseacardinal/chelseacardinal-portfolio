import React from "react"
import "./src/styles/fonts.css"
import TransitionWrap from "./src/components/transitionWrap"

export const wrapPageElement = ({ element, props }) => {
  return <TransitionWrap {...props}>{element}</TransitionWrap>
}
