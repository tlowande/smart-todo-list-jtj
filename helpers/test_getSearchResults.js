const { getSearchResults } = require('./getSearchResults');
const { combineResults } = require('./combineResults');
const { getCategory } = require('./getCategory');
// const regObj = require('./regex');

const queryString = 'mean bao';
getSearchResults(queryString)
.then(res => {
  return combineResults(res);
})
.then(res => {
  console.log(getCategory(res));
})
.catch(err => {
  console.error('query error', err.stack);
});

