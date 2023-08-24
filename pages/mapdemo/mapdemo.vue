<template>
	<view>
		<view class="page-body">
			<view class="page-section page-section-gap map">
				<!-- 地图组件  参数分别是：  longitude，latitude， 表示经纬度
				show-location ：显示带有方向的当前定位点
				markers 表示地图上的标记点  polyline 表示路线 ；enable-3D是否显示3D楼块
				-->
				<map @tap="getMapLocation" style="width: 100vw; height: 800rpx;" :latitude="reportInfo.lttd"
					:longitude="reportInfo.lgtd" :markers="covers" enable-3D="true" >
				</map>
			</view>
			<view class="item">
				<view class="content">
					<view class="desc solid-bottom row-info">
						<view class="text-black margin-top-sm overflow-2 item-title"><text
								class="cuIcon-location text-green text-xxl"></text>您当前所在位置: <text
								class="text-green">{{ plot.rough }}</text></view>
						<view class="text-black text-sm margin-top-sm overflow-2 item-content">
							系统已为您匹配到最近的商家位置
						</view>
						<view class="item-content">
							编号:<text class="text-red">JN00405</text>
							<text style="margin-left: 58rpx;">距您:</text> <text class="text-red">{{distance}}</text>KM
						</view>
						<view class="uni-button-group">
							<button class="uni-button" @click="markertap"
								:styles="{'borderColor':'#678D5D'}">导航</button>
						</view>
					</view>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	import QQMapWX from '@/utils/qqmap-wx-jssdk.js'
	const tMap = new QQMapWX({
		key: '3LYBZ-HJBC3-KG73O-R4M44-CXWWH-3ZF46'	// 存入你的key
	})
	export default {
		data() {
			return {
				content: '（一）将回收价值高的可回收物率先分类投放，如报纸杂志、纸板箱、包装盒、PET塑料瓶、易拉罐等，确保这一类可回收物不被混合垃圾污染。（二）不要将已被污染、潮湿、污渍无法清除的物品投入可回收物收集容器，如被油渍污染的餐盒、食品包装盒等。瓶罐投放前倒空瓶内液体并简单清洗，有瓶盖的不需将瓶盖与瓶体分开投放，确保可回收物收集容器中的其他废品不被污染，尊重和维护他人分类的成果。（三）不确定是否可以回收（或本指引中未明确说明）的废纸、废塑料，在未被污染的情况下，请先投放至可回收物收集容器',
				// 默认坐标北京
				reportInfo: {
					lgtd: 116.39742,
					lttd: 39.909,
				},
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				//第一组为匹配的垃圾桶
				covers: [], //存放标记点数组
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
				distance: 0.1,

			}
		},
		methods: {
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
						self.reportInfo.lttd = res.latitude;
						self.reportInfo.lgtd = res.longitude;
						//标记地点		====> 猜测是需要在地图上绘制点数
						var obj = {
							width: 30,
							height: 30,
							latitude: Number(self.reportInfo.lttd),
							longitude: Number(self.reportInfo.lgtd),
							iconPath: '../../static/images/index_icon/dw.png' // 成功绘制
						};
						//垃圾桶====> 猜测是需要在地图上绘制点数
						var bin = {
							id: "0",
							latitude: Number(24.44379),
							longitude: Number(118.08243),
							width: 20,
							height: 20,
							iconPath: '../../static/images/index_icon/dw.png', // 成功绘制
							title: "垃圾桶"
						};
						// ====> 猜测是需要在地图上绘制点数
						var bin2 = {
							id: "1",
							latitude: Number(24.44879),
							longitude: Number(118.09243),
							width: 20,
							height: 20,
							iconPath: '../../static/images/index_icon/dw.png', // 成功绘制
							title: "垃圾桶"
						}
						// 这个方法是调用了测算距离的方法，算出来了两个经纬度之间的大致举例
						self.distance = self.getMapDistance(
							self.reportInfo.lttd,
							self.reportInfo.lgtd,
							24.44879,
							118.09243
						)
						// 这里定位了一个集合， 并将前面给的三个标记点存入 
						var arr = [];
						arr.push(obj);
						arr.push(bin);
						arr.push(bin2);
						//标记点集合赋值个给了vue对象covers == > 打印出来看看
						self.covers = arr;
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
								latitude: self.reportInfo.lttd,
								longitude: self.reportInfo.lgtd
							},
							// 改用res,data的形式测试接收的结果
							success: function(res) { // 所以，这里返回的结果就是 ： 坐标所在位置的文字描述
								console.log('坐标所在位置的文字描述', res.result);
								// 获取到的参数
								self.plot = res.result
								.formatted_addresses; // 存入了一个 经过腾讯地图优化过的描述方式，更具人性化特点
								self.address = res.result.address; // 也是一串地址
								// 地址的组成 包含国 省 市 等等。。的详细信息
								self.addressComponent = res.result.address_component;
								// console.log(province);
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
				that.reportInfo.lttd = target.detail.latitude;
				that.reportInfo.lgtd = target.detail.longitude;
				// 加入标记点
				var obj = {
					width: 30,
					height: 30,
					latitude: that.reportInfo.lttd,
					longitude: that.reportInfo.lgtd,
					iconPath: '../../static/images/index_icon/dw.png'
				};
				var arr = [];
				arr.push(obj);
				that.covers = arr;
				// 经过测试 res的报错信息是：chooseLocation:fail the api need to be declared in…e requiredPrivateInfos field in app.json/ext.json
				// console.log('进入chooseLocation的complete:',res);
				console.log('要调用txmap的参数是', that.reportInfo);
				// 在这边调用了腾讯地图的接口： 和上面方法是一样的作用，将坐标转换为文字描述
				tMap.reverseGeocoder({
					location: {
						latitude: that.reportInfo.lttd,
						longitude: that.reportInfo.lgtd
					},
					success: function(res) {
						console.log('将坐标转换为文字描述===解析地址成功',res.result.location);
						// 一样的作用，继续将地址信息存入vue对象中    
						//  ====> 但问题是：一直都是获取通用的的地址 
						that.plot = res.result.formatted_addresses;
						that.address = res.result.address;
						that.addressComponent = res.result.address_component;
						let city = res.result.ad_info.city;
					},
					fail: function(res) {
						console.log('调用接口失败了', res);
					}
				});
			},


			//导航到指定位置 ltt lgt ====> 导航点击时触发的按钮
			markertap() {
				let that = this
				//调出地图传入目的地 ltt lgt
				// console.log('1、点击导航要获取用户的位置');
				uni.getLocation({ // 1、点击导航要获取用户的位置
					success: (res) => { // 2、成功时的操作  ==== but 一直进不来这个方法
						// 添加配置解决：https://blog.csdn.net/qq_40047019/article/details/125997964
						uni.openLocation({ // 3、 使用应用内置地图查看位置。  
							// 跳出去以后是可以调用系统自带的导航 并显示以下的位置信息
							latitude: Number(24.44579), // 纬度(必选)
							longitude: Number(118.08243), // 精度 （必选 ，感觉可以用作动态的地址 
							name: '康佰家厦门小药房', // 	位置名 可选
							address: '药店',
							success: (res) => {
								// console.log('成功触发导航', res);
							},
							fail: function() { // 失败触发的方法，不管了 
								uni.showModal({
									title: '错误',
									content: '请检查定位是否打开',
									showCancel: false,
									success: function(res) {
										if (res.confirm) {
											console.log('用户点击确定');
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									}
								})
							}
						});
					},
					fail: (res) => {
						console.log('方法调用失败', res);
					}
				})

			},
			//进行经纬度转换为距离的计算 ===  和下面的方法进行了绑定；也不管他
			Rad(d) {
				return d * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式。
			},

			/*
			 计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
			 默认单位km // 封装好的方法，也不管了
			*/
			getMapDistance(lat1, lng1, lat2, lng2) {
				var radLat1 = this.Rad(lat1);
				var radLat2 = this.Rad(lat2);
				var a = radLat1 - radLat2;
				var b = this.Rad(lng1) - this.Rad(lng2);
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
					Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
				s = s * 6378.137; // EARTH_RADIUS;
				s = Math.round(s * 10000) / 10000; //输出为公里
				//s=s.toFixed(2);
				return s;
			},

		},
		components: {

		},
		onLoad() {
			console.log("in onload触发，执行getAuthorize")
			this.getAuthorize(); // 页面第一次加载时就会触发这个方法
		},
		onShow() {

		},
	}
