$( document ).ready(function () {
  const $userIcon = $('#user-icon');
  const $logout = $('#logout');

  $logout.on('click', e => {
    e.target.parentNode.submit();
  })

  if ($userIcon.data('id')) {
    $userIcon.css('display','flex');
    console.log('this is id', id);
  } else {
    $userIcon.css('display','none');
  }

  $(target).click()

});

