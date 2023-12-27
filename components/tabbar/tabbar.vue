<template>
	<view class="tab-bar">
		<view v-for="(item,index) in list" :key="index" class="tab-bar-item" @click="switchTab(item, index)">
			<image class="tab_img" :src="currentIndex == index ? item.selectedIconPath : item.iconPath"></image>
			<view class="tab_text" :style="{color: currentIndex == index ? selectedColor : color}">{{item.text}}</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		props: {
			selectedIndex: { // 当前选中的tab index
				default: 0
			},
		},
		data() {
			return {
				color: "#666666",
				selectedColor: "#00BAB2",
				list: [],
				currentIndex: 0,
				firstshow: true
			}
		},
		onLoad() {
			
		},
		created() {
			console.log("触发tabbar created");
			const _this = this
			// #ifdef MP-WEIXIN
			var userInfo = this.$store.state.userInfo;
			console.log("获取存进的token", uni.getStorageSync('token'));
			console.log("是否登出",uni.getStorageSync('isLogout'))
			//var token = this.$db.get('userToken');
			if (Object.keys(userInfo).length != 0 || uni.getStorageSync('isLogout')) {
				console.log("获取到store.state用户数据");
				console.log(this.$store.state.userInfo)
			} else {
				_this.doToken();
			}
			// #endif
			this.tabbarinit();
		},
		onShow() {
			if (!this.firstshow) {
				console.log("回到前台")
				this.tabbarinit();
			}
			this.firstshow = false;
		},

		methods: {

			...mapMutations(["login", "setToken"]),

			tabbarinit() {
				this.currentIndex = this.selectedIndex;

				var _this = this
				console.log("获取角色", uni.getStorageSync('identify'))
				if (uni.getStorageSync('identify') == 'driver') {
					//司机
					_this.list = [{
							"text": "抢单",
							"pagePath": "/pages/seizeorders/seizeorders",
							"iconPath": "/static/images/tab_icon/seize.png",
							"selectedIconPath": "/static/images/tab_icon/seize_active.png"
						},
						{
							"text": "订单",
							"pagePath": "/pages/order/order",
							"iconPath": "/static/images/tab_icon/order.png",
							"selectedIconPath": "/static/images/tab_icon/order_active.png"
						},

						{
							"text": "消息",
							"pagePath": "/pages/message/message",
							"iconPath": "/static/images/tab_icon/message.png",
							"selectedIconPath": "/static/images/tab_icon/message_active.png"
						},
						{
							"text": "换电",
							"pagePath": "/pages/change_electricity/change_electricity",
							"iconPath": "/static/images/tab_icon/change.png",
							"selectedIconPath": "/static/images/tab_icon/change_active.png"
						},
						{
							"text": "我的",
							"pagePath": "/pages/user/user",
							"iconPath": "/static/images/tab_icon/user.png",
							"selectedIconPath": "/static/images/tab_icon/user_active.png"
						}
					]

				} else {
					//客户
					_this.list = [{
							"text": "首页",
							"pagePath": "/pages/index/index",
							"iconPath": "/static/images/tab_icon/index.png",
							"selectedIconPath": "/static/images/tab_icon/index_active.png"
						},
						{
							"text": "订单",
							"pagePath": "/pages/order/orderlist/orderlist",
							"iconPath": "/static/images/tab_icon/order.png",
							"selectedIconPath": "/static/images/tab_icon/order_active.png"
						},
						{
							"text": "消息",
							"pagePath": "/pages/message/message",
							"iconPath": "/static/images/tab_icon/message.png",
							"selectedIconPath": "/static/images/tab_icon/message_active.png"
						},

						{
							"text": "商城",
							"pagePath": "/pages/shop/shop",
							"iconPath": "/static/images/tab_icon/shop.png",
							"selectedIconPath": "/static/images/tab_icon/shop_active.png"
						},

						{
							"text": "我的",
							"pagePath": "/pages/user/user",
							"iconPath": "/static/images/tab_icon/user.png",
							"selectedIconPath": "/static/images/tab_icon/user_active.png"
						}
					]

				}
			},

			// 获取code
			getLoginCode(callback) {
				uni.login({
					provider: 'weixin',
					success: async (res) => {
						this.code = res.code;
						return callback(res.code)
						// console.log(res)
						// console.log(this.code)
					}
				})
			},

			//获取token
			doToken() {
				if (uni.getStorage('identify'))
					uni.removeStorage('identify')

				const _this = this
				console.log("重新获取用户数据");
				_this.getLoginCode(function(code) {
					var data = {
						code: code
					}
					_this.$api.reqPost('api/yl_user/OnLogin', {
						data: {
							code: _this.code
						}
					}).then(res => {
						if (res.status) {
							if (res.data.auth) {
								// _this.$store.commit('token', res.data.auth.token)
								// _this.$store.commit('hasLogin', true);
								_this.setToken(res.data.auth)
								uni.setStorageSync('token', res.data.auth.token)
								console.log("检查是否成功存进token", uni.getStorageSync('token'));
								console.log("检查是否成功将token存进vuex", _this.$store.state);
								// uni.setStorageSync('token',res.data.auth.token)	
								// console.log('输出token',uni.getStorageSync('token'))
							}
							if (res.data.user) {
								_this.login(res.data.user)
								console.log("检查是否成功将数据存进vuex", _this.$store.state);
								// _this.$store.commit('userInfo', res.data.user);
							}
							_this.openid = res.otherData;
							console.log("成功后获取openid：" + _this.$store.state.openid);
							if (res.data.user) {
								if (res.data.user.roles == 'driver') {
									uni.setStorageSync('identify', 'driver')

								} else {
									uni.setStorageSync('identify', 'user')

								}
							}
						} else {
							//uni.removeStorage('identify')
						}
					})
				})
			},

			switchTab(item, index) {
				this.currentIndex = index;

				let url = item.pagePath;
				//uni.redirectTo({url:url})
				uni.reLaunch({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
	.tab-bar {

		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		background: white;
		display: flex;
		justify-content: center;
		align-items: center;

		padding-bottom: env(safe-area-inset-bottom); // 适配iphoneX的底部


		.tab-bar-item {
			flex: 1;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.tab_img {
				width: 45rpx;
				height: 50rpx;
			}

			.tab_text {
				font-size: 30rpx;
				margin-top: 9rpx;
				font-weight: bold;
			}
		}
	}
</style>