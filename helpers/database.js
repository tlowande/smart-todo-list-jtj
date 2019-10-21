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

module.exports = { getUserByEmail };
