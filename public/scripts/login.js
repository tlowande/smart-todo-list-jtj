$( document ).ready(() => {
  $('.btn-login').on('click', () => {
    console.log('this');
    $('#login').slideToggle('slow');
  })
});
