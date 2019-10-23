$(() => {

  $('.list-group').on('drop', function (event) {
    const task = $(event.target).text();
    const category = $(event.target)
      .parent()
      .parent()
      .attr('data-category_id');

    $.ajax('/update', {
      method: 'POST',
      data: {
        input: task,
        category_id: category
      }
    })
    // .then()

  })


  const taskForm = $('.task-form');
  const submit = $('input');
  const button = $('.add-task');

  taskForm.submit((event) => {
    event.preventDefault();
    // console.log('Sending...', $('#submit-task').serialize());

    $.ajax('/tasks', {
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      data: $('#submit-task').serialize()
    })
      .then((res) => {
        // console.log('Getting back...', res);
        loadTasks(true);
      })

  })

  // listen for button click
  button.on('click', function (event) {
    // if the input area is empty, prevent user from sending post request
    if (submit.val.length === 0) {
      event.preventDefault();
    }
    submit.focus();
    taskForm.toggleClass('active');

  });
  // listen for submit coming into focus
  submit.on('focus', function () {
    taskForm.addClass('focus');
  });
  // listen blur event (loses focus)
  submit.on('blur', function () {
    submit.val.length !== 0
      ? taskForm.addClass('focus')
      : taskForm.removeClass('focus');
  });

  /* loadTasks function */
  // get tasks from database
  const loadTasks = (onlyLoadLatest = false) => {
    $.ajax('/tasks/api', { method: 'GET' })
      .then((data) => {
        // console.log('DATA', data);

        if (onlyLoadLatest) {
          renderTasks([data[data.length - 1]]);
        } else {
          renderTasks(data);
        }
      });
  };
  loadTasks();

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
      // console.log('task', task);
      // check which category container to append the task to
      switch (task.category_id) {
        case 1:
          renderedTasks_movies.unshift(createTaskElement(task.input));
          break;
        case 2:
          renderedTasks_books.unshift(createTaskElement(task.input));
          break;
        case 3:
          renderedTasks_restaurants.unshift(createTaskElement(task.input));
          break;
        default:
          renderedTasks_products.unshift(createTaskElement(task.input));
      }
    }

    $taskContainer_movies.prepend(renderedTasks_movies.join(''));
    $taskContainer_books.prepend(renderedTasks_books.join(''));
    $taskContainer_restaurants.prepend(renderedTasks_restaurants.join(''));
    $taskContainer_products.prepend(renderedTasks_products.join(''));

    // console.log('$taskContainer_movies', $taskContainer_movies[0]);
  };

  // genereate markup for a single task
  // task = task (string)
  const createTaskElement = (task) => {
    const markup = `
      <li class='list-group-item'>${task}</li>
    `;
    return markup;
  };

});
