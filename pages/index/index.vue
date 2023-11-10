<template>

	<view class="container">
		
		<!-- 首页轮播图 -->
		<view class="uni_swiper">
			<swiper  :autoplay="true" :interval="3000" :duration="1000" :circular="true">
				<swiper-item>
					<view class="swiper-item">
						<image src="https://www.baexnyqc.cn/images/swiper_bg/2.jpg" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="https://www.baexnyqc.cn/images/swiper_bg/3.jpg" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="https://www.baexnyqc.cn/images/swiper_bg/4.jpg" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		
		<!-- 导航条 -->
		<view class="menuTab">
			<view class="menu">
				<view class="menu_item">
					 <u-subsection 
					 :list="list" 
					 mode="button"
					 inactiveColor="#fff"
					 activeColor="#000000" 
					 :current="subIndex"
					  @change="sectionChange"
					  style=" background-color:transparent;">
					  </u-subsection>
				</view>
			</view>
		</view>
		
		<!-- 下单页 -->
		<view class="place_order">
			
			<!-- 配送VIP -->
			<view class="" v-if="subIndex===1">
				<Delivery></Delivery>
			</view>
			
			<!-- 客户下单 -->
			<view class="" v-else>
				<Custom></Custom>
			</view>
		</view>			
<!-- 		
		<view class="">
			当前定位：{{ addressName }}
		</view> -->
		<!-- 其他服务 -->
		<view class="other_services">
			<view class="services_list">
				<navigator class="services_item" url="/pages/complaint/complaint">
					<image src="https://www.baexnyqc.cn/images/index_icon/consultation.png"></image>
					<text>咨询投诉</text>
				</navigator>
			</view>
			<view class="services_list">
				<navigator url="/pages/authentication/authentication" class="services_item">
					<image src="https://www.baexnyqc.cn/images/index_icon/driver.png"></image>
					<text>司机加入</text>
				</navigator>
			</view>
			<view class="services_list">
				<navigator url="" class="services_item">
					<image src="https://www.baexnyqc.cn/images/index_icon/business.png"></image>
					<text>商家入驻</text>
				</navigator>
			</view>
			<view class="services_list">
				<navigator url="" class="services_item">
					<image src="https://www.baexnyqc.cn/images/index_icon/logistics.png"></image>
					<text>物流加盟</text>
				</navigator>
			</view>
			<view class="services_list">
				<navigator url="/pages/mapdemo/demo/demo" class="services_item">
					<image src="https://www.baexnyqc.cn/images/index_icon/recruit.png"></image>
					<text>人才招聘</text>
				</navigator>
			</view>
			<view class="services_list">
				<navigator url="/pages/mapdemo/mapdemo" class="services_item">
					<image src="https://www.baexnyqc.cn/images/index_icon/community.png"></image>
					<text>互动社区</text>
				</navigator>
			</view>
		</view>
		<view class="box">
			
		</view>
	</view>
	<tabbar selectedIndex = 0></tabbar>
</template>

