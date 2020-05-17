$(function(){
  function buildHTML(message) {
    if (message.content && message.image) {
      var html = `<div class="message-items">` +
        `<div class="message-items__title">` +
        `<div class="member">` +
        message.member +
        `</div>` +
        `<div class="timestamp">` +
        message.timestamp +
        `</div>` +
        `</div>` +
        `<div class="message-items__message">` +
        `<p class="content">` +
        message.content +
        `</p>` +
        `<img src="` + message.image + `" class="image" >` +
        `</div>` +
        `</div>`
    } else if (message.content) {
      var html = `<div class="message-items">` +
        `<div class="message-items__title">` +
        `<div class="member">` +
        message.member +
        `</div>` +
        `<div class="timestamp">` +
        message.timestamp +
        `</div>` +
        `</div>` +
        `<div class="message-items__message">` +
        `<p class="content">` +
        message.content +
        `</p>` +
        `</div>` +
        `</div>`
    } else if (message.image) {
      var html = `<div class="message-items">` +
        `<div class="message-items__title">` +
        `<div class="member">` +
        message.member +
        `</div>` +
        `<div class="timestamp">` +
        message.timestamp +
        `</div>` +
        `</div>` +
        `<div class="message-items__message">` +
        `<img src="` + message.image + `" class="image" >` +
        `</div>` +
        `</div>`
    };
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var url = $(this).attr('action');
    var type = $(this).attr('method');
    var formData = new FormData(this);
    $.ajax({
      url: url,
      type: type,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main').find('.main').append(html);
      $('.chat-main').find('.main').animate({ scrollTop: $('.chat-main').find('.main')[0].scrollHeight});
      $('form')[0].reset();
    })
  })
})