"use strict";
const api_request = require("./request.js");
const reqAll = (url, opt = {}) => {
  return api_request.fetch(url, opt);
};
const reqGet = (url, opt = {}) => {
  opt.method = "GET";
  return api_request.fetch(url, opt);
};
const reqPost = (url, opt = {}) => {
  opt.method = "POST";
  return api_request.fetch(url, opt);
};
const api = {
  reqAll,
  reqGet,
  reqPost
};
exports.api = api;
