
import { api } from './api.js'

// const commoneUrl  = "https://www.kunzhou.club:8080/api/"; //公共路径 
const commoneUrl  = "https://www.kunzhou.club:8080/" // 测试用的，正常使用改成自己公司的

const userId = uni.getStorageSync("userinfo_Data").id //用户id

// 请求拦截
const fetch = (url,opt) => {
  console.log("opt",opt)
  let urls = (api[url]?.url || url);
  // 处理跟在url后面的参数
  let params = opt.params ? ('?'+Object.keys(opt.params).map(key=>key+'='+opt.params[key]).join('&')) : ''
  opt.url = commoneUrl + urls + params
  opt.method = opt.method || "GET";
  var header = {}
  if( uni.getStorageSync('token')) {
    header = { Authorization: 'Bearer'+' '+ uni.getStorageSync('token') }
  }
  opt.header = {
    // 需要的请求头可以在这添加
    // 'content-type':  'application/json;charset=UTF-8'
    // .....
	'Connection': 'keep-alive',
	'Content-Type':'application/json;charset=UTF-8',
    ...opt.header,
    ...header,
}
  
  opt.data = opt.data || {};
  return new Promise((resolve,reject) => {
    let options = {}
	
    Object.keys(opt).map(key=>{
	
     if(key !== "params") {
       return options[key] = opt[key]
     }
    })
    uni.request(options)
    .then(res => interceptorsRes(res,resolve,reject))
    .catch(err=> interceptorsErr(err,reject))
  })
}

// 响应拦截
const interceptorsRes = (resp,resolve,reject) => {
  // 别的返回码需要处理的可以在这后面加
  // const { code } = resp.data // 根据自己后端返回对象做处理
  // if(code == 200) {
  //   console.log("请求成功")
  // }
  // if(code == 401) {
  //   console.log("未授权，跳转回登录页")
  // }
  
  resolve(resp.data)
} 

// 异常处理
const interceptorsErr = (err,reject) => {
  console.log("网络异常",err)
  reject(err)
}


export { fetch }
