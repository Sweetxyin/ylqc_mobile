<template>
	<view class="container">
		<u-gap height="5" bgColor="#f0ffff"></u-gap>
		<view class="user_header">
			<view class="user_login" v-if="isLogin">
				<u-avatar size="50" :src="avatarSrc"></u-avatar>
				<text>{{userName}}</text>
			</view>
			<view class="user_login" @click="onLogin" v-else>
				<u-icon name="account" size="50"></u-icon>
				<u--text text="立即登录/认证"></u--text>
			</view>
			<view class="user_setting">
				<navigator url="/pages/setting/setting"  class="setting_n">
					<u-icon name="setting" size="25"></u-icon>
					<text>设置</text>
				</navigator>
			</view>
		</view>
		<view class="user_service">
			<view class="services_list">
				<navigator class="services_item" url="/pages/yearbill/yearbill">
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
				<navigator class="services_item" url="/pages/orderinvoice/orderinvoice">
					<u-icon name="rmb-circle" size="30"></u-icon>
					<text>发票报销</text>
				</navigator>
			</view>
			<view class="services_list">
				<navigator class="services_item" url="/pages/storemanage/storemanage">
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
				isLogin:false,
				avatarSrc:'../../static/images/other/tx.jpg',
				userName:'Sweey',
				userList:[{
					userName:'Sweet'
				}]
			}
		},
		methods: {
			onLogin(){
				uni.navigateTo({
				    url: '/pages/login/login'
				   
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		position: absolute;
		width: 100%;
		height: 100%;
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
			margin-left: 2%;
		}
		.user_setting{
			// display: flex;
			// justify-content: space-between;
		}
	}
	.user_login text{
		padding-top: 30rpx;
		padding-left: 30rpx;
		text-align: center;
		font-size: 36rpx;
		font-weight: bold;
		
	}
	.setting_n text{
		margin-right:23px;
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
