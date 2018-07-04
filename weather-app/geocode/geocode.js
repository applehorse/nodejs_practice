const request = require('request');

const geocodeAddress = (add, callback) => {
    const addURI = encodeURIComponent(add);

    request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${addURI}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google servers.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address.');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
                //console.log(JSON.stringify(error, undefined, 2));
                //console.log(`Address: ${body.results[0].formatted_address}`);
                //console.log(`lat: ${body.results[0].geometry.location.lat}, lng: ${body.results[0].geometry.location.lng}`);
            });
        }

    });
};

const geocodeLatLon = (lat, lon, callback) => {
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
                Temperature: body.currently.temperature,
                ApparentTemperature: body.currently.apparentTemperature
            });
        }

    });
};

module.exports = { geocodeAddress, geocodeLatLon };