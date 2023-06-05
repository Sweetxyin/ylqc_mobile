<template>
	<view class="container">
		<u-gap height="10" bgColor="#f0ffff"></u-gap>

		<view class="address_content">
			<navigator class="select_city" url="">
				<view class="city">{{city}}</view>
				<view class="select_icon">
					<u-icon name="arrow-right" size="20"></u-icon>
				</view>
			</navigator>
			
			<view class="address_name">
				<u--input placeholder="请输入" border="none" v-model="addressName" inputAlign="left"></u--input>
			</view>
		</view>
		
		<u-gap height="10" bgColor="#f0ffff"></u-gap>
		
		<view class="address_list">
			<view v-for="(item,index) in addressList" :key="index">
				<view class="list_info">
					<view class="item">
						<u-icon name="map-fill"  size="18"></u-icon>
						<text>{{item.addressName}}</text>
					</view>
					<text style="color:darkgray; font-size: 26rpx; padding:13rpx 35rpx 0rpx 0;">{{item.distance}}</text>
				</view>
				<u-gap height="3" bgColor="#ffffff"></u-gap>
				
				<view class="address_bottom">
					<text style="margin-left: 65rpx; font-size: 26rpx;">{{item.address}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				city:'柳州市',//城市
				addressName:'',//地址
				addressList:[{
					addressName:'柳州市延龙汽车有限公司',//地址名称
					address:'柳州市鱼峰区工业新区和悦路1号',//地址
					distance:'12km',//距离
				},{
					addressName:'柳州市延龙科三考场',//地址名称
					address:'柳州市鱼峰区工业新区和悦路1号',//地址
					distance:'12km',//距离
				},
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #f0ffff;
		display: flex;
		flex-direction: column;
	}
	.address_content{
		width: 94%;
		height: 180rpx;
		background-color: white;
		border-radius: 30rpx;
		margin-left: 3%;
		display: flex;
		flex-direction: column;
		.select_city{
			height: 60rpx;
			padding: 15rpx 15rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2rpx solid #efefef;
		}
		.address_name{
			height: 80rpx;
			display: flex;
			align-items: center;
			padding-left: 15rpx;
		}
	}
	.address_list{
		width: 94%;
		height: 780rpx;
		background-color: white;
		border-radius: 30rpx;
		margin-left: 3%;
		display: flex;
		flex-direction: column;
	}
	.list_info{
		display: flex;
		width: 94%;
		flex-direction: row;
		padding-left: 10rpx;
		padding-top: 5rpx;
		justify-content: space-between;
	}
	.item{
		margin: 10rpx 0 0 20rpx;
		display: flex;
	}
	.address_bottom{
		padding-bottom: 15rpx;
		border-bottom: 1rpx solid #efefef;
	}

</style>
