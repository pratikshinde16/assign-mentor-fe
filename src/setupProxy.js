const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Your API route prefix
    createProxyMiddleware({
      target: 'https://assign-mentor-k96m.onrender.com',
      changeOrigin: true,
    })
  );
};
