const express = require('express');
const router = express.Router();
const { getTaskById, getUserById } = require('../helpers/database');
const { categorizeTask } = require('../helpers/categorization');

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

  router.post('/', async (req, res) => {
    const input = {
      task: req.body.task,
      user_id: req.session.user_id

    }
    //check duplicate task and verify  why postman is not returning anything
    const newTask = await categorizeTask(input);
     return newTask;
  })
  return router;
}
