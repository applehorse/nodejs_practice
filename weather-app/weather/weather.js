const request = require('request');

// var getWeather = () => {
//     //https://api.darksky.net/forecast/29056a50f401dbddaade6d6e1726f2ae/39.9396284,-75.18663959999999
//     request({
//         url: `https://api.darksky.net/forecast/29056a50f401dbddaade6d6e1726f2ae/39.9396284,-75.18663959999999`,
//         json: true
//     }, (error, response, body) => {
//         if (error) {
//             console.log('Unable to connect to Forecast servers.');
//         } else if (response.statusCode === 400) {
//             console.log('Unable to fetch the weather.');
//         } else if (response.statusCode === 200) {
//             console.log(body.currently.temperature);
//         }

//     });
// };

var getWeather = (lat, lon, callback) => {
    //const addURI = encodeURIComponent(lat);
    const key = '29056a50f401dbddaade6d6e1726f2ae';

    //https://api.darksky.net/forecast/29056a50f401dbddaade6d6e1726f2ae/39.9396284,-75.18663959999999
    request({
        url: `https://api.darksky.net/forecast/${key}/${lat},${lon}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Forecast servers.');
        } else if (response.statusCode === 400) {
            callback('Unable to fetch the weather.');
        } else if (response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }

    });
};

module.exports.getWeather = getWeather;