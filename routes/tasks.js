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
    res.render('../views/tasks', templateVars);
  })

  router.post('/', async (req, res) => {
    const input = {
      task: req.body.task,
      user_id: req.session.user_id
    }
    //check duplicate task
    const newTask = await categorizeTask(input);
    res.send(
      'okay'
    );
    return newTask;
  })

  // get tasks from database in json format
  router.get('/api', async (req, res) => {
    const tasks = await getTaskById(req.session.user_id);
    // console.log('get tasks/api',tasks);
    res.json(tasks);

  })

  return router;
}
