import { fetch } from './request.js'


/**
 * url:url路径或配置在api里的obj名称
 * opt: 请求参数，uni.request官方一致，也可自由发挥
 * 
 * */ 

// 通用接口请求
const reqAll = (url,opt={}) => {
//   opt.data = params
  return fetch(url,opt)
}

// get请求
const reqGet = (url,opt={}) => {
  opt.method = "GET"
//   opt.data = params
  return fetch(url,opt)
}

// post请求
const reqPost = (url,opt={}) => {
  opt.method = "POST"
//   opt.data = params
  return fetch(url,opt)
}

export default {
    reqAll,
    reqGet,
    reqPost
}