import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

import './index.scss'

export const Bio = () => (
  <StaticQuery
    query={bioQuery}
    render={data => {
      const { author, introduction } = data.site.siteMetadata

      return (
        <div className="bio">
          <div className="author">
            <div className="author-description">
              <div className="author-name">
                <span className="author-name-prefix">Written by</span>
                <Link to={'/about'} className="author-name-content">
                  <span>@{author}</span>
                </Link>
                <div className="author-introduction">{introduction}</div>
              </div>
            </div>
          </div>
        </div>
      )
    }}
  />
)

const bioQuery = graphql`
  query BioQuery {
    site {
      siteMetadata {
        author
        introduction
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
