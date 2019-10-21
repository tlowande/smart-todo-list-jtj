// helper functions where the database is involved
const { db } = require('../db/index');

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

  } catch(err) {
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

  } catch(err) {
    console.error('query error', err.stack);
  }
}

const getTaskById = async (id) => {
  const queryString = `
    SELECT input, category_id
    FROM tasks
    WHERE user_id = $1
  `;
  const queryParams = [id];

  try {
    const res = await db.query(queryString, queryParams);
    return res.rows;

  } catch(err) {
    console.error('query error', err.stack);
  }
}

module.exports = {
  getUserByEmail,
  getUserById,
  getTaskById
 };
