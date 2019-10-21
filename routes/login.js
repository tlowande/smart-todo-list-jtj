const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUserByEmail } = require('../helpers/database');

module.exports = () => {
  // load login/register page
  router.get('/', (req, res) => {
    // check if user is logged in
    if (req.session.user_id) {
      res.redirect('/tasks');

    } else {
      res.render('../views/login-test');

    }
  });

  // logging in
  router.post('/', async (req, res) => {
    // const user = await getUserByEmail(req.body.email);
    // console.log(user);

    // query the database for the email input by user
    getUserByEmail(req.body.email)
      .then(user => {
        if (!user) {
          res.json({error: 'User does not exist'});

        } else {
          // check password
          if (!bcrypt.compareSync(req.body.password, user.password)) {
            res.json({error: 'Password does not match'});

          } else {
            console.log('LOGIN SUCCESS');
            req.session = { user_id: user.id };
            console.log(req.session);
            res.redirect('/tasks');

          }
        }
      });

  });

  // login after register

return router;
}
