var btn_exit = $('.exit-notification')
var notification = $('.notification')
btn_exit.on('click', function(event) {
  notification.slideUp(200, function(){
    notification.remove()
  })
})