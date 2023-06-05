<template>
	<view class="container">
		
		<view class="cancel_list" v-for="(item, index) in indexList"
					:key="index">
			<view class="cancel_1">
				<view class="order_status">
					<text style="font-size: 28rpx; padding-left: 15rpx; font-weight: bold;">订单</text>
					<text style="font-size: 22rpx; padding-right: 10rpx; ">{{item.orderStatus}}></text>
				</view>
				
				<view class="order_item">
					<u-icon name="clock-fill"  size="14"></u-icon>
				    <text>订单时间：{{item.orderTime}}</text>
				</view>
				
				<view class="order_item">
					<u-icon name="car-fill" color="#00cc33" size="16"></u-icon>
					<text>{{item.startAddress}}</text>
				</view>
				<view class="item_end">
					<view class="order_item">
						<u-icon name="car-fill" color="#dc143c" size="16"></u-icon>
						<text>{{item.endAddress}}</text>
					</view>
				
				<text class="order_price">{{item.price}}元</text>
				</view>
			</view>
			
			<!-- <view class="cancel_2">
				<u-button type="info" shape="circle" size="small" :plain="true" text="修改订单"></u-button>
				<u-button type="info" shape="circle" style="margin-left:15rpx;" size="small" :plain="true" text="取消订单"></u-button>
			</view> -->
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"order-cancel",
		data() {
			return {
				indexList: [{
					orderId:'123',
					orderStatus:'订单已取消',
					orderTime:'2023.5.17',
					startAddress:'柳州市延龙汽车',
					endAddress:'柳州市万象城',
					price:50
					},{
						orderId:'234',
						orderStatus:'订单已取消',
						orderTime:'2023.5.18',
						startAddress:'柳州市阳和科三考场',
						endAddress:'柳州市地王新天地',
						price:65
					}
				],
			};
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #efefef;
		display: flex;
		flex-direction: column;
	}
	
	.cancel_list{
		height:300rpx;
		width: 92%;
		background-color: white;
		border-radius: 30rpx;
		margin: 10rpx 0 0 2.5%;
		padding: 10rpx 15rpx 0 13rpx;
		font-size: 26rpx;
		display: flex;
		flex-direction: column;
		line-height: 44rpx;
	}
	.cancel_1{
		border-bottom: 2rpx solid #efefef;
	}
	.order_status{
		display: flex;
		justify-content: space-between;
	}
	.order_item{
		display: flex;
		flex-direction: row;
		padding-left: 10rpx;
		padding-top: 5rpx;
	}
	.item_end{
		display: flex;
		justify-content: space-between;
		padding-bottom: 20rpx;
	}
	.order_price{
		color:#999999;
		font-weight: bold;
		
	}
	.cancel_2{
		width:30%;
		display: flex;
		flex-direction: row;
		padding: 15rpx 0 0 60%;
	}
</style>