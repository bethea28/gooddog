const fs = require('fs');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');

const compiler = webpack(webpackConfig);

const app = express();
const PORT = process.env.PORT || 3000;

// HMR
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler, {
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));

// /api/breeds endpoint
app.get('/api/breeds', (_, res) => {
  res.writeHead(200, { 'content-type': 'application/json' });
  fs.createReadStream('./data/breeds.json').pipe(res);
});

// assets
app.use(express.static('public'));
app.get('/', (_, res) => { res.sendFile(`${__dirname}/index.html`); });

app.listen(PORT, () => { global.console.log(`Listening on ${PORT}`); });
