// server.js
// where your node app starts
const util = require('util');

// init project
var express = require('express');
var app = express();
const requestIp = require('request-ip');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Allow a plain old html page to describe the microservice.
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/api/whoami/", function (request, response) {
  
  // From: https://stackoverflow.com/questions/10849687/express-js-how-to-get-remote-client-address
  var ip = requestIp.getClientIp(request);
  
  var languageArray = request.headers["accept-language"].split( /;|,/g);
  
  // Use non-greedy regex. Reference: https://stackoverflow.com/questions/2824302/how-to-make-regular-expression-into-non-greedy
  var os = request.headers["user-agent"].match(/\((.*?)\)/);
  
  var reply = {
    ipaddress: ip,
    // Go with the prefered language. We are assuming that they come in order.
    language: languageArray[0],
    // We want what was in the "()", not the whole regex match.
    software: os[1]
  };
  
  response.send(JSON.stringify(reply));
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

