import R from 'ramda';
import { insertInDom } from './helpers';

// https://hughfdjackson.com/javascript/why-curry-helps/

var add = R.curry((a, b) => a + b);
var add100 = add(100);
var res101 = add100(1); // => 101
insertInDom(res101);

var sum3 = R.curry((a, b, c) => a + b + c);
var res6 = sum3(1)(2)(3); // => 6
sum3(1)(2, 3); // => 6
sum3(1, 2)(3); // => 6
insertInDom(res6);

var objects = [{ id: 10 }, { id: 21 }, { id: 33 }];

// v1
var IDsV1 = objects.map(R.prop('id'));
insertInDom(IDsV1);

// v2
var getIds = R.map(R.prop('id'));
var IDsV2 = getIds(objects);
insertInDom(IDsV2);

var fromServer = {
  user: 'hughfdjackson',
  posts: [
    { title: 'why curry?', contents: '...' },
    { title: 'prototypes: the short(est possible) story', contents: '...' }
  ]
};

// fetchFromServer()
//   .then(JSON.parse)
//   .then(R.prop('posts'))
//   .then(R.map(R.prop('title')));