</script>

<style scoped lang="scss">
	.map {
		border: 9rpx solid #678D5D;
		/* border-radius: 14rpx; */
	}

	.content {
		margin-top: 100rpx;
		width: 100%;
		height: 307rpx;
		border: 11rpx solid #678D5D;
		border-radius: 17rpx;
		/* color: white; */
		background-color: #ffffff;
	}

	.item {
		margin-top: 84rpx;
		border: 5px none #9E9E9E;
		border-radius: 25rpx;
		/* 		margin-left: 25rpx;
		margin-right: 25rpx; */
		box-shadow: 4px 4px 5px #999;
		padding-bottom: 30rpx;
		display: block;
		background-color: var(--white);
		overflow: hidden;
		font-weight: 700;
	}


	.item-title {
		height: 73rpx;
		/* border-bottom: 9rpx solid #678D5D; */
		margin-left: 30rpx;
		margin-right: 30rpx;
		font-size: 28rpx;
		margin-top: -48rpx;
	}

	.item-content {
		height: 62rpx;
		/* border: 3rpx solid #9E9E9E; */
		margin-left: 40rpx;
		margin-right: 40rpx;
		font-size: 34rpx;
		/* text-justify: initial; */
		/* font-style: solid; */
	}

	.uni-button-group {
		/* 		margin-top: 50px; */
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
	}

	.uni-button {
		width: 228rpx;
		padding: 12px 20px;
		font-size: 14px;
		border-radius: 12px;
		line-height: 1;
		margin: 0;
		background-color: #678D5D;
		color: white;
	}

	.sider-img {
		width: 254rpx;
		height: 306rpx;
	}

	.m-footer {
		margin-top: 162rpx;
		margin-left: 482rpx;
	}

	.img-footer {
		margin-top: -50rpx;
		border-bottom: 9rpx solid #678D5D;
		width: 300rpx;
		font-weight: 700;
	}
</style>
