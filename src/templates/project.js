import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"

const Project = props => {
  const project = props.data.markdownRemark.frontmatter

  return (
    <Layout>
      <h1>{project.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: project.description }}></p>
    </Layout>
  )
}

export default Project

export const data = graphql`
  query ProjectQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        description
        image_gallery {
          image
        }
      }
    }
  }
`
