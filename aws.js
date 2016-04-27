"use strict";

function AWSUtils() {
  function upload(file, signed_url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback();
      }
    };

    xhr.open("PUT", signed_url);
    xhr.setRequestHeader("x-amz-acl", "public-read");
    xhr.send(file);
  }

  function sign_request(file, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/sign-url?fileName=" + file.name + "&fileType=" + file.type);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        callback(response);
      }
    };

    xhr.send();
  }

  return {
    upload: upload,
    sign_request: sign_request
  };
}

module.exports = AWSUtils();