<template>
	<view class="container">
		<view class="car_header">
			<image src="https://www.baexnyqc.cn/images/indexhtml/images/bg1.png" mode=""></image>
		</view>
		
		<view class="car_list" v-for="(item,index) in carList" :key="index">
			<view class="car_item" @click="toCarDetail(item)">
				<view class="car_image">
					<!-- <image src="../../../static/images/tab_icon/qc1.jpg" mode=""></image> -->
					<image :src="item.goodimage_first" mode=""></image>
				</view>
				<view class="car_font">
					 <text style="font-weight: bold;">名称：{{item.goodname}}</text>
					 <view> <text>品牌：延龙汽车</text> </view>
					 <view> <text>箱体容积：{{item.volume}}</text> </view>
					 <view> <text style="color: red;">租金：{{item.rent}}</text> </view>
				</view>
			</view>
		</view>
		
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				carList: [],
				
			}
			
		},
		onShow() {
			
			this.getCarList()
		},
		methods: {
			//跳转到订单详情页
			toCarDetail(item){
				uni.navigateTo({
					url: '/pages/other_services/car_rental/car_detail/car_detail?id=' + item.id
				})
			},
			//获取商品
			getCarList(){
				this.$api.reqPost('api/yl_goods/GetYLGoodList',{
					data:{
						"page":1,
						"limit": 10,
						"where":"{catId:\"5\"}"
					}
				}).then(res =>{
					if(res.status){
						this.carList = res.data
						
						console.log('获取租车信息成功！',res)
					}else{
						console.log('获取租车信息失败！',res)
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
		height: 300rpx;
		width: 100%;
		display: flex;
		// background-color:#b0e0e6 ;
		border-bottom:2rpx solid #efefef;
		.car_item{
			width: 94%;
			height: 300rpx;
			display: flex;
			flex-direction: row;
			padding-left: 2.5%;
			
			.car_image image{
				width: 280rpx;
				height:250rpx;
				padding-top: 9%;
			}
			.car_font{
				padding-left: 25rpx;
				padding-top: 9%;
				font-size: 36rpx;
			}
		}
	}
	

</style>
