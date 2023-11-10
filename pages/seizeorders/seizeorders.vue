<template>
	<view class="container">
		<view class="zt">
			<!-- 没有登录显示 -->
			<view class="nologin" v-if="!hasLogin">
				<text>完成登录，可查看大量订单哦!</text>
				<view class="but">
					<u-button type="primary" :plain="true" size="small" text="去登录" @click="toLogin" ></u-button>
				</view>
			</view>
			<view class="order_list" v-else v-for="(item,index) in orderList" :key="index">
				<view class="list_top">
					<text style=" padding-left: 15rpx; ">全程{{item.wholeCourse}}公里</text>
					<text style=" padding-right: 10rpx; ">距你{{item.distance}}公里</text>
				</view>
				<view class="order_item">
					<u-icon name="clock-fill" size="14"></u-icon>
					<text>订单生成时间：{{item.modifyTime}}</text>
				</view>
				<view class="order_item">
					<u-icon name="car-fill" color="#00cc33" size="16"></u-icon>
					<text>{{item.sendAddress}}</text>
				</view>
				<view class="order_item">
					<u-icon name="car-fill" color="#dc143c" size="16"></u-icon>
					<text>{{item.receAddress}}</text>
				</view>
				<view class="order_item">
					<text style=" padding-left:5rpx; ">货物种类：{{item.itemType}}</text>
				</view>
				<view class="order_item">
					<text style=" padding-left:5rpx; ">送达时间：{{item.deliveryTime}}</text>
				</view>
				<view class="item_end">
					<view class="order_item">
						<text
							style="color:crimson; font-weight: bold; padding-top: 10rpx; font-size: 40rpx;">{{item.amount}}元</text>
					</view>
			
					<view class="but">
						<u-button type="error" size="small" text="抢单" @click="addOrders(item.number)"></u-button>
					</view>
				</view>
			</view>
			<view class="nologin" v-if="hasLogin && orderList.length == 0">
				<text>暂无订单</text>
			</view>
		</view>
		
	</view>
	<tabbar selectedIndex = 0></tabbar>
</template>

