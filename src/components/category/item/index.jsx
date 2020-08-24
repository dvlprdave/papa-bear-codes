import React from 'react'

export const Item = ({ title, category, selectCategory }) => {
  const colorClasses =
    title === 'React'
      ? 'color-react'
      : title === 'JavaScript'
      ? 'color-javascript'
      : null

  return (
    <li
      className="item"
      role="tab"
      aria-selected={category === title ? 'true' : 'false'}
    >
      <div className={colorClasses} onClick={() => selectCategory(title)}>
        {title}
      </div>
    </li>
  )
}
