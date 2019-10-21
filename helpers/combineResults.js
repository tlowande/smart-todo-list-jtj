const combineResults = (arr) => {
  let str = '';
  for (let obj of arr) {
    str += str.concat(' ', obj.title.concat(' ', obj.snippet));
  }
  return str.toLowerCase();
}

module.exports = { combineResults };
