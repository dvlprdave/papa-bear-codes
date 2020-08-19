---
title: Five common JavaScript interview coding problems
date: 2020-08-19 12:08:58
category: javascript
---

### Short story 
I recently had a technical interview with an amazing company in which I genuinly knew the answers, but if you had asked me what my name was **during** that interview, I would have struggled. :sob:

I kept apologizing during the interview and my mind was shot with nerves, so here's my self redemption and help for those currently interviewing or planning to. 

## JavaScript Problem Set

### 1. Palindrome

> A palindrome is a word that can be read the same backwards or forwards.

**Challenge**: Return true if the given string is apalindrome. Otherwise, return false.

**Solution 1**

```js
const isPalindrome = string => {
  // reverse the string
  let revString = [...string].reverse().join('')
  // create function to check if string argument is equal to the reversed string
  const palindromeCheck = () => string === revString ?  true : false

  return palindromeCheck()
}

console.log(isPalindrome('eye')) // true
console.log(isPalindrome('hello')) // false
```
**Solution 2 / Edge Case**

```js
const isPalindrome = string => {
  // reverse the string
  let revString = [...string].reverse().join('')

  // check if the string we input as the argument is an actual string
  // then check if the string is equal to the reversed string
  if(typeof string === 'string' & string === revString) {
    return true
  } else {
    return false
  }
}

console.log(isPalindrome('hello')
```

The edge case in our instance is making sure we pass in a string as an argument. We do so with this line `typeof string === 'string'`.

### 2. Find sum of n numbers

**Challenge**: Create a function that gets the sum of all numbers passed in as an argument. 

**Solution 1**

```js
function sum() {
  // Create a varible to hold our total sum and set its initial value to 0
  let total = 0

  // Here, we're using for...of to loop over the functions arguments.
  // We access the arguments through the arguments object 
  // by calling the `arguments` keyword. 
  for (let num of arguments) {
    // continue to add and place each num in the `total` variable
    total += num
  }

  return total
}

console.log(sum(1, 5, 2)) // 8
```
**Solution 2**

```js
  const sum = (...args) => [...args].reduce((acc, num) => acc + num, 0)

  console.log(sum(5, 5, 2)) // 12
```

In this solution, we're using the reduce method to get our final sum. The `reduce` method takes in an accumulator and an item you wish to reduce followed by the reducer which is the action you want to perform to give us a single value. 

- We create a sum function that spreads all the arguments we pass in. 
- An array with all of the arguments is created by `[...args]`.
- Our array is reduced using the reduce method which takes in a callback function followed by an initial value which is 0.
- Callback = `(acc, num) => acc + num` 
- Initial value = 0
- acc is our accumulator which stores our value through each iteration
- num is just a variable for each item in our array (in our case, a number)
