const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/auth/github',
    proxy({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );

  app.use(
    '/auth/github/callback',
    proxy({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );
};