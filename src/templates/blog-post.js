import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
	  <main className="container">
	  <div className="col-md-12 p-1">
      <article
        className="card p-1"
        itemScope
        itemType="http://schema.org/Article"
      >
	   <img className="img-fluid card" alt={post.frontmatter.title} src={post.frontmatter.cover}/>
        <div className="card-content p-3 p-md-5">
          <h1 itemProp="headline">{post.frontmatter.title} ✏️</h1>
		  <h3>📝 {post.frontmatter.description}</h3>
          <p>⏰ {post.frontmatter.date}</p>
		  <p className="dotted"/>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        </div>
      <nav className="blog-post-nav p-1">
        <ul
		className="p-1"
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
		 <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                ← {next.frontmatter.title} 
              </Link>
            )}
          </li>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                {previous.frontmatter.title} →
              </Link>
            )}
          </li>
         
        </ul>
      </nav>
      </article>
	  </div>
	  </main>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
		description
		}
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
		cover
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
