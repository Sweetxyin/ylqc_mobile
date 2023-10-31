<template>
	<view class="container">
		
		<view class="map">
			<map @tap="getMapLocation" style="width: 100vw; height: 650rpx;" :latitude="storeList.lat"
				:longitude="storeList.lng" show-location :markers="covers" enable-3D="true" >
			</map>
		</view>
		
		<view class="store_address">
			<view class="address_top">
				<view class="address_name">
					<text style="padding-left: 15rpx;">{{storeList.address}}</text>
				</view>
			<!-- 	<view class="address_icon">
					<u-icon name="map-fill" color="red" label-color="red" label="定位" labelPos="bottom" labelSize="8" size="16"></u-icon>
				</view> -->
				<view class="address_select">
					<u-button @click="toSelectAddress"  size="mini" type="info">地址选择></u-button>
				</view>
			</view>
			
			<view class="address_bottom">
				<text>{{storeList.fullAddress}}</text>
			</view>
			
		</view>
		
		<u-gap height="15" bgColor="f0ffff"></u-gap>
		
		<view class="strore_item">
			<view class="list">
				<text style="padding-left: 15rpx;">地址备注</text>
				<u--input placeholder="楼层及门牌号码" border="none" inputAlign="right"
				   v-model="storeList.remark" fontSize="28rpx" style="padding-right: 15rpx;"
				 ></u--input>
			</view>
			<view class="list">
				<text style="padding-left: 15rpx;">联系人</text>
				<u--input placeholder="请输入" border="none" inputAlign="right"
				   v-model="storeList.name" fontSize="28rpx" style="padding-right: 15rpx;"
				 ></u--input>
			</view>
			<view class="list">
				<text style="padding-left: 15rpx;">联系电话</text>
				<u--input placeholder="请输入" border="none" inputAlign="right"
				   v-model="storeList.phone" fontSize="28rpx" style="padding-right: 15rpx;"
				 ></u--input>
			</view>
			 
		</view>
		<u-gap height="15" bgColor="f0ffff"></u-gap>
		
		<view class="add_store">
			<u-button @click="editStore" type="primary">提交修改</u-button>
		</view>

		
	
	</view>
</template>

