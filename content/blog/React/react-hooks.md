---
title: Learn useState hook by example
date: 2019-11-14 08:11:20
category: React
---

In this guide, we'll take a look into useState by comparing class and function components.

This isn't an in-depth look as there are other great features of the useState hook that aren't included in this guide.

## What Are Hooks?

React hooks are functions that allow us to access state and lifecycle methods in functional components without having to write a class component. 

Prior to hooks, the only way to access state was by using a class component. Functional components were purposed for handling anything UI related without logic. You may have heard them called **"stateless functional components"** or **"presentational components"**.

## Let's Dive In

I've created a small project that displays two planets using [**React Kawaii**](https://react-kawaii.now.sh/). For the given planets, you can toggle their mood by clicking the *Emotion Toggle* button. 

<br>

<iframe
  src="https://codesandbox.io/embed/vigorous-torvalds-btiky?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="vigorous-torvalds-btiky"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
>
</iframe>

## Class Component

```jsx
import React, { Component } from 'react';
import { Planet } from 'react-kawaii';

class PlanetClass extends Component {

  state = {
    emotion: true
  }

  handleToggle = () => {
    this.setState(prevState => ({
      emotion: !prevState.emotion
    }))
  }

  render() {
    const { emotion } = this.state
    const emotionCondition = emotion ? 'blissful' : 'ko'

    return (
      <>
        {<Planet size={250} mood={emotionCondition} color="#FDA7DC" />}
        <button
          className='emotion-btn'
          onClick={this.handleToggle}
        >
          Emotion Toggle
        </button>
      </>
    )
  }
}

export default PlanetClass
```

Above, our component has a single state named **emotion** with an initial value of "true". Following this, we have a method called ```handleToggle``` that takes the initial state and provides the opposite.

The ```handleToggle``` method then gets attached to the ```onClick``` event handler within our button, allowing us to click the button and toggle between the ```emotionCondition```.

The ```emotionCondition``` is a condition that takes the initial state of ```emotion: true``` and provides a property of "blissful" if true otherwise "ko" if false.

**Please note** that I've used the Class Fields syntax in this class component. This allows me to write property instances directly within the class and eliminates the need to create a constructor and call super (my favorite). If you want to learn more about the Class Fields syntax, I'd highly suggest reading [this article](https://tylermcginnis.com/javascript-private-and-public-class-fields/) by Tyler Mcginnis.

I am also using an arrow function for the ```handleToggle``` method to avoid binding methods in the constructor since arrow functions have their own "this".

## Functional Component

```jsx
import React, { useState } from 'react';
import { Planet } from 'react-kawaii';

const PlanetHook = () => {
  const [emotion, setEmotion] = useState(true)

  const handleToggle = () => {
    setEmotion(prevState => !prevState)
  }

  const emotionCondition = emotion ? 'blissful' : 'ko'

  return (
    <>
      {<Planet size={250} mood={emotionCondition} color="#61DDBC" />}
      <button
        className='emotion-btn'
        onClick={handleToggle}
      >
        Emotion Toggle
        </button>
    </>
  )
}

export default PlanetHook
```
At first, you'll notice our functional component using hooks has significantly less code (rubs hands together). 

Let's break this down and go over the changes while comparing what we had before. 

Within the first line, we've imported ```useState``` as a named export from 'react'.

```javascript
import React, { useState } from 'react';
```

Let's move down to line five where we've called ```useState```. 

```javascript
  const [emotion, setEmotion] = useState(true)
```

This single line is what makes our function stateful.

We have two elements within an array, ```emotion``` and ```setEmotion```. Both are being destructured (array destructuring) and will be the return value of ```useState```. Within the parenthesis of ```useState```, we store the initial value of our state. 

Confusing? We'll go further.

Within the array the first value will be the name of the state and the second will be the setter for the state. Both can be named anything, but it's common practice to include "set" followed by the state name as the setter (second value). 

```setEmotion``` is the equivalent of ```setState``` in a class component. 

Let's take a quick glance at the state in the class and function component. 

```javascript
// Class Component
state = {
    emotion: true
  }

// Function Component
  const [emotion, setEmotion] = useState(true)
```

Comparing the two, we have a few things that don't inherently change. 

- ``state`` and ```useState``` are both keywords that dictate state
- the name of our state (```emotion```) remains
- the value of our state remains

The key differences in useState are: 

- We don't store state within an object literal
- We use destructuring to name our state and state setter
- Our state value is written within the parenthesis following the ```useState``` keyword

## How Do I Set State?

Remember, the second value of the array is the setter. We'll use that when updating the state. Check out both methods for the class and function component. 

```javascript
// Class Component
handleToggle = () => {
  this.setState(prevState => ({
    emotion: !prevState.emotion
  }))
}

// Function component
  const handleToggle = () => {
  setEmotion(prevState => !prevState)
}
```

Above, our class component uses ```setState``` followed by an object literal within a callback. 

In our function, we call ```setEmotion``` with the desired updated state. 

Both are using callbacks since we are setting state based on a previous state. Also, ```setState``` in React is actually asynchronous. This means that after calling ```setState```, the state variable itself may not change right away so it's best to use a callback. 

## Is that all? 

Of course not, there's always more. For now, I'll see you next time and bring **useEffect** with me.