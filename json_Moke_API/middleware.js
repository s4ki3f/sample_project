// middleware.js
const auth = require('./auth.json');

module.exports = (req, res, next) => {
  const apiKey = req.get('X-API-Key');

  if (apiKey && apiKey === auth.apiKey) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
