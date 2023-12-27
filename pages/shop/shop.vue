<template>
	<view class="container">
		<view class="car_header">
			<image src="https://www.baexnyqc.cn/images/indexhtml/images/bg1.png" mode=""></image>
		</view>
		<view class="">
			<u-tabs 
				lineWidth="28"
				:activeStyle="{
				color: '#303133',
				fontWeight: 'bold',
				transform: 'scale(1.05)'}" 
				:list="list1" @click="click">
			</u-tabs>
		</view>
		<view class="car_list" v-for="(item,index) in shopList" :key="index">
			<view class="car_item" @click="toCarDetail(item)">
				<view class="car_image">
					<!-- <image src="../../../static/images/tab_icon/qc1.jpg" mode=""></image> -->
					<image :src="item.goodimage_first" mode=""></image>
				</view>
				<view class="car_font">
					 <text style="font-weight: bold;">名称：{{item.goodname}}</text>
					<u-gap height="6" bgColor="#ffffff"></u-gap>
					 <view>
						<!-- <text style="color: red;">厂商指导价：{{item.price}}</text> -->
						<text>厂商指导价：</text>
						<text style="color: red; ">{{item.goodprice}}</text>
					</view>
				</view>
			</view>
		</view>
		
		
	</view>
	<tabbar selectedIndex = 3></tabbar>
</template>

<script>
	export default {
		data() {
			return {
				shopList: [],
				list1: [{}],
				sortId:''
				
			}
			
		},
		onShow() {
			this.getCategory()
			this.getShopList()
		},
		methods: {
			//跳转到订单详情页
			toCarDetail(item){
				uni.navigateTo({
					url: '/pages/shop/shop_detail/shop_detail?id=' + item.id
				})
			},
			
			click(item) {
			    console.log('输出item', item);
				this.sortId = item.id
				this.getShopList()
			},
			//获取商品类别
			getCategory(){
				this.$api.reqPost('api/yl_goods/GetAllCategories').then(res =>{
					if(res.status){
						this.list1 = res.data
						
						console.log('获取商品类别成功！',res)
					}else{
						console.log('获取商品类别失败！',res)
					}
				})
			},  
			//获取商品
			getShopList(){
				var str1 = "{catId:\"";
				var str2 = this.sortId;
				var str4= "\"}"
				var str3 = str1+str2+str4;
				this.$api.reqPost('api/yl_goods/GetYLGoodList',{
					data:{
						"page":1,
						"limit": 10,
						"where":str3
					}
				}).then(res =>{
					if(res.status){
						this.shopList = res.data
						
						console.log('获取商品成功！',res)
					}else{
						console.log('获取商品失败！',res)
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
		height: 400rpx;
		width: 100%;
		// background-color: #b0e0e6;
	}
	.car_header image{
		height: 100%;
		width: 100%;
		// background-color: #b0e0e6;
	}
	.car_list{
		height: 200rpx;
		width: 100%;
		display: flex;
		// background-color:#b0e0e6 ;
		border-bottom:2rpx solid #efefef;
		.car_item{
			width: 94%;
			height: 200rpx;
			display: flex;
			flex-direction: row;
			padding-left: 2.5%;
			
			.car_image image{
				width: 200rpx;
				height:170rpx;
				padding-top: 9%;
			}
			.car_font{
				padding-left: 25rpx;
				padding-top: 9%;
				font-size: 30rpx;
			}
		}
	}
	

</style>
