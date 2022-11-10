const allowedCors = [
  'https://movement.nomoredomains.icu',
  'http://movement.nomoredomains.icu',
  'https://api.movement.nomoredomains.icu',
  'http://api.movement.nomoredomains.icu',
  'http://localhost:5555',
  'http://localhost:7777',
  'http://localhost:3000',
  'https://127.0.0.1::3000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);

    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }
  return next();
};
