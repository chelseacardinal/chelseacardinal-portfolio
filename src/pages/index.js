import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const Index = ({ data }) => {
  console.log(data)
  const projects = data.allMarkdownRemark.edges
  // const siteTitle = data.site.siteMetadata.title
  // const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <ul>
        {projects.map((project) => {
          return (
            <li key={project.node.id}>
              <p>{project.node.frontmatter.category}</p>
              <Link to={`${project.node.fields.slug}`}><h2>{project.node.frontmatter.title}</h2></Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Index

export const data = graphql`
  query IndexQuery {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            title
            category
            color
            description
          }
        }
      }
    }
  }
`
