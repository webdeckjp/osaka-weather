const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const apiKey = "fb80652993638ca76c845a8b90e17e71";
  const city = req.body.cityName;
  const units = "metric";
  const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  https.get(apiCall, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      res.write(
        "<p>The temperature in " +
          city +
          " is " +
          temp +
          " degrees. There is " +
          weatherDescription +
          " <br></p>"
      );
      res.write("<img src=" + imageUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("listening on port 3000");
});
