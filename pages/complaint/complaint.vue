<template>
	<view class="container">
		<view class="complaint_info">
			
			<view class="info_item">
				<text style="padding-left: 35rpx;">咨询电话</text>
				 <!-- <u--input border="none" inputAlign="right"
				    v-model="consult_phone" fontSize="26rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
				  ></u--input> -->
				  <text style="padding-right: 25rpx;">0772-2082181</text>
			</view>
		
			<u-cell-group :border="false" style="font_zt">
				<u-cell  title="我要投诉" url="/pages/complaint/tocomplaint/tocomplaint" isLink></u-cell>
			</u-cell-group>
			<u-cell-group :border="false">
				<u-cell  title="历史信息" url="/pages/complaint/history/history" isLink></u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// consult_phone:'123456'
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		width: 100%;
		height:100%;
		display: flex;
		background-color: #efefef;
		flex-direction: column;	
	}
	.complaint_info{
		width:94%;
		background-color: white;
		border-radius: 30rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin-left: 3%;
		margin-top: 15rpx;
		font-size: 32rpx;
	}
	.info_item{
		height: 95rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 5rpx;
		border-bottom: 2rpx solid #efefef;
	}
	
</style>