<script>

	import Delivery from "../../components/delivery/delivery.vue"
	import Custom from "../../components/custom-xd/custom-xd.vue"
	import QQMapWX from '@/utils/qqmap-wx-jssdk.min.js' 
	export default {
		data() {
			return {
				list: ['客户下单', '配送VIP'],
				subIndex:0,//导航条索引值
				position:'',
				addressName:'',
				
				
			}
		},
		components:{
			Delivery,
			Custom
		},
		onLoad() {
		// const location =  this.getLocationInfo();
		
		 // this.position = location.address
        // this.sectionChange(0)， 
		 // 显示tabbar
		 // uni.showTabBar()
		 
		},
		
		methods: {
			//获取当前的导航索引，并赋值给subIndex
			sectionChange(index){
				this.subIndex=index
				// console.log(this.subIndex)
			},
			// // 检测是否授权
			// 			checkAuthorization() {
			// 				var that = this
			// 				uni.authorize({
			// 					scope: 'scope.userLocation',
			// 					success() { //1.1 允许授权
			// 						that.getLocationInfo().then(function(value) {
			// 							// that.address = value.address
			// 							that.addressName = value.addressName
			// 							that.location = value
			// 							that.latitude=value.latitude
			// 							that.longitude=value.longitude
			// 							//保存缓存
			// 							uni.setStorage({
			// 							  key:'local',
			// 							  data:value,
			// 							  success() {
			// 							    console.log("用户地址信息已缓存")
			// 							  }
			// 							})              
			// 						})
			// 						console.log('成功')
			// 					},
			// 					fail() { //1.2 拒绝授权
			// 						uni.showModal({
			// 							content: '检测到您没打开权限，是否去设置打开？',
			// 							confirmText: "确认",
			// 							cancelText: '取消',
			// 							success: (res) => {
			// 								if (res.confirm) {
			// 									uni.openSetting({
			// 										success: (res) => {
			// 											console.log(res);
			// 											that.getLocationInfo().then(function(value) {											
			// 												that.address = value.address
			// 												that.location = value
			// 												that.latitude=value.latitude
			// 												that.longitude=value.longitude
			// 												//保存缓存
			// 												uni.setStorage({
			// 												  key:'local',
			// 												  data:value,
			// 												  success() {
			// 												    console.log("用户地址信息已缓存")
			// 												  }
			// 												}) 
			// 											})
			// 										}
			// 									})
			// 								} else {
			// 									console.log('取消');
			// 									return false;
			// 								}
			// 							}
			// 						})
			// 						return false;
			// 					}
			// 				})
			 
			// 			},
			// //获取位置信息
			// 			async getLocationInfo() {
			// 				return new Promise((resolve) => {
			// 					uni.showToast({
			// 						icon: "none",
			// 						title: "正在定位中…",
			// 						duration: 500
			// 					})
			 
			// 					//位置信息默认数据
			// 					let location = {
			// 						longitude: 0,
			// 						latitude: 0,
			// 						province: "",
			// 						city: "",
			// 						area: "",
			// 						street: "",
			// 						address: "",
			// 						addressName:"",
			// 					};
			// 					var that = this
			                        
			// 					uni.getLocation({
			// 						type: "gcj02",
			// 						success(res) {
			//                             //先拿到经度和纬度，后面再用地图转换成具体的地址信息。
			// 							location.longitude = res.longitude;
			// 							location.latitude = res.latitude;
			// 							// 腾讯地图Api
			// 							const qqmapsdk = new QQMapWX({
			// 								key: '3LYBZ-HJBC3-KG73O-R4M44-CXWWH-3ZF46' //这里填写自己申请的key，我就不展示了。
			// 							});
			// 							qqmapsdk.reverseGeocoder({
			// 								location,
			// 								success(response) {
			// 									console.log('调用成功',res)
			// 									let info = response.result;
			// 									location.province = info.address_component.province;
			// 									location.city = info.address_component.city;
			// 									location.area = info.address_component.district;
			// 									location.street = info.address_component.street;
			// 									location.addressName = info.formatted_addresses.recommend;
			// 									location.address= info.formatted_addresses.standard_address
			// 									that.addressName=info.formatted_addresses.recommend;
			// 									// that.latitude=info.latitude
			// 									// that.longitude=info.longitude
			// 									resolve(location);
			// 								},
			// 							});
			// 						},
			// 						fail(err) {
									
			// 							if (err.errMsg.indexOf("fail") !== -1) {
			// 								uni.showToast({
			// 									icon: "none",
			// 									title: "您拒绝了定位授权，将无法使用定位功能",
			// 									duration: 1000
			// 								})
			// 								//跳转到手动开启页面
			// 							}
			// 							resolve(location);
			// 						},
			// 					});
			// 				});
			// 			},
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		// background-color: #add8e6;
		background-color: #f0ffff;
	}
	.swiper-item{
		height: 330rpx;
	}
	.swiper-item image{
		width: 100%;
		height: 100%;
	}
    .menuTab {
		padding-left: 10%;
		padding-right: 10%;
	    background-color: transparent;
	}
	.menu {
		margin:-58rpx 0rpx 0rpx 0rpx;
		z-index: 1;
		.menu_item  .u-tabs{
			// width: 100rpx;
		}

	}
	.other_services{
		width: 93.5%;
		// height: 160rpx;
		display: flex;
		flex-wrap: wrap;
		border:1rpx solid #efefef;
		background-color: white;
		margin-left: 3%;
		margin-top: 10rpx;
		border-radius: 20rpx;
	}	
		.services_list{
			width: 25%;
		}
	    .services_item{
	    	 height: 130rpx;
	    	 display: flex;
	    	 flex-direction: column;
	    	 align-items: center;
	    	 justify-content: center;
	    	 box-sizing: border-box;
	    }
		.services_item image{
			width: 60rpx;
			height: 60rpx;
		}
		.services_item text{
			font-size: 26rpx;
			margin-top: 10rpx;
		}
		.box{
			height:105rpx;
		}

</style>
