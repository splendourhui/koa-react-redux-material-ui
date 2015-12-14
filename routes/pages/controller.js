"use strict";

const co = require('co');
const jade = require('jade');
const path = require('path');
const request = require('superagent');
const config = require('../../config');

exports.page = function*() {
  this.body = jade.renderFile('views/index.jade', {});
};

exports.index = function*() {
  this.redirect('/page/index');
}
