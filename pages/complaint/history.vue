<template>
	<view class="container">
		<view class="history_info" v-for="(item, index) in historyList " :key="index">
			<view class="info_item">
				<text style="padding-left: 35rpx;">投诉反馈</text>
				<text style=" font-size: 24rpx; margin-right: 30rpx;">{{item.complaintTime}}</text>
			</view>
			<view class="info_item">
				<text style="padding-left: 35rpx;">被投诉人</text>
				<text style=" font-size: 24rpx; margin-right: 30rpx;">{{item.complaintName}}</text>
			</view>
			<view class="info_result">
				<text style="padding-left: 35rpx; width: 160rpx;">受理结果</text>
				<text style=" font-size: 24rpx; margin:0 10rpx 0 30rpx; ">{{item.result}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				historyList:[{
					complaintTime:'2023.05.21',
					complaintName:'张三',
					result:'您的反馈已收到，平台将持续关注，一经核实将从严处理。'
				},
				{
					complaintTime:'2023.05.10',
					complaintName:'小明',
					result:'您的反馈已收到，平台将持续关注，一经核实将从严处理。'
				}
				]
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		background-color: #efefef;
		flex-direction: column;	
	}
	.history_info{
		width:94%;
		background-color: white;
		border-radius: 30rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin-left: 3%;
		margin-top: 15rpx;
	}
	.info_item{
		height: 75rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 5rpx;
		border-bottom: 2rpx solid #efefef;
		
	}
	.info_result{
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 5rpx;
		border-bottom: 2rpx solid #efefef;
	}

</style>