<script>
import indexList from '../../uni_modules/uview-plus/libs/config/props/indexList';
	export default {
		data() {
			return {
				hasLogin:this.$store.state.hasLogin,//登录状态
				userid:this.$store.state.userid,
				orderList: [],
				longitude: 0.00,
				latitude: 0.00,
				sourceStr:'',//订单号 
			}
		},
		// onLoad() {
		//    	this.load();
		// },
		onShow(){
			this.load();
			this.getLocation();
		},
		// mounted() {
		
		// 	// this.tabChang(0)
			
		// 	this.getLocation();
		// 	setTimeout(this.load,1000);
		// },
		methods: {
			load() {
				var _this = this;
				_this.$api.reqPost('api/yl_orders/QueryAll').then(res => {
					if (res.status) {
						_this.orderList = res.data;
						if(res.data!=null){
							for(let i = 0; i < _this.orderList.length; i++){
								_this.driving(_this.orderList[i].sendLat, _this.orderList[i].sendLng).then(res =>{
									// console.log("load[res]:",_this.orderList);
									// debugger;
									_this.orderList[i].distance = res;
								});
							}
						}
						console.log('查询订单成功', res)
					} else {
						console.log('查询订单为0', res)
					}
				})
			},
			addOrders(id) {
				var _this = this;
				_this.$api.reqPost('api/yl_orders/AddOrderForDeiver',{
					params:{
						number: id,
						userid: _this.userid
					}
				}).then(res => {
					if (res.status) {
						uni.showToast({
							title: '抢单成功',
							icon:'success',
							duration:850
						});
						_this.load();
						console.log('抢单成功', res)
					} else {
						console.log('抢单失败', res)
					}
				})
			},
			toLogin(){
				uni.reLaunch({ url: '/pages/login/login' })
			},
			async driving(sendLat, sendLng){
				var _this = this;
				var km = 0.0;
				await _this.$api.reqPost("api/BaiduMap/Driving",{
					params:{
						origin: this.latitude + "," + this.longitude,
						destination: sendLat + "," + sendLng
					}
				}).then(res =>{
					// console.log("driving:",res.data.result.routes[0].distance);
					km = res.data.result.routes[0].distance / 1000;
				})
				return km.toFixed(1);
			},
			getLocation () {
				  let that = this
				  // 获取用户是否开启 授权获取当前的地理位置、速度的权限。
				  uni.getSetting({
					success (res) {
					  console.log(res)

					  // 如果没有授权
					  if (!res.authSetting['scope.userLocation']) {
						// 则拉起授权窗口
						uni.authorize({
						  scope: 'scope.userLocation',
						  success () {
							//点击允许后--就一直会进入成功授权的回调 就可以使用获取的方法了
							uni.getLocation({
							  type: 'gcj02',
							  success: function (res) {
								that.x = res.longitude
								that.y = res.latitude
								console.log(res)
								console.log('当前位置的经度：' + res.longitude)
								console.log('当前位置的纬度：' + res.latitude)
								that.longitude = res.longitude;
								that.latitude = res.latitude;
							  }, fail (error) {
								console.log('失败', error)
							  }
							})
						  },
						  fail (error) {
							//点击了拒绝授权后--就一直会进入失败回调函数--此时就可以在这里重新拉起授权窗口
							console.log('拒绝授权', error)

							uni.showModal({
							  title: '提示',
							  content: '若点击不授权，将无法使用位置功能',
							  cancelText: '不授权',
							  cancelColor: '#999',
							  confirmText: '授权',
							  confirmColor: '#f94218',
							  success (res) {
								console.log(res)
								if (res.confirm) {
								  // 选择弹框内授权
								  uni.openSetting({
									success (res) {
									  console.log(res.authSetting)
									}
								  })
								} else if (res.cancel) {
								  // 选择弹框内 不授权
								  console.log('用户点击不授权')
								}
							  }
							})
						  }
						})
					  } else {
						// 有权限则直接获取
						uni.getLocation({
						  type: 'gcj02',
						  success: function (res) {
							that.x = res.longitude
							that.y = res.latitude
							console.log(res)
							console.log('当前位置的经度：' + res.longitude)
							console.log('当前位置的纬度：' + res.latitude)
							that.longitude = res.longitude;
							that.latitude = res.latitude;
						  }, fail (error) {
							uni.showToast({
							  title: '请勿频繁调用！',
							  icon: 'none',
							})
							console.log('失败', error)
						  }
						})
					  }
					}
				  })
				},
				
			}
		}
	</script>

	<style lang="scss" scoped>
		.container {
			// position: absolute;
			// width: 100%;
			// height: 100%;
			// background-color: #efefef;
			// position: fixed;
			// height: 100vh;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background-color: #efefef;
			// z-index: -1;
		}
	

		.nologin {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100%;
    background-color: #efefef;
		.but {
			width: 200rpx;
			padding-top: 3%;
		}

	}

	.order_list {
		height: 390rpx;
		width: 92%;
		background-color: white;
		border-radius: 30rpx;
		margin: 10rpx 0 0 2.5%;
		padding: 10rpx 15rpx 0 13rpx;
		font-size: 30rpx;
		display: flex;
		flex-direction: column;
		line-height: 44rpx;

		.list_top {
			width: 100%;
			height: 80rpx;
			background-color: #b0e0e6;
			border-radius: 15rpx;
			font-size: 32rpx;
			color: white;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.order_item {
			display: flex;
			flex-direction: row;
			padding-left: 10rpx;
			padding-top: 5rpx;
		}

		.item_end {
			display: flex;
			justify-content: space-between;
			padding-bottom: 20rpx;
		}
	}
</style>