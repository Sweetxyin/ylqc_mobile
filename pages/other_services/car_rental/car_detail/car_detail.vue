<template>
	<view class="container">
		
		<view class="car_header">
			<u-gap height="10" bgColor="#ffffff"></u-gap>
			<text style="padding-left: 25%;">{{carDetailList.name}}</text>
			<u-gap height="5" bgColor="#ffffff"></u-gap>
			<image :src="carDetailList.image" mode=""></image>
			 
		</view>
		<view class="car_list"> 
			<text style="padding-left: 25%;">租金：</text>
			 <text style="color: red; ">{{carDetailList.rent}}</text>
		</view>
		<u-gap height="5" bgColor="#ffffff"></u-gap>
		<view class="detail_image">
			<image :src="carDetailList.deimage" mode=""></image>
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
				carDetailList: {
						id:'2',
					   image:'https://www.baexnyqc.cn//upload/20231219/20231219163755_3943.jpg',
					   name:'纯电动高压清洗车',
					  deimage:'../../../../static/images/tab_icon/xq1.png',
					   rent:'3000-3500/月'
					},
				id:'',
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
			//获取订单详情
			getDetail(){
				this.$api.reqPost('api/yl_orders/QueryForDetail',
				{
					params:{id:this.id}
				}).then(res =>{
					if(res.status){
						this.carDetailList = res.data
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
