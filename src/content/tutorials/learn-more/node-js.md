---
title: node.js getting started
columns: two
layout: commonTwo.hbs
description: node.js getting started
includeDefinitions: [api-helper,api-helper-projects,zip]
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

If you're converting from the DOS command prompt for loop, that might look like this:

{{> codebox content="/assets/files/node-tutorial/loop1.bat" format="js" height="200"}}

- `/L` is a incrementing loop
- The first value (1) is the start
- The second value (1) is the increment
- The third value (10) is end condition (inclusive)

#### while loop (top-test)

You can do a `while` loop with a top test, like C++.

{{> codebox content="/assets/files/node-tutorial/while-loop.js" format="js" height="200"}}

If you're coming from a Python background, the syntax is different, but the construct looks more or less the same:

{{> codebox content="/assets/files/node-tutorial/while1.py" format="py" height="200"}}


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

Incidentally, you can declare an array almost anywhere, and the array can contain other types of data. This works too!

{{> codebox content="/assets/files/node-tutorial/loop2.js" format="js" height="200"}}

Output:

```
apple
banana
cucumber
```

There's another common way this is done, see [array with iterator function](#array-with-iterator-function), below.

#### Batch file array loop

That syntax may look familar to DOS command prompt batch file users:

{{> codebox content="/assets/files/node-tutorial/loop2.bat" format="bat" height="200"}}

#### Python array loop

Or Python users:

{{> codebox content="/assets/files/node-tutorial/loop2.py" format="py" height="200"}}

#### Unix Shell

Or sh (or bash) users:

{{> codebox content="/assets/files/node-tutorial/loop2.sh" format="sh" height="200"}}

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

Up to now things have been pretty simple syntax variations from other languages. Here's where things diverge and get more complicated.

{{> codebox content="/assets/files/node-tutorial/timer1.js" format="js" height="200"}}

This will output a new line every second;

```
testing 1
testing 2
testing 3
```

There's a lot to unpack in this little bit of code.

- The `var counter = 0` line makes what is essentially a global variable.
- The `setInterval` function is a built-in Javascript function for implementing a repeating timer.
- It takes two parameters:
  - A function to call when the timer fires
  - An interval in milliseconds (1000 milliseconds = 1 second)
- The function body is executed later, when the timer fires.
- The function prints a message with an incrementing counter.
- `counter++` is the value of `counter` which is then incremented after getting the value (post-increment).
- `'testing ' + counter++` takes the string `testing ` and appends the number from the post-increment of `counter`.

The previous syntax is really common, however if you're coming from old-style C/C++, this declaration of function style might be confusing. It's somewhat equivalent to this, which might be more familiar:

{{> codebox content="/assets/files/node-tutorial/timer2.js" format="js" height="200"}}

Also, if you're searching the web for node/Javascript examples you'll encounter arrow functions, which we'll get into later. The syntax looks like this and the code works the same:

{{> codebox content="/assets/files/node-tutorial/timer3.js" format="js" height="200"}}

#### Array with iterator function

Remember this example for iterating an array earlier?

{{> codebox content="/assets/files/node-tutorial/loop2.js" format="js" height="200"}}

There another common way this is handled in Javascript using `forEach`:

{{> codebox content="/assets/files/node-tutorial/loop2b.js" format="js" height="200"}}

- An array is declared.
- For each element in the array (`forEach`) call the specified function.
- The function is declared inline, and it takes one parameter `e` that's the element of the array being handled.
- Prints the element `e`.

Or you can do this with arrow functions:

{{> codebox content="/assets/files/node-tutorial/loop2c.js" format="js" height="200"}}


## Simple techniques

### Access tokens

One common thing you'll need to do is authenticate Particle API calls from a node.js script. While you can do a whole authorization flow from the command line, you'll most likely just want to use tokens directly. There are four common ways of using access tokens in scripts:

- Embed the token in the script as a variable.
- Pass the token in a command line parameter. 
- Store the token in a configuration file.
- Pass the token in an environment variable.

For security reasons, the last one is usually the most secure, and is also how you'll pass auth tokens to node scripts running on a cloud server, should you want to do that in the future. That is the method used in all of the examples below.

You'll often put this boilerplate code at the top of your script:

{{> codebox content="/assets/files/node-tutorial/auth1.js" format="js" height="200"}}

When you want to use your accessToken, for example with a Particle cloud API call, you just the `accessToken` variable.

To call the script, you just need to set the environment variable first. 

For Mac and Linux:

```
export PARTICLE_AUTH=27fdffffffffffffffffffffffffffffffff4259
node auth1.js
```

For Windows:

```
set PARTICLE_AUTH=27fdffffffffffffffffffffffffffffffff4259
node auth1.js
```

To get an access token, you will often use the [`particle token create`](/reference/developer-tools/cli/#particle-token-create) command in the Particle CLI. Remember that the access token grants full access to your account, so make sure you keep it secure!

### Adding a library

One of the advantages of node is the huge number of available libraries. In order to use them, we'll change the structure of the projects we use in the examples.

- Each project should be in a separate directory.
- You need a `package.json` file at the top level of the directory. The file is mostly boilerplate for private projects like this. It will be updated as we add libraries, however, so it's still important.
- Your Javascript sources go in that directory as well. In this case, it's in `app.js`.

{{> project-browser project="node-empty" default-file="package.json"}}

To add a library, `cd` into the project directory (containing the package.json file), then:

```
npm install particle-api-js
```

- This locates the `particle-api-js` library in the node project manager (npm) database and downloads and installs it in this project.
- It adds it to the `package.json` file;

```
    "dependencies": {
        "particle-api-js": "^9.1.0"
    },
```

- It creates a `package-lock.json` file. You probably won't need to mess with this, but it's used to keep track of the dependencies of the project. If you are committing a project to Github source control, you should add the `package-lock.json` file.
- It creates the `node_modules` directory. This contains the downloaded library, as well as all of the libraries it depends on. You should not commit this directory to source control.



### Async/await


### Promise

### Callbacks



### Custom list devices

### Accessing files on your computer

### Processing a list of devices

### Command line options using yargs


## More techniques

### Using the Particle API directly

### Projects with multiple files

### Delay

There is no delay-like function built into Javascript. There are two techniques that are used instead:

- `setTimer` with a callback
- `setTimer` in a promise with async/await


