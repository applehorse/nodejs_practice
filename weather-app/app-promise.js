const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }

    })
    .help()
    .alias('help', 'h')
    .argv

var encodedAddress = encodeURIComponent(argv.address);

var geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }
    //console.log(response.data.results[0].geometry);
    const key = '29056a50f401dbddaade6d6e1726f2ae';
    var lat = response.data.results[0].geometry.location.lat;
    var lon = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/${key}/${lat},${lon}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}, it feels like ${apparentTemperature}`);
})
    .catch((e) => {
        if (e.code === 'ENOTFOUND') {
            console.log('Can\'t connect to API servers.')
        } else {
            console.log(e.message);
        }

    });
