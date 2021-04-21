$(document).ready(function() {
  // render tweets
  loadTweets();

  // Characters remaining
  $("#tweet-text").on('input', function() {
    let inputLength = $(this).val().length;
    let remaining = 140 - inputLength;
    let counter = $(this).closest(".container").find(".counter");

    if (remaining < 0) {
      counter.addClass("over140");
    } else {
      counter.removeClass("over140");
    }

    $("form").find(".counter").val(remaining);
  });
  
  // $('body').click(function() {
  //   console.log("#compose-new-tweet");
  // });


  //scroll to certain position in webpage, with focus on textarea
  $("nav").find("p").click(function(event) {
    // scroll to element i want 
    if ($(window).width() < 1024) {
      window.scrollTo(0, 400);
    } else {
      window.scrollTo(0, 0);
    }
    $("textarea").focus();
    event.preventDefault();
  });



  // submit new tweets
  $(".new-tweet-form").submit(function(event) {
    event.preventDefault();
    // shows appropriate error message while hiding irrelevant ones
    if ($('#tweet-text').val().length < 1) {
      $(".empty-tweet").show();
      $(".too-much-text").hide();
    } else if ($('#tweet-text').val().length > 140) {
      $(".too-much-text").show();
      $(".empty-tweet").hide();
    } else {
      $(".too-much-text").hide();
      $(".empty-tweet").hide();
      submitFormData($(".new-tweet-form"));
      $("#tweet-text").val('');
      $(this).closest(".container").find(".counter").val(140);
    }
  });
});

