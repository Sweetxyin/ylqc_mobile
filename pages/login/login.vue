<template>
	<view class="container">
		<view class="content">
			<text>欢迎使用延龙汽车小程序</text>
		</view>
		<!-- 微信账号登录 -->
		<view class="wechatbox">
			<view class="wechatlogin">
				<u-button  v-if="treatyType==false" type="success" icon="weixin-fill" text="微信一键登录" @click="changeTreaty"></u-button>	
				<u-button v-else="treatyType==true" type="success" icon="weixin-fill" text="微信一键登录" open-type="getPhoneNumber" @getphonenumber="getUserPhoneNumber"></u-button>		
			</view>
					
		</view>
		<!-- <u-button type="primary" text="微信用户一键登录" open-type="getPhoneNumber" :plain="true" @getphonenumber="getUserPhoneNumber"></u-button> -->
		<!-- 手机登录 -->
		<view class="phonebox">
			<view class="phonelogin" @click="toPhoneLogin">
				<u-button type="success"  :plain="true"  text="短信验证码登录"></u-button>		
			</view>
					
		</view>
		<!-- <view class="" @click="doToken()">获取登录</view> -->
		<!-- <view class="" @click="toLogin">获取登录</view>
		<view class="" @click="weichatlogin">获取用户信息</view> -->
		<view class="txt">
			<!-- 阅读并同意 <text class="txt1" @click="dealClick('用户服务协议')">《用户服务协议》</text> 和 <text class="txt1" @click="dealClick('隐私协议')">《隐私协议》</text> -->
		 <u-checkbox-group placement="row" @change="boxcheck" v-model="treaty">
		       <u-checkbox activeColor="green"  shape="circle"></u-checkbox>
			  <view style="padding-top: 10rpx;">
			  	已阅读并同意 <text class="txt1" @click="dealClick('用户服务协议')">《用户服务协议》</text> 和 <text class="txt1" @click="dealClick('隐私协议')">《隐私协议》</text>
			  </view> 
		    </u-checkbox-group>
	
		</view>	


	</view>
</template>
	
