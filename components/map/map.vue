<template>
	<view class="">
		<view class="ditu">
			<map style="width:100%;height:100%;"
				:latitude="latitude"
				:longitude="longitude"
				:scale="scale"
				:markers="marker"
				 @markertap="toMap()">
			</map>
		</view>
	<!-- 	<view class="" @click="getLocationInfo">
			获取定位{{address}} 
		</view> -->
	</view>
</template>

<script>
	import QQMapWX from '@/utils/qqmap-wx-jssdk.min.js'
	export default {
		name:"map",
		data() {
			return {
				latitude: '', //纬度
				longitude: '', //经度
				marker:[],
				scale: 14, //地图缩放程度
				address:'',
				location:'',
				
			}
		},
		
		// components:{
		// 	QQMapWX,
		// },
		onShow() {
			this.checkAuthorization()
		},
        mounted () {
			this.checkAuthorization() //获取当前定位
			// this.getLocationInfo()
		},
		methods: {
			  // 检测是否授权
			checkAuthorization() {
				var that = this
				uni.authorize({
					scope: 'scope.userLocation',
					success() { //1.1 允许授权
						that.getLocationInfo().then(function(value) {
							// that.address = value.address
							that.location = value
							that.latitude=value.latitude
							that.longitude=value.longitude
							//保存缓存
							uni.setStorage({
							  key:'local',
							  data:value,
							  success() {
							    console.log("用户地址信息已缓存")
							  }
							})              
						})
						console.log('成功')
					},
					fail() { //1.2 拒绝授权
						uni.showModal({
							content: '检测到您没打开权限，是否去设置打开？',
							confirmText: "确认",
							cancelText: '取消',
							success: (res) => {
								if (res.confirm) {
									uni.openSetting({
										success: (res) => {
											console.log(res);
											that.getLocationInfo().then(function(value) {											
												that.address = value.address
												that.location = value
												that.latitude=value.latitude
												that.longitude=value.longitude
												//保存缓存
												uni.setStorage({
												  key:'local',
												  data:value,
												  success() {
												    console.log("用户地址信息已缓存")
												  }
												}) 
											})
										}
									})
								} else {
									console.log('取消');
									return false;
								}
							}
						})
						return false;
					}
				})
						 
			},			
			//获取位置信息
			async getLocationInfo() {
				return new Promise((resolve) => {
					uni.showToast({
						icon: "none",
						title: "正在定位中…",
						duration: 500
					})
						 
					//位置信息默认数据
					let location = {
						longitude: 0,
						latitude: 0,
						province: "",
						city: "",
						area: "",
						street: "",
						address: "",
						addressName:"",
					};
					var that = this
			            
					uni.getLocation({
						type: "gcj02",
						success(res) {
			                //先拿到经度和纬度，后面再用地图转换成具体的地址信息。
							location.longitude = res.longitude;
							location.latitude = res.latitude;
							// 腾讯地图Api
							const qqmapsdk = new QQMapWX({
								key: '3LYBZ-HJBC3-KG73O-R4M44-CXWWH-3ZF46' //这里填写自己申请的key，我就不展示了。
							});
							qqmapsdk.reverseGeocoder({
								location,
								success(response) {
									console.log('调用成功',res)
									let info = response.result;
									location.province = info.address_component.province;
									location.city = info.address_component.city;
									location.area = info.address_component.district;
									location.street = info.address_component.street;
									location.addressName = info.formatted_addresses.recommend;
									location.address= info.formatted_addresses.standard_address
									// that.address=info.address
									// that.latitude=info.latitude
									// that.longitude=info.longitude
									resolve(location);
								},
							});
						},
						fail(err) {
						
							if (err.errMsg.indexOf("fail") !== -1) {
								uni.showToast({
									icon: "none",
									title: "您拒绝了定位授权，将无法使用定位功能",
									duration: 1000
								})
								//跳转到手动开启页面
							}
							resolve(location);
						},
					});
				});
			},			
			  // getMapAddress() {
			  //       const tMap = new QQMapWX({
			  //         key: '3LYBZ-HJBC3-KG73O-R4M44-CXWWH-3ZF46' //开发者密钥
			  //       });
			  //       //使用 uni.getLocation获取用户所在经纬度
			  //       uni.getLocation({
			  //         type: 'wgs84',
			  //         geocode: true,
			  //         success: (res) => {
			  //           console.log("获取经纬度成功");
			  //           this.latitude = res.latitude;
			  //           this.longitude = res.longitude;
			  //         },
			  //         fail: () => {
			  //           console.log("获取经纬度失败");
			  //         },
			  //         complete: () => {
			  //           // 使用腾讯sdk的reverseGeocoder方法 解析经纬度
			  //           tMap.reverseGeocoder({
			  //             location: {
			  //               latitude: this.latitude,
			  //               longitude: this.longitude
			  //             },
			  //             success: function(res) {
			  //               console.log("解析地址成功", res);
			  //               console.log("当前地址：", res.result.address);
			  //               //保存缓存
			  //               uni.setStorage({
			  //                 key:'local',
			  //                 data:res.result.address,
			  //                 success() {
			  //                   console.log("用户地址信息已缓存")
			  //                 }
			  //               })
			  //             },
			  //             fail: function(res) {
			  //               uni.showToast({
			  //                 title: '定位失败',
			  //                 duration: 2000,
			  //                 icon: "none"
			  //               })
			  //               console.log(res);
			  //             },
			  //             complete: function(res) { //无论成功失败都会执行
			  //               wx.switchTab({
			  //                 url: '../appointment/appointment'
			  //               })
			  //             }
			  //           })
			  //         }
			  //       })
			  //     },
		
	
		},
		
	}
</script>
<style scoped>
	.ditu {
		width: 100vw;
		height: 565rpx;
	}
</style>
