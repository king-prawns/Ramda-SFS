import R from 'ramda';
import { insertInDom } from './helpers';

// https://www.youtube.com/watch?v=m3svKOdZijA&app=desktop

// Curried Function
// A function that will return a new function until receives all it's arguments

// +add :: Number -> Number -> Number
var add = function (x) {
  return function (y) {
    return x + y;
  };
};

var add3 = add(3); // function(y) {}

add3(4); // => 7

add3(5); // => 8

add(5)(3); // => 8

// Composition
// return the composition of a list of functions, where each function consumes
// the return value of the function that follows. In math terms, composing the
// function f(), g() and h() produces f(g(h()))

// +last :: [a] -> a
// var last = function (xs) {
//   var sx = reverse(xs);
//   return first(xs);
// };

// +last :: [a] -> a
// var last = compose(first, reverse);

// last([1], [2], [3]); // => 3

// Functors
// defining map on object, object becomes a functor
var plus1 = function (x) { return x + 1; };

plus1([3]); // => wrong!

R.map(plus1, [3]); // => 4
// in general => [plus1(3)] => Array(plus1(3)) => Array(4) => MyObject(4)

function Maybe(val) {
  if (!(this instanceof Maybe)) { return new Maybe(val); }
  this.val = val;
}

Maybe.prototype.map = function (f) {
  return this.val ? Maybe(f(this.val)) : Maybe(null);
};

R.map(plus1, Maybe(3)); // => Maybe(4)

var res = R.map(plus1, Maybe(null)); // => Maybe(null)
insertInDom('console.log #1 done.');
console.log(res);

// var Either = function (left, right) {
//   this.left = left;
//   this.right = right;
// };

// Either.prototype.map = function (f) {
//   return this.right ?
//   Either(this.left, f(this.right)) :
//   Either(f(this.left), null);
// };
