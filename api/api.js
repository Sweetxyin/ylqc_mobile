// const commoneUrl  = "https://www.kunzhou.club:8080/"; //公共路径 


/**
 * url: 请求的url
 * name：中文描述
 * method：该api使用的方法
 */
export const api = {
	// 默认请求就是get请求
	weather: {
	  url: '456456/weather/v001/now',
	  name: '天气信息',
	  method: 'GET'
	},
	transform: {
	  url: 'jyzwjfzh/api/v1/forward/zhopenvi/',
	  name: '简体转繁体',
	  method: 'POST'
	},
}
