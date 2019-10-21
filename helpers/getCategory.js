const movieTags = ['film', 'directed', 'imdb', 'starring', 'television', 'netflix', 'series'];
const bookTags = ['published', 'novel', 'author', 'non-fiction', 'book', 'paperback', 'novels'];
const foodTags = ['menu', 'yelp', 'foodora', 'restaurant'];

/**
 * returns regex as an object
 * @param {Array} keywords for each specific category
 * @return {Regex} Object what the function returns
 */
function buildRegex(tags) {
  return new RegExp("\\b(" + tags.join('|') + ")\\b", "ig")
}

const movieRegex = buildRegex(movieTags);
const bookRegex = buildRegex(bookTags);
const foodRegex = buildRegex(foodTags);

const regexObj = {
  1: movieRegex,
  2: bookRegex,
  3: foodRegex
};

/**
 * Returns category id
 * @param {string} final results from api results to compare against specific keywords
 * @return {category_id} what the function returns
 */
const getCategory = function(string) {
  let arr = [];
  result = null;

  for (const regex in regexObj) {
    if (string.match(regexObj[regex]) && string.match(regexObj[regex]).length > arr.length) {
     arr = string.match(regexObj[regex]);
     result = Number(regex);
    }
  }
  if (!result) {
    result = 4;
  }
  return result;
}

module.exports = { getCategory };
