<template>
	<view class="container">
		
		<view class="car_header">
			<u-gap height="10" bgColor="#ffffff"></u-gap>
			
		<!-- 	<view class="swiper">
				<u-swiper
				    :list="swiperImages"
				    @change="change"
					height="200"
					bgColor="transparent"
					
				></u-swiper>
			</view> -->
			 
			 <!-- 首页轮播图 -->
			 <view class="uni_swiper">
			 	
			 	<swiper class="swiper" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			 		<swiper-item v-for="(item,index) in swiperImages" :key="index">
			 			<view class="swiper-item" >
			 				<!-- <image src="https://www.baexnyqc.cn/images/swiper_bg/2.jpg" mode=""></image> -->
			 				<image :src="item"  ></image>
			 			</view>
			 		</swiper-item>
			 		</swiper>
			 </view>
		</view>
		
		<view class="car_list">
			<view class="price">
				<view class="">
					<text style="color: orangered;">￥{{carDetailList.goodprice}}</text>
				</view>
				<!-- <text>定金{{carDetailList.deposit}}</text> -->
				<view class="deposit">
					<text>定金￥{{carDetailList.advance}}</text>
				</view>
			</view>
			
		    <text style="">{{carDetailList.goodname}}</text>
			<u-gap height="3" bgColor="#ffffff"></u-gap>
		</view>
		
		<u-gap height="2" bgColor="#b0e0e6"></u-gap>
		<u-gap height="5" bgColor="#ffffff"></u-gap>
		
		<view class="xq">
			<view class="amount">
				<view class="">
					<text>数量1</text>
				</view>
				
				<view class="">
					<u-number-box v-model="value" @change="valChange" buttonSize="25"></u-number-box>
				</view>
				
			</view>
			<view class="">
				<text>地址:柳州市阳和工业新区和悦路北1号</text>
			</view>
			<view class="contact">
				<text style="padding-top: 10rpx;">联系电话:0772-2082181</text>
			</view>
			<u-gap height="3" bgColor="#ffffff"></u-gap>
		</view>
		<u-gap height="2" bgColor="#b0e0e6"></u-gap>
		<u-gap height="5" bgColor="#ffffff"></u-gap>
		<view class="detail_image"  v-for="(item,index) in goodDescImages" :key="index">
			<image :src="item" mode=""></image>
		</view>
		<u-gap height="58" bgColor="#ffffff"></u-gap>
		<view class="details_btm" @click="placeOrder">
			<view class="an">
				<text>立即支付定金{{totalPrice}}元</text>
			</view>
			
		</view>
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				carDetailList: {
				
					advance:'',
				},
				id:'',
				value: 1,
				totalPrice:'',
				swiperImages:{},
				goodDescImages:{}
			}
			
		},
		onLoad(option) {
			this.id = option.id
			console.log(option.id)
			
		},
		onShow() {
			this.getDetail()
		},
		methods: {
			valChange(e) {
				var sum = e.value * this.carDetailList.advance
				this.totalPrice= sum
				// console.log('当前值为: ' + e.value)
			},
			//获取商品详情
			getDetail(){
				this.$api.reqPost('api/yl_goods/GetYLGoodInfo',
				{
					params:{id:this.id}
				}).then(res =>{
					if(res.status){
						this.carDetailList = res.data
						this.goodDescImages = res.data.gooddescimages_list
						this.swiperImages = res.data.goodimages_list
						this.totalPrice=this.value*this.carDetailList.advance
						console.log('获取商品详情信息成功！',res)
					}else{
						console.log('获取商品详情信息失败！',res)
					}
				})
			},
			placeOrder(){
				uni.navigateTo({
					url: '/pages/shop/place_order/place_order'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		background-color: #ffffff;
	}
	.car_header{
		height: 440rpx;
		width: 90%;
		// background-color: #b0e0e6;
		padding-left: 4.5%;
		font-size: 36rpx;
		font-weight: bold;
		
	}
	
	.car_list{
		
		// height: 300rpx;
		width: 100%;
		padding-left: 10%;
		font-size: 36rpx;
		// font-weight: bold;
		// background-color: #efefef;
	}

	.detail_image{
		width: 100%;
		height: 700rpx;
		padding-left: 10%;
	
	}
	.detail_image image{
		width: 80%;
		height: 100%;
	}
	.details_btm{
		
		width:100%;
		height: 78rpx;
		position:fixed;
		bottom:0;
		// margin-left: 30%;
		background-color: dodgerblue;
		text-align: center;
		color: #ffffff;
		
		font-size: 38rpx;
	
	}
	.an{
		margin-top: 1.8%;
	}
	.details_btm text{
		padding-top: 100rpx;
	}
	.address{
		display: flex;
		flex-direction: row;
		padding-left: 12.5%;
		padding-top: 10rpx;
	}
	.price{
		display: flex;
	}
	.deposit{
		width: 175rpx;
		height: 48rpx;
		background-color: orangered;
		font-size: 28rpx;
		border-radius: 12%;
		margin-left: 20rpx;
		text-align: center;
		color: #ffffff;
	}
	.xq{
		width: 80%;
		padding-left: 10%;
	}
	.amount{
		display: flex;
		justify-content: space-between;
		
	}
	.contact{
		margin-top: 10rpx;
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
</style>
