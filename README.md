# README: Reddit Feed API w/ UI

Coding challenge for Cisco Fall 2021 SWE Co-op – build a REST API that gets recent articles from a given subreddit, and display those recent articles in a simple UI.

### NOTE: This challenge is unfortunately unfinished – for furthest progress, checkout the branch "nodejs", where the api runs (and can be hit using a tool like Postman) and the UI is in the process of being setup at localhost:3200

## Getting Started

This project was built using Node.js, Express.js, and vanilla javascript and html for a simple single-page UI.

To get started, make sure you have node installed, and run the following command to set up the project locally:
```
npm install
```

To run the project locally on localhost:3200, run the following command:
```
npm start
```

## API Specifications

All source code for the REST API can be found in the [server.js] file.  There is only one main api route, since this application simply gets subreddit articles using the public reddit API.  This API route is used in the simple UI, or it can be accessed directly using a tool like Postman.

### GET /api/:subreddit/:limit
Gets recent reddit posts in a simplified JSON format (includes title and url).  The two parameters specify which subreddit to get recent posts from, and how many posts should be limited.

