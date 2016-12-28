// shorten button event listener
$('.btn').on('click', function(event){
  
  console.log('Button was clicked and ' + $('#url-field').val() +' will be added to database!')
  // AJAX call to /api/shorten with the URL that the user entered in the input box
  $.ajax({
    url: '/api/shorten',
    type: 'POST',
    headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
    data: {url: $('#url-field').val()}
  })
  .then(function() {
      // clear input fields
      $('input[type="text"]').val('');
      // hack-y page refresh :(
      location.reload();
    });
})



