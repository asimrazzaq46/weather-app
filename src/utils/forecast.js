const request = require("request");

const weather = (address , callback) => {
  const url = `http://api.weatherstack.com/current?access_key=a44b4c61ec9834d97bb80928f37678bf&query=${encodeURIComponent(
   address
  )}`;
  request({ url, json: true }, (err, response) => {
    const city = response.body.location;
    const { temperature, feelslike } = response.body.current;
    if (err) {
      callback("unable to connect to location service.", undefined);
    } else if (!response.body.current) {
      callback(
        "sorry, the city is not found, please try with an other city.",
        undefined
      );
    } else {
      callback(
        undefined,
        `In ${city.name} right now the temprature is ${temperature} and it feelslike ${feelslike}`
      );
    }
  });
};

module.exports = weather;
