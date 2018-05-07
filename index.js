const tessel = require('tessel');
const ambientlib = require('ambient-attx4');
const twitter = require('twitter');

const getLyrics = require('./api');

const ambient = ambientlib.use(tessel.port.A);

const twitterHandle = '@tweetEmotion1';

var twit = new twitter({
  consumer_key: 'xQo1g45ETqwG0pxxN2oYhBYWh',
  consumer_secret: 'qOQ4MiPZCpk5fYsluPUo8jnd0CfoJYkGxtfOG0Ia6UiJZmuyqe',
  access_token_key: '993587886678298624-nrNGJ04eCVF0W1HfUbK1CJq4jqfZshM',
  access_token_secret: 'PEptUZEXJGgDKDhIWNW1y9brsWFGemBVwts2uKuSmgWn3'
});

// const lyrics = {
//   angry: ['Nothing else matters', 'Sleep with one eye open', 'Where I lay my head is home'],
//   happy: ['She loves me, yeah yeah yeah', 'All you need is love', 'Love me do'],
// };

const tweet = function(status){
  twit.post('statuses/update', {status: status}, function(error, tweet, response){
    if (error) {
      console.log('error sending tweet:', error);
    } else {
      console.log('Successfully tweeted! Tweet text:', tweet.text);
    }
  });
};

const randomNum = function(arr){
  return Math.floor(Math.random * arr.length);
};

const lowThreshold = 0.04;
const highThreshold = 0.09;

ambient.on('ready', function () {

 // Get points of sound data.
  setInterval( function () {

    ambient.getSoundLevel( function(err, sounddata) {
      if (err) throw err;

      // if sound is higher than low Threshold
      // Happy
      if (sounddata > lowThreshold && sounddata < highThreshold){

        console.log('low Tweet', sounddata);

        // const status = 'Hello ' + twitterHandle + '. This is a LOW EMO tweet';
        getLyrics('angry').then((lyrics) => {
          tweet(lyrics);
        });

        // const index = randomNum(lyrics.happy);
        // const status = lyrics.happy[0];
        //tweet(status);

      // Sad
      } if (sounddata > highThreshold){

        console.log('loud Tweet', sounddata);

        // const status = 'Hello ' + twitterHandle + '. This is a HIGH EMO tweet';
        getLyrics('happy').then((lyrics) => {
          tweet(lyrics);
        });

        // const index = randomNum(lyrics.angry);
        // const status = lyrics.angry[0];
        // tweet(status);

      }
    } );

  }, 500); // The readings will happen every .5 seconds
});

ambient.on('error', function (err) {
  console.log(err);
});
