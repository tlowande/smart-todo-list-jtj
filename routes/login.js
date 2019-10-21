const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const { getUserByEmail } = require('../helpers/database');

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

module.exports = () => {
  // load login/register page
  router.get('/', (req, res) => {
    res.render('../views/login-test');
  });

  // logging in
  router.post('/', (req, res) => {
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
            req.session = { user_id: user.id };
            res.redirect('../views/tasks-test');

          }
        }
      });

  });

return router;
}
