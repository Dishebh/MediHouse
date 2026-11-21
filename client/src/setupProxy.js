const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/api', '/auth'],
    createProxyMiddleware({
      target: process.env.API_PROXY_TARGET || 'http://localhost:5000',
      changeOrigin: true
    })
  );
};
