const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log('Headers received:', req.headers);
  
  // Get token from header
  const authHeader = req.header('Authorization');
  console.log('Auth header:', authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: 'No authorization header found' });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};