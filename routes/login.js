// routing for logging in
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {

    res.render('../views/login');
  });

  return router;
}
