<template>
	<view class="container">
		
		<view class="car_header">
			<u-gap height="10" bgColor="#ffffff"></u-gap>
			<text style="padding-left: 42.5%;">{{carDetailList.goodname}}</text>
			<u-gap height="5" bgColor="#ffffff"></u-gap>
			<image :src="carDetailList.goodimage_first" mode=""></image>
			 
		</view>
		<view class="car_list"> 
			<text >租金：</text>
			 <text style="color: red; ">{{carDetailList.rent}}</text>
		</view>
		<u-gap height="5" bgColor="#ffffff"></u-gap>
		<view class="detail_image"  v-for="(item,index) in goodDescImages" :key="index">
			<image :src="item" mode=""></image>
		</view>
		<u-gap height="58" bgColor="#ffffff"></u-gap>
		<view class="details_btm">
			<view class="address">
				<u-icon name="map" color="#ffffff" size="20"></u-icon>
				<text style="font-weight: bold; font-size: 30rpx; color: #ffffff;">地址：柳州市阳和工业新区和悦路1号</text>
			</view>
			<view class="address">
				<u-icon name="phone" color="#ffffff" size="20"></u-icon>
				<text style="font-weight: bold; font-size: 30rpx; color: #ffffff;">联系电话：0772-2082181</text>
			</view>
		</view>
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				carDetailList: {},
				id:'',
				goodDescImages:{},
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
			//获取商品详情
			getDetail(){
				this.$api.reqPost('api/yl_goods/GetYLGoodInfo',
				{
					params:{id:this.id}
				}).then(res =>{
					if(res.status){
						this.carDetailList = res.data
						this.goodDescImages = res.data.gooddescimages_list
				
						console.log('获取租车详情信息成功！',res)
					}else{
						console.log('获取租车详情信息失败！',res)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		background-color: #ffffff;
	}
	.car_header{
		height: 500rpx;
		width: 90%;
		// background-color: #b0e0e6;
		padding-left: 4.5%;
		font-size: 36rpx;
		font-weight: bold;
		
	}
	.car_header image{
		height: 80%;
		width: 100%;
	}
	.car_list{
		// height: 300rpx;
		width: 100%;
		// background-color: #efefef;
		text-align: center;
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
		height: 110rpx;
		position:fixed;
		bottom:0;
		// margin-left: 30%;
		background-color: darkred;
	}
	.address{
		display: flex;
		flex-direction: row;
		padding-left: 12.5%;
		padding-top: 10rpx;
	}

</style>
