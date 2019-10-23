// genereate markup from database
// task = { task, category_id }
const createTaskElement = (task) => {
  const categoryDict = {
    1: 'film_series',
    2: 'books',
    3: 'restaurants',
    4: 'products'
  };

  const $task = $('<ol>').addClass('task');

  const markup = `
    <li>${task.task}</li>
  `;
  return $task.append(markup);

}


