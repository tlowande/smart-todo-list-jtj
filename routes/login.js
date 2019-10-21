const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUserByEmail } = require('../helpers/database');

// load login/register page
module.exports = () => {
  router.get('/', (req, res) => {
    res.render('../views/login-test');
  });

  return router;
}

// logging in
router.post('/', (req, res) => {
  // query the database for the email input by user
  const user = getUserByEmail(req.body.email);

  // check if email is in database
  if (user) {
    if (!bcrypt.compareSync(req.body.password, user.password)) {

    }

  } else {
    res.redirect('../views/login-test');
    // need to figure out how to redirect but show the registration form
  }
})
