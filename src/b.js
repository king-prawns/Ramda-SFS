import R from 'ramda';
import { insertInDom, trace } from './helpers';

// http://fr.umio.us/why-ramda/

const tasks = [
  {
    username: 'Scott',
    title: 'Add `mapObj`',
    dueDate: '2014-06-09',
    complete: false,
    effort: 'low',
    priority: 'medium'
  }, {
    username: 'Michael',
    title: 'Finish algebraic types',
    dueDate: '2014-06-15',
    complete: false,
    effort: 'high',
    priority: 'low'
  },
  {
    username: 'Paul',
    title: 'Add sort function',
    dueDate: '2014-06-18',
    complete: false,
    effort: 'low',
    priority: 'medium'
  }, {
    username: 'Michael',
    title: 'Write documentation',
    dueDate: '2014-06-25',
    complete: true,
    effort: 'low',
    priority: 'high'
  },
  {
    username: 'Scott',
    title: 'Code review',
    dueDate: '2014-06-30',
    complete: true,
    effort: 'low',
    priority: 'low'
  }, {
    username: 'Paul',
    title: 'Add filter function',
    dueDate: '2014-07-15',
    complete: false,
    effort: 'high',
    priority: 'medium'
  },
  {
    username: 'Paul',
    title: 'Add map function',
    dueDate: '2014-07-01',
    complete: true,
    effort: 'low',
    priority: 'medium'
  }, {
    username: 'Michael',
    title: 'Add css styles',
    dueDate: '2014-08-10',
    complete: false,
    effort: 'medium',
    priority: 'high'
  }
];

var incomplete = R.filter(R.whereEq({ complete: false }));
var sortByDate = R.sortBy(R.prop('dueDate'));
var sortByDateDescend = R.compose(R.reverse, sortByDate);
var groupByUser = R.groupBy(R.prop('username'));
var activeByUser = R.compose(groupByUser, incomplete);
var importantFields = R.project(['title', 'dueDate']);
var gloss = R.compose(importantFields, R.take(5), sortByDateDescend);
var topDataAllUsers = R.compose(R.map(gloss), activeByUser);
var result = topDataAllUsers(tasks);
insertInDom('console.log #1 done.');
console.log(result);

var byUser = n => R.filter(R.whereEq({ username: n }));
var bySpecificUser = byUser('Scott');
var topData = R.compose(gloss, incomplete);
var resultsV2 = topData(bySpecificUser(tasks));
insertInDom('console.log #2 done.');
console.log(resultsV2);

var incompleteTasks = R.filter(R.whereEq({ complete: false }), tasks);
insertInDom('console.log #3 done.');
console.log(incompleteTasks);
