const express = require('express');
const router = express.Router();

// Updates user input on the database
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
      const result = await db.query(queryString, queryParams);
      res.json(result.rows[0]);

    } catch (err) {
      console.error('query error', err.stack);
    }
  })
  return router;
}
