<template>
	<view class="container">
		<view class="content">
			<view class="logintitle">短信验证码登录</view>
			<view class="phonebox">
				<u--input placeholder="请输入手机号" fontSize="34rpx" v-model="phoneNumber" border="bottom" clearable
				></u--input>
			</view>
			<u-gap height="2" bgColor="#ffffff"></u-gap>
			
			<view class="phonebox">
				<u--input placeholder="请输入验证码"  fontSize="34rpx"  v-model="code" border="bottom" clearable
				></u--input>
				<view class="wrap">
						<u-toast ref="uToast"></u-toast>
						<u-code :seconds="seconds" @end="end" @start="start" ref="uCode" 
						@change="codeChange"></u-code>
						<u-button @tap="getCode">{{tips}}</u-button>
				</view>
			</view>
			<u-gap height="35" bgColor="#ffffff"></u-gap>

			<view class="phonelogin" @click="phonelogin">
				<u-button type="success"  text="登录" ></u-button>		
			</view>
			  
		

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNumber:'',//手机号码
				code:'',//验证码
				tips: '',
				// refCode: null,
				seconds: 60,				
			}
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				let _this = this
				if(_this.phoneNumber==""){
					uni.showToast({
						title:'请先输入手机号',
						 icon: 'none',
					})
				}
				let checkPhone = new RegExp(/^[1]([3-9])[0-9]{9}$/);
				if (!checkPhone.test(_this.phoneNumber)) {
					uni.showToast({
						title:'请输入正确的手机号',
						icon: 'none',
					});
					return
				}				
				if(_this.$refs.uCode.canGetCode) {
				// 模拟向后端请求验证码
					_this.$api.reqPost('api/yl_user/',
					{
						data:{phoneNumber:_this.phoneNumber},
						header: {
							"Connection": "keep-alive",
							"Content-Type":"application/json"
						},
					}).then(res => {
						if(res.status){
							uni.$u.toast('验证码已发送');
							console.log('验证码',res)
						}
					})
						uni.showLoading({
							title: '正在获取验证码'
						})
						setTimeout(() => {
							uni.hideLoading();
							// 这里此提示会被this.start()方法中的提示覆盖
							uni.$u.toast('验证码已发送');
							// 通知验证码组件内部开始倒计时
							_this.$refs.uCode.start();
						}, 2000);
					} else {
						uni.$u.toast('倒计时结束后再重新发送哦');
					}
					
				
				
			},
			// end() {
			// 	uni.$u.toast('倒计时结束');
			// },
			start() {
				uni.$u.toast('验证码已发送');
			},
			phonelogin(){
				if(this.phoneNumber==""){
					uni.showToast({
						title:'手机号不能为空',
						 icon: 'none',
					})
				}else if(this.code==""){
					uni.showToast({
						title:'验证码不能为空',
						 icon: 'none',
					})
				}else{
					
				}
			}
			
				
					
		}
	}
</script>

<style lang="scss" scoped> 
	.container{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.content{
		width: 80%;
		display: flex;
		margin-top: 30%;
		flex-direction: column;
		
	}
	.logintitle{
		font-size: 45rpx;
		font-weight: bold;
		margin-left: 25%;
		margin-bottom: 160rpx;
	}
	.phonebox{
		width: 100%;
		height: 85rpx;
		display: flex;
		font-size: 30rpx;
		
	}
	.wrap{
		padding-top: 5rpx;
		height: 85rpx;
	}
	.phonelogin{
		
	}


</style>
