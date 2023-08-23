<template>
	<view class="">
		<view class="ditu">
			<map style="width:100%;height:100%;" :latitude="latitude" :longitude="longitude" :scale="scale"
				:markers="marker" @markertap="toMap()">
			</map>
		</view>
		<view class="" @click="getLocation">
			获取定位
		</view>
	</view>
</template>

<script>
	import QQMapWX from '@/utils/qqmap-wx-jssdk.min.js'
	export default {
		data() {
			return {
				latitude: '', //纬度
				longitude: '', //经度
				scale: 14, //地图缩放程度
			}
		},
		
		// components:{
		// 	QQMapWX,
		// },
		onShow() {
			this.getLocationInfo()
		},
        onLoad() {
			const location =  this.getLocationInfo();
			this.latitude = location.latitude
			this.longitude = location.longitude
		},
		methods: {
			async getLocationInfo() {
						
			  return new Promise((resolve) => {
			    //位置信息默认数据
			    let location = {
			      longitude: 0,
			      latitude: 0,
			      province: "",
			      city: "",
			      area: "",
			      street: "",
			      address: "",
			    };
			    uni.getLocation({
			      type: "gcj02",
			      success(res) {
			        location.longitude = res.longitude;
			        location.latitude = res.latitude;
			        // 腾讯地图Api
			        const qqmapsdk = new QQMapWX({
			          key: '3LYBZ-HJBC3-KG73O-R4M44-CXWWH-3ZF46'  //这里填写自己申请的key
			        });
			        qqmapsdk.reverseGeocoder({
			          location,
			          success(response) {
			            let info = response.result;
			         console.log(info);
			            location.province = info.address_component.province;
			            location.city = info.address_component.city;
			            location.area = info.address_component.district;
			            location.street = info.address_component.street;
			            location.address = info.address;
									  this.position=info.address
									   console.log("测试",this.position);
			            resolve(location);
			          },
			        });
			      },
			      fail(err) {
			 console.log(err)
			        resolve(location);
			      },
						
			    });
						
			  });
						
			},
			//  async getLocationInfo(){
			// 	const _this = this
			// 	console.log("1")
			// 	uni.authorize({
			// 		scope: 'scope.userLocation',
			// 		success() {
			// 			let location = {
			// 				longitude: _this.longitude,
			// 				latitude: _this.latitude,
			// 				province: "",
			// 				city: "",
			// 				area: "",
			// 				street: "",
			// 				address: "",
			// 			};
			// 			uni.getLocation({
			// 				type: 'gcj02',
			// 				geocode: true,
			// 				success: function(res) {
			// 					uni.setStorageSync('latitude', _this.latitude)
			// 					uni.setStorageSync('longitude', _this.longitude)
			// 					location.longitude = res.longitude;
			// 					location.latitude = res.latitude;
			// 					const qqmapsdk = new QQMapWX({
			// 						key: '3LYBZ-HJBC3-KG73O-R4M44-CXWWH-3ZF46'  //申请的key
			// 					});
			// 					qqmapsdk.reverseGeocoder({
			// 						location,
			// 					    success: function(res) {
			// 							let info = res.result;
			// 							location.province = info.address_component.province;
			// 							location.city = info.address_component.city;
			// 							location.area = info.address_component.district;
			// 							location.street = info.address_component.street;
			// 							location.address = info.address;
			// 							console.log(location);
			//                         },
			// 					});
			// 				},	
			// 				fail: function(err) {
			// 					uni.showToast({
			// 							title: '获取定位失败',
			// 							icon: 'none'
			// 					})
			// 				}
			// 			})
			// 		}
			// 	})
			// },
			
		},
		
	}
</script>
<style scoped>
	.ditu {
		width: 100vw;
		height: 250rpx;
	}
</style>
