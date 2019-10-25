$( document ).ready(function () {
  const $userIcon = $('#user-icon');
  const $logout = $('#logout');
  const $edit = $('#edit');

  $logout.on('click', e => {
    e.target.parentNode.submit();

  });

  if ($userIcon.data('id')) {
    $userIcon.css('display','flex');
  } else {
    $userIcon.css('display','none');
  }

});

