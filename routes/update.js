const express = require('express');
const router = express.Router();

// Updates an existing task's category based on user input
// (e.g. dragging task to a different category)
module.exports = (db) => {
  router.post('/', async (req, res) => {
    // get new task category and pass to tasks table in database
    const { input, category_id } = req.body;
    const user_id = req.session.user_id;

    const queryParams = [ category_id, user_id, input ];
    const queryString = `
      UPDATE tasks
      SET category_id = $1
      WHERE user_id = $2 AND input = $3
      RETURNING *;
    `;
    try {
      const res = await db.query(queryString, queryParams);
      // return res.rows[0];
    } catch (err) {
      console.error('query error', err.stack);
    }
  })
  return router;
}

