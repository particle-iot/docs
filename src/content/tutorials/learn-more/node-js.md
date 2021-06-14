---
title: node.js getting started
columns: two
layout: commonTwo.hbs
description: node.js getting started
---

# node.js getting started

Node.js is a scripting language that can be used to write back-end servers and command line tools. It's based on Javascript, the language used in web browsers, and there are many similarities. One of the most powerful features is its extensibility using packages. There's a huge library of them at [npmjs.com](https://www.npmjs.com/), the Node Package Manager. It also cross-platform, allowing easy use from Windows, Mac, and Linux operating systems.

This document is a brief introduction to node.js and using the Particle Cloud API, designed for beginners moving from using things like curl and bash or MSDOS batch scripts to a more powerful, and, ultimately easier to use, full programming language environment.

## Installation

### Windows

### Mac

### Linux

## Hello world

Not surprisingly we'll start with a Hello World example, which is really simple:

{{> codebox content="/assets/files/node-tutorial/hello.js" format="js" height="200"}}

To run it, you create or download the hello.js file, then:

```
node hello.js
```

It should output:

```
hello world!
```

In Javascript, `console.log()` is the function that prints a debugging log message, like `Log.info()` or `Serial.printlnf()` in C++ on a Particle device. 

A few other things to note: 

- In Javascript, string constants can be surrounded by either single quotes or double quotes, unlike C++ which only uses double quotes. This is equally valid:

```js
console.log("hello world!");
```

- The semicolon at the end of the line is optional in Javascript, but required in C++. We'll include them in the examples. This works too!

```js
console.log("hello world!")
```

- The `console.log` automatically adds the end of line character so you don't need to manually add it.


## Basic language features

### Loops

The for loop construct looks like it does in C++, with three parts: initialization, test, and increment steps separated by semicolons:

{{> codebox content="/assets/files/node-tutorial/for-loop.js" format="js" height="200"}}

To run it, you create or download the for-loop.js file, then:

```
node for-loop.js
```

It should output:

```
testing 0
testing 1
testing 2
testing 3
testing 4
testing 5
testing 6
testing 7
testing 8
testing 9
```

If you were writing this in C++ code on a Particle device, it might look like this, which isn't that different:

```cpp
for(int ii = 0; ii < 10; ii++) {
    Log.info("testing %d", ii);
}
```

- Like C++, you can declare a variable within the loop construct. In C++ you need a type like `int` or `size_t` but Javascript variables don't have a type. You instead declare it with `let` or `var`.
- Instead of using `sprintf` formatting like in our Particle device code, we just concatenate a string and number using `+` in Javascript.
- We'll get into `let` vs. `var` later on, but in this example, either would work. The `let` and `const` statements were added in the ES6 version of Javascript, and many examples you find on the Internet will use `var` for compatibility with old versions.

Like C++, Javascript tends to use 0-based indexes in loops and in particular arrays, but making a 1-based loop is just as easy as C++:

{{> codebox content="/assets/files/node-tutorial/for-loop1.js" format="js" height="200"}}

This outputs:

```
testing 1
testing 2
testing 3
testing 4
testing 5
testing 6
testing 7
testing 8
testing 9
testing 10
```

#### while loop (top-test)

You can do a `while` loop with a top test, like C++.

{{> codebox content="/assets/files/node-tutorial/while-loop.js" format="js" height="200"}}


#### do-while loop (bottom-test)

You can do a `while` loop with a bottom test, like C++, too.

{{> codebox content="/assets/files/node-tutorial/do-while-loop.js" format="js" height="200"}}


### Conditionals

Conditionals, `if` statements, work like C++:

{{> codebox content="/assets/files/node-tutorial/if1.js" format="js" height="200"}}

Note that this code outputs this:

```
testing 0
testing 2
testing 4
testing 6
testing 8
```

The reason is that the `if` statement uses the modulus operator `%` in modulo 2 to check for even numbers. This works the same as C++.


### Arrays

Arrays will be familiar to C++ programmers, but there are some differences:

- You don't need to declare the size of a Javascript array, it automatically grows as needed
- Arrays don't have a data type. In fact, each element can have a different type of data (string, number, boolean, etc.)

{{> codebox content="/assets/files/node-tutorial/array1.js" format="js" height="200"}}

This outputs:

```
1
3
5
7
9
```

Of note in this example:

- You can declare an array inline in your code using square brackets
- We used `const` instead of `let` (or `var`). This means the array cannot be changed.
- The array knows its own length, which is available using `myArray.length`. Note that it is a property of the array, not a function, so it's not `length()`.
- You access array elements using square brackets like C++.

#### for - of

The array style above is very C++-like, but there's a more Javascripty and less verbose way to do it, using the for - of statement:

{{> codebox content="/assets/files/node-tutorial/array2.js" format="js" height="200"}}

The output is the same as above.

- `elem` contains the value at the next array index (not the index)
- It can be declared `const` because technically on each loop iteration a new `elem` variable is created. You can use `var` or `let` there as well.
- There's also for - in which is a little confusing and they're not at all interchangeable. Use `of` with arrays.

Incidentally, you can declare an array almost anywhere. This works too!

{{> codebox content="/assets/files/node-tutorial/array3.js" format="js" height="200"}}


### Functions

Functions are declared using the `function` statement which can have 0 or more parameters, and optionally a return value.

{{> codebox content="/assets/files/node-tutorial/function1.js" format="js" height="200"}}

This outputs:

```
add(3, 5) = 8
```

You can call the function almost anywhere, including the `console.log` statement, and pass parameters in between the parentheses, like in C++.

There's a lot more to functions, which we'll get into shortly.

Incidentally, Javascript numbers don't differentiate between integer and floating point types like C++. You could use floating point decimal numbers in the previous example like this:

```
console.log('add(3.5, 5.5) = ' + add(3.5, 5.5));
```

### Object properties

Arrays are good when you have a sequence of values, but you'll also want to use objects and properties. These are a named key and its associated value, which can be any Javascript type (boolean, number, string, array, another object, or a function). Properties are often used to pass configuration data into functions in Javascript because named parameters are much more scalable than positional parameters as in C++.


TKTK


## Asynchronous functions

### Async/await

### Promise

### Callbacks


## Simple techniques

### Access tokens


### Getting started with particle-api-js


### Custom list devices

### Processing a list of devices

### Command line options using yargs


## More techniques

### Using the Particle API directly

### Projects with multiple files

