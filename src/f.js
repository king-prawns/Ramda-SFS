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

// both (&&) => takes two other functions and returns a new function that returns:
// - true if both functions return a truthy value when applied to the arguments
// - false otherwise

// either (||) => either takes two other functions and returns a new function that returns:
// - true if either function returns truthy value when applied to the arguments
// - false otherwise

var sum5 = x => x + 5;

// pipe => applies the function left-to-right
var pipe = R.pipe(sum5, double); // => (4 + 5)*2 = 18
var resPipe = pipe(4);
insertInDom(`Pipe: ${resPipe}`);

// compose => applies the function right-to-left
var compose = R.compose(sum5, double); // => (4 * 2) + 5 = 13
var resCompose = compose(4);
insertInDom(`Compose: ${resCompose}`);


// 3) Thinking in Ramda: Partial Application

// partial & partialRight

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

// curry
// Tip: I only curry functions when I find I need to use partial in more than one place.
var curriedDiff = R.curry((a, b) => a - b);
var curriedDiff3 = curriedDiff(3);
var resCurry = curriedDiff3(2);
insertInDom(`Curry: ${resCurry}`);

// flip
var flipCurriedDiff3 = R.flip(curriedDiff)(3);
var resFlipCurry = flipCurriedDiff3(2);
insertInDom(`Flip: ${resFlipCurry}`);

var sum = R.curry((a, b, c) => (a + b) - c);
// __ (placeholder)
var placeholderSum = sum(R.__, 3, 5); // (a + 3) - 5
var resPleceholderSum = placeholderSum(2); // (2 + 3) - 5 = 0
insertInDom(`Placeholder: ${resPleceholderSum}`);


/* 4) Thinking in Ramda: Declarative Programming

Imperative programming =>
is a style of programming where the programmers tell the computer what to do by telling it how to do it

Declarative programming =>
is a style of programming where the programmers tell the computer what to do by telling it what they want.

List of functions that Ramda gives us for turning our imperative code into declarative functional code:
- Arithmetic
multiply, add, inc, divide, dec
- Comparison
equals, gt, gte
- Logic
either, both, complement, isNil, defaultTo
- Conditionals
ifElse, when, unless, cond
- Constants
always, T, F
- Identity
identity
*/

// 5) Thinking in Ramda: Pointfree Style

// no pointfree
var forever21 = age => R.ifElse(R.gte(R.__, 21), R.always(21), R.inc)(age);
var resForever21 = forever21(10);
insertInDom(`No Pointfree: ${resForever21}`);

// pointfree version
const forever21pointfree = R.ifElse(R.gte(R.__, 21), R.always(21), R.inc);
var resForever21pointfree = forever21(10);
insertInDom(`Pointfree: ${resForever21pointfree}`);

/* 6) Thinking in Ramda: Immutability and Objects

- Accessing Object
prop => reads a single property from an object and returns the value
pick =>  reads multiple properties from an object and returns a new object with just those properties
has => If we just want to know if an object has a property without reading the value
path => Where prop reads a property from an object, path dives into nested objects
propOr && pathOr => are similar to prop and path combined with defaultTo
keys => returns an array containing the names of all of the own properties in an object
values => returns the values of those properties
- Adding, Updating, and Removing Properties
(Since immutability is important, we don’t want to change objects directly. Instead, we want to return new objects that have been changed in the way we want)
assoc && assocPath =>  returns a new object with the added or updated property value, leaving the original object unchanged.
dissoc && dissocPath => remove prop
omit => remove several props at once
evolve => evolve can transform multiple properties at once and at multiple levels of nesting.
- Merging Objects
merge => returns a new object containing all of the properties and values from both objects. If both objects have the same property, the value from the second argument is used.
(merge performs a shallow merge)
*/

/* 7) Thinking in Ramda: Immutability and Arrays
- Reading Array Elements
nth => equivalent of prop
slice => equivalent of pick
contains => equivalent of has
head => first element
tail => all-but-the-first element
last => last elemenent
init => all-but-the-last elemement
take => the first N element
takeLast => the last N element
- Adding, Updating, and Removing Array Elements
(the original array is never changed)
insert => insert element at index X
append => insert element at last index
prepend => insert element at first index
concat => equivalent of merge
remove => removes elements by index
without => removes elements by value
drop => removes elements from the beginning
dropLast => removes elements from the end
- Transforming Elements
adjust => equivalent of evolve (only work for a single array element)
update => "replace" an element with a new value at index X
*/

// 8) Thinking in Ramda: Lenses
// A lens combines a “getter” function and a “setter” function into a single unit
// prop & path as getter
// assoc & assocPath as setter

var person = {
  name: 'Randy',
  socialMedia: {
    github: 'randycoulman',
    twitter: '@randycoulman'
  }
};

// var nameLens = R.lens(R.prop('name'), R.assoc('name'));
var nameLens = R.lensProp('name');

// var twitterLens = R.lens(
//   R.path(['socialMedia', 'twitter']),
//   R.assocPath(['socialMedia', 'twitter'])
// );
var twitterLens = R.lensPath(['socialMedia', 'twitter']);

// view => reads the value of the lens
var viewLens = R.view(nameLens, person);
insertInDom(`View Lens: ${viewLens}`);

// set => updates the value of the lens
var setLens = R.set(twitterLens, '@randy', person);
insertInDom('Set Lens: check console');
console.log('Set Lens', setLens);

// over => applies a transformation function to the lens

var overLens = R.over(nameLens, R.toUpper, person);
insertInDom('Over Lens: check console');
console.log('Over Lens', overLens);

