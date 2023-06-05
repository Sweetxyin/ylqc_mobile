<template>
	<view class="container">
		<u-gap height="10" bgColor="#f0ffff"></u-gap>

		<view class="store_search" >
			<u-search placeholder="搜索地址/姓名/公司名称等" v-model="searchKey" :clearabled="true" :showAction="false"></u-search>
		</view>
		<u-gap height="5" bgColor="#f0ffff"></u-gap>
		
		<view class="store_list" v-for="(item, index) in storeList " :key="index">
			<view class="list_info">
				<view class="item_cname">
					<u-icon name="map-fill"  size="18"></u-icon>
					<text>{{item.companyName}}</text>
				</view>
				<text style="color:darkgray; font-size: 26rpx; padding:13rpx 35rpx 0rpx 0;">{{item.distance}}m</text>
			</view>
			
			<u-gap height="6" bgColor="#ffffff"></u-gap>

			<view>
				<text style="margin-left: 65rpx; font-size: 26rpx;">{{item.address}}</text>
			</view>
			
			<u-gap height="6" bgColor="#ffffff"></u-gap>
			
			<view class="item_name">
				<text style="padding-left: 65rpx; font-size: 26rpx;">{{item.name}}</text>
				<text style="padding-left: 35rpx; font-size: 26rpx;">{{item.phone}}</text>
			</view>
			
			<view class="list_button">
				<u-button type="info" shape="circle" size="small" :plain="true" text="编辑"></u-button>
				<u-button type="info" shape="circle" style="margin-left:15rpx;" size="small" :plain="true" text="删除"></u-button>
			</view>
			
		</view>
		
		<view class="store_button">
			<u-button @click="addStore" type="primary" size="small">添加门店</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchKey: '',//搜索值
				storeList: [{
					companyName:'柳州市延龙汽车有限公司',//公司名称
					distance:'256',//距离
					address:'柳州市鱼峰区工业新区和悦路1号',//地址
					name:'张三',//姓名
					phone:'123456789',//电话
				},   
				{
					companyName:'柳州市延龙汽车有限公司',//公司名称
					distance:'256',//距离
					address:'柳州市鱼峰区工业新区和悦路1号',//地址
					name:'张三',//姓名
					phone:'123456789',//电话
				}],
			}
		},
		methods: {
			addStore(){
				uni.navigateTo({
				    url: '/pages/storemanage/addstore'
				})
			}
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
	.store_search{
		width: 95%;
		// background-color: white;
		margin-left: 2.5%;
	}
	.store_list{
		width:94%;
		background-color: white;
		border-radius: 30rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin-left: 3%;
		margin-top: 15rpx;
	}
	.list_info{
		display: flex;
		width: 94%;
		flex-direction: row;
		padding-left: 10rpx;
		padding-top: 5rpx;
		justify-content: space-between;
	}
	.item_cname{
		margin: 10rpx 0 0 20rpx;
		display: flex;
	}
	.item_name{
		// width: 94%;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #efefef;
	}
	.list_button{
		width:30%;
		display: flex;
		flex-direction: row;
		padding: 10rpx 0 10rpx 60%;
	}
	.store_button{
		width: 40%;
		height: 80rpx;
		position:fixed;
		bottom:0;
		margin-left: 30%;
		margin-bottom: 5%;
	}

</style>
