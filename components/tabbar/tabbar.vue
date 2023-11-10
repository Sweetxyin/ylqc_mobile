<template>
	<view class="tab-bar">
		<view v-for="(item,index) in list" :key="index" class="tab-bar-item" @click="switchTab(item, index)">
			<image class="tab_img" :src="currentIndex == index ? item.selectedIconPath : item.iconPath"></image>
			<view class="tab_text" :style="{color: currentIndex == index ? selectedColor : color}">{{item.text}}</view>
		</view>
	</view>
</template>

<script>
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
				firstshow:true
			}
		},
		created() {
				this.tabbarinit();
		},
		onShow() {
			if(!this.firstshow){
				console.log("回到前台")
				this.tabbarinit();
			}
			this.firstshow=false;
		},

		methods: {
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
				width: 40rpx;
				height: 45rpx;
			}

			.tab_text {
				font-size: 24rpx;
				margin-top: 9rpx;
			}
		}
	}
</style>