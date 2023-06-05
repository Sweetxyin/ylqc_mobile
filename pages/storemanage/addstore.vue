<template>
	<view class="container">
		
		<view class="map">
			<Map></Map>
		</view>
		
		<view class="store_address">
			<view class="address_top">
				<view class="address_name">
					<text style="padding-left: 15rpx;">{{addressName}}</text>
				</view>
				<view class="address_icon">
					<u-icon name="map-fill" color="red" label-color="red" label="定位" labelPos="bottom" labelSize="8" size="16"></u-icon>
				</view>
				<view class="address_select">
					<navigator url="/pages/storemanage/selectaddress" style="">地址选择></navigator>
				</view>
			</view>
			
			<view class="address_bottom">
				<text>{{address}}</text>
			</view>
			
		</view>
		
		<u-gap height="15" bgColor="f0ffff"></u-gap>
		
		<view class="strore_item">
			<view class="list">
				<text style="padding-left: 15rpx;">地址备注</text>
				<u--input placeholder="楼层及门牌号码" border="none" inputAlign="right"
				   v-model="addressNotes" fontSize="26rpx" style="padding-right: 15rpx;"
				 ></u--input>
			</view>
			<view class="list">
				<text style="padding-left: 15rpx;">联系人</text>
				<u--input placeholder="请输入" border="none" inputAlign="right"
				   v-model="contactName" fontSize="26rpx" style="padding-right: 15rpx;"
				 ></u--input>
			</view>
			<view class="list">
				<text style="padding-left: 15rpx;">联系电话</text>
				<u--input placeholder="请输入" border="none" inputAlign="right"
				   v-model="cantactPhone" fontSize="26rpx" style="padding-right: 15rpx;"
				 ></u--input>
			</view>
			 
		</view>
		<u-gap height="15" bgColor="f0ffff"></u-gap>
		
		<view class="add_store">
			<u-button @click="addStore" type="primary" size="small">提交</u-button>
		</view>

		
	
	</view>
</template>

<script>
	import Map from "../../components/map/map.vue"
	export default {
		data() {
			return {
				addressName:'柳州市延龙汽车有限公司',//地址名称
				address:'柳州市鱼峰区工业新区和悦路1号',//地址
				addressNotes:'',//地址备注
				contactName:'',//姓名
				cantactPhone:'',//电话
					
				
			}
		},
		components:{
			Map,
			
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
		// flex-wrap: wrap;
	
	}
	.map{
		display: flex;
		width: 100%;
		height: 650rpx;
	}
	.store_address{
		// position: relative;
		display: flex;
		width: 94%;
		height: 130rpx;
		background-color:white;
		border-radius: 30rpx;
		flex-direction: column;
		justify-content: space-between;
		margin-left:3%;
		margin-top: 15rpx;
		.address_top{
			display: flex;
			flex-direction: row;
			.address_name{
				font-size: 34rpx;
				font-weight: bold;
				padding-top: 15rpx;
				// flex-direction: row;
			}
			.address_icon{
				padding-left: 12%;
				padding-top: 5rpx;
			}
			.address_select{
				height: 45rpx;
				width: 140rpx;
				margin: 18rpx 15rpx 0 25rpx;
				margin-top: 18rpx;
				margin-right: 15rpx;
				border-radius: 30rpx;
				font-size: 28rpx;
				background-color:whitesmoke;
			}
		}
		.address_bottom{
			padding: 0 0 15rpx 15rpx;
			font-size: 28rpx;
			color:darkgray;
			font-weight: bold;
			
		}
		
	}
	.strore_item{
		width: 94%;
		// height: 250rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 3%;
		font-size: 26rpx;
		background-color: white;
		border-radius: 30rpx;
		.list{
			height: 65rpx;
			display: flex;
			align-items: center;
			margin-top: 10rpx;
			border-bottom: 2rpx solid #efefef;
		}
	
	}
	.add_store{
		width: 40%;
		height: 80rpx;
		position:fixed;
		bottom:0;
		margin-left: 30%;
		margin-bottom: 5%;
		
	}
	

</style>
