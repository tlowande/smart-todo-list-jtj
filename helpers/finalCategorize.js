const categorizeByVerb = require('./categorizeByVerb');
const addTaskToDb = require('./addTask');
const getSearchResults = require('./getSearchResults');
const x = require('./x');

const sortCategory = (task) => {
  const firstResult = categorizeByVerb(task)
  if (firstResult) {
    addTaskToDb(firstResult)
    return
  }
  const apiResults = getSearchResults(task)
  const

}
