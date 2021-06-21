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

Just go to the [nodejs.org](https://nodejs.org/) page and follow the instructions to download and install. The LTS (long-term support) version is recommended.

You may already have it installed; you can check from a command prompt or terminal window by entering the command:

```
node -v
```

The examples here require a minimum of version 12. The LTS version at the time of writing is 14.17.

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


If you're coming from a Fortran background, it's not that different from:

{{> codebox content="/assets/files/node-tutorial/for-loop.f95" format="js" height="200"}}


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

### List devices (Particle API)

Now lets move on to something more useful, using the Particle cloud API to list the devices in our account.

{{> project-browser project="node-list-devices" default-file="app.js"}}

If you download a full project .zip file as above, you'll need to install all of the dependencies. This is as easy as:

```
cd node-list-devices
npm install
```

And then set your access token and run:

```
export PARTICLE_AUTH=27fdffffffffffffffffffffffffffffffff4259
node app.js
```

Or for Windows:

```
set PARTICLE_AUTH=27fdffffffffffffffffffffffffffffffff4259
node app.js
```

There are a bunch of new things in this code:

These two lines will likely be be in every project you create that uses the particle-api-js. The `require` statement loads the library that you added to your package.json and installed using `npm install`. The second line creates an object to access the library. Different libraries will have different initialization strategies.

```
var Particle = require('particle-api-js');
var particle = new Particle();
```

There's the access token loading and checking code:

```
const accessToken = process.env.PARTICLE_AUTH;
if (!accessToken) {
    console.log('You must specify the PARTICLE_AUTH environment variable');
    process.exit(1);
}
```

And finally the list devices code, which is another new code structure that requires closer examination.

```
particle.listDevices({ auth: accessToken }).then(
    function (devices) {
        console.log('Devices', devices);
    },
    function (err) {
        console.log('List devices call failed', err);
    }
);
```

`particle.listDevices()` is a function call. This syntax means to call the `listDevices()` method in the `particle` object.

The parameter is in both `()` and `{}`. The reason is this library uses named parameters. Instead of positional parameters where the first parameter means something, the second parameter something else, etc., this library names every parameter. In this case, there's only one parameter so it's not as important, but it's consistent across all of the functions and really becomes handy when there are optional parameters.

The single parameter we pass in is called `auth` and it's initialized to our `accessToken` variable.

Then there is the `then`. The listDevices API will do its work asynchronously, then it will either call the first function on success, or call the second function on error. That's a simplified explanation and we'll go into more details about later.

It's also worth mentioning `console.log('Devices', devices)`. You'll notice there's a comma, not a `+` before `devices`. The `console.log()` function can either take a single string, or it can take a string and an object. The object will be pretty-printed in the output so you can see all of the contents!

As was the case with the `setInterval` example earlier, remember that the inner functions are called later.

#### Putting the main code in a function

Sometimes it's useful to put the main code in a function, in this case `run()`. The function is declared, then it's called. It works the same as the previous example, it's just arranged differently.

{{> project-browser project="node-list-devices2" default-file="app.js"}}

Also, in this example instead of printing out the whole object, we iterate the list of devices in code and only print out the device name and device ID.

```
for(const dev of devices.body) {
    console.log('name=' + dev.name + ' id=' + dev.id);
}
```

- When the `devices` object is returned, it has a member named `body` that's the array of device objects.
- Using a for - of loop we iterate that array, assigning `dev` to be the specific device we're looking at.
- Then we print out the device name and device ID.

#### List devices (await)

There is a reason for this, and it's so you can write the code this way, instead:

{{> project-browser project="node-list-devices3" default-file="app.js"}}

- In this example, instead of declaring `function run()` we declare `async function run()`. 
- This looks more like a regular function call without all of that `then()` stuff, but there's an `await` statement in it: `const devices = await particle.ListDevices()`.
- The `await` means the code will (effectively) stop and wait until the asynchronous operation is complete, then continue to the next line of code.
- This is often much more intuitive, especially for casual Javascript programmers.
- You can only use `await` in an `async function` which is why we had to put the code inside a function. It can't be at the top level of a .js file.
- Most of the remaining examples will use async/await.


### Custom list devices

Of course if all you wanted to do was list devices you could just use the `particle list` CLI command. By doing it from Javascript we can do additional processing.

{{> project-browser project="node-list-devices4" default-file="app.js"}}

For example, we could check the online flag to only list devices that are online (though that's also available in the CLI).

```
for(const dev of devices.body) {
    if (dev.online) {
        console.log('name=' + dev.name + ' id=' + dev.id);
    }
}
```

#### Print devices that have not been heard from since a date

This example uses the `last_heard` of the device object to list devices that we have not heard from since a specific date.

{{> project-browser project="node-list-devices5" default-file="app.js"}}

The code uses `Date.parse()` which parses a date in various formats (including the ISO 8601 format used by the cloud) and return the time in milliseconds since January 1, 1970 UTC. This is sort of like Unix time, but Unix time is in seconds, not milliseconds.


#### Print csv of cellular devices

This example generates csv (comma-separated value) data containing the device ID and the ICCID of the cellular devices in your account.

{{> project-browser project="node-list-devices6" default-file="app.js"}}

The code has a check for `dev.iccid`. If this field does not exist, then the body of the if won't be executed. That will cause it to not print Wi-Fi devices.

```
for(const dev of devices.body) {
    if (dev.iccid) {
        console.log(dev.id + ',' + dev.iccid);
    }
}
```

If you want to store it in a file, you can execute the command like this:

```
node app.js > devices.csv
```

The `>` redirects the output from the program to a file.


### Accessing files on your computer

Node.js programs running on your computer have access to your computer's file system directly, unlike Javascript programs running in your web browser. If you're automating operations across many devices, it's common to work with a file of device IDs one per line, performing some operation on each device sequentially. Fortunately, this is easy to do.


#### Print lines of a file

This isn't a very useful program, as your operating system can already do this (`cat` on Mac and Linux, `type` on Windows), but it shows how the file system API works.



{{> project-browser project="node-file-1" default-file="app.js"}}

Lines like these are how you import libraries into your node.js project. Sometimes you'll see `var` used instead of `const`. 

The `fs` and `path` libraries are built into node.js so you don't need to `npm install` them. `require` is used for both built-in and 3rd-party libraries. There's also `import` which won't be covered in this tutorial.

```
const fs = require('fs');
const path = require('path');
```

This construct is used to make a full pathname to a file relative to the directory our script is run from (node-file1). `path.join` joins two or more path components into a single path. It works with `..` and works with both Windows and Mac/Linux directory separators. The `__dirname` variable is built-in and is the directory the script runs from.

```
const testFilePath = path.join(__dirname, 'testfile.txt');
```

The node file system API is actually two similar APIs, an asynchronous one (with callbacks or promises) and a `Sync` API that effectively blocks during the operation. For our test took, synchronous is fine and easier to use.

This command reads the entire file into RAM and returns it. The `utf8` parameter is so the data is read as text and stored in a string variable. Otherwise it's stored as binary data in a `Buffer` object.

```
const testFile = fs.readFileSync(testFilePath, 'utf8');
```

The reason we need a string is we then split it into lines, using `split('\n')` which splits on newline characters. Then we print out each line, which isn't all that useful but is just for illustration.

```
for(let line of testFile.split('\n')) {
    console.log(line);
}
```

### Processing a list of devices

A more useful thing to do is process a file of Device IDs and act on each device in the list. In this example, we'll get the full device information which isn't all that useful, but it's just a template that you can use to put other things in that block of code. For example, you might claim devices this way, name devices, or change device groups.

Sometimes instead of encoding the name of the file to process in the script, you want to pass it as command line arguments. There are multiple command line processing options, but we'll use yargs here.

{{> project-browser project="node-file-2" default-file="app.js"}}

The yargs library is already added to this project's `package.json` file but to add it to a new project you'd just:

```
npm install yargs
```

If you've downloaded the project and want to run it, you'll still need to install the pre-configured libraries:

```
npm install
```

To run it:

```
node app.js deviceIds.txt
```

This require line is a little different because the yargs library supports multiple APIs. We're only interested in the `argv` API, so we get only that one API this way:

```
const argv = require('yargs').argv
```

We'll store all of the Device IDs in an array in this example. This is how you declare an empty array.

```
let deviceIds = [];
```

You must pass one or more filenames on the command. This is a little error checking. The `argv._.length` syntax is weird, but argv defines a property named `_` so that's just how it works.

The `process.exit(1)` causes the script to exit with an exit code of 1. It's pretty common to return 0 on success and non-zero on error, but not required. And oddly you don't need to require `process` like you do `fs` and `path`.

```
if (argv._.length == 0) {
	console.log("file of device IDs is required");
	process.exit(1);
}
```

This loops through all of the files on the command line, in case there are more than 1.

```
for(const name of argv._) {
	// console.log('processing ' + name);
```

This reads the file into memory as a string like we did in the previous example, except `name` comes from the command line options.

```
const fileContents = fs.readFileSync(name, 'utf8');
```

This is a regular expression. There are countless entire books on regular expressions, but in this case what it does is pick out strings of 24 hexadecimal characters from a line of the file. This is the standard format for Device IDs.

```
const re = /([A-Fa-f0-9]{24})/;
```

Iterate over each line of the input file;

```
for(const line of fileContents.split("\n")) {
```

Match line line against the regular expression. If there is a match add it to the array. If the line does not contain a valid-looking Device ID, skip this line.

```
const m = line.match(re);
if (m) {
    deviceIds.push(m[1]);
}
```

And finally print out the results:

```
console.log('deviceIds', deviceIds);
```

The output should look like this:

```
% node app.js deviceIds.txt
deviceIds [
  'ffff612f63b2c4781c89ab05',
  'ffff0a0efca0e86e6b69de49',
  'ffff3d154257de8c99304d17',
  'ffff421a72c782534ce79a1c',
  'ffff992c347a2799c527474a',
  'ffff84245bdd01f253cc2729',
  'ffff927f5256473d4fe4d04c',
  'ffffaa8514c8fac8c7800f0a',
  'ffff228d18232080e34a488f',
  'ffff0ff88dd054aed19aaaa8'
]
```

The same techniques can be used to pick out other common things like ICCIDs, IMEIs, and serial numbers by adjusting the regular expression.

### Reading a csv file

Sometimes you'll have a comma-separated value file (csv). Resist the temptation to parse it by hand because there are good csv parsers available for node and dealing with escaped strings yourself is tedious and error-prone.

{{> project-browser project="node-file-3" default-file="app.js"}}


Some of the code should be familar from the last example. This example uses the [csv-parse](https://csv.js.org/parse/) library for node.js.

```
const csvParse = require('csv-parse/lib/sync');
```

Instead of iterating the lines of the file it's just passed off to the CSV parser library synchronous API. 

```
const fileContents = fs.readFileSync(name, 'utf8');

const records = csvParse(fileContents, {
    columns: true,
    skip_empty_lines: true
});

allRecords = allRecords.concat(records);
```	

Using this library makes it easy to handle CSV files with a column key, like this:

```
deviceId,imei
ffffccdf6d8afd8ad9a07bca68c032679497a815b4ff,89010004372529771299
ffff0ca58d28b3b1025e519ead61f49ae8cf4f229479,89010002298444647953
```

The `csvParse()` method returns an array of records, with each element being an object with the column key and the data in the CSV. This means the data is tied to the labels and not the actual column order, in case the file format changes later.


Full output:

```
% node app.js ids.csv
allRecords [
  {
    deviceId: 'ffffccdf6d8afd8ad9a07bca68c032679497a815b4ff',
    imei: '89010004372529771299'
  },
  {
    deviceId: 'ffff0ca58d28b3b1025e519ead61f49ae8cf4f229479',
    imei: '89010002298444647953'
  },
  {
    deviceId: 'ffff2a0d08f176f66433c5fcbc48c589f8c771ebf22c',
    imei: '89010006297990926908'
  },
  {
    deviceId: 'ffffbcc12364ef4a96f7caff3d5e50149a1bf0fa7fff',
    imei: '89010002431661878684'
  }
]
ffffccdf6d8afd8ad9a07bca68c032679497a815b4ff
ffff0ca58d28b3b1025e519ead61f49ae8cf4f229479
ffff2a0d08f176f66433c5fcbc48c589f8c771ebf22c
ffffbcc12364ef4a96f7caff3d5e50149a1bf0fa7fff
```


## More techniques


### Async/await


### Promise

### Callbacks


### Using the Particle API directly

### Projects with multiple files

### Delay

There is no delay-like function built into Javascript. There are two techniques that are used instead:

- `setTimer` with a callback
- `setTimer` in a promise with async/await


