const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYXNpbXJhenphcTQ2IiwiYSI6ImNrcno0MDZoMTE2amcyb3FqczZ2ZGttZXoifQ.Iv1UqplJwcaeOo02bXk9IQ&limit=1`;

  request({ url, json: true }, (err, response) => {
    if (err) {
      callback("unable to connect to location service.", undefined);
    } else if (response.body.features.length === 0) {
      callback(
        "sorry, the city is not found, please try with an other city",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[0],
        longitiude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
