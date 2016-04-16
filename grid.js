"use strict";

var _ = require("lodash");

function Grid() {
  var photosElement = document.getElementById("photos");
  var photosCount = 0;
  var self = this;

  function rowsCount() {
    return Math.trunc(photosCount / 4);
  }

  function nextCol() {
    return photosCount % 4;
  }

  /**
   * Adds a photo thumbnail to the page.
   *
   * @param item is a JSON item that consists of image title and url.
   */
  this.addPhoto = function (item) {
    // add new row if needed
    var addNewRow = photosCount % 4 === 0;
    if (addNewRow) {
      var row = document.createElement("div");
      row.setAttribute("class", "row");
      row.setAttribute("id", rowsCount());

      // add 4 columns to the new row
      for (var i = 0; i < 4; i++) {
        var col = document.createElement("div");
        col.setAttribute("class", "col col-md-3");

        row.appendChild(col);
      }

      photosElement.appendChild(row);
      photosElement.appendChild(document.createElement("br"));
    }

    // create the photo element (img).
    var photo = document.createElement("img");
    photo.setAttribute("class", "img-thumbnail");
    photo.setAttribute("alt", item.title);
    photo.setAttribute("src", item.url);

    photosElement
        .getElementsByClassName("row")[rowsCount()] // get last row
        .getElementsByClassName("col")[nextCol()] // get last unused column
        .appendChild(photo); // add photo

    photosCount++;
  };

  this.renderPhotos = function (photos) {
    _.forEach(photos, function (photo) {
      self.addPhoto(photo);
    });
  };
}

module.exports = new Grid();