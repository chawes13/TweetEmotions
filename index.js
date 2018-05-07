const tessel = require('tessel');
const ambientlib = require('ambient-attx4');

const ambient = ambientlib.use(tessel.port.A);
const lowThreshold = 0.03;
const highThreshold = 0.05;

ambient.on('ready', function () {

 // Get points of sound data.
  setInterval( function () {

    ambient.getSoundLevel( function(err, sounddata) {
      if (err) throw err;


      // if sound is higher than low Threshold
      if (sounddata > lowThreshold && sounddata < highThreshold){

        console.log('low Tweet', sounddata);

      }if (sounddata > highThreshold){

        console.log('loud Tweet', sounddata);

      }
    } );

  }, 500); // The readings will happen every .5 seconds
});

ambient.on('error', function (err) {
  console.log(err);
});
