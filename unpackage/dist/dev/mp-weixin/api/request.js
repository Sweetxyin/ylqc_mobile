"use strict";
const common_vendor = require("../common/vendor.js");
const api_api = require("./api.js");
const commoneUrl = "https://www.kunzhou.club:8080/";
common_vendor.index.getStorageSync("userinfo_Data").id;
const fetch = (url, opt) => {
  var _a;
  console.log("opt", opt);
  let urls = ((_a = api_api.api[url]) == null ? void 0 : _a.url) || url;
  let params = opt.params ? "?" + Object.keys(opt.params).map((key) => key + "=" + opt.params[key]).join("&") : "";
  opt.url = commoneUrl + urls + params;
  opt.method = opt.method || "GET";
  var header = {};
  if (common_vendor.index.getStorageSync("token")) {
    header = { Authorization: "Bearer " + common_vendor.index.getStorageSync("token") };
  }
  opt.header = {
    // 需要的请求头可以在这添加
    // 'content-type':  'application/json;charset=UTF-8'
    // .....
    "Connection": "keep-alive",
    "Content-Type": "application/json;charset=UTF-8",
    ...opt.header,
    ...header
  };
  opt.data = opt.data || {};
  return new Promise((resolve, reject) => {
    let options = {};
    Object.keys(opt).map((key) => {
      if (key !== "params") {
        return options[key] = opt[key];
      }
    });
    common_vendor.index.request(options).then((res) => interceptorsRes(res, resolve)).catch((err) => interceptorsErr(err, reject));
  });
};
const interceptorsRes = (resp, resolve, reject) => {
  resolve(resp.data);
};
const interceptorsErr = (err, reject) => {
  console.log("网络异常", err);
  reject(err);
};
exports.fetch = fetch;
