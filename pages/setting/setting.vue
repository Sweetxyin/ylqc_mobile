<template>
	<view class="container">
		
		
		<view class="setting_info">
			<view class="info_title">
				<text>基本信息</text>
			</view>
			<view class="basic_info">		
				<u-cell-group class="setting-list" :border="false">
					<u-cell class="setting-item" title="头像" isLink></u-cell>
				</u-cell-group>
				<view class="info_item">
					<text style="padding-left: 35rpx;">昵称</text>
					 <u--input placeholder="请输入昵称" border="none" inputAlign="right"
					    v-model="userInfo.name" fontSize="26rpx" disabled="false" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
			
				<view class="info_item">
					<text style="padding-left: 35rpx;">真实姓名</text>
					 <u--input border="none" inputAlign="right"
					    v-model="userInfo.realName" fontSize="26rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
				<view class="info_item">
					<text style="padding-left: 35rpx;">身份证号</text>
					 <u--input border="none" inputAlign="right"
					    v-model="userInfo.idCrad" fontSize="26rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
				<view class="info_item">
					<text style="padding-left: 35rpx;">电话号码</text>
					 <u--input placeholder="请输入电话号码" border="none" inputAlign="right"
					    v-model="userInfo.phone" fontSize="26rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
			</view>
			
			<view class="" v-if="identify=='driver'">
				<view class="info_title">
					<text>车辆信息</text>
				</view>
				
				<view class="authentication_info">
					<view class="info_item">
						<text style="padding-left: 40rpx;">车牌</text>
						 <u--input border="none" inputAlign="right"
						    v-model="userInfo.licensePlate" fontSize="30rpx" :disabled="inputStatus"  class="input_right"
						  ></u--input>
					</view>
					<view class="info_item">
						<text style="padding-left: 40rpx;">车型</text>
						 <u--input border="none" inputAlign="right"
						    v-model="userInfo.carType" fontSize="30rpx" :disabled="inputStatus" class="input_right"
						  ></u--input>
					</view>
				</view>
			</view>
			
			<view class="" v-else>
				<view class="info_title">
					<text>公司信息</text>
				</view>
				
				<view class="authentication_info">
					<view class="info_item">
						<text style="padding-left: 35rpx;">公司名称</text>
						 <u--input placeholder="请输入公司名称" border="none" inputAlign="right"
						    v-model="userInfo.company" fontSize="26rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
						  ></u--input>
					</view>
					<view class="info_item">
						<text style="padding-left: 35rpx;">公司地址</text>
						 <u--input placeholder="请输入公司地址" border="none" inputAlign="right"
						    v-model="userInfo.address" fontSize="26rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
						  ></u--input>
					</view>
				</view>
			</view>
			

			<view class="other_info">
				<u-cell-group class="setting-list" :border="false">
					<u-cell class="setting-item" title="关于延龙" isLink></u-cell>
				</u-cell-group>
				<u-cell-group class="setting-list" :border="false">
					<u-cell class="setting-item" title="延龙法律条规" isLink></u-cell>
				</u-cell-group>
				<u-cell-group class="setting-list" :border="false">
					<u-cell class="setting-item" title="收费标准" isLink></u-cell>
				</u-cell-group>
			</view>

			
			<view class="logout_button">
				<u-button type="error" :plain="true" text="退出登录" @click="logout"></u-button>
			</view>
		</view>
		
		
	</view>
</template>

<script>
		import { mapState, mapMutations } from "vuex"
	export default {
		data() {
			return {
				userInfo:{
					avatar:'',//头像
					name:'',//昵称
					company:'',//公司名称
					realName:'',//真实姓名
					address:'',//公司地址
					idCrad:'',//身份证号
					phone:'',//电话号码
					licensePlate:'',//车牌
					carType:'',//车型
				},
				
				inputStatus:false,
				userToken:this.$store.state.token,
				identify:uni.getStorageSync('identify'),
				openid:this.$store.state.openid,
			}
		},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			...mapMutations(["userLogout"]),
			//选择头像
			chooseAvatar() {
        
			},
			//退出登录
			logout(){
				var _this = this
				uni.showModal({
					title:'确定要退出登录吗？',
					success:function(res){
						if(res.confirm){
							_this.$api.reqPost('api/yl_user/LogOut').then(res => {
								if(res.status){
									console.log('注销登录成功!')
									uni.removeStorageSync('token')
									uni.removeStorageSync('identify')
									console.log('检查token是否移除',uni.getStorageSync('token'))
									console.log('检查identify是否移除',uni.getStorageSync('identify'))
									
									_this.userLogout()
									console.log("检查是否成功将数据移除vuex",_this.$store.state);
									uni.reLaunch({ url: '/pages/index/index' })
								}else{
									console.log('注销登录失败!')
								}
							})

						}else if(res.cancel){
							console.log('用户点击取消')
						}
					}
				})
			},
			//获取用户信息
			getUserInfo(){
				var _this = this
				if(_this.identify=='driver'){
					_this.$api.reqPost('api/yl_driver/GetUser',{
						params:{
							openid:_this.openid
						},
					}).then(res=>{
					if(res.status){
						_this.userInfo = res.data
						if(res.data.idCrad != ""){
						
							let val = res.data.idCrad
							let reg = /^(.{3}).*(.{2})$/
							_this.userInfo.idCrad=val.replace(reg, '$1*************$2')
						console.log('sfzh',val)
						}
						console.log('获取用户信息成功',res)
						}else{
							console.log('获取用户信息失败',res)
						}
					})
				}else{
					_this.$api.reqPost('api/yl_user/GetUserInfo').then(res=>{
						if(res.status){
							_this.userInfo = res.data
							if(res.data.idCrad != ""){
								let val = res.data.idCrad
								let reg = /^(.{3}).*(.{2})$/
								_this.userInfo.idCrad=val.replace(reg, '$1*************$2')
							}
							console.log('获取用户信息成功',res)
						}else{
							console.log('获取用户信息失败',res)
						}
					})
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
		display: flex;
		background-color: #efefef;
		flex-direction: column;	
	}
	.setting_info{
		width: 100%;
		display: flex;
		flex-direction: column;
			.basic_info{
			width:94%;
			background-color: white;
			border-radius: 30rpx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			margin-left: 3%;
		}
		.info_item{
			height: 75rpx;
			display: flex;
			align-items: center;
			margin-top: 5rpx;
			border-bottom: 2rpx solid #efefef;
		}
	}
	.info_title{
		height: 50rpx;
		padding-top: 15rpx;
		padding-left:35rpx;
	}
	.authentication_info{
		width:94%;
		background-color: white;
		border-radius: 30rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin-left: 3%;
	}
	.other_info{
		width:94%;
		background-color: white;
		border-radius: 30rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin-left: 3%;
		margin-top: 15rpx;
	}
	.logout_button{
		width: 94%;
		padding: 25rpx 0 0 3%;
	}
	

</style>
