import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

const FeatureImageOverlay = ({ projectList, imageIndex, featureSize }) => {
  const imageSize = featureSize.edges
  console.log(imageSize)
  return (
    <div className="feature-image-overlay">
      {projectList &&
        featureSize &&
        imageSize.map((project, i) => {
          return (
            <div
              key={project.node.id}
              style={{
                display:
                  imageIndex.index === project.node.id ? "block" : "none",
              }}
              className="wrapper"
            >
              <GatsbyImage
                image={
                  project.node.frontmatter.image_gallery.find(
                    item => item.featured_image
                  )
                    ? project.node.frontmatter.image_gallery.find(
                        item => item.featured_image
                      ).image.childImageSharp.gatsbyImageData
                    : project.node.frontmatter.image_gallery[0].image
                        .childImageSharp.gatsbyImageData
                }
                loading="eager"
                alt=""
              />
            </div>
          )
        })}
    </div>
  )
}

export default FeatureImageOverlay
