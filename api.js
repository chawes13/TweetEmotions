'use strict'
const axios = require('axios');

const API_KEY = '604b7c058187eb91da2f60b7aabc1af3';
const TRACK_SEARCH = `http://api.musixmatch.com/ws/1.1/track.search?apikey=${API_KEY}&q_lyrics=`;
const LYRICS_SEARCH = `http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=${API_KEY}&track_id=`;

const getLyrics = async (keyword) => {
  try {
    const response = await axios.get(TRACK_SEARCH+keyword);
    const tracks = response.data.message.body['track_list'];
    const randomIndex = Math.floor(Math.random()*tracks.length);
    const randomTrackId = tracks[randomIndex].track['track_id'];

    const lyricsResponse = await axios.get(LYRICS_SEARCH+randomTrackId);
    let lyrics = lyricsResponse.data.message.body.lyrics['lyrics_body'];
    let stopIndex = lyrics.indexOf('...');

    if (stopIndex > 75) stopIndex = 75;
    lyrics = lyrics.substring(0, stopIndex).replace('\n', ' ');

    console.log(lyrics);
    return lyrics;
  } catch (error) {
    console.error(error);
  }
};

getLyrics('angry');
