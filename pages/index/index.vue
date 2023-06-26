<template>

	<view class="container">
		
		<!-- 首页轮播图 -->
		<view class="uni_swiper">
			<swiper  :autoplay="true" :interval="3000" :duration="1000" :circular="true">
				<swiper-item>
					<view class="swiper-item">
						<image src="../../static/images/swiper_bg/2.jpg" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="../../static/images/swiper_bg/3.jpg" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="../../static/images/swiper_bg/4.jpg" mode=""></image>
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
			<view class="" v-if="subIndex===0">
				<Delivery></Delivery>
			</view>
			
			<!-- 客户下单 -->
			<view class="" v-else>
				<Custom></Custom>
			</view>
		</view>			
		
		<!-- 其他服务 -->
		<view class="other_services">
			<view class="services_list">
				<navigator class="services_item" url="/pages/complaint/complaint">
					<image src="../../static/images/index_icon/consultation.png"></image>
					<text>咨询投诉</text>
				</navigator>
			</view>
			<view class="services_list">
				<navigator url="" class="services_item">
					<image src="../../static/images/index_icon/driver.png"></image>
					<text>司机加入</text>
				</navigator>
			</view>
			<view class="services_list">
				<navigator url="" class="services_item">
					<image src="../../static/images/index_icon/business.png"></image>
					<text>商家入驻</text>
				</navigator>
			</view>
			<view class="services_list">
				<navigator url="" class="services_item">
					<image src="../../static/images/index_icon/logistics.png"></image>
					<text>物流加盟</text>
				</navigator>
			</view>
			<view class="services_list">
				<navigator url="" class="services_item">
					<image src="../../static/images/index_icon/recruit.png"></image>
					<text>人才招聘</text>
				</navigator>
			</view>
			<view class="services_list">
				<navigator url="" class="services_item">
					<image src="../../static/images/index_icon/community.png"></image>
					<text>互动社区</text>
				</navigator>
			</view>
		</view>
		
	</view>
</template>

<script>

	import Delivery from "../../components/delivery/delivery.vue"
	import Custom from "../../components/custom-xd/custom-xd.vue"
	
	export default {
		data() {
			return {
				list: ['客户下单', '配送VIP'],
				subIndex:0,//导航条索引值
				
			}
		},
		components:{
			Delivery,
			Custom
		},
		onLoad() {
		
        // this.sectionChange(0)，  
		},
		
		methods: {
			//获取当前的导航索引，并赋值给subIndex
			sectionChange(index){
				this.subIndex=index
				// console.log(this.subIndex)
			},
			// zxts(){
			// 	uni.navigateTo({
			// 	    url: '/pages/complaint/complaint'
			// 	})
			// }
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
	

</style>
