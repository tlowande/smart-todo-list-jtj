// genereate markup for a single task
// obj = { task, category_id }
const createTaskElement = (task) => {
  const $taskCard = $('<ol>').addClass('task');
  const markup = `
    <li>${task.task}</li>
  `;
  const result = {
    task: $taskCard.append(markup),
    category_id: task.category_id
  };
  return result;
}

// render multiple tasks
const renderTasks = (tasks) => {
  // initialize empty array to store rendered tasks
  const renderedTasks = [];
  // check which category container to append the task to
  switch (obj.category_id) {
    case 1:
      const $taskContainer = $('#movies');
      break;
    case 2:
      const $taskContainer = $('#books');
      break;
    case 3:
      const $taskContainer = $('#restaurants');
      break;
    default:
      const $taskContainer = $('#products');
  }

  for (let task of tasks) {
    renderedTasks.shift(createTaskElement(task)[0].outerHTML);
  }
  $taskContainer.prepend(renderedTasks.join(''));
}

// get tasks from database



//  TEST
const data = {
  task: 'Harry Potter',
  category_id: 1
}
const test = createTaskElement(data);
console.log(test);
