let clientsUsage = {};
module.exports = rateLimmiter = (configuration) => (req, res, next) => {
  const current_client = req.headers.client_id;

  if (!current_client) {
    return res.sendStatus(403);
  }
  if (clientsUsage[current_client] === undefined) {
    clientsUsage[current_client] = { limit: 0, seconds: new Date() };
  }
  //time not expired
  if ((new Date() - clientsUsage[current_client].seconds) / 1000 <= configuration.clientsC[current_client].seconds) {
    //limit not exired
    if (clientsUsage[current_client].limit < configuration.clientsC[current_client].limit) {
      clientsUsage[current_client].seconds = new Date();
      clientsUsage[current_client].limit = clientsUsage[current_client].limit + 1;
    } else {
      return res.sendStatus(429);
    }
  } else {
    clientsUsage[current_client].seconds = new Date();
    clientsUsage[current_client].limit = 1;
  }
  next();
};
