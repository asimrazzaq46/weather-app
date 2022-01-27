const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geoCode");
const weather = require("./utils/forecast");
const app = express();

const port = 3000;
const staticAddress = path.join(__dirname, "../public");
const viewAddress = path.join(__dirname, "../templates/views");
const partialAddress = path.join(__dirname, "../templates/partials");

// Express Config
app.set("view engine", "hbs");
app.set("views", viewAddress);
hbs.registerPartials(partialAddress);

// static directory
app.use(express.static(staticAddress));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    name: "Asim Razzaq Nadeem",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Asim Razzaq Nadeem",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Asim Razzaq Nadeem",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provide.",
    });
  }
  geocode(req.query.address, (error, { lat, long, location }={}) => {
    if (error) {
      return res.send({ error });
    }
    weather(location, (error, forCastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        foreCast: forCastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    message: "Help article not found",
    name: "Asim Razzaq Nadeem",
  });
});
app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    message: "Page not Found",
    name: "Asim Razzaq Nadeem",
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
