<template>
	<view class="container">
		<view class="message_info">
			<u-gap height="10" bgColor="#ffffff"></u-gap>
			<text style="font-size: 32rpx;font-weight: bold; padding-left: 20rpx;">全部消息</text>
			<u-gap height="10" bgColor="#ffffff"></u-gap>
			
			<view class="sever_info">
				<u-avatar :src="src"></u-avatar>
				<view class="info_item">
					<text style="font-size: 30rpx;font-weight: bold; padding-left: 20rpx;">服务消息</text>
					<text style="font-size: 28rpx; color:darkgray;">{{time}}日</text>
					<view class="list">
						<text >暂无消息</text>
					</view>
				</view>
			</view>
			<u-gap height="10" bgColor="#ffffff"></u-gap>
			<view class="sever_info">
				<u-avatar :src="src"></u-avatar>
				<view class="info_item">
					<text style="font-size: 30rpx;font-weight: bold; padding-left: 20rpx;">在线客服</text>
					<text style="font-size: 28rpx; color:darkgray;">{{time}}日</text>
					<view class="list">
						<text >暂无消息</text>
					</view>
				</view>
			</view>

		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time:'5.30'
			
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		background-color: #efefef;
	}
	.message_info{
		background-color: white;
		width: 100%;
		.sever_info{
			display: flex;
			margin-left: 20rpx;
			border-bottom: 1rpx solid #efefef;
			padding-bottom: 15rpx;
			.info_item{
				width: 100%;
			}
			.list{
				// display: flex;
				font-size: 28rpx; color:darkgray;
				padding-left: 20rpx;
			}
		}
	}
	.info_item text:nth-child(2){
		float: right;
		padding-right: 20rpx;
	}
	
</style>
