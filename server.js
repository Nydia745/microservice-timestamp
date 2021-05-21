// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
 
app.get("/api", function (req, res) {
  const currDate = new Date();
  res.json({
    "unix": currDate.getTime(),
    "utc" : currDate.toUTCString()
  })
})

function convertDate(date) {
  if (isNaN(date)) {
    return new Date(date);
  } else {
    return new Date(parseInt(date));
  }
}

// solution to /api/:date?
app.get("/api/:date", function (req, res) {
  const dateRes = convertDate(req.params.date);
  if (dateRes.toString() === "Invalid Date") {
    res.json({error : "Invalid Date"});
  } else {
    res.json({
      unix: dateRes.getTime(),
      utc: dateRes.toUTCString()
    });
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
