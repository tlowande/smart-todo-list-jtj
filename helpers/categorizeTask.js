const { categorizeByVerb } = require('./categorizationFunctions');
const { addTask } = require('./categorizationFunctions');
const { getSearchResults } = require('./categorizationFunctions');
const { combineResults } = require('./categorizationFunctions');
const { getCategory } = require('./categorizationFunctions');

userInput = 'community';
user = 2;

const categorizeTask = (task) => {
  const firstScreen = categorizeByVerb(task)
  if (firstScreen) {
    console.log('before API', firstScreen);
    // addTask(task, user_id, firstScreen);
    return
    //calls function that renders new task already categorized in user's main page
  } else {
    getSearchResults(userInput)
    .then(res => {
      return combineResults(res);
    })
    .then(res => {
      return getCategory(res);
    })
    .then(res => {
      console.log('After API:', res);
      // addTask(task, user, res);
      //calls function that renders new task already categorized in user's main page
    })
    .catch(err => {
      console.error('query error', err.stack);
    });
  }
}

categorizeTask(userInput);
