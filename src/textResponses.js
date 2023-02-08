const getResponse = (request, response, status, object, type) => {
  response.writeHead(status, { 'Content-Type': type });
  if (type === 'application/json') {
    response.write(JSON.stringify(object));
  } else response.write(object);
  response.end();
};

const generateResponse = (type) => {
  const object = '';
  if (type === 'application/json') {
    object = { message: 'This is a successful response' };
  } else { object = '<response><message>This is a successful response</message></response>'; }
  return object;
};

module.exports.getResponse = getResponse;
