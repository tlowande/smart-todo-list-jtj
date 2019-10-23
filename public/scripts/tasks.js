// https://codepen.io/shehab-eltawel/pen/MyxxMB?editors=0010
$(() => {

  // const taskForm = document.querySelector('.task-form');
  // const submit = document.querySelector('input');
  // const button = document.querySelector('.add-task');

  const taskForm = $('.task-form');
  const submit = $('input');
  const button = $('.add-task');

  taskForm.submit((event) => {
    event.preventDefault();
    console.log('Sending...', $('#submit-task').serialize());

    $.ajax('/tasks', {
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      data: $('#submit-task').serialize()
     })
      .then((res) => {
        console.log('Getting back...', res);
      })

  })

  // listen for button click
  button.on('click', function(event) {
    // if the input area is empty, prevent user from sending post request
    if (submit.val.length === 0) {
      event.preventDefault();
    }
    submit.focus();
    taskForm.toggleClass('active');

  });
  // listen for submit coming into focus
  submit.on('focus', function() {
    taskForm.addClass('focus');
  });
  // listen blur event (loses focus)
  submit.on('blur', function() {
    submit.val.length !== 0
      ? taskForm.addClass('focus')
      : taskForm.removeClass('focus');
  });

});

