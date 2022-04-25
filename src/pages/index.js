import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const siteDescription = data.site.siteMetadata?.description || `Description`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle} description={siteDescription}>
        <Seo title="Cute blog for Gatsby" />
        <p>
          Sory no post in here...
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle} description={siteDescription}>
      <Seo title="Cuteblog for Gatsby Update News" />
	  <main className="container">
      <div className="row">
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <div className="col-md-4 p-3" key={post.fields.slug}>
              <article className="card p-1"
                itemScope
                itemType="http://schema.org/Article"
              >
			   <Link to={post.fields.slug} itemProp="url">
			  <img className="img-fluid card" alt={title} src={post.frontmatter.cover}/>
                <section className="card-content p-3">
                  <h3>
                      <span itemProp="headline">{title} ✏️</span>
                  </h3>
                  <p className="date">⏰ {post.frontmatter.date}</p>
                  <p>📝 <span
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  /></p>
                </section>
              </Link>
              </article>
            </div>
          )
        })}
      </div>
	  </main>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
		description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
		  cover
        }
      }
    }
  }
`
