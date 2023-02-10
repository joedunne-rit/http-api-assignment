const getResponse = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': request.Accept });
  response.write(object);
  response.end();
};

const generateResponse = (type, messageString) => {
  let object;
  if (type === 'application/json') {
    object = { message: messageString };
  } else { object = `<response><message>${messageString}</message></response>`; }
  return object;
};

const success = (request, response) => {
  const object = generateResponse(request.Accept, 'This is a successful response');
  getResponse(request, response, 200, object);
};

const badRequest = (request, response) => {

};

const unauthorized = (request, response) => {

};

const forbidden = (request, response) => {

};

const internal = (request, response) => {

};

const notImplemented = (request, response) => {

};

const notFound = (request, response) => {

};

module.exports.success = success;
module.exports.badRequest = badRequest;
module.exports.unauthorized = unauthorized;
module.exports.forbidden = forbidden;
module.exports.internal = internal;
module.exports.notImplemented = notImplemented;
module.exports.notFound = notFound;
