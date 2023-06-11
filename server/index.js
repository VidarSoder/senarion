const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());

const API_SERVICE_URL = "http://case.senarion.com/";

app.use('/api', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/api`]: '',
    },
    onProxyReq: function (proxyReq, req, res) {
        proxyReq.setHeader('accept', '*/*');
        proxyReq.setHeader('X-API-Key', 'boardgames123');
    },
}));

app.listen(3002, () => {
    console.log('Server running on port 3002');
});
