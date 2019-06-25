---
title: For..in vs for..of
date: 2019-06-24 22:06:92
category: JavaScript
---

In JavaScript, we use loops to iterate over values and run code until the given condition is met.

There are quite a few looping statements, but we'll be covering two of the newest ones.

## for..in  
Used to loop through properties on an object.  
Let's take a look at the syntax and then dive into an example.

```javascript
for (variable in object) {...}
```

The variable (you can name this anything you'd like) is assigned to the current object key in the loop.

The second half is the name of the actual object you want to loop through.

```javascript
let car = {
  make: 'Nissan',
  model: 'Skyline'
}

for (let property in car) {
  console.log(property)
}

// Output --> make model
```

Above, we only retrieved the keys of the object. To retrieve the value, we have to do the following

```javascript
for (let property in car) {
  console.log(car[property])
}

//Output --> Nissan Skyline
```

##for..of
Used to loop over iterable values (cannot be used on objects).
The syntax follows the same convention as **for..in** aside from changing "in" to "of".

```javascript
const people = ['Ashley', 'Mark', 'Jen', 'Devin']

for (const name of people) {
  console.log(name)
}

// Output -->

// Ashley
// Mark
// Jen
// Devin
```

It's easy to get confused when attempting to figure out which one to use. To be fair, I confuse the two all the time.

Hopefully this reference helps:  
##### For..in - Loops over enumerable properties. Use it when you want to loop over objects

##### For..of - Loops over iterable collections. Use it when you want to loop over iterables such as:  
- strings
- map
- array
- TypedArray
- set
- generator