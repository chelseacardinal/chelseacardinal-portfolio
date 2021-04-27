import React from "react"

const FeatureImageOverlay = ({ projectList, imageIndex }) => {
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
                project.node.frontmatter.image_gallery.find(
                  item => item.featured_image
                )
                  ? project.node.frontmatter.image_gallery.find(
                      item => item.featured_image
                    ).image.childImageSharp.gatsbyImageData.images.fallback.src
                  : project.node.frontmatter.image_gallery[0].image
                      .childImageSharp.gatsbyImageData.images.fallback.src
              }
              sizes={
                project.node.frontmatter.image_gallery.find(
                  item => item.featured_image
                )
                  ? project.node.frontmatter.image_gallery.find(
                      item => item.featured_image
                    ).image.childImageSharp.gatsbyImageData.images.fallback.src
                  : project.node.frontmatter.image_gallery[0].image
                      .childImageSharp.gatsbyImageData.images.fallback.sizes
              }
              srcSet={
                project.node.frontmatter.image_gallery.find(
                  item => item.featured_image
                )
                  ? project.node.frontmatter.image_gallery.find(
                      item => item.featured_image
                    ).image.childImageSharp.gatsbyImageData.images.fallback.src
                  : project.node.frontmatter.image_gallery[0].image
                      .childImageSharp.gatsbyImageData.images.fallback.srcSet
              }
              alt=""
            />
          )
        })}
    </div>
  )
}

export default FeatureImageOverlay
