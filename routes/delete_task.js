const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post('/', async (req, res) => {
    const { input } = req.body;
    const user_id = req.session.user_id;
    const queryParams = [ user_id, input ];
    console.log(queryParams)
    const queryString = `
    DELETE FROM tasks
    WHERE user_id = $1 AND input = $2
    `;
    try {
      const result = await db.query(queryString, queryParams);
      res.redirect('/tasks');

    } catch (err) {
      console.error('query error', err.stack);
    }
  })
  return router;
}
