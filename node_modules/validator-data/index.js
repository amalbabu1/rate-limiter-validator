module.exports = validatedata = (reqCLientType) => (req, res, next) => {
  const validateObject = (obj, schema) => {
    for (const [property, config] of Object.entries(schema)) {
      const { type, required } = config;
      if (required && (obj[property] === undefined || typeof obj[property] !== type)) {
        return false;
      }
    }
    return true;
  };

  for (const [pkey, pValue] of Object.entries(reqCLientType)) {
    if (req.body[pkey] !== undefined) {
      if (!req.body[pkey].every((client) => validateObject(client, reqCLientType[pkey]))) {
        return res.sendStatus(400);
      }
    }
  }

  next();
};
