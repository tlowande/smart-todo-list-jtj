// helper functions where the database is involved
const { db } = require('../db/index');
const bcrypt = require('bcrypt');

// addTask inserts a newly added task to the database with its category
const addTask = async function (obj) {
  const { task, user_id, category_id } = obj;

  // check if task already exists for that user
  const tasks = await getTaskById(user_id);
  for (t of tasks) {
    if (t.input === task) {
      console.log('DUPLICATE TASK', t.input);
      return;
    }
  }

  console.log('INSERTING TO DATABASE', task);
  const queryString = `
  INSERT INTO tasks (input, user_id, category_id)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  const values = [task, user_id, category_id];

  try {
    const res = await db.query(queryString, values);
    return res.rows[0];

  } catch (err) {
    console.error('query error', err.stack);

  }
}

const getUserByEmail = async (email) => {
  const queryString = `
    SELECT *
    FROM users
    WHERE email = $1
  `;
  const queryParams = [email];

  try {
    const res = await db.query(queryString, queryParams);
    return res.rows[0] || null;

  } catch (err) {
    console.error('query error', err.stack);
  }

}

const getUserById = async (id) => {
  const queryString = `
    SELECT *
    FROM users
    WHERE id = $1
  `;
  const queryParams = [id];

  try {
    const res = await db.query(queryString, queryParams);
    return res.rows[0];

  } catch (err) {
    console.error('query error', err.stack);
  }
}

const getTaskById = async (id) => {
  const queryString = `
    SELECT user_id, input, category_id
    FROM tasks
    WHERE user_id = $1
  `;

  const queryParams = [id];

  try {
    const res = await db.query(queryString, queryParams);
    return res.rows;

  } catch (err) {
    console.error('query error', err.stack);

  }
}

const addUser = async (obj) => {
  const { name, email, password } = obj;

  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
`;

  const queryParams = [name, email, bcrypt.hashSync(password, 10)];

  try {
    const res = await db.query(queryString, queryParams);
    return res.rows[0];


  } catch (err) {
    console.error('query error', err.stack);

  }
}

module.exports = {
  addTask,
  getUserByEmail,
  getUserById,
  getTaskById,
  addUser
};
