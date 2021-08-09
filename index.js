/* eslint-disable no-unused-vars */
console.log("hello there!");

// YouTube API stuff
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Init empty array of iframe IDs, one from each video
const iframeIds = [];

// For each iframe you find, add its ID to the iframeIds array
const iframes = document.querySelectorAll(".video-item iframe");
iframes.forEach((iframe) => {
  iframeIds.push(iframe.id);
});
console.log(iframeIds);
// Once the YouTube API is ready, for each iframeId in your array, create
// a new YT player and give it the onReady event
function onYouTubeIframeAPIReady() {
  iframeIds.forEach((iframeId) => {
    // youtube iframe api script will get this
    // eslint-disable-next-line no-undef
    const player = new YT.Player(iframeId, {
      events: {
        // youtube iframe api script will get this
        // eslint-disable-next-line no-use-before-define
        onReady: onPlayerReady,
      },
    });
  });
  console.log("onYTiframeAPIrdy fired");
}
function testFunc() {
  console.log("test");
}
testFunc();
// Init empty array of iframe YT objects for use elsewhere
// Here I only use this to iterate through and pause all videos when
// another begins playing
const iframeObjects = [];

// Shared onReady event which adds events to each video's corresponding
// play and stop buttons
function onPlayerReady(event) {
  const iframeObject = event.target;
  const iframeElement = iframeObject.h;
  console.log(iframeObject);
  const videoContainer = iframeElement.parentElement;
  const play = videoContainer.querySelector(".play");
  const stop = videoContainer.querySelector(".stop");
  console.log("onPlayerReady function has fired");

  // Push current iframe object to array
  iframeObjects.push(iframeObject);

  play.addEventListener("click", () => {
    // Pause all videos currently playing
    iframeObjects.forEach((scopediframeObject) => {
      scopediframeObject.pauseVideo();
      const scopediframeElement = scopediframeObject.h;
      scopediframeElement.classList.remove("isPlaying");
    });

    // Play selected video
    iframeObject.playVideo();
    iframeElement.classList.add("isPlaying");
  });

  stop.addEventListener("click", () => {
    iframeObject.pauseVideo();
    iframeElement.classList.remove("isPlaying");
  });

  iframeObjects.forEach((scopediframeObject) => {
    scopediframeObject.addEventListener("onStateChange", (stateChangeEvent) => {
      //   console.log('state chagned');
      //   console.log(event);
      //   YT iframe events https://developers.google.com/youtube/iframe_api_reference#Events
      // -1 (unstarted)
      // 0 (ended)
      // 1 (playing)
      // 2 (paused)
      // 3 (buffering)
      // 5 (video cued).

      if (stateChangeEvent.data === 1) {
        console.log("playing");
      }
      if (stateChangeEvent.data === 2) {
        console.log("paused");
      }
      if (stateChangeEvent.data === 0) {
        console.log("ended");
      }
    });
  });
}
