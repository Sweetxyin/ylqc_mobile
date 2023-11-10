<template>
	<tabbar selectedIndex = 0></tabbar>

</template>
<script>
	export default {
	// 	onLoad() {
	// 		const _this = this
	// 		// #ifndef MP-WEIXIN
	// 		// 隐藏tabbar
	// 		uni.hideTabBar()
	// 		// #endif
	// 		// 启动加载框
	// 		uni.showLoading({
	// 			mask: true,
	// 			title: '加载中'
	// 		})
	// 		// 初始化tabbar
	// 		this.$store.commit('setFirstTabbar')
			
	// 		this.$store.commit('setTabbarList');
	// 		// 跳转
	// 		uni.reLaunch({
	// 			url: this.$store.state.TABBAR_INDEX_PATH
	// 		})
	// 		// uni.reLaunch({
	// 		// 	url: this.$store.state.TABBAR_INDEX_PATH,
	// 		// 	success: function(res, data) {
	// 		// 		_this.$store.commit('setTabbarList');
	// 		// 	},
	// 		// 	fail: function(res, data) {
	// 		// 		console.log("设置页面失败！",error)
	// 		// 	}
	// 		// })
	// 		// #ifndef MP-WEIXIN
	// 		// 显示tabbar
	// 		uni.showTabBar()
	// 		// #endif
	// 		// 关闭loading
	// 		uni.hideLoading()
	// 	}
	// 
	onLoad() {
		// 隐藏tabbar
		uni.hideTabBar()
		// 启动加载框
		uni.showLoading({
			mask: true,
			title: '加载中'
		})
		// 初始化tabbar
		//this.$store.commit('setTabbarList')
		// 显示tabbar
		//uni.showTabBar()
		// 关闭loading
		uni.hideLoading()
		// 跳转
/* 		setTimeout(() => {
			uni.reLaunch({
				url: this.$store.state.TABBAR_INDEX_PATH
			})
			// 关闭loading
			uni.hideLoading()
		}, 1000) */
	}
	}
</script>