<template>
	<view class="container">
		<view class="authentication_info">
			
			<view class="info_title">
				<text>公司信息</text>
			</view>
			<view class="company_info">
				<view class="info_item">
					<text style="padding-left: 35rpx;">公司名称</text>
					 <u--input placeholder="请输入" border="none" inputAlign="right" 
					    v-model="companyName" fontSize="28rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
				<view class="info_item">
					<text style="padding-left: 35rpx;">公司地址</text>
					 <u--input placeholder="请输入" border="none" inputAlign="right"
					    v-model="companyAddress" fontSize="28rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
			</view>
			
			<view class="info_title">
				<text>实名认证</text>
			</view>
			<view class="company_info">
				<view class="info_item">
					<text style="padding-left: 35rpx;">真实姓名</text>
					 <u--input placeholder="请输入" border="none" inputAlign="right"
					    v-model="realname" fontSize="28rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
				<view class="info_item">
					<text style="padding-left: 35rpx;">电话号码</text>
					 <u--input placeholder="请输入" border="none" inputAlign="right"
					    v-model="phone" fontSize="28rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
				<view class="info_item">
					<text style="padding-left: 35rpx;">身份证号</text>
					 <u--input placeholder="请输入" border="none" inputAlign="right"
					    v-model="IDcard" fontSize="28rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
			</view>
			<!-- <view class="">
				这是{{openid}}
			</view>
			<view class="">
				是{{$store.state.openid}}
			</view> -->
			<view class="submit_button">
				<u-button type="primary" text="提交认证" @click="toAuthentication"></u-button>
			</view>
			
		</view>
	</view>
</template>

<script>
		import { mapState, mapMutations } from "vuex"
	export default {
		data() {
			return {
				companyName:'',//公司名称
				companyAddress:'',//公司地址
				realname:'',//真实姓名
				phone:'',//电话号码
				IDcard:'',//身份证号
				openid:this.$store.state.openid,
				// token:this.$store.state.token
			}
		},
		computed: {
			userOpenid(){
				return this.$store.state.openid
			}
		},
		methods: {
			//提交认证
			toAuthentication(){
				var _this = this
				if(_this.realname==""){
					uni.showToast({
						title:'请填写真实姓名！',
						icon: 'none',
					})
				}else if(_this.phone==""){
					uni.showToast({
						title:'请填写电话号码！',
						icon: 'none',
					})
				}else if(_this.IDcard==""){
					uni.showToast({
						title:'请填写身份证号！',
						icon: 'none',
					})
				}else{
					_this.$api.reqPost('api/yl_user/EditUser',{
						params:{
							company:_this.companyName,
							address:_this.companyAddress,
							realname:_this.realname,
							phone:_this.phone,
							IDcard:_this.IDcard,
							openid:_this.openid,
							}			
					}).then(res => {
						if(res.status){
							uni.showToast({
								title:'提交认证成功！',
								icon:'none'
							})
							console.log('提交成功',res)
						}else{
							uni.showToast({
								title:'提交认证失败！',
								icon:'none'
							})
							console.log('提交失败',res)
						}
					})
				}
			}
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
		height: 80rpx;
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
