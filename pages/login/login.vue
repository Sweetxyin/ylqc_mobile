<template>
	<view class="container">
		<view class="content">
			<text>欢迎使用延龙汽车小程序</text>
		</view>
		<!-- 微信账号登录 -->
		<view class="wechatbox">
			<view class="wechatlogin" @click="weichatlogin">
				<u-button type="success" icon="weixin-fill" text="微信一键登录" ></u-button>		
			</view>
					
		</view>
		<!-- 手机登录 -->
		<view class="phonebox">
			<view class="phonelogin" @click="toPhoneLogin">
				<u-button type="success"  :plain="true"  text="手机号登录/注册"></u-button>		
			</view>
					
		</view>
		
		<view class="txt">
			阅读并同意 <text class="txt1" @click="dealClick('用户服务协议')">《用户服务协议》</text> 和 <text class="txt1" @click="dealClick('隐私协议')">《隐私协议》</text>
		</view>	


	</view>
</template>

<script>
	export default {
		data() {
			return {
				tips: '', //验证码提示文字
				phone: '', //手机号码
				Scode: '', //验证码
				code: '', //验证码
				openId:'',
				sessionKey: '', //秘钥
				iv: '', //本机号码秘钥
				encryptedData: '', //本机号码秘钥
				info:[]
												
			}
		},
		onLoad() {
			//手机号码啊破解也需要code而且具有时效
			// 获取解密本机手机号码的信息
			this.updateSessionKey()
		},
				
		methods: {
			// 获取SessionKey
			updateSessionKey() {
				this.getLoginCode() //获取微信登录js_code
				// console.log('code=',jsCode)
						
			},
			toPhoneLogin() {
				uni.navigateTo({
				    url: '/pages/login/phonelogin'
				   
				})
			},
			// 获取code
			getLoginCode() {
				uni.login({
					provider: 'weixin',
					success: async (res) => {
						this.code = res.code;
						console.log(res)
						console.log(this.code)
					}
				})
			},
			
			// 微信登陆
			weichatlogin() {
				let that = this;
				let token = uni.getStorageSync('token');
				if (token) {
					uni.redirectTo({
						url: '/pages/index/index'
					})
				} else {
					uni.getUserProfile({
						lang: 'zh_CN',
						desc:"获取你的昵称、头像、地区及性别",
						    success: (res) => {
						        that.info = res.userInfo;
						        console.log(res)
						        uni.showToast({
						            icon:"none",
						            title:'获取成功'
						        })
								uni.request({
										url:"https://www.kunzhou.club:8080/api/yl_user/OnLogin",
										method:"POST",
										data:{
											data:{
												code:that.code,
											}
										},
										success:(res)=>{
											if(res.data.errorinfo == null){
												console.log(res.data)
												this.openId=res.data.data.openId               //openid 用户唯一标识  
												this.sessionKey=res.data.data.sessionKey     //sessionKey  会话密钥  
												console.log(this.openId,this.sessionKey);
											}
										},
										fail: (err) => {
											        console.log(err)
											        
											    }  
									})

						    },
						    fail: (err) => {
						        console.log(err)
						        uni.showToast({
						            icon:"none",
						            title:'用户拒绝获取'
						        })
						    }  
						})		        
				}
			},
		

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: absolute;
		width: 100%;
		height: 100%;
		// background-color: #f0ffff;
	}
	.content{
		width: 100%;
		height: 600rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 40rpx;
		font-weight: bold;
	}
	.wechatbox{
		width: 100%;
		display: flex;
		margin-top: 10%;
		justify-content: center;
		align-items: center;
		.wechatlogin{
			width: 80%;
			display: flex;
			
		}
	}
	.phonebox{
		width: 100%;
		display: flex;
		margin-top: 20rpx;
		justify-content: center;
		align-items: center;
		.phonelogin{
			width: 80%;
			display: flex;
			
		}
	}
	.txt{
		display: flex;
		margin-top: 20rpx;
		margin-left: 10%;
		font-size: 26rpx;
	}


</style>
