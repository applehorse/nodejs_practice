const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

//console.log(argv);

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        //console.log(JSON.stringify(results, undefined, 2));
        console.log(results.address);
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                //console.log(JSON.stringify(results, undefined, 2));
                console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}`);
            }
        });
    }
});


// 29056a50f401dbddaade6d6e1726f2ae

// https://api.darksky.net/forecast/29056a50f401dbddaade6d6e1726f2ae/39.9396284,-75.18663959999999
// const yargs = require('yargs');

// const geocode = require('./geocode/geocode');

// const argv = yargs
//     .options({
//         la: {
//             demand: true,
//             alias: 'latitude',
//             describe: 'Latitude of the address to fetch weather',
//             string: true
//         },
//         lo: {
//             demand: true,
//             alias: 'longitude',
//             describe: 'Longitude of the address to fetch weather',
//             string: true
//         }
//     })
//     .help()
//     .alias('help', 'h')
//     .argv

// //console.log(argv);

// geocode.geocodeLatLon(argv.latitude, argv.longitude, (errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage);
//     } else {
//         console.log(JSON.stringify(results, undefined, 2));
//     }
// });
