<template>
	<view class="container">
		
		<view class="map">
			<Map></Map>
		</view>
		
		<view class="store_address">
			<view class="address_top">
				<view class="address_name">
					<text style="padding-left: 15rpx;">{{sendLocation.addressName}}</text>
				</view>
				<!-- <view class="address_icon">
					<u-icon name="map-fill" color="red" label-color="red" label="定位" labelPos="bottom" labelSize="8" size="16"></u-icon>
				</view> -->
				<view class="address_select">
					<!-- <navigator url="/pages/storemanage/selectaddress" style="">地址选择></navigator> -->
					<u-button @click="toSelectAddress"  size="mini" type="info">地址选择></u-button>
				</view>
			</view>
			
			<view class="address_bottom">
				<text>{{sendLocation.address}}</text>
			</view>
			
		</view>
		
		<u-gap height="15" bgColor="f0ffff"></u-gap>
		
		<view class="strore_item">
			<view class="list">
				<text style="padding-left: 15rpx;">地址备注</text>
				<u--input placeholder="楼层及门牌号码" border="none" inputAlign="right"
				   v-model="sendLocation.addressNotes" fontSize="32rpx" style="padding-right: 15rpx;"
				 ></u--input>
			</view>
			<view class="list">
				<text style="padding-left: 15rpx;">联系人</text>
				<u--input placeholder="姓名" border="none" inputAlign="right"
				   v-model="sendLocation.contactName" fontSize="32rpx" style="padding-right: 15rpx;"
				 ></u--input>
			</view>
			<view class="list">
				<text style="padding-left: 15rpx;">联系电话</text>
				<u--input placeholder="联系电话" border="none" inputAlign="right"
				   v-model="sendLocation.cantactPhone" fontSize="32rpx" style="padding-right: 15rpx;"
				 ></u--input>
			</view>
			 
		</view>
		<u-gap height="15" bgColor="f0ffff"></u-gap>
		
		<view class="add_store">
			<u-button @click="conSendAddress" type="primary">确认发货地址</u-button>
		</view>

		
	
	</view>
</template>

<script>
	import Map from "../../../components/map/map.vue"
	export default {
		data() {
			return {
				userid:this.$store.state.userid,//用户ID
				
				sendLocation:[{
					addressName:'',//地址名称
					address:'',//地址
					addressNotes:'',//地址备注
					contactName:'',//姓名
					cantactPhone:'',//电话
					latitude:'',//纬度
					longitude:'',//经度
				}],
				// address:this.$refs.list.address	
				
			}
		},
		components:{
			Map,
			
		},
		onLoad() { 
			var self = this
			uni.getStorage({
				key:'local',
				success(res){
					self.sendLocation.addressName=res.data.addressName
					self.sendLocation.address = res.data.address
					self.sendLocation.latitude = res.data.latitude
					self.sendLocation.longitude = res.data.longitude
					console.log('1',res.data)
				}
			})
			
		},
		methods: {
			//跳转到地址选择页
			toSelectAddress(){
				uni.navigateTo({
					url:'/pages/storemanage/selectaddress/selectaddress'
				})
			},
			
			conSendAddress(){
				uni.$emit('upSendData', this.sendLocation)
				uni.navigateBack({
					delta: 1
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
		// flex-wrap: wrap;
	
	}
	.map{
		display: flex;
		width: 100%;
		height: 580rpx;
	}
	.store_address{
		// position: relative;
		display: flex;
		width: 94%;
		height: 140rpx;
		background-color:white;
		border-radius: 30rpx;
		flex-direction: column;
		justify-content: space-between;
		margin-left:3%;
		margin-top: 15rpx;
		.address_top{
			display: flex;
			// flex-direction: row;
			justify-content: space-between;
			.address_name{
				font-size: 28rpx;
				font-weight: bold;
				padding-top: 15rpx;
				// flex-direction: row;
			}
			.address_select{
				display: flex;
				align-items: center;
				// height: 45rpx;
				// width: 140rpx;
				margin-top: 35rpx;
				margin-right: 15rpx;
				font-size: 28rpx;
			}
		}
		.address_bottom{
			padding: 0 0 15rpx 15rpx;
			font-size:26rpx;
			color:darkgray;
			font-weight: bold;
			
		}
		
	}
	.strore_item{
		width: 94%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 3%;
		font-size: 34rpx;
		background-color: white;
		border-radius: 30rpx;
		.list{
			height: 80rpx;
			display: flex;
			align-items: center;
			margin-top: 10rpx;
			border-bottom: 2rpx solid #efefef;
		}
	
	}
	.add_store{
		width: 60%;
		height: 80rpx;
		position:fixed;
		bottom:0;
		margin-left: 20%;
		margin-bottom: 5%;
		
	}
	

</style>
