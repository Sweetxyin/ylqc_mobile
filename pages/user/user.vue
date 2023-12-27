<template>
	<view class="container">
		<u-gap height="5" bgColor="#f0ffff"></u-gap>
		<view class="user_header">
			<view class="user_login" v-if="hasLogin==true">
				<u-avatar size="50" :src="userInfo.avatar"></u-avatar>
				<text >{{userInfo.name}}</text>
				<view v-show="identify!='driver'" class="auth">
					<text @click="toAuth">前往认证</text>
				</view>
				
			</view>
			<view class="user_login" @click="onLogin" v-else="hasLogin==false">
				<u-icon name="account" size="50"></u-icon>
				<u--text text="立即登录/认证"></u--text>
			</view>
			<view class="user_setting">
				<navigator url="/pages/setting/setting" class="setting_n">
					<u-icon name="setting" size="25"></u-icon>
					<text>设置</text>
				</navigator>
			</view>
		</view>
		<view class="user_service">
			<view class="services_list" v-if="identify=='driver'">
				<navigator class="services_item" url="/pages/yearbill/driver_yearbill/driver_yearbill">
					<u-icon name="red-packet" size="30"></u-icon>
					<text>年度账单</text>
				</navigator>
			</view>
			<view class="services_list" v-else>
				<navigator class="services_item" url="/pages/yearbill/yearbill">
					<u-icon name="red-packet" color="#FA7473" size="30"></u-icon>
					<text>年度账单</text>
				</navigator>
			</view>
			<view class="services_list">
				<navigator class="services_item" url="">
					<u-icon name="gift" color="#87CEEB"  size="30"></u-icon>
					<text>我的积分</text>
				</navigator>
			</view>
			<view class="services_list">
				<navigator class="services_item" url="/pages/orderinvoice/orderinvoice">
					<u-icon name="rmb-circle" color="#F9CE5D"  size="30"></u-icon>
					<text>发票报销</text>
				</navigator>
			</view>
			<view class="services_list" v-show="identify!='driver'">
				<navigator class="services_item" url="/pages/storemanage/storemanage">
					<u-icon name="order" color="#ADD8E6"  size="30"></u-icon>
					<text>门店管理</text>
				</navigator>
			</view>
		</view>
		
		<view class="user_zw">
			
		</view>
	
	</view>
	<tabbar selectedIndex = 4></tabbar>
</template>

<script>
	import { mapState, mapMutations } from "vuex"
	export default {
			
		data() {
			return {
				hasLogin:this.$store.state.hasLogin,//登录状态
				openid:this.$store.state.openid,
				avatarSrc:'https://www.baexnyqc.cn/images/other/tx.jpg',
				userInfo:{
					name:'',//昵称
					avatar:'',//头像
				},
				identify:uni.getStorageSync('identify'),
			}
		},
	    
		onShow() {
			
		},
		mounted() {
		  this.getUserInfo()
		},
		methods: {
			//跳转到登录页
			onLogin(){
				uni.navigateTo({
				    url: '/pages/login/login'
				})
			},
			//跳转到认证页面
			toAuth(){
				uni.navigateTo({
					url:'/pages/user/authentication'
				})
			},
			//获取用户信息
			getUserInfo(){
				var _this = this
				if(_this.hasLogin){
					if(_this.identify=='driver'){
						_this.$api.reqPost('api/yl_driver/GetUser',{
							params:{
								openid:_this.openid
							}
						}).then(res => {
							if(res.status){
								_this.userInfo = res.data
								if(res.data.name==null){
									let val = res.data.phone
									let reg = /^(.{3}).*(.{4})$/
									_this.userInfo.name=val.replace(reg, '$1****$2')
								}
								console.log('获取司机用户信息成功！',res)
							}else{
								console.log('获取司机用户信息失败！',res)
							}
						})
					}else{
						_this.$api.reqPost('api/yl_user/GetUserInfo').then(res => {
							if(res.status){
								_this.userInfo = res.data
								if(res.data.name==null){
									let val = res.data.phone
									let reg = /^(.{3}).*(.{4})$/
									_this.userInfo.name=val.replace(reg, '$1****$2')
								}
								console.log('获取客户信息成功！',res)
							}else{
								console.log('获取客户信息失败！',res)
							}
						})
					}
					
				}
				
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		position: absolute;
		width: 100%;
		height: 100%;
		// background-color: #f0ffff;
		background-color:#E9FEFF;
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
	.auth{
		margin-top: 5%;
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
