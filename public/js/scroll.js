$(window).scroll(function() { 
  var scroll = $(window).scrollTop();

  if (scroll > 200) {
      $('.navbar').css('background-color','rgba(56, 56, 56)');
  } else {
      $('.navbar').css('background-color','transparent');
  }
});