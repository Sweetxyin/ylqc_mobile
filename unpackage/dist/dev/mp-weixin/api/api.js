"use strict";
const api = {
  // 默认请求就是get请求
  weather: {
    url: "456456/weather/v001/now",
    name: "天气信息",
    method: "GET"
  },
  transform: {
    url: "jyzwjfzh/api/v1/forward/zhopenvi/",
    name: "简体转繁体",
    method: "POST"
  }
};
exports.api = api;
