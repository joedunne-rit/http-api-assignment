const http = require('http');

const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  // const parsedUrl = url.parse(request.url);
  htmlHandler.getIndex(request, response);
  if (request) {
    htmlHandler.getCss(request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
