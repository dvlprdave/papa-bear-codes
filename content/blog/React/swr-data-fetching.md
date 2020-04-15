---
title: Data fetching with SWR in React
date: 2020-04-14 08:11:20
category: React
---

SWR is a library that provides React Hooks for data fetching. It's made by ZEIT, the folks over at Next.js and allows you to pre-fetch your data on the client side while using http caching.

There are a lot of amazing features that come with SWR, but we'll be focusing on the basics. If you'd like to learn more, you can head over to the [SWR page](https://swr.now.sh/).

## Getting Started

I've created a very basic skeleton to work with over at [Codesandbox](https://codesandbox.io/s/elastic-chatterjee-rg58c?file=/src/App.js). You can use it to follow along. 

> I have gone ahead and added `swr` as a dependency and imported it in the main App component.

## Using SWR

In our `App.js` file lets call the `useSWR` hook right above our `return()` statement:

```jsx

  const { data, error } = useSWR(key, fetcher);

```

Above, we're using object destructuring with a `data` and `error` variable: 

- **data**: The data returned from the fetcher
- **error**: The error provided 

When calling `useSWR()`, we see that it take in two arguments: 

- **key**: The URL for the API endpoint or path if your data is local. 
- **fetcher**: A function that retrieves data from an API request. 

> In the case of our `fetcher`, we'll be using the fetch API. You can use any fetching library you feel most comfortable with. `useSWR` has no mandatory preference to how the data is fetched. 

## The API and Fetcher Function

For this article, we'll be using the Jikan API to fetch a list of top airing Anime titles. 

> The following code will be placed above our `useSWR()` call. 

Let's start by storing our API endpoint in a variable: 

```jsx
  const url = 'https://api.jikan.moe/v3/top/anime/1/airing';
```

Now, we can go ahead and create our fetcher function: 

```js
  const fetcher = (...args) => fetch(...args).then(res => res.json());
```
The fetcher function above takes in all of our arguments using the spread operator and calls `fetch`. It may not seem obvious, but the arguments being spread is the url for our API. Fetch returns a promise so we use `.then()` to get the response and turn it into JSON. 

Our component should now look like this: 

```jsx
import React from "react";
import "./styles.css";

import useSWR from 'swr';

export default function App() {
  const url = 'https://api.jikan.moe/v3/top/anime/1/airing';
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  
  const { data, error } = useSWR(url, fetcher)
   
  console.log(data.top) 

  return (
    <div className="App">
      <h1>Fetching data with SWR</h1>
    </div>
  );
}
```

If we do a quick console log of our `data` as I've added above, we should see our fetched data with 50 objects. 

> I've used `data.top` as it's the exact endpoint to display our data.

The response for the first object should look something like this: 

```json
mal_id: 40591
rank: 1
title: "Kaguya-sama wa Kokurasetai?: Tensai-tachi no Renai Zunousen"
url: "https://myanimelist.net/anime/40591/Kaguya-sama_wa_Kokurasetai__Tensai-tachi_no_Renai_Zunousen"
image_url: "https://cdn.myanimelist.net/images/anime/1764/106659.jpg?s=aab19d0f19e345e223dc26542ac3a28f"
type: "TV"
episodes: null
start_date: "Apr 2020"
end_date: null
members: 164557
score: 8.8
```

> If the title and result isn't exactly the same, no worries. The data received is top airing anime, so this could change depending on when you read this article.

The only thing left is to add quick error handling and to display some sort of notification in the event that the data doesn't load immediately. We can add the following to our existing code: 

```jsx
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
```
The above is pretty self explanatory, but we are simply saying if there is an `error`, then display "failed to load" and if there is no data, return "loading...".

Our full component should now look like this: 

```jsx
import React from "react";
import "./styles.css";

import useSWR from 'swr';

export default function App() {
  const url = 'https://api.jikan.moe/v3/top/anime/1/airing';
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
    
  return (
    <div className="App">
      <h1>Fetching data with SWR</h1>
    </div>
  );
}


```

We've successfully fetched our data using the `useSWR` hook!

## Displaying the data

There's no use in having our data logged out to the console. We can quickly display our data by mapping over our data and displaying the title, image, and score: 

```jsx
import React from "react";
import "./styles.css";

import useSWR from 'swr';

export default function App() {
  const url = 'https://api.jikan.moe/v3/top/anime/1/airing';
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  
  return (
    <div className="App">
      <h1>Fetching data with SWR</h1>
      <div>
        {data.top.map((anime) => {
          return (
            <div key={anime.mal_id}>
              <h2>{anime.title}</h2>
              <img src={anime.image_url} alt='poster'/>
              <p>{anime.score}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}
```

Here's what our final project looks like: 

{% codesandbox sweet-swirles-b7b5o %}

## Further learning

This article came about as I was working on a Next.js project and found using `swr` to be an ideal tool for said project. I decided to write this article specifically using React as it reaches a broader audience. 

In the event you are using Next.js, I would **highly** recommend watching [this video](https://www.youtube.com/watch?v=a7JigiLw_OY&t=448s). It provides an in-depth look at the `useSWR` hook and more of its features. 

