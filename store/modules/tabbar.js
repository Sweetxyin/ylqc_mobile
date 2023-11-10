
// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
import {
	setOfficialTabbar,
	cleaarTabbar
} from '@/store/config_static/tabbar_data.js'
Vue.use(Vuex)
const store = new Vuex.Store({
// #endif

// #ifdef VUE3
import { createStore } from 'vuex'

const store = createStore({
// #endif
	state: {
		TABBAR_INDEX_PATH: null, //首页路径
	},
	mutations: {
		// 设置tabbar
		setTabbarList(state) {
			let userRole = '1' //1用户 2司机
			// 超管
			if (userRole === '1') {
				state.TABBAR_INDEX_PATH = setOfficialTabbar(userRole, ['1', '2', '3', '4','5'])
			}
			// 商家
			else if (userRole === '2') {
				state.TABBAR_INDEX_PATH = setOfficialTabbar(userRole, ['6', '7','8','4','5'])
			}
		},
		// 关闭产品或退出登录 初始化tabbar状态 防止不同角色多或者少tabbar减少配置
		clearState(state) {
			cleaarTabbar()
		}
	}
})
export default store