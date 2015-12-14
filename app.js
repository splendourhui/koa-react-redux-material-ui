"use strict";

const http = require('http');
const path = require('path');
const koa = require('koa');
const middlewares = require('koa-middlewares');
const koaBody = require('koa-better-body');
const router = middlewares.router();
const logRecord = require('koa-logs-full');

const config = require('./config');

let app = new koa();

app.use(logRecord(app, {
  logdir: path.join(__dirname, 'logs')
}));

/**
 * response time header
 */
app.use(middlewares.rt());

/**
 * response compress
 */
app.use(middlewares.compress({
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}));

/**
 * static file server
 */
app.use(middlewares.staticCache(path.join(__dirname, 'public')));

/**
 * koa body parser, support file body
 */
app.use(koaBody({
  patchKoa: true,
  formLimit: 10240,
  multipart: true,
  extendTypes: {
    // will parse application/x-javascript type body as a JSON string
    json: ['application/x-javascript'],
    multipart: ['multipart/mixed']
  }
}));

/**
 * log response time from router to response
 */
app.use(function*(next) {
  let start = new Date;
  yield next;
  let ms = new Date - start;
  this.logger.log(`${this.cookies.get('cici-username')} :`
    + ` ${this.method} ${this.url} - ${ms}ms`);
});

/**
 * routes
 */
require('./routes')(router);
app.use(router.routes());

app = module.exports = http.createServer(app.callback());
if (!module.parent) {
  let port = process.argv[2] || config.port;
  app.listen(port);
  console.warn(`$ Server is listening on port:${port}`);
}

process.on('exit', (code) => {
  console.warn(`$ About to exit with code:${code}`);
});
