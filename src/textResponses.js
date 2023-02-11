const getResponse = (request, response, status, object, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(object);
  response.end();
};

const generateResponse = (type, messageString) => {
  let object;
  if (type === 'application/json') {
    const jsonText = { message: messageString };
    // Add code for adding extra stuff
    object = JSON.stringify(jsonText);
  } else if (type === 'text/xml') {
    object = `<response><message>${messageString}</message></response>`;
    // if statement
  } else {
    const jsonText = { message: messageString };
    // Add code for adding extra stuff
    object = JSON.stringify(jsonText);
  }
  return object;
};

const success = (request, response) => {
  const object = generateResponse(request.headers.accept, 'This is a successful response');
  getResponse(request, response, 200, object, request.headers.accept);
};

const badRequest = (request, response) => {
  const object = generateResponse(request.headers.accept, 'Missing valid query parameter set to true');
  getResponse(request, response, 400, object, request.headers.accept);
};

const unauthorized = (request, response) => {
  const object = generateResponse(request.headers.accept, 'Missing loggedIn query parameter set to yes');
  getResponse(request, response, 401, object, request.headers.accept);
};

const forbidden = (request, response) => {
  const object = generateResponse(request.headers.accept, 'You do not have access to this content');
  getResponse(request, response, 403, object, request.headers.accept);
};

const internal = (request, response) => {
  const object = generateResponse(request.headers.accept, 'Internal sever error. Something went wrong.');
  getResponse(request, response, 500, object, request.headers.accept);
};

const notImplemented = (request, response) => {
  const object = generateResponse(request.headers.accept, 'A get request for this page has not been implemented yet. Check again later.');
  getResponse(request, response, 501, object, request.headers.accept);
};

const notFound = (request, response) => {
  const object = generateResponse(request.headers.accept, 'The page you were looking for was not found');
  getResponse(request, response, 404, object, request.headers.accept);
};

module.exports.success = success;
module.exports.badRequest = badRequest;
module.exports.unauthorized = unauthorized;
module.exports.forbidden = forbidden;
module.exports.internal = internal;
module.exports.notImplemented = notImplemented;
module.exports.notFound = notFound;
