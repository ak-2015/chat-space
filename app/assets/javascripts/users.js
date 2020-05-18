$(function() {
  $("#user-search-field").on("keyup", function() {
    let input = $(this).val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(users) {
    })
    .fail(function() {
    });
  });
});