const getResponse = (request, response, status, object, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(object);
  response.end();
};

const generateResponse = (type, messageString, status) => {
  let object;
  if (type === 'application/json') {
    const jsonText = { message: messageString };
    switch (status) {
      case 400:
        jsonText.id = 'badRequest';
        break;
      case 401:
        jsonText.id = 'unauthorized';
        break;
      case 403:
        jsonText.id = 'forbidden';
        break;
      case 404:
        jsonText.id = 'notFound';
        break;
      case 500:
        jsonText.id = 'internal';
        break;
      case 501:
        jsonText.id = 'notImplemented';
        break;
      default:
        break;
    }
    object = JSON.stringify(jsonText);
  } else if (type === 'text/xml') {
    object = `<response><message>${messageString}</message>`;
    switch (status) {
      case 400:
        object += '<id>badRequest</id>';
        break;
      case 401:
        object += '<id>unauthorized</id>';
        break;
      case 403:
        object += '<id>forbidden</id>';
        break;
      case 404:
        object += '<id>notFound</id>';
        break;
      case 500:
        object += '<id>internal</id>';
        break;
      case 501:
        object += '<id>notImplemented</id>';
        break;
      default:
        break;
    }
    object += '</response>';
  } else {
    const jsonText = { message: messageString };
    switch (status) {
      case 400:
        jsonText.id = 'badRequest';
        break;
      case 401:
        jsonText.id = 'unauthorized';
        break;
      case 403:
        jsonText.id = 'forbidden';
        break;
      case 404:
        jsonText.id = 'notFound';
        break;
      case 500:
        jsonText.id = 'internal';
        break;
      case 501:
        jsonText.id = 'notImplemented';
        break;
      default:
        break;
    }
    object = JSON.stringify(jsonText);
  }
  return object;
};

const success = (request, response, type) => {
  const object = generateResponse(type, 'This is a successful response', 200);
  getResponse(request, response, 200, object, type);
};

const badRequest = (request, response, type, url) => {
  let object;
  if (url.query === 'valid=true') {
    object = generateResponse(type, 'This request has required parameters', 200);
  } else {
    object = generateResponse(type, 'Missing valid query parameter set to true', 400);
  }
  getResponse(request, response, 400, object, type);
};

const unauthorized = (request, response, type, url) => {
  let object;
  if (url.query === 'loggedIn=yes') {
    object = generateResponse(type, 'Content viewed successfully', 200);
  } else {
    object = generateResponse(type, 'Missing loggedIn query parameter set to yes', 401);
  }

  getResponse(request, response, 401, object, type);
};

const forbidden = (request, response, type) => {
  const object = generateResponse(type, 'You do not have access to this content', 403);
  getResponse(request, response, 403, object, type);
};

const internal = (request, response, type) => {
  const object = generateResponse(type, 'Internal sever error. Something went wrong.', 500);
  getResponse(request, response, 500, object, type);
};

const notImplemented = (request, response, type) => {
  const object = generateResponse(type, 'A get request for this page has not been implemented yet. Check again later.', 501);
  getResponse(request, response, 501, object, type);
};

const notFound = (request, response, type) => {
  const object = generateResponse(type, 'The page you were looking for was not found', 404);
  getResponse(request, response, 404, object, type);
};

module.exports.success = success;
module.exports.badRequest = badRequest;
module.exports.unauthorized = unauthorized;
module.exports.forbidden = forbidden;
module.exports.internal = internal;
module.exports.notImplemented = notImplemented;
module.exports.notFound = notFound;
