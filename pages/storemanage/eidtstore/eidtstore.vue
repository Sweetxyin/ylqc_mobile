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
			<!-- 	<view class="address_icon">
					<u-icon name="map-fill" color="red" label-color="red" label="定位" labelPos="bottom" labelSize="8" size="16"></u-icon>
				</view> -->
				<view class="address_select">
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
		
		<view class="add_store">
			<u-button @click="editStore" type="primary">提交修改</u-button>
		</view>

		
	
	</view>
</template>

<script>
	import Map from "../../../components/map/map.vue"
	export default {
		data() {
			return {
				userid:this.$store.state.userid,//用户ID
				id:'',
				storeList: [{
					id:'',
					address:'',//地址名称
					fullAddress:'',//地址详细位置
					name:'',//姓名
					phone:'',//电话
					remark:'',//备注
					lat:'',//纬度
					lng:'',//经度
				}],
			}
			
		},
		components:{
			Map,
			
		},
		onLoad(option) {
			this.id = option.id
			console.log(option.id)
			this.getStore()
			
		},
		methods: {
			//跳转到地址选择页
			toSelectAddress(){
				uni.navigateTo({
					url:'/pages/storemanage/selectaddress/selectaddress'
				})
			},
			//获取本条门店信息
			getStore(){
				this.$api.reqPost('api/yl_address/QueryForID',
				{
					params:{id:this.id}
				}).then(res =>{
					if(res.status){
						this.storeList = res.data
						console.log('获取门店信息成功！',res)
					}else{
						console.log('获取门店信息失败！',res)
					}
				})
			},
			editStore(){
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
					_this.$api.reqPost('api/yl_address/Update',{
						data:{
							id:_this.id,
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
								title:'修改门店成功！',
								icon:'none'
							})
							uni.$emit('refresh',{refresh : true});
							uni.navigateBack({
								url:'/pages/storemanage/storemanage'
							})
							console.log('提交成功',res)
						}else{
							uni.showToast({
								title:'修改门店失败！',
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
			flex-direction: row;
			justify-content: space-between;
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
			font-size: 28rpx;
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
