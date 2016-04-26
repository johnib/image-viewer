"use strict";

(function () {
  console.log("Copyright © Jonathan Rubin Yaniv");

  require("./bower_components/bootstrap/dist/css/bootstrap.min.css");
  require("./spinner.css");
  require("fetch");

  var grid = require("./Grid");
  var awsUtils = require("./aws");
  var spinner = document.getElementById("spinner");

  fetch("./photos")
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

  var imageElement = document.getElementById("image");
  imageElement.onchange = function () {
    var file = imageElement.files[0];
    if (!file) {
      return;
    }

    spinner.className = "spinner";

    awsUtils.sign_request(file, function (res) {
      awsUtils.upload(file, res.signed_url);
      console.log(res);
    });

    spinner.className = "";
  }
})();