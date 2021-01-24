// SETUP
const express = require("express");

const app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const port = process.env.PORT || 3200;

var original = ""; // the original JSON from the reddit api
var simplified = ""; // the simplified JSON to send out from our api

// GET request, takes in parameters for subreddit and limit for number of articles to get
app.get("/api/:subreddit/:limit", (req, res) => {
    var request = require("request");
    var subreddit = req.params.subreddit;
    var limit = req.params.limit;
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
            console.log('original: ', original);
            console.log('simplified: ', simplified);
        });
})

app.listen(port, () => {
    console.log(`running at port ${port}`)
});



