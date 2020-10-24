import React from "react"
import Img from "gatsby-image"

// we only care about `aspectRatio`, the rest will be passed directly to `Img`
const ImgWithOrient = ({ aspectRatio, ...props }) => {
  let orientation
  if (aspectRatio >= 1.2) orientation = "landscape"
  if (aspectRatio <= 0.8) orientation = "portrait"
  if (aspectRatio > 0.8 && aspectRatio < 1.2) orientation = "square"

  return <Img className={`${orientation}`} {...props} />
}

export default ImgWithOrient
