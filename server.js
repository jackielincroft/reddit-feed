// SETUP
const express = require("express");

const app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static('public'));
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

const port = process.env.PORT || 3200;

const errorHandler = (err, req, res) => {
    if (err.response) {
      // request was made and the server responded with a non-200 status code
      res.status(403).send({ title: 'Server responded with an error', message: err.message });
    } else if (err.request) {
      // request was made but no response was received
      res.status(503).send({ title: 'Unable to communicate with server', message: err.message });
    } else {
      // something happened in setting up the request that triggered an error
      res.status(500).send({ title: 'An unexpected error occurred', message: err.message });
    }
  };

// GET request, takes in parameters for subreddit and limit for number of articles to get
app.get("/api/:subreddit/:limit", (req, res) => {
    var request = require("request");
    var subreddit = req.params.subreddit;
    var limit = req.params.limit;

    var original = ""; // the original JSON from the reddit api
    var simplified = ""; // the simplified JSON to send out from our api
    try {
      request('https://www.reddit.com/r/' + subreddit + '/.json?limit=' + limit, 
          function (error, response, body) {
              console.log('error: ', error);
              console.log('status code: ', response && response.statusCode);
              original = JSON.parse(body);
              simplified = "{\"subreddit\":\"" + subreddit + "\", \"titles\":[";
              var dchildren = original['data']['children']; // list of children articles
              console.log(dchildren.length);
              for (var i=0; i<dchildren.length; i++) {
                  if (dchildren[i].hasOwnProperty('data')) {
                      var k = dchildren[i]['data'];
                      if (k.hasOwnProperty('title')) {
                          simplified += "{\"name\":\"" + dchildren[i]['data']['title'] + "\",";
                      }
                      if (k.hasOwnProperty('permalink')) {
                          simplified += "\"url\": \"reddit.com" + dchildren[i]['data']['permalink'] + "\"},";
                      }
                  }
              }
              simplified += "{}]}";
              res.json(simplified);
          });
      } catch (error) {
        errorHandler(error, req, res);
      }
})

// Redirect all traffic to index.html
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => {
    console.log(`running at port ${port}`)
});