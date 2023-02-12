const http = require('http');
const url = require('url');

const htmlHandler = require('./htmlResponses.js');
const textHandler = require('./textResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCss,
    '/success': textHandler.success,
    '/badRequest': textHandler.badRequest,
    '/unauthorized': textHandler.unauthorized,
    '/forbidden': textHandler.forbidden,
    '/internal': textHandler.internal,
    '/notImplemented': textHandler.notImplemented,
    '/notFound': textHandler.notFound,
  },
};

const onRequest = (request, response) => {
  const parseUrl = url.parse(request.url);

  const dataTypes = request.headers.accept.split(',');
  if (!dataTypes[0]) {
    dataTypes[0] = 'application/json';
  }
  if (!urlStruct[request.method]) {
    return urlStruct[request.method]['/notFound'](request, response, dataTypes[0], parseUrl);
  }

  if (urlStruct[request.method][parseUrl.pathname]) {
    return urlStruct[request.method][parseUrl.pathname](request, response, dataTypes[0], parseUrl);
  }
  return urlStruct[request.method]['/notFound'](request, response, dataTypes[0], parseUrl);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
