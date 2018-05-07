'use strict'
const axios = require('axios');
const API_KEY = '604b7c058187eb91da2f60b7aabc1af3';
const TRACK_SEARCH = `http://api.musixmatch.com/ws/1.1/track.search?apikey=${API_KEY}&q_lyrics=`;
const LYRICS_SEARCH = `http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=${API_KEY}&track_id=`;
const getLyrics = (keyword) => {
  let tracks;
  let randomIndex;
  let randomTrackId;
  let lyrics;
  let stopIndex;
  return axios.get(TRACK_SEARCH+keyword)
    .then(response => {
      tracks = response.data.message.body['track_list'];
      randomIndex = Math.floor(Math.random()*tracks.length);
      randomTrackId = tracks[randomIndex].track['track_id'];
      return randomTrackId;
    })
    .then(trackId => {
      return axios.get(LYRICS_SEARCH+trackId);
    })
    .then(lyricsResponse => {
      lyrics = lyricsResponse.data.message.body.lyrics['lyrics_body'];
      stopIndex = lyrics.indexOf('...');
      if (stopIndex > 75) stopIndex = 75;
      lyrics = lyrics.substring(0, stopIndex).replace('\n', ' ');
      console.log(lyrics);
      return lyrics;
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports = getLyrics;