<script>
	import { mapState, mapMutations } from "vuex"
	
	export default {
		data() {
			return {
				tips: '', //验证码提示文字
				phone: '', //手机号码
				Scode: '', //验证码
				code: '', //验证码
				openid:'',
				session_key: '', //秘钥
				iv: '', //本机号码秘钥
				encryptedData: '', //本机号码秘钥
				invitecode:'',
				treaty:[],
				treatyType:false
			}
		},
		onLoad() {
			//手机号码啊破解也需要code而且具有时效
			// 获取解密本机手机号码的信息
			// this.updateSessionKey()
		},
		mounted() {
		    const _this = this
		    // #ifdef MP-WEIXIN
		    var userInfo = this.$store.state.userInfo;
		    //var token = this.$db.get('userToken');
		    if (Object.keys(userInfo).length != 0) {
		        console.log("获取到store.state用户数据");
				console.log(this.$store.state.userInfo)
		    } else {
		        _this.doToken();
		    }
		    // #endif
		},
	
		methods: {
			...mapMutations(["login","setToken"]),
			
			doToken() {
			    const _this = this
			    console.log("重新获取用户数据");
			    _this.getLoginCode(function (code) {
			        var data = {
			            code: code
			        }
			     _this.$api.reqPost('api/yl_user/OnLogin',
				{
					data:{code:_this.code}			
				}).then(res => {
			        if (res.status) {
			            if (res.data.auth) {
			                // _this.$store.commit('token', res.data.auth.token)
			                // _this.$store.commit('hasLogin', true);
							_this.setToken(res.data.auth)
							console.log("检查是否成功将token存进vuex",_this.$store.state);
							// uni.setStorageSync('token',res.data.auth.token)	
							// console.log('输出token',uni.getStorageSync('token'))
			            }
			            if (res.data.user) {
							_this.login(res.data.user)
							console.log("检查是否成功将数据存进vuex",_this.$store.state);
			                // _this.$store.commit('userInfo', res.data.user);
			            }
			            _this.openid = res.otherData;
			            console.log("成功后获取openid：" + _this.$store.state.openid);
			        } else {
			            this.openid = res.otherData;
			            console.log("失败后获取openid：" + _this.openid);
			        }
			    })
			})
		},
			// 获取SessionKey
			// updateSessionKey() {
			// 	this.getLoginCode() //获取微信登录js_code
			// 	// console.log('code=',jsCode)
						
			// },	
			// 获取code
			getLoginCode(callback) {
				uni.login({
					provider: 'weixin',
					success: async (res) => {
						this.code = res.code;
						return callback(res.code)
						// console.log(res)
						// console.log(this.code)
					}
				})
			},
			// get_miyao(){ // 获取密钥 === 需要登录才可以获取密钥
			// 	uni.request({
			// 		    url: 'https://api.weixin.qq.com/sns/jscode2session',// 请求微信服务器
			// 		    method:'GET',
			// 		    data: {
			// 				appid: 'wxc0935a2d2bfeada7',        //你的小程序的APPID
			// 				secret: '1d1f7a68d6bacdad125c35fe9ae9ef21',    //你的小程序秘钥secret,  
			// 				js_code: this.code,    //wx.login 登录成功后的code
			// 				grant_type:'authorization_code'
			// 		    },
			// 		    success: (res) => {
			// 		        console.log('获取信息',res);  // 换取成功后 暂存这些数据 留作后续操作
			// 		        this.openid=res.data.openid    //openid 用户唯一标识
			// 		        this.session_key=res.data.session_key    //session_key  会话密钥
			// 		    }
			// 		});
			// 	},
			boxcheck(n){
				if(this.treaty.length==0){
					this.treatyType=true
				}else{
					this.treatyType=false
				}
			},
			changeTreaty(){
				if (this.treaty.length == 0) {
					// _this.$showToast('请勾选《平台服务协议》《隐私协议》！')
					uni.showToast({
					    title: '请勾选《用户服务协议》《隐私协议》！',
					    icon: 'none',
					    duration: 2000
					})
					// console.log(this.treaty.length)
				}else{
					console.log('no',this.treaty.length)
				}
				
			},
				// toLogin(){
				// 	let _this = this
				// 	_this.$api.reqPost('api/yl_user/OnLogin',
				// 	{
				// 		data:{code:_this.code},
				// 		header: {
				// 			"Connection": "keep-alive",
				// 			"Content-Type":"application/json"
				// 		}
										
				// 	}).then(res => {
						
				// 		 if(res.status){
				// 			console.log(res,'登录成功');
				// 			_this.openid=res.data    //openid 用户唯一标识
				// 			_this.session_key=res.data.session_key    //session_key  会话密钥
				// 			console.log(_this.openid,'1')
				// 			// _this.getUserPhoneNumber(e)
				// 		 }else{
				// 			console.log(res,'登录失败');
				// 		 }
				// 	 })
					
				// },
				
			getUserPhoneNumber(e) {
			let _this = this
			if (e.detail.errMsg == 'getPhoneNumber:ok') {
				console.log(e)
				uni.showToast({
				    title: '登录中',
				    icon: 'loading',
				    mask: true
				})
			    var data = {
			        sessionAuthId: _this.openid,
			        iv: e.detail.iv,
			        encryptedData: e.detail.encryptedData,
					
			    }
			    _this.toGetPhoneNumber(data);
			}else {
			    
				console.log(e)
			}
			    // debugger
			   
			},
			toGetPhoneNumber(data){
				let _this = this
				_this.$api.reqPost('api/yl_user/DecryptPhoneNumber',
				{
					data:data
				}).then(res => {
					 if(res.status){
						  console.log(res,'登录成功');
						 uni.showToast({
						     title: '登录成功',
						     icon: 'loading',
						     duration: 3000
						 })
						 _this.setToken(res.data)
						 // console.log("检查是否成功将数据存进vuex",_this.$store.state);
						 uni.setStorageSync('token',res.data.token)
						 if(res.data.roles == 'driver'){
						    uni.setStorageSync('identify','driver')
						 	uni.reLaunch({ url: '/pages/seizeorders/seizeorders' })
						 }else{
						    uni.setStorageSync('identify','user')
						 	uni.reLaunch({ url: '/pages/index/index' })
						 }
						 // console.log('输出token',uni.getStorageSync('token'))
						 // uni.reLaunch({ url: '/pages/index/index' })
					 }else{
						 uni.showToast({
						     title: '登录失败',
						     icon: 'loading',
						     mask: true
						 })
						  console.log(res,'登录失败');
					 }
				 })
			},
			// 微信获取用户信息
			weichatlogin() {
				let _this = this
				uni.getUserProfile({
					lang: 'zh_CN',
					desc:"获取你的昵称、头像、地区及性别",
					    success: (res) => {
					        _this.info = res.userInfo;
							_this.invitecode= res.iv;
							_this.encryptedData = res.encryptedData;
					        console.log(res)
					        uni.showToast({
					            icon:"none",
					            title:'获取成功'
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
			
			},
		//跳转到短信登录页
		toPhoneLogin(){
			if(this.treaty.length == 0){
				uni.showToast({
					title: '请勾选《用户服务协议》《隐私协议》！',
					icon: 'none',
					duration: 2000
				})
			}else{
				uni.navigateTo({
					url:'/pages/login/phonelogin'
				})
			}
			
		}

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
	.txt1{
		color: green;
		
	}


</style>
