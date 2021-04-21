/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// create new tweet with proper html tags
const createTweetElement = (tweetData) => {
  /* Your code for creating the tweet element */
  const name = tweetData["user"]["name"];
  const avatar = tweetData["user"]["avatars"];
  const handle = tweetData["user"]["handle"];
  const text = tweetData["content"]["text"];
  const createDate = timeago.format(tweetData["created_at"]);

  const $tweet = `<section class="existing-tweets">
    <header>
      <div class="header-footer">
        <div class="name-icon">
          <img src="${avatar}" alt="Avatar Here">
          <p>${name}</p>
        </div>
        <p class="name-handle">${handle}</p>
      </div>
      <div class="real-tweet">
        <p>${escape(text)}</p>
      </div>
      <div class="header-footer footer-additional">
        <span class="need_to_be_rendered" datetime="${createDate}">${createDate}</span>
        <div class="social-icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </div>
    </header>
  </section>`;

  return $tweet;

};

//load and render existing database of tweets
const renderTweets = function(tweets) {
  for (tweetData of tweets) {
    $('#tweets-container').append(createTweetElement(tweetData));
  }
};

const loadTweets = () => {
  $.get('/tweets', renderTweets);
};


// Load and render latest tweet
const loadLastTweet = () => {
  $.get('/tweets', (tweets) => renderTweets([tweets[tweets.length - 1]]));
};

//post to backend
const submitFormData = (form) => {
  let serializedForm = form.serialize();
  $.post('/tweets', serializedForm, loadLastTweet);
};

// convert to plain string to avoid XSS
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


