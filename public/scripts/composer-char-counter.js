$(document).ready(function() {

  let remaining = 140;

  $("#tweet-text").on('input', function() {
    let inputLength = $(this).val().length;
    remaining -= inputLength

    if(remaining < 0) {
      $(this).closest(".container").find(".counter")
      .css("color", "red");
    }

    $("form").find(".counter").val(remaining);
  })

  // rendering time ago
  timeago.render(document.querySelectorAll('.need_to_be_rendered'));



});



