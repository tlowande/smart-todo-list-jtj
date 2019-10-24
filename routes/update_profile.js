const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUserById } = require('../helpers/database');

// Updates user input on the database
module.exports = (db) => {
  router.post('/', async (req, res) => {


    const user = await getUserById(req.session.user_id)

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      res.json({ error: 'Password does not match' });
    } else {
      let queryParams = [req.body.name, req.body.email];
      let queryString = `UPDATE users
          SET name = $1, email = $2`

      if (req.body.new_password) {
        queryParams.push(req.body.new_password);
        queryString += ` , password = $${queryParams.length}`
      }

      queryParams.push(req.session.user_id)
      queryString += ` WHERE id = $${queryParams.length}
          RETURNING *;`

      try {
        await db.query(queryString, queryParams);
        res.redirect('/tasks')
      } catch (err) {
        console.error('query error', err.stack);
      }
    }
  })
  return router;
}
