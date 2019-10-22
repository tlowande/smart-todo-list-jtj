// https://codepen.io/shehab-eltawel/pen/MyxxMB?editors=0010
$(() => {

  const task = document.querySelector('.task-form');
  const submit = document.querySelector('input');
  const button = document.querySelector('button');

  // listen for button click
  button.addEventListener('click', function(event) {
    // if the input area is empty, prevent user from sending post request
    if (submit.value.length === 0) {
      event.preventDefault();
    }
    submit.focus();
    task.classList.toggle('active');

  });
  // listen for submit coming into focus
  submit.addEventListener('focus', function() {
    task.classList.add('focus');
  });
  // listen blur event (loses focus)
  submit.addEventListener('blur', function() {
    submit.value.length !== 0
      ? task.classList.add('focus')
      : task.classList.remove('focus');
  });

});

