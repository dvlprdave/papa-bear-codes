import React from 'react'
import { Link } from 'gatsby'

import './index.scss'

export const Header = ({ title }) => {
  return (
    (
      <h1 className="home-header">
        <Link to={`/`} className="link">
          {title}
        </Link>
      </h1>
    )
  )
}
