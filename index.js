"use strict";

(function () {
  console.log("Copyright © Jonathan Rubin Yaniv");

  require("./bower_components/bootstrap/dist/css/bootstrap.min.css");
  require("fetch");
  var grid = require("./Grid");

  fetch("./photos.json")
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        grid.renderPhotos(json);
      })
      .catch(function (ex) {
        console.log("Error parsing fetch results");
        console.error(ex);
      });
})();
