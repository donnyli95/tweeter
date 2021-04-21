$(document).ready(function() {
  // render tweets
  loadTweets();

  // Characters remaining
  $("#tweet-text").on('input', function() {
    let inputLength = $(this).val().length;
    let remaining = 140 - inputLength;
    let counter = $(this).closest(".container").find(".counter")

    if(remaining < 0) {
      counter
      .addClass("over140")
    } else {
      counter
      .removeClass("over140")
    }

    $("form").find(".counter").val(remaining);
  })


  // submit new tweets
  $(".new-tweet-form").submit(function(event) {
    event.preventDefault();

    if ($('#tweet-text').val().length < 1) {
      $(".empty-tweet").toggle();
    } else if ($('#tweet-text').val().length > 140 ) {
      $(".too-much-text").toggle();
    } else {
      $(".too-much-text").hide();
      $(".empty-tweet").hide();
      submitFormData($(".new-tweet-form"));
      $("#tweet-text").val('');
    }
  });
});

