<template>
	<view class="container">
		
		<view class="map">
			<Map></Map>
		</view>
		
		<view class="store_address">
			<view class="address_top">
				<view class="address_name">
					<text style="padding-left: 15rpx;">{{storeList.address}}</text>
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
				<text>{{storeList.fullAddress}}</text>
			</view>
			
		</view>
		
		<u-gap height="15" bgColor="f0ffff"></u-gap>
		
		<view class="strore_item">
			<view class="list">
				<text style="padding-left: 15rpx;">地址备注</text>
				<u--input placeholder="楼层及门牌号码" border="none" inputAlign="right"
				   v-model="storeList.remark" fontSize="28rpx" style="padding-right: 15rpx;"
				 ></u--input>
			</view>
			<view class="list">
				<text style="padding-left: 15rpx;">联系人</text>
				<u--input placeholder="请输入" border="none" inputAlign="right"
				   v-model="storeList.name" fontSize="28rpx" style="padding-right: 15rpx;"
				 ></u--input>
			</view>
			<view class="list">
				<text style="padding-left: 15rpx;">联系电话</text>
				<u--input placeholder="请输入" border="none" inputAlign="right"
				   v-model="storeList.phone" fontSize="28rpx" style="padding-right: 15rpx;"
				 ></u--input>
			</view>
			 
		</view>
		<u-gap height="15" bgColor="f0ffff"></u-gap>
		
		<view class="add_store" v-if="storeState==''">
			<u-button @click="addStore" type="primary">提交</u-button>
		</view>
		<view class="store_button" v-if="storeState=='1'">
			<u-button @click="conSendAddress" type="primary">确认发货地址</u-button>
		</view>
		<view class="store_button" v-if="storeState=='2'">
			<u-button @click="conReceAddress" type="primary">确认收货地址</u-button>
		</view>

		
	
	</view>
</template>

<script>
	import Map from "../../../components/map/map.vue"
	export default {
		data() {
			return {
				userid:this.$store.state.userid,//用户ID
				// addressName:'',//地址名称
				// address:'',//地址
				// addressNotes:'',//地址备注
				// contactName:'',//姓名
				// cantactPhone:'',//电话
				// address:this.$refs.list.address	
				storeList: [{
					id:'',
					address:'',//公司名称
					fullAddress:'',//地址
					name:'',//姓名
					phone:'',//电话
					remark:'',//备注
					lat:'',//纬度
					lng:'',//经度
				}],
				storeState:'',
			}
		},
		components:{
			Map,
			
		},
		onLoad(option) { 
			var self = this
			uni.getStorage({
				key:'local',
				success(res){
					self.storeList.address=res.data.addressName
					self.storeList.fullAddress = res.data.address
					self.storeList.lat = res.data.latitude
					self.storeList.lng = res.data.longitude
					console.log('1',self.storeList)
				}
			})
			// this.address = location.address
			if(option.sendState==1){
				this.storeState = option.sendState
			}else if(option.receState == 2){
				this.storeState = option.receState
			}
			console.log('门店状态',this.storeState)
		},
		methods: {
			//跳转到地址选择页
			toSelectAddress(){
				uni.navigateTo({
					url:'/pages/storemanage/selectaddress/selectaddress'
				})
			},
			//返回上一页携带返回发件地址
			conSendAddress(){
				uni.$emit('upSendData', this.storeList)
				uni.navigateBack({
					delta: 1
				})				
			},
			//返回上一页携带收件地址
			conReceAddress(){
				uni.$emit('upReceData', this.storeList)
				uni.navigateBack({
					delta: 1
				})				
			},
			//提交添加门店
			addStore(){
				var _this = this
				if(_this.storeList.remark==""){
					uni.showToast({
						title:'请填写地址备注！',
						icon: 'none',
					})
				}else if(_this.storeList.name==""){
					uni.showToast({
						title:'请填写联系人！',
						icon: 'none',
					})
				}else if(_this.storeList.phone==""){
					uni.showToast({
						title:'请填写联系电话！',
						icon: 'none',
					})
				}else{
					_this.$api.reqPost('api/yl_address/add',{
						data:{
							userid:_this.userid,
							address:_this.storeList.address,
							fullAddress:_this.storeList.fullAddress,
							remark:_this.storeList.remark,
							name:_this.storeList.name,
							phone:_this.storeList.phone,
							lat:_this.storeList.lat,
							lng:_this.storeList.lng
							}			
					}).then(res => {
						if(res.status){
							uni.showToast({
								title:'添加门店成功成功！',
								icon:'none'
							})
							uni.navigateBack({
								url:'/pages/storemanage/storemanage'
							})
							console.log('提交成功',res)
						}else{
							uni.showToast({
								title:'添加门店失败！',
								icon:'none'
							})
							console.log('提交失败',res)
						}
					})
				}
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
		width: 60%;
		height: 80rpx;
		position:fixed;
		bottom:0;
		margin-left: 20%;
		margin-bottom: 5%;
		
	}
	

</style>
