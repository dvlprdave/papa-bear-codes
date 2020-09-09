import React from 'react'
import './index.scss'

const currentYear = new Date().getFullYear()

export const Footer = () => (
  <footer className="footer">
    <p>{`© ${currentYear} David Quick`}</p>
  </footer>
)
