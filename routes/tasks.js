const express = require('express');
const router = express.Router();

module.exports = () => {
  // load tasks page
  router.get('/', (req, res) => {
    let templateVars = {
      //

    }
    res.render('../views/tasks-test');
  })



}
