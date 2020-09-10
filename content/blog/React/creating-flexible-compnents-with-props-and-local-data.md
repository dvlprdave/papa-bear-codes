---
title: Creating flexible compnents with props and local data
date: 2020-09-09 11:09:25
category: React
---

In this article, we'll be focusing on one component in specific that we'll dive into and refactor while focusing on re-usability and props.

This came about as I was updating my portfolio and came across a really ugly and inefficient component that needed some work. 

The component in question was this `Projects` component. It simply rendered multiple card components (`ProjctCard`) to showcase various projects. Each card received props to display its respective information with different values:

```jsx
import React from 'react'
import ProjectCard from './components/ProjectCard'

// Project images
import kintsugi from '../images/kintsugi.png'
import agency from '../images/agency.jpg'
import merlin from '../images/merlins-marker.jpg'
import colorBurst from '../images/color-burst.jpg'
import coffeeHouse from '../images/coffee-house-screenshot.jpg'
import lightsOut from '../images/lights-out.jpg'

const Projects = () => (
  <>
    <ProjectCard
      img={kintsugi}
      title='Kintsugi'
      description='An Anime databse where users can browse and discover anime titles.'
      tech='NextJS | Tailwind CSS'
    />
    <ProjectCard
      img={agency}
      title='Agency'
      description='A simple landing page with a focus on minimal design and fluid animations using GSAP.'
      tech='React | GSAP'
    />
    <ProjectCard
      img={merlin}
      title='Merlins-Marker'
      description='A theme generator for Prism.js. Users create their own theme for code highlighting.'
      tech='JavaScript | CSS Variables'
    />
    <ProjectCard
      img={colorBurst}
      title='Color-Burst'
      description='A color palette generator to help users on their next project.'
      tech='React | React-Router | React-Sortable'
    />
    <ProjectCard
      img={coffeeHouse}
      title='Coffee House'
      description='A cofee/restaurant website.'
      tech='HTML/CSS | Sass | CSS Grid'
    />
    <ProjectCard
      img={lightsOut}
      title='Lights Out'
      description='A puzzle game in which you need to toggle all of the lights off.'
      tech='React'
    />
  </>
)

export default Projects
```

We can clearly see that this component lacks efficiency and future proofing. Every prop is being filled in manually and the code isn't DRY as each card is being repeated again and again.

> At best, even if there were only two project cards to display, it's always beneficial to be intentional with the code you write and to think of use cases for the future.

To clean this up, we can create a new folder called `data` and then within that folder create a new file called `projectData.js`. This file will hold all the static data used to fill in the prop information for each `ProjectCard`:

```jsx
export default [
  {
    img: kintsugi,
    title: 'Kintsugi',
    description: 'An Anime databse where users can browse and discover anime titles.',
    tech: 'NextJS | Tailwind CSS',
  },
  {
    img: agency,
    title: 'Agency',
    description: 'A simple landing page with a focus on minimal design and fluid animations using GSAP.',
    tech: 'React | GSAP',
  },
  {
    img: merlin,
    title: 'Merlins-Marker',
    description: 'A theme generator for Prism.js. Users create their own theme for code highlighting.',
    tech: 'JavaScript | CSS Variables',
  },
  {
    img: colorBurst,
    title: 'Color-Burst',
    description: 'A color palette generator to help users on their next project.',
    tech: 'React | React-Router | React-Sortable',
  },
  {
    img: coffeeHouse,
    title: 'Coffee House',
    description: 'A cofee/restaurant website.',
    tech: 'HTML/CSS | Sass | CSS Grid',
  },
  {
    img: lightsOut,
    title: 'Lights Out',
    description: 'A puzzle game in which you need to toggle all of the lights off.',
    tech: 'React',
  },
]
```

The structure of this file is an array of objects because it will allow us to map over the data and access the values within each object.

Another thing we should add into the `projectData.js` file are all of the project images. This allows us to have one central location for all our data pertaining to each project:

```jsx
// Project images
import kintsugi from '../images/kintsugi.png'
import agency from '../images/agency.jpg'
import merlin from '../images/merlins-marker.jpg'
import colorBurst from '../images/color-burst.jpg'
import coffeeHouse from '../images/coffee-house-screenshot.jpg'
import lightsOut from '../images/lights-out.jpg'

export default [
  {
    img: kintsugi,
    title: 'Kintsugi',
    description: 'An Anime databse where users can browse and discover anime titles.',
    tech: 'NextJS | Tailwind CSS',
  },
  {
    img: agency,
    title: 'Agency',
    description: 'A simple landing page with a focus on minimal design and fluid animations using GSAP.',
    tech: 'React | GSAP',
  },
  {
    img: merlin,
    title: 'Merlins-Marker',
    description: 'A theme generator for Prism.js. Users create their own theme for code highlighting.',
    tech: 'JavaScript | CSS Variables',
  },
  {
    img: colorBurst,
    title: 'Color-Burst',
    description: 'A color palette generator to help users on their next project.',
    tech: 'React | React-Router | React-Sortable',
  },
  {
    img: coffeeHouse,
    title: 'Coffee House',
    description: 'A cofee/restaurant website.',
    tech: 'HTML/CSS | Sass | CSS Grid',
  },
  {
    img: lightsOut,
    title: 'Lights Out',
    description: 'A puzzle game in which you need to toggle all of the lights off.',
    tech: 'React',
  },
]
```

If we move back into the `Projects` component, we can now remove every instance of the `ProjectCard` component except for one. The component should now look like this:


```jsx
import React from 'react'
import ProjectCard from './components/ProjectCard'

const Projects = () => (
  <>
    <ProjectCard
      img={kintsugi}
      title='Kintsugi'
      description='An Anime databse where users can browse and discover anime titles.'
      tech='NextJS | Tailwind CSS'
    />
  </>
)

export default Projects
```

The static prop information is no longer needed since it will be provided from the `projectData.js` file. We can now go ahead and import the `projectData.js` file and map over it while passing in our desired prop values:

```jsx
import React from 'react'
import ProjectCard from './components/ProjectCard'
import data from '../data/projectData'

const Projects = () => (
  <>
    {data.map(project => (
      <ProjectCard
        key={project.title}
        img={project.img}
        title={project.title}
        description={project.description}
        tech={project.tech}
      />
    ))}
  </>
)

export default Projects
```

Above, we mapped over each project which is represented by every object within our `projectData.js` file and filled in each prop value with the key from our data object:

```jsx
data.map(project => (
  <ProjectCard
    key={project.title}
    img={project.img}
    title={project.title}
    description={project.description}
    tech={project.tech}
  />
))
```

You may have noticed the addition of a `key` attribute:

```jsx
key={project.title}
```

This is necessary when rendering a list of components as it gives React a way to identify which items have changed. Since each key must be unique, we'll use the title as each title is different and we don't have any specific id's. 

Our last step is to simply destructure our prop  values from the project:

```jsx
import data from '../data/ProjectData'

const Projects = () => (
  <>
    {data.map(project => {
      let {img, title, description, tech} = project

      <ProjectCard
        key={title}
        img={img}
        title={title}
        description={description}
        tech={tech}
      />
    })}
  </>
)

export default Projects
```

We now have a readable and manageable component that will allow for expansion in the future!

### Conclusion

Props are an essential part of React that allow components to adapt to the data they receive. As we've see, it's always good practice to loosen data from the display to provide more flexible and focused components.

I hope you found this article well and that you and your family are healthy!
