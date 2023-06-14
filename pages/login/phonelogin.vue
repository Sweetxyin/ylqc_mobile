<template>
	<view class="container">
		<view class="content">
			<view class="phonebox">
				<u--input placeholder="请输入手机号" v-model="phoneNumber" border="bottom" clearable
				></u--input>
			</view>
			<u-gap height="2" bgColor="#ffffff"></u-gap>
			
			<view class="phonebox">
				<u--input placeholder="请输入验证码" v-model="code" border="bottom" clearable
				></u--input>
				<view class="wrap">
						<u-toast ref="uToast"></u-toast>
						<u-code :seconds="seconds" @end="end" @start="start" ref="uCode" 
						@change="codeChange"></u-code>
						<u-button @tap="getCode">{{tips}}</u-button>
					</view>
			</view>
			<u-gap height="50" bgColor="#ffffff"></u-gap>

			<view class="phonelogin" @click="phonelogin">
				<u-button type="success"  text="立即登录" ></u-button>		
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
				seconds: 10,				
			}
		},
		methods: {
			codeChange(text) {
							this.tips = text;
						},
						getCode() {
							if(this.$refs.uCode.canGetCode) {
								// 模拟向后端请求验证码
								uni.showLoading({
									title: '正在获取验证码'
								})
								setTimeout(() => {
									uni.hideLoading();
									// 这里此提示会被this.start()方法中的提示覆盖
									uni.$u.toast('验证码已发送');
									// 通知验证码组件内部开始倒计时
									this.$refs.uCode.start();
								}, 2000);
							} else {
								uni.$u.toast('倒计时结束后再发送');
							}
						},
						end() {
							uni.$u.toast('倒计时结束');
						},
						start() {
							uni.$u.toast('倒计时开始');
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
	.phonebox{
		width: 100%;
		display: flex;
		
	}
	.phonelogin{
		
	}


</style>