<script>
	// import Map from "../../../components/map/map.vue"
	import QQMapWX from '@/utils/qqmap-wx-jssdk.js'
	const tMap = new QQMapWX({
		key: '3LYBZ-HJBC3-KG73O-R4M44-CXWWH-3ZF46'	// 存入你的key
	})
	export default {
		data() {
			return {
				userid:this.$store.state.userid,//用户ID
				id:'',
				currentLocation:{},
				storeList: [{
					id:'',
					address:'',//地址名称
					fullAddress:'',//地址详细位置
					name:'',//姓名
					phone:'',//电话
					remark:'',//备注
					lat:'',//纬度
					lng:'',//经度
				}],
				storeState:'',
				reportInfo: {
					lgtd: 116.39742,
					lttd: 39.909,
				},
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				//第一组为匹配的垃圾桶
				covers: [
				// 	{
				// 	id:1,
				// 	width: 30,
				// 	height: 30,
				// 	latitude: '',
				// 	longitude: '',
				// 	iconPath: '../../../static/images/index_icon/dw.png'
				// }
				], //存放标记点数组
				isLocated: false, // 是否被定位
				//小区
				plot: {},
				//详细地址
				address: '',
				//地址组成
				addressComponent: {
					city: "",
					district: "",
					nation: "",
					province: "",
					street: "",
					street_number: "",
				},
			}
			
		},
		// components:{
		// 	Map,
			
		// },
		onShow() {
			var self = this
			uni.getStorage({
			  key: 'currentLocation',
			  success: (res) => {
			    self.currentLocation = res.data
				self.storeList.address=res.data.name
				self.storeList.fullAddress = res.data.address
				self.storeList.lat = res.data.latitude
				self.storeList.lng = res.data.longitude
				// self.reportInfo.lttd = res.data.latitude;
				// self.reportInfo.lgtd = res.data.longitude;
				// console.log('1',self.storeList.address)	
				var obj = {
					width: 30,
					height: 30,
					latitude:  res.data.latitude,
					longitude: res.data.longitude,
					iconPath: 'https://www.baexnyqc.cn/images/index_icon/dw.png'
				};
				var arr = [];
				arr.push(obj);
				self.covers = arr;
				console.log(self.coves)
			  }
			});
			
			// var list = {
			// 	width: 30,
			// 	height: 30,
			// 	latitude:  self.storeList.lat,
			// 	longitude: self.storeList.lng,
			// 	iconPath: '../../../static/images/index_icon/dw.png'
			// };
			// var arr1 = [];
			// arr1.push(list);
			// self.covers= arr1
			// self.covers.push({
			// 	latitude:self.storeList.lat,
			// 	longitude:self.storeList.lng
			// });
			console.log("输出的covers",self.covers)
		},
		onLoad(option) {
			
			// console.log("in onload触发，执行getAuthorize")
			// this.getAuthorize(); // 页面第一次加载时就会触发这个方法
			this.id = option.id
			console.log(option.id)
			this.getStore()
			
		},
		methods: {
			//跳转到地址选择页
			// toSelectAddress(){
			// 	uni.navigateTo({
			// 		url:'/pages/storemanage/selectaddress/selectaddress'
			// 	})
			// },
			//获取本条门店信息
			getStore(){
				this.$api.reqPost('api/yl_address/QueryForID',
				{
					params:{id:this.id}
				}).then(res =>{
					if(res.status){
						this.storeList = res.data
						this.covers.latitude = res.data.lat
						this.covers.longitude = res.data.lng
						console.log('获取门店信息成功！',res)
					}else{
						console.log('获取门店信息失败！',res)
					}
				})
			},
			//提交编辑信息
			editStore(){
				var _this = this
				if(_this.storeList.remark==""){
					uni.showToast({
						title:'请填写地址备注！',
						icon: 'none',
					})
				}else if(_this.storeList.name==""){
					uni.showToast({
						title:'请填写联系人！',
						icon: 'none',
					})
				}else if(_this.storeList.phone==""){
					uni.showToast({
						title:'请填写联系电话！',
						icon: 'none',
					})
				}else{
					_this.$api.reqPost('api/yl_address/Update',{
						data:{
							id:_this.id,
							userid:_this.userid,
							address:_this.storeList.address,
							fullAddress:_this.storeList.fullAddress,
							remark:_this.storeList.remark,
							name:_this.storeList.name,
							phone:_this.storeList.phone,
							lat:_this.storeList.lat,
							lng:_this.storeList.lng
							}			
					}).then(res => {
						if(res.status){
							uni.showToast({
								title:'修改门店成功！',
								icon:'none'
							})
							uni.$emit('refresh',{refresh : true});
							uni.navigateBack({
								url:'/pages/storemanage/storemanage'
							})
							console.log('提交成功',res)
						}else{
							uni.showToast({
								title:'修改门店失败！',
								icon:'none'
							})
							console.log('提交失败',res)
						}
					})
				}
			},
			//跳转到地址选择页
			toSelectAddress(){
				uni.getSetting({
				  success: (res) => {
				    if (res.authSetting['scope.userLocation']) { /* 用户授权成功时走这里 */
				      this.handerChooseLocation()
				    } else if (res.authSetting['scope.userLocation'] === undefined) { /* 用户未授权时走这里 */
				      console.log('没有授权')
				      this.handleOpenSetting()
				    } else { /* 用户拒绝了授权后走这里 */
				      console.log('拒绝了授权 false')
				      this.handleOpenSetting()
				    }
				  },
				})
			},
			handerChooseLocation (latitude, longitude) {
			  uni.chooseLocation({
			    latitude: latitude || '',
			    longitude: longitude || '', 
			    success: (res) => {
			      console.log('wx.chooseLocation res=', res)
			      uni.setStorageSync('currentLocation', res)
			    },
			    fail: function (err) {
			      console.log('取消按钮', err)
			    }
			  })
			},
			handleOpenSetting () {
			  wx.openSetting({
			    success: (res) => {
			      console.log('定位 openSetting', res)
			      if (res.authSetting["scope.userLocation"]) {
			        this.handerChooseLocation()
			      }
			    }
			  })
			},
			/**
			 * 获取经纬度并触发回调函数 ========== 调用这个方法 203行
			 * @param {Function} successCb 获取成功回调
			 * @param {Function} authDenyCb 获取失败回调
			 */
			getLocationA(successCb, authDenyCb) {
				const self = this // 将vue实例赋值给self以便调用
				// console.log('触发了getLocationA，参数的值分别是', successCb, authDenyCb);
				// uniapp自带的API == > https://uniapp.dcloud.net.cn/api/location/location.html
				uni.getLocation({ // 这个方法就可以获取定位
					type: 'gcj02', // 'wgs84'默认gps 坐标 'gcj02'国测
					altitude: false, // 是否返回高度
					accuracy: 'best', // 精度值为20m
					geocode: false, // 默认false，是否解析地址信息 === 文档内提示仅app平台支持，这里改为false
					// 接口调用成功的方法 === 正常触发，问题已解决，可以获取用户所在的地址信息
					success(res) {
						console.log('成功获取用户所在地址', res)
						successCb && successCb(res); // 写法很怪，
						self.isLocated = true; // 将isLocated设置为true  表示已获取了用户的当前定位
						//获取经纬度res.latitude 和  res.longitude  ===> 将经纬度赋值给vue变量
						// self.reportInfo.lttd = res.latitude;
						// self.reportInfo.lgtd = res.longitude;
						self.storeList.lat = res.latitude;
						self.storeList.lng = res.longitude;
						//标记地点		====> 猜测是需要在地图上绘制点数
						var obj = {
							width: 30,
							height: 30,
							latitude: Number(self.storeList.lat),
							longitude: Number(self.storeList.lng),
							iconPath: 'https://www.baexnyqc.cn/images/index_icon/dw.png' // 成功绘制
						};
					
						// 这里定位了一个集合， 并将前面给的三个标记点存入 
						var arr = [];
						arr.push(obj);
						self.covers = arr
						//标记点集合赋值个给了vue对象covers == > 打印出来看看
						// self.covers.latitude = self.storeList.lat;
						// self.covers.longitude = self.storeList.lng;
						// console.log('vue对象covers == > 打印出来看看',self.covers );
					},
					fail(err) { // 定位获取失败后的提示
						console.log('获取定位出错', err); // 新增
						if (err.errMsg === 'getLocation:fail 频繁调用会增加电量损耗，可考虑使用 wx.onLocationChange 监听地理位置变化') {
							uni.showToast({
								title: '请勿频繁定位',
								icon: 'none'
							});
						}
						if (err.errMsg === 'getLocation:fail auth deny') {
							// 未授权
							uni.showToast({
								title: '无法定位，请重新获取位置信息',
								icon: 'none'
							})
							authDenyCb && authDenyCb()
							self.isLocated = false;
						}
						if (err.errMsg === 'getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF') {
							uni.showModal({
								content: '请开启手机定位服务',
								showCancel: false
							});
						}
					},
					complete() { // 接口调用结束的回调函数（调用成功、失败都会执行） 
						console.log('进入了complete方法，用户的定位信息：', self.reportInfo)
						// tMap是腾讯地图的对象 === 这边开始调用了
						// 用法查询地址：https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/qqMapwx
						tMap.reverseGeocoder({ // 这个方法的作用 ：提供由坐标到坐标所在位置的文字描述的转换。输入坐标返回地理位置信息和附近poi列表 
							location: { // 位置坐标 发送 获取属性的 
								// latitude: self.reportInfo.lttd,
								// longitude: self.reportInfo.lgtd
								latitude: self.storeList.lat,
								longitude: self.storeList.lng
							},
							// 改用res,data的形式测试接收的结果
							success: function(res) { // 所以，这里返回的结果就是 ： 坐标所在位置的文字描述
								console.log('坐标所在位置的文字描述', res.result);
								// 获取到的参数
								self.plot = res.result.formatted_addresses; // 存入了一个 经过腾讯地图优化过的描述方式，更具人性化特点
								self.address = res.result.address; // 也是一串地址
								// 地址的组成 包含国 省 市 等等。。的详细信息
								self.addressComponent = res.result.address_component;
								// console.log(province);
								self.storeList.address = res.result.formatted_addresses.rough
								self.storeList.fullAddress = res.result.formatted_addresses.standard_address
							},
							fail: function(res) {
								console.log('定位获取错误', res);
							}
							// complete: function(res) { //无论成功失败都会执行  测试后也是获取一样的内容，表示可以注释掉
							// 	console.log('无论成功失败都会执行',res);
							// }
						});
					}
				})
			},
			 
			
			/**
			 * 重新授权并调用定位方法  == 这个方法在电脑调试可以正常运行  在页面onload加载时调用，一解读完毕，
			 * @param {Function} successCb 授权成功回调
			 * @param {Function} authDenyCb 授权失败回调
			 */
			getAuthorize(successCb, authDenyCb) {
				// authorize是uni 的授权方法，一般搭配uni.getSetting和uni.openSetting使用。 稳定地址：https://uniapp.dcloud.net.cn/api/other/authorize.html#authorize
				uni.authorize({
					scope: 'scope.userLocation', // 需要获取权限的 scope，其中scope.userLocation 指地理位置 需要配置小程序弹出时的提示信息
					success: () => {
						this.getLocationA(successCb, authDenyCb); // 授权成功就可以获得当前的定位
					},
					fail: (err) => { // 失败则会调用弹窗提示用户是否进行授权
						err = err['errMsg']
						uni.showModal({
								content: '需要授权位置信息',
								confirmText: '确认授权'
							})
							.then((res) => { // 用户点击同意后，
								if (res[1]['confirm']) { // 看不懂
									uni.openSetting({ // 调起客户端小程序设置界面，返回用户设置的操作结果。 https://uniapp.dcloud.net.cn/api/other/setting.html#opensetting
										success: (res) => {
											if (res.authSetting['scope.userLocation']) {
												// 授权成功
												uni.showToast({
													title: '授权成功',
													icon: 'none'
												})
											} else {
												// 未授权
												uni.showToast({
													title: '授权失败',
													icon: 'none'
												})
											}
											this.getLocationA(successCb, authDenyCb) // 这里也调用了
										}
									})
								}
								if (res[1]['cancel']) {
									// 取消授权
									console.log('取消')
									this.getLocationA(successCb, authDenyCb)
								}
							})
					}
				})
			},
			
			
			//手动动获取定位  这个方法挂在<map>组件的tap事件上  ,可以目标就是通过点击地图更换用户所在的当期那位置
			getMapLocation(target) {
				// console.log('点击了地图', target);
				var that = this;
				// 将获取到的坐标赋值给vue对象
				// that.reportInfo.lttd = target.detail.latitude;
				// that.reportInfo.lgtd = target.detail.longitude;
				that.storeList.lat = target.detail.latitude;
				that.storeList.lng = target.detail.longitude;
				// 加入标记点
				var obj = {
					width: 30,
					height: 30,
					latitude: that.storeList.lat,
					longitude: that.storeList.lng,
					iconPath: 'https://www.baexnyqc.cn/images/index_icon/dw.png'
				};
				var arr = [];
				arr.push(obj);
				that.covers = arr
				// 经过测试 res的报错信息是：chooseLocation:fail the api need to be declared in…e requiredPrivateInfos field in app.json/ext.json
				// console.log('进入chooseLocation的complete:',res);
				console.log('要调用txmap的参数是', that.storeList.lat +','+ that.storeList.lng);
				// 在这边调用了腾讯地图的接口： 和上面方法是一样的作用，将坐标转换为文字描述
				tMap.reverseGeocoder({
					location: {
						// latitude: that.reportInfo.lttd,
						// longitude: that.reportInfo.lgtd
						latitude: that.storeList.lat,
						longitude: that.storeList.lng
					},
					success: function(res) {
						console.log('将坐标转换为文字描述===解析地址成功',res.result.location);
						// 一样的作用，继续将地址信息存入vue对象中             
						//  ====> 但问题是：一直都是获取通用的的地址 
						that.plot = res.result.formatted_addresses;
						that.address = res.result.address;
						that.addressComponent = res.result.address_component;
						let city = res.result.ad_info.city;
						that.storeList.address = res.result.formatted_addresses.rough
						that.storeList.fullAddress = res.result.formatted_addresses.standard_address
						that.storeList.lat = res.result.location.lat;
						that.storeList.lng = res.result.location.lng;
						console.log('参数是', that.storeList.lat +','+ that.storeList.lng);
						// that.covers.latitude =  res.result.location.lat;
						// that.covers.longitude = res.result.location.lng;
						// console.log("输出coves",that.covers)
					},
					fail: function(res) {
						console.log('调用接口失败了', res);
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #f0ffff;
		display: flex;
		flex-direction: column;
		// flex-wrap: wrap;
	
	}
	.map{
		display: flex;
		width: 100%;
		height: 650rpx;
	}
	.store_address{
		// position: relative;
		display: flex;
		width: 94%;
		height: 130rpx;
		background-color:white;
		border-radius: 30rpx;
		flex-direction: column;
		justify-content: space-between;
		margin-left:3%;
		margin-top: 15rpx;
		.address_top{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.address_name{
				font-size: 34rpx;
				font-weight: bold;
				padding-top: 15rpx;
				// flex-direction: row;
			}
			.address_icon{
				padding-left: 12%;
				padding-top: 5rpx;
			}
			.address_select{
				display: flex;
				align-items: center;
				// height: 45rpx;
				// width: 140rpx;
				margin-top: 35rpx;
				margin-right: 15rpx;
				font-size: 28rpx;
			}
		}
		.address_bottom{
			padding: 0 0 15rpx 15rpx;
			font-size: 28rpx;
			color:darkgray;
			font-weight: bold;
			
		}
		
	}
	.strore_item{
		width: 94%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 3%;
		font-size: 26rpx;
		background-color: white;
		border-radius: 30rpx;
		.list{
			height: 65rpx;
			display: flex;
			align-items: center;
			margin-top: 10rpx;
			border-bottom: 2rpx solid #efefef;
		}
	
	}
	.add_store{
		width: 60%;
		height: 80rpx;
		position:fixed;
		bottom:0;
		margin-left: 20%;
		margin-bottom: 5%;
		
	}
	

</style>
