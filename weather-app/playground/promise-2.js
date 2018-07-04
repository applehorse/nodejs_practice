var request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        const addURI = encodeURIComponent(address);

        request({
            url: `http://maps.googleapis.com/maps/api/geocode/json?address=${addURI}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Google servers.');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address.');
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
    });

};

const geocodeLatLon = (lat, lon) => {
    return new Promise((resolve, reject) => {
        //const addURI = encodeURIComponent(lat);
        const key = '29056a50f401dbddaade6d6e1726f2ae';

        //https://api.darksky.net/forecast/29056a50f401dbddaade6d6e1726f2ae/39.9396284,-75.18663959999999
        request({
            url: `https://api.darksky.net/forecast/${key}/${lat},${lon}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Forecast servers.');
            } else if (response.statusCode === 400) {
                reject('Unable to fetch the weather.');
            } else if (response.statusCode === 200) {
                resolve({
                    Temperature: body.currently.temperature,
                    ApparentTemperature: body.currently.apparentTemperature
                });
            }
        });
    });
};

geocodeAddress("19146").then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
    return geocodeLatLon(location.latitude, location.longitude);
}).then((temperature) => {
    console.log(JSON.stringify(temperature, undefined, 2));
}).catch((errorMessage) => {
    console.log(errorMessage);
});