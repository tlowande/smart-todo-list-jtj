const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

const addTask = async function (task, user_id, category_id) {
  const queryString = `
  INSERT INTO tasks (input, user_id, category_id)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  const values = [task, user_id, category_id];
  console.log(values, queryString);
  try {
    const addTask = await db.query(queryString, values)
    console.log(addTask)
  } catch (err) {
    console.error('query error', err.stack)
  }
}

// addTask('watch harry potter', 1, 1)
