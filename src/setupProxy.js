const { createProxyMiddleware } = require('http-proxy-middleware');

const SERVERURL = process.env.REACT_APP_SERVERURL

module.exports = app => {
    app.use(
      '/api',
      createProxyMiddleware({
        target: SERVERURL,
        changeOrigin: true,
      })
    );
  };