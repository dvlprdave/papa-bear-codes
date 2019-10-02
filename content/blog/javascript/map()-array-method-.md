---
title: map() Array Method 
date: 2019-07-17 06:07:20
category: JavaScript
---

`map()` is a method used on arrays to handle iteration. It uses a callback function on every Element in the array it's called on. It's one of my most used array methods and quite possibly my favorite.

The great thing about `map()`, is that it creates a new array instead of mutating the original. 

If you don't know already, mutation....nay nay, you don't want that. 
>Immutability increases predictability
and predictable code is good as far as I'm concerned. 

Let's touch on the syntax by creating a brief example so you can familiarize yourself with `map()`.

```javascript
const numbersArray = [18, 35, 62]

const squaredNumbers = numbersArray.map(number => number * number)

console.log(squaredNumbers)
```

This is as simple as it gets, but I'll break it down and have more practical examples as we move along. 

Looking back at the code block now. `numbersArray` is created to hold our three numbers in an array.

We store Within the map method, we setup a callback function using the array function syntax. `number` is used as the argument and simply refers to every item in the `numbersArray`.

When we call the map method, it needs an identifier for every item in the array it's called on. You can name