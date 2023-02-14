const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const respond = (request, response, content, status, type) => {
  response.writeHead(status, { 'Content-Type': type });

  response.write(content);

  response.end();
};

const getIndex = (request, response) => {
  console.log('getIndex called');
  respond(request, response, index, 200, 'text/html');
};

const getCSS = (request, response) => {
  console.log('getCSS called');
  respond(request, response, css, 200, 'text/css');
};

const getUsers = (request, response) => {

}

const notReal = (request, response) => {
    
}

const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };
  const prefAccept = request.headers.accept.split(',')[0];
  const dataString = JSON.stringify(responseJSON);
  const responseXml = `
    <response>
      <message>${responseJSON.message}</message>
    </response>
  `;
  switch (prefAccept) {
    case 'application/json':
      console.log('success JSON');
      respond(request, response, dataString, 200, 'application/json');
      break;
    case 'text/xml':
      console.log('Success get xml');
      respond(request, response, responseXml, 200, 'text/xml');
      break;
    default:
      respond(request, response, dataString, 200, 'application/json');
  }
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };
  const responseXML = `
    <response>
      <message>The page you are looking for was not found'</message>
      <id>notFound</id>
    </response>
  `;
  const dataString = JSON.stringify(responseJSON);

  const prefAccept = request.headers.accept.split(',')[0];

  switch (prefAccept) {
    case 'application/json':
      respond(request, response, dataString, 404, 'application/json');
      break;
    case 'text/xml':
      respond(request, response, responseXML, 404, 'text/xml');
      break;
    default:
      respond(request, response, dataString, 404, 'application/json');
  }
};

module.exports = {
  success,
  notFound,
  getIndex,
  getCSS,
};