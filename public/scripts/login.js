$( document ).ready(function () {
  $('.btn-login').click(function() {
    $('#register').slideUp();
    $('#login').toggle('slow');
  });

  $('.btn-register').click(function() {
    $('#login').slideUp();
    $('#register').toggle('slow');
  });

});
