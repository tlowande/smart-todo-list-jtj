/**
 * returns string with all results of API call
 * @param {Array} objects of top 10 google search
 * @return {string} to use in next function
 */
const combineResults = (arr) => {
  let str = '';
  for (let obj of arr) {
    str += str.concat(' ', obj.title.concat(' ', obj.snippet));
  }
  return str.toLowerCase();
}

module.exports = { combineResults };
