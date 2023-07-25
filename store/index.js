// 页面路径：store/index.js 
// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
// #endif

// #ifdef VUE3
import { createStore } from 'vuex'
const store = createStore({
// #endif
	state: {//存放状态
	    //登录状态，默认未登录
		hasLogin: false,
		token: '',
		//用户信息
		userInfo: {
			// name: '',//用户昵称
			// avatar: ''//头像
		},
		openid:'',
		userid:''
	},
	getters: {
		
	},
	mutations: {
		setToken(state,auth){
			state.token = auth.token
		},
		//用户登录设置
		login(state,userInfo) {
			state.hasLogin = true
			state.userInfo = userInfo
			state.openid = userInfo.openid
			state.userid = userInfo.id
		},
		userOpenId(state) {
			state.openid = state
		},
		//用户退出设置
		userLogout(state) {
			state.hasLogin = false
			state.userInfo = {
				// name: '',
				// avatar: ''
			}
			state.token = ''
			state.openid = null
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