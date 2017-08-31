import R from 'ramda';
import { insertInDom } from './helpers';

// http://randycoulman.com/blog/categories/thinking-in-ramda/

// 1) Thinking in Ramda: Getting Started

// Pure function => Pure functions are functions that have no side-effects.
// The basic idea is that, if you call a function with the same inputs
// over and over again, you always get the same result.

// Immutability => When I’m working in an immutable fashion, once I initialize a value or an object I never change it again

var myArray = [1, 2, 3, 4];

R.forEach(value => console.log(value), myArray);

var double = x => x * 2;

var mapped = R.map(double, myArray);
insertInDom(`Map: ${mapped}`);

var isEven = x => x % 2 === 0;

var filtered = R.filter(isEven, myArray);
insertInDom(`Filter: ${filtered}`);

var rejected = R.reject(isEven, myArray);
insertInDom(`Reject: ${rejected}`);

var founded = R.find(isEven, myArray);
insertInDom(`Find: ${founded}`);

var add = (accum, value) => accum + value;

var reduced = R.reduce(add, 5, myArray);
insertInDom(`Reduce: ${reduced}`);


// 2) Thinking in Ramda: Combining Function

var complementFind = R.find(R.complement(isEven), myArray);
// var isOdd = R.complement(isEvent);
insertInDom(`Complement: ${complementFind}`);

// R.both (&&) => takes two other functions and returns a new function that returns:
// - true if both functions return a truthy value when applied to the arguments
// - false otherwise

// R.either (||) => either takes two other functions and returns a new function that returns:
// - true if either function returns truthy value when applied to the arguments
// - false otherwise

var sum5 = x => x + 5;

// R.pipe => applies the function left-to-right
var pipe = R.pipe(sum5, double); // => (4 + 5)*2 = 18
var resPipe = pipe(4);
insertInDom(`Pipe: ${resPipe}`);

// R.compose => applies the function right-to-left
var compose = R.compose(sum5, double); // => (4 * 2) + 5 = 13
var resCompose = compose(4);
insertInDom(`Compose: ${resCompose}`);


// 3) Thinking in Ramda: Partial Application

// R.partial & R.partialRight

// Full function version:
// function publishedInYear(year) {
//   return function(book) {
//     return book.year === year
//   }
// }

// Arrow function version:
var diff = (a, b) => a - b;

var diffFrom3 = R.partial(diff, [3]);
var resDiffFrom3 = diffFrom3(2); // 3 - 2
insertInDom(`Partial: ${resDiffFrom3}`);

var diff3 = R.partialRight(diff, [3]);
var resDiff3 = diff3(2); // 2 - 3
insertInDom(`PartialRight: ${resDiff3}`);

// R.curry
// Tip: I only curry functions when I find I need to use partial in more than one place.
var curriedDiff = R.curry((a, b) => a - b);
var curriedDiff3 = curriedDiff(3);
var resCurry = curriedDiff3(2);
insertInDom(`Curry: ${resCurry}`);

// R.flip
var flipCurriedDiff3 = R.flip(curriedDiff)(3);
var resFlipCurry = flipCurriedDiff3(2);
insertInDom(`Flip: ${resFlipCurry}`);

var sum = R.curry((a, b, c) => (a + b) - c);
// R.__ (placeholder)
var placeholderSum = sum(R.__, 3, 5); // (a + 3) - 5
var resPleceholderSum = placeholderSum(2); // (2 + 3) - 5 = 0
insertInDom(`Placeholder: ${resPleceholderSum}`);


// 4) Thinking in Ramda: Declarative Programming

// imperative programming =>
// is a style of programming where the programmers tell the computer what to do by telling it how to do it

// Declarative programming =>
// is a style of programming where the programmers tell the computer what to do by telling it what they want.

// List of functions that Ramda gives us for turning our imperative code into declarative functional code:
// - Arithmetic
// R.multiply, R.add, R.inc, R.divide, R.dec
// - Comparison
// R.equals, R.gt, R.gte
// - Logic
// R.either, R.both, R.complement, R.isNil, R.defaultTo
// - Conditionals
// R.ifElse, R.when, R.unless, R.cond
// - Constants
// R.always, R.T, R.F
// - Identity
// R.identity


// 5) Thinking in Ramda: Pointfree Style

// no pointfree
var forever21 = age => R.ifElse(R.gte(R.__, 21), R.always(21), R.inc)(age);
var resForever21 = forever21(10);
insertInDom(`No Pointfree: ${resForever21}`);

// pointfree version
const forever21pointfree = R.ifElse(R.gte(R.__, 21), R.always(21), R.inc);
var resForever21pointfree = forever21(10);
insertInDom(`Pointfree: ${resForever21pointfree}`);

// 6) Thinking in Ramda: Immutability and Objects
