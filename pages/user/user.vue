<template>
	<view class="container">
		<view class="user_header">
			<view class="user_login">
				<u-icon name="account" size="50"></u-icon>
				<u--text text="立即登录/认证"></u--text>
			</view>
			<view class="user_setting">
				<navigator url=""  class="setting_n">
					<u-icon name="setting" size="25"></u-icon>
					<text>设置</text>
				</navigator>
			</view>
		</view>
		<view class="user_service">
			<view class="services_list">
				<navigator class="services_item" url="">
					<u-icon name="red-packet" size="30"></u-icon>
					<text>年度账单</text>
				</navigator>
			</view>
			<view class="services_list">
				<navigator class="services_item" url="">
					<u-icon name="gift" size="30"></u-icon>
					<text>我的积分</text>
				</navigator>
			</view>
			<view class="services_list">
				<navigator class="services_item" url="">
					<u-icon name="rmb-circle" size="30"></u-icon>
					<text>发票报销</text>
				</navigator>
			</view>
			<view class="services_list">
				<navigator class="services_item" url="">
					<u-icon name="order" size="30"></u-icon>
					<text>门店管理</text>
				</navigator>
			</view>
		</view>
		
		<view class="user_zw">
			
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" >
	.container{
		background-color: #f0ffff;
	}
	.user_header{
		height: 60px;
		display: flex;
		padding-left: 10px;
		justify-content: space-between;
		align-items: center;
		.user_login{
			display: flex;
		}
		.user_setting{
			// display: flex;
			// justify-content: space-between;
		}
	}
	.setting_n text{
		// display: flex;
		margin-right:23px;
		// flex-wrap: nowrap;
		font-size: 26rpx;
	}
	.user_service{
		width: 93.5%;
		display: flex;
		flex-wrap: wrap;
		border:1rpx solid #efefef;
		background-color: white;
		margin-left: 3%;
		margin-top: 10rpx;
		border-radius: 20rpx;
		.services_list{
			width: 25%;
		}
		.services_item{
			 height: 130rpx;
			 display: flex;
			 flex-direction: column;
			 align-items: center;
			 justify-content: center;
			 box-sizing: border-box;
		}
		.services_item text{
			font-size: 26rpx;
			margin-top: 5rpx;
		}
	}
	.user_zw{
		width: 93.5%;
		height: 800rpx;
		display: flex;
		background-color: white;
		margin-left: 3%;
		margin-top: 10rpx;
		border-radius: 20rpx;
		margin-bottom: 10rpx;
	}
</style>
