const express = require('express');
const bodyParser = require('body-parser');
const validatedata = require('validator-data');
const rateLimmiter = require('./ratelimitter');
const app = express();
app.use(express.json());

let configuration = {
  routesC: {},
  clientsC: {},
};

const reqCLientType = {
  routes: {
    sourcePath: { type: 'string', required: true },
    destinationUrl: { type: 'string', required: true },
  },
  clients: {
    clientId: { type: 'string', required: true },
    limit: { type: 'number', required: false },
    seconds: { type: 'number', required: false },
  },
};

app.post('/configure', validatedata(reqCLientType), async (req, res) => {
  const { client_id } = req.headers;
  const { clients, routes } = req.body;

  if (client_id === undefined) {
    return res.sendStatus(403);
  }

  configuration.routesC = routes[0];

  for (const client of clients) {
    if (client.limit === undefined) client.limit = 1;
    if (client.seconds === undefined) client.seconds = 1;
    configuration.clientsC[client.clientId] = client;
  }

  console.log('routesC', configuration.routesC);
  console.log('clientsC', configuration.clientsC);
  return res.sendStatus(200);
});

app.use('/', rateLimmiter(configuration), (req, res) => {
  if (req.url === configuration.routesC.sourcePath) {
    req.headers.location = configuration.routesC.destinationUrl;
    return res.sendStatus(302);
  } else {
    res.sendStatus(404);
  }
});

app.listen(3335, () => {
  console.log('Server started at Port 3335');
});

module.exports = app;
