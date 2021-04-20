/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Function
const createTweetElement = (tweetData) => {
  /* Your code for creating the tweet element */
  let name = tweetData["user"]["name"];
  let avatar = tweetData["user"]["avatars"];
  let handle = tweetData["user"]["handle"];
  let text = tweetData["content"]["text"];
  let createDate = timeago.format(tweetData["created_at"]);

  let $tweet = `<section class="existing-tweets">
    <header>
      <div class="header-display">
        <div class="name-icon">
          <img src="${avatar}" alt="Avatar Here">
          <p>${name}</p>
        </div>
        <p class="name-handle">${handle}</p>
      </div>
      <div class="real-tweet">
        <p>${escape(text)}</p>
      </div>
      <div class="footer-display">
        <span class="need_to_be_rendered" datetime="${createDate}">${createDate}</span>
        <div class="social-icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </div>
    </header>
  </section>`

  return $tweet

};

//load and render existing database of tweets
const renderTweets = function(tweets) {
  for (tweetData of tweets) {
    $('#tweets-container').append(createTweetElement(tweetData));
  }
};

const loadTweets = () => {
  $.get('/tweets', renderTweets);
}

//load and render latest tweet
const renderLastTweet = function(tweets) {
  let lastTweet = tweets[tweets.length -1];
  $('#tweets-container').append(createTweetElement(lastTweet));
};

const loadLastTweet = () => {
  $.get('/tweets', renderLastTweet);
}

const submitFormData = (form) => {
  let serializedForm = form.serialize();
  $.post('/tweets', serializedForm, loadLastTweet) 
};

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


