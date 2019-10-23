const express = require('express');
const router = express.Router();
const { getTaskById, getUserById } = require('../helpers/database');
const { categorizeTask } = require('../helpers/categorization');
// const { loadTasks } = require('../public/scripts/loadTasks');

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
    res.render('../views/tasks', templateVars);
  })

  router.post('/', async (req, res) => {
    const input = {
      task: req.body.task,
      user_id: req.session.user_id
    }
    //STRETCH check duplicate task
    const newTask = await categorizeTask(input);
    res.json(newTask);
  })

  // get tasks from database in json format
  router.get('/api', async (req, res) => {
    const tasks = await getTaskById(req.session.user_id);
    res.json(tasks);
  })

  return router;
}
