import R from 'ramda';
import { insertInDom } from './helpers';

// http://fr.umio.us/favoring-curry/

// curried version
var formatNames = R.curry((first, middle, last) => `${first} ${middle} ${last}`);
formatNames('John', 'Paul', 'Jones'); // => returns 'John Paul Jones'

var jp = formatNames('John', 'Paul'); // => returns a function
var jpj = jp('Jones'); // => return 'John Paul Jones'
insertInDom(jpj);

['Jones', 'Stevens', 'Ziller'].map(jp);
// => ['John Paul Jones', 'John Paul Stevens', 'John Paul Ziller']

var james = formatNames('James'); // => returns a function
james('Byron', 'Dean'); // => 'James Byron Dean'
var je = james('Earl'); // => returns a function
je('Carter'); // => 'James Earl Carter'
var jej = je('Jones'); // => 'James Earl Jones'
insertInDom(jej);

var numbers = [1, 2, 3, 4, 5];
var add = (a, b) => a + b;
var sum = R.reduce(add, 0, numbers); //= > 15
insertInDom(sum);

var total = R.reduce(add, 0); // => function:: [Number] -> Number
var sum2 = total(numbers); //= > 15
insertInDom(sum2);

// example of Curryng
// var getIncompleteTaskSummaries = function (membername) {
//   return fetchData()
//       .then(R.get('tasks'))
//       .then(R.filter(R.propEq('username', membername)))
//       .then(R.reject(R.propEq('complete', true)))
//       .then(R.map(R.pick(['id', 'dueDate', 'title', 'priority'])))
//       .then(R.sortBy(R.get('dueDate')));
// };
