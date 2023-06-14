// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: {//存放状态
	    //登录状态，默认未登录
		loginState: false,
		//用户信息
		userInfo: {
			name: '',//用户昵称
			avatar: ''//头像
		}
	},
	getters: {
		
	},
	mutations: {
		//用户登录设置
		userLogin(state,userInfo) {
			state.loginState = true
			state.userInfo =userInfo
		},
		//用户退出设置
		userLogout(state) {
			state.loginState = false
			state.userInfo = {
				name: '未知用户',
				avatar: ''
			}
		}
	},
	actions: {
		//提交注册用户登录方法
		userLoginAction(context,userInfo) {
			context.commit('userLogin',userInfo)
		},
		//提交注册用户退出方法
		userLogoutAction(context) {
			context.commit('userLogout')
		}
	}
})
export default store