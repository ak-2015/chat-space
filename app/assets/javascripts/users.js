$(function() {

  function  appendUserToSearchResult(user){
    let html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name"> ${user.name} </p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name= "${user.name}">追加</div>
              </div>
              `;
    $('#user-search-result').append(html);
  }

  function  appendErrMsgToSearchResult(msg){
    let html = `
               <div class="chat-group-user clearfix">
                <p class="chat-group-user__name"> ${msg} </p>
               </div>`;
    $('#user-search-result').append(html);
}

  function appendUserToList(userName, userId) {
    let html = `
    <div class="chat-group-user clearfix" id="${userId}">
      <p class="chat-group-user__name">${userName}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${userId}" data-user-name="${userName}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }

  $("#user-search-field").on("keyup", function() {
    let input = $(this).val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(users) {
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUserToSearchResult(user);
        });
      } else if (input.length === 0) {
        return false;
      } else {
        appendErrMsgToSearchResult("ユーザーが見つかりません");
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    });
  });

  $(document).on('click', ".chat-group-user__btn--add", function() {
    $(this).parent().remove();
    let userName = $(this).attr("data-user-name");
    let userId = $(this).attr("data-user-id");
    appendUserToList(userName, userId);
  });
  
});