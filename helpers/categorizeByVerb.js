/**
 * Get the user input and filter if there's a verb on that string by using our constructed object
 * @param {String}task The user input
 * @return {Boolean}false||{CategoryID}
 */

const categorizeByVerb = function (task ) {
  const verbs = {
    watch: { 1: 'movies' },
    read: { 2: 'books' },
    buy: { 4: 'products' },
    order: { 4: 'products' }
  };

  const key = task.toLowerCase().split(' ')
  if (key.length > 1 && verbs.hasOwnProperty(key[0])) {
    return Number(Object.keys(verbs[key[0]]))
  }
  return false
}

module.exports = { categorizeByVerb };
