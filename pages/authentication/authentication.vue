<template>
	<view class="container">
		<view class="authentication_info">
			
			
			<view class="info_title">
				<text>实名认证</text>
			</view>
			<view class="company_info">
				<view class="info_item">
					<text style="padding-left: 40rpx;">真实姓名</text>
					 <u--input placeholder="请输入" border="none" inputAlign="right"
					    v-model="realName" fontSize="30rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
				<view class="info_item">
					<text style="padding-left: 40rpx;">电话号码</text>
					 <u--input placeholder="请输入" border="none" inputAlign="right"
					    v-model="phone" fontSize="30rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
				<view class="info_item">
					<text style="padding-left: 40rpx;">身份证号</text>
					 <u--input placeholder="请输入" border="none" inputAlign="right"
					    v-model="idCard" fontSize="30rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
			</view>
			
			
			<view class="info_title">
				<text>车辆信息</text>
			</view>
			<view class="company_info">
				<view class="info_item">
					<text style="padding-left: 40rpx;">车牌</text>
					 <u--input placeholder="请输入" border="none" inputAlign="right" 
					    v-model="licensePlate" fontSize="30rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
				<view class="info_item">
					<text style="padding-left: 40rpx;">车型</text>
					 <u--input placeholder="请输入" border="none" inputAlign="right"
					    v-model="carType" fontSize="30rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
			</view>
			
			<view class="submit_button">
				<u-button type="primary" text="提交认证" @click="toAuthentication"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {  mapMutations } from "vuex"
	export default {
		
		data() {
			return {
				userid:this.$store.state.userid,
				realName:'',//真实姓名
				phone:'',//电话号码
				idCard:'',//身份证号
				licensePlate:'',//车牌
				carType:'',//车型
			}
		},
		methods: {
			...mapMutations(["userLogout"]),
			//提交认证
			toAuthentication(){
				var _this = this
				if(_this.realName==""){
					uni.showToast({
						title:'请填写真实姓名！',
						icon: 'none',
					})
				}else if(_this.phone==""){
					uni.showToast({
						title:'请填写电话号码！',
						icon: 'none',
					})
				}else if(_this.idCard==""){
					uni.showToast({
						title:'请填写身份证号！',
						icon: 'none',
					})
				}else if(_this.licensePlate==""){
					uni.showToast({
						title:'请填写车牌！',
						icon: 'none',
					})
				}else if(_this.carType==""){
					uni.showToast({
						title:'请填写车型！',
						icon: 'none',
					})
				}else{
					_this.$api.reqPost('api/yl_driver/Edit',{
						data:{
							id:_this.userid,
							realName:_this.realName,
							phone:_this.phone,
							idCard:_this.idCard,
							licensePlate:_this.licensePlate,
							carType:_this.carType,
							status:1,
							action:1
							}			
					}).then(res => {
						if(res.code==200){
							uni.showToast({
								title:'提交认证成功！',
								icon:'none'
							})
							console.log('提交成功',res)
							_this.logout()
						}else{
							uni.showToast({
								title:'提交认证失败！',
								icon:'none'
							})
							console.log('提交失败',res)
						}
					})
				}
			},
			//退出登录
			logout(){
				var _this = this
				_this.$api.reqPost('api/yl_user/LogOut').then(res => {
					if(res.status){
						console.log('注销登录成功!')
						uni.removeStorageSync('token')
						uni.removeStorageSync('identify')
						console.log('检查token是否移除',uni.getStorageSync('token'))
						console.log('检查identify是否移除',uni.getStorageSync('identify'))
						
						_this.userLogout()
						console.log("检查是否成功将数据移除vuex",_this.$store.state);
						uni.reLaunch({ url: '/pages/login/login' })
					}else{
						console.log('注销登录失败!')
					}
				})
							
			
						
					
				
			},
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
	.authentication_info{
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.info_title{
		height: 50rpx;
		padding-top: 15rpx;
		padding-left:35rpx;
	}
	.company_info{
		width:94%;
		background-color: white;
		border-radius: 30rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin-left: 3%;
	}
	.info_item{
		height: 90rpx;
		display: flex;
		align-items: center;
		margin-top: 5rpx;
		border-bottom: 2rpx solid #efefef;
	}
	.submit_button{
		width: 60%;
		padding: 25rpx 0 0 20%;
	}


</style>
