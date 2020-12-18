import React from "react"

const featureImageOverlay = ({ projectList }) => {
  return (
    <div className="feature-image-overlay">
      {projectList &&
        projectList.map((project, i) => {
          return (
            <img
              key={project.node.id}
              style={{
                display:
                  imageIndex.index === project.node.id ? "block" : "none",
              }}
              src={
                project &&
                project.node.frontmatter.image_gallery[0].image.childImageSharp
                  .fluid.src
              }
              sizes={
                project &&
                project.node.frontmatter.image_gallery[0].image.childImageSharp
                  .sizes
              }
              srcSet={
                project &&
                project.node.frontmatter.image_gallery[0].image.childImageSharp
                  .fluid.srcset
              }
              alt=""
            />
          )
        })}
    </div>
  )
}

export default featureImageOverlay
