$(() => {

  const input = document.querySelector('.task-form');
  const submit = document.querySelector('input');
  const button = document.querySelector('button');

  button.addEventListener('click', function(event) {
    if (submit.value.length === 0) {
      event.preventDefault();
    }
    input.classList.toggle('active');
  })

  submit.addEventListener('focus', function() {
    input.classList.add('focus');
  })

  submit.addEventListener('blur', function() {
    submit.value.length != 0 ? input.classList.add('focus') : input.classList.remove('focus');
  })

});
