// Client Side jQuery logic
// const { $ } = require("../vendor/jquery-3.0.0");
// const { getTasksById } = require('../../helpers/database');


// get tasks from database
// const loadTasks = (onlyLoadlatest = false) => {
//   $.ajax('/tasks/api', { method: 'GET' })
//     .then((data) => {

//       if (onlyLoadLatest) {
//         renderTasks()
//       }

//     }
// }

// render multiple tasks
// tasks = [ {task, category_id} ]
const renderTasks = (tasks) => {
  // initialize empty array to store rendered tasks
  const renderedTasks_movies = [];
  const renderedTasks_books = [];
  const renderedTasks_restaurants = [];
  const renderedTasks_products = [];
  // initialize taskContainers
  const $taskContainer_movies = $('#movies ul');
  const $taskContainer_books = $('#books ul');
  const $taskContainer_restaurants = $('#restaurants ul');
  const $taskContainer_products = $('#products ul');

  // wrap each task in html and add to corresponding array
  for (task of tasks) {
    // check which category container to append the task to
    switch (task.category_id) {
      case 1:
        renderedTasks_movies.unshift(createTaskElement(task.task));
        break;
      case 2:
        renderedTasks_books.unshift(createTaskElement(task.task));
        break;
      case 3:
        renderedTasks_restaurants.unshift(createTaskElement(task.task));
        break;
      default:
        renderedTasks_products.unshift(createTaskElement(task.task));
    }
  }

  $taskContainer_movies.prepend(renderedTasks_movies.join(''));
  $taskContainer_books.prepend(renderedTasks_books.join(''));
  $taskContainer_restaurants.prepend(renderedTasks_restaurants.join(''));
  $taskContainer_products.prepend(renderedTasks_products.join(''));

  console.log('$taskContainer_movies', $taskContainer_movies[0]);
}

// genereate markup for a single task
// task = task (string)
const createTaskElement = (task) => {
  const markup = `
    <li>${task}</li>
  `;
  return markup;
}

//  TEST
const data = [{
  task: 'Harry Potter',
  category_id: 1
}];

const test = renderTasks(data);
console.log(test);
