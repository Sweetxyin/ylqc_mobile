<template>

	<view class="container">
		<u-gap height="40" bgColor="#f0ffff"></u-gap>
		<!-- 首页轮播图 -->
		<view class="uni_swiper">
			
			<swiper class="swiper" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
				<swiper-item>
					<view class="swiper-item">
						<!-- <image src="https://www.baexnyqc.cn/images/swiper_bg/2.jpg" mode=""></image> -->
						<image src="https://www.baexnyqc.cn/images/indexhtml/images/bg4.png"  ></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item" @click="zcar">
						<image src="https://www.baexnyqc.cn/images/indexhtml/images/bg1.png"  ></image>
						<!-- <image src="https://www.baexnyqc.cn/images/swiper_bg/3.jpg" mode=""></image> -->
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="https://www.baexnyqc.cn/images/indexhtml/images/bg2.png"  ></image>
						<!-- <image src="https://www.baexnyqc.cn/images/swiper_bg/4.jpg" mode=""></image> -->
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="https://www.baexnyqc.cn/images/indexhtml/images/bg3.png"  ></image>
						<!-- <image src="https://www.baexnyqc.cn/images/swiper_bg/4.jpg" mode=""></image> -->
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
					 inactiveColor="#000000"
					 activeColor="#00BAB2" 
					 fontSize="16"
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
				<view @click="zxts" class="services_item" >
					<!-- <image src="https://www.baexnyqc.cn/images/index_icon/consultation.png"></image> -->
					<u-icon name="kefu-ermai" color="#FA7473" size="32" bold="true"></u-icon>
					<text>咨询投诉</text>
				</view>
			</view>
			<view class="services_list">
				<!-- <navigator url="/pages/authentication/authentication" class="services_item">
					<image src="https://www.baexnyqc.cn/images/index_icon/driver.png"></image>
					<text>司机加入</text>
				</navigator> -->
				<view @click="driverJion" class="services_item">
					<!-- <image src="https://www.baexnyqc.cn/images/index_icon/driver.png"></image> -->
					<u-icon name="car" color="#87CEEB" size="32"  bold="true"></u-icon>
					<text>司机加入</text>
				</view>
			</view>
			<!-- <view class="services_list">
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
			</view> -->
			<view class="services_list">
				<navigator url="/pages/other_services/recruit/recruit" class="services_item">
					<!-- <image src="https://www.baexnyqc.cn/images/index_icon/recruit.png"></image> -->
					<u-icon name="plus-people-fill" color="#F9CE5D" size="32"></u-icon>
					<text>人才招聘</text>
				</navigator>
			</view>
			<view class="services_list">
				<view @click="community"  class="services_item">
					<u-icon name="integral" color="#87CEEB" size="32"></u-icon>
					<!-- <image src="https://www.baexnyqc.cn/images/index_icon/community.png"></image> -->
					<text>互动社区</text>
				</view>
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
				hasLogin:this.$store.state.hasLogin,//登录状态
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
			isLoginAction(){
				if(this.hasLogin==false){
					uni.navigateTo({
						url:'/pages/login/login'
					})
				}else{
					console.log('什么也不做')
				}
			},
			driverJion(){
				if(this.hasLogin==false){
					uni.navigateTo({
						url:'/pages/login/login'
					})
				}else{
					uni.navigateTo({
						url:'/pages/authentication/authentication'
					})
				}
			},
			zxts(){
				if(this.hasLogin==false){
					uni.navigateTo({
						url:'/pages/login/login'
					})
				}else{
					uni.navigateTo({
						url:'/pages/complaint/complaint'
					})
				}
			},
			community(){
				if(this.hasLogin==false){
					uni.navigateTo({
						url:'/pages/login/login'
					})
				}else{
					uni.navigateTo({
						url:'/pages/other_services/community/community'
					})
				}
			},
			zcar(){
				uni.navigateTo({
					url:'/pages/other_services/car_rental/car_rental'
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.container{
		// background-color: #add8e6;
		background-color: #f0ffff;
	}
	.swiper{
		height: 400rpx;
	}
	.swiper-item{
		height:400rpx;
	}
	.swiper-item image{
		width: 100%;
		height: 100%;
	}
	
	.uni_swiper{
		height: 400rpx;
	}
    .menuTab {
		margin-top: 10rpx;
		padding-left: 10%;
		padding-right: 10%;
		margin-bottom: 10rpx;
	    background-color: transparent;
		// background-color: #ffffff;
	}
	.menu {
		// margin:-58rpx 0rpx 0rpx 0rpx;
		// z-index: 1;
		
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
	    	 height: 120rpx;
	    	 display: flex;
	    	 flex-direction: column;
	    	 align-items: center;
	    	 justify-content: center;
	    	 box-sizing: border-box;
	    }
		.services_item image{
			width: 45rpx;
			height: 45rpx;
		}
		.services_item text{
			font-size: 28rpx;
			margin-top: 10rpx;
		}
		.box{
			height:105rpx;
		}

</style>
