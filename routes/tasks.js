const express = require('express');
const router = express.Router();
const {
  getTaskById,
  getUserById
 } = require('../helpers/database')

module.exports = () => {
  // load tasks page
  router.get('/', async (req, res) => {
    const user = await getUserById(req.session.user_id);
    const task = await getTaskById(req.session.user_id);
    //returns an array of objects
    let templateVars = {
      user: user,
      task: task
    }
    res.render('../views/tasks-test', templateVars);
  })
  return router;
}
