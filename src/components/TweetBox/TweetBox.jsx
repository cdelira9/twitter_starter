import * as React from "react";
import TweetInput from "./TweetInput";
import "./TweetBox.css";
import { useState } from "react";

export default function TweetBox(props) {
  const [disable, setDisable] = useState(true);
  const handleOnTweetTextChange = (event) => {
    props.setTweetText(event.target.value);
  };

  const handleOnSubmit = () => {
    var newTweet = {
      name: props.userProfile.name,
      handle: props.userProfile.handle,
      text: props.tweetText,
      comments: 0,
      retweets: 0,
      likes: 0,
      id: props.tweets.length,
    };
    props.setTweets(props.tweets.concat(newTweet));
    props.setTweetText("");
  };
  return (
    <div className="tweet-box">
      <TweetInput
        value={props.tweetText}
        handleOnChange={handleOnTweetTextChange}
      />

      <div className="tweet-box-footer">
        <TweetBoxIcons />
        <TweetCharacterCount tweet={props.tweetText} />
        <TweetSubmitButton
          handleOnSubmit={() => handleOnSubmit()}
          disable={disable}
          setDisable={setDisable}
          tweetText={props.tweetText}
          tweetlength={props.tweetText.length}
        />
      </div>
    </div>
  );
}

export function TweetBoxIcons() {
  return (
    <div className="tweet-box-icons">
      <i className="fas fa-image"></i>
      <i className="icon-gif">GIF</i>
      <i className="far fa-chart-bar"></i>
      <i className="fas fa-map-marker-alt"></i>
    </div>
  );
}

export function TweetCharacterCount(props) {
  // ADD CODE HERE
  var length = 140 - props.tweet.length;
  var className;
  if (length === 140) {
    return <span className="tweet-length"></span>;
  }

  if (length < 0) {
    className = "tweet-length red";
  } else {
    className = "tweet-length";
  }

  return <span className={className}>{length}</span>;
}

export function TweetSubmitButton(props) {
  return (
    <div className="tweet-submit">
      <i className="fas fa-plus-circle"></i>
      <button
        className="tweet-submit-button"
        onClick={props.handleOnSubmit}
        disable={props.tweetlength === 0 || props.tweetlength > 140}
      >
        Tweet
      </button>
    </div>
  );
}
