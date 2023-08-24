<template>
	<view class="container">
		<view class="delivery_t">
			<view class="t_item" @click="toSendAddress">
				<view class="item_list">{{sendLocation.sendAddress}}</view>
				<view class="item_md" @click="toSelectStore()">|&nbsp;门店选择</view>
			</view>
			<view class="t_item"  @click="toAddress">
				<view class="item_list" v-if="receAddress!=''">{{receAddress}}</view>
				<view class="item_list" v-else>输入您的目的地</view>
				<view class="item_md" @click="toReceStore()">|&nbsp;门店选择</view>
				<!-- <navigator url="../../pages/storemanage/storemanage" class="item_md">|&nbsp;门店选择</navigator> -->
			</view>
			<view class="add_address">
				<view>添加地址</view>
			</view>
		</view>
		 
		<view class="article_info">
			<form action=""  @submit="formSubmit" >
				<view class="info_t"><text>物品信息</text></view>
				<view class="add_annex">
					<view class="add_t">
						<text style="padding: 10rpx 0 0 10rpx;">添加附件</text>
						<u-radio-group   
						    v-model="radiovalue1"
							size="16"
						    placement="row"
						    @change="groupChange"
							style="padding-left: 10rpx;"
						  >
						    <u-radio
							size="16"
							labelSize="13"
						     :customStyle="{marginLeft: '0rpx'}"
						      v-for="(item, index) in radiolist1"
						      :key="index"
						      :label="item.name"
						      :name="item.name"
						      @change="radioChange"
						    >
						    </u-radio>
						  </u-radio-group>
						<navigator url="" class="add_icon">
							<image src="../../static/images/index_icon/add_annex.png" ></image>
							<text>自动识别物件信息生成订单列表</text>
						</navigator>
					</view>
				
					<view class="download_annex">
						<text>附件模板</text>
						<image src="../../static/images/index_icon/download.png" mode=""></image>
					</view>	
				</view>
				<view class="info_list">
					<view class="info_item">
						<text>物品名称：</text>
						<!-- <input type="text" placeholder="请输入物品名称"> -->
						 <u--input placeholder="请输入物品名称" border="none" inputAlign="right"
						    v-model="itemName" fontSize="26rpx" :disabled="inputStatus"
						  ></u--input>
					</view>
					<view class="info_item">
						<text>预估总重量(kg)：</text>
						<!-- <input type="text" placeholder="请输入总重量"> -->
						<u--input placeholder="请输入总重量" border="none" inputAlign="right"
						   v-model="itemWeight" fontSize="26rpx" :disabled="inputStatus"
						 ></u--input>
					</view>
					<view class="info_item">
						<text>总体积(m²)：</text>
						<!-- <input type="text" placeholder="请输入总体积"> -->
						<u--input placeholder="请输入总体积" border="none" inputAlign="right"
						   v-model="itemVolume" fontSize="26rpx"
						 ></u--input>
					</view>
					<view class="info_item">
						<text>件数：</text>
						<!-- <input type="text" placeholder="请输入件数"> -->
						<u--input placeholder="请输入件数" border="none" inputAlign="right"
						   v-model="itemNum" fontSize="26rpx"
						 ></u--input>
					</view>
					<view class="info_item" @click="show = true">
						<text>预约上门时间：</text>
						<u-datetime-picker  :show="show" v-model="value1" mode="datetime" @confirm="confirm" @cancel="close"></u-datetime-picker>
					    <view>{{ timeValue }}</view>
					</view>
					
				</view>
				
			</form>
	
		</view>
		<view class="delivery_order" v-if="sendLocation.sendAddress!='' && receAddress!=''">
			<view class="price">
				<text style="font-size: 50rpx; font-weight: bold; color:darkorange;">{{ price }}</text>
				<text>元</text>
			</view>
			<view style="font-size: 24rpx;padding-left:20%;">需要搬运请与司机协商，费用面议</view>
			<view class="add_button">
				<u-button type="primary"  text="支付并叫车" @click="addOrder"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import QQMapWX from '@/utils/qqmap-wx-jssdk.min.js' 
	export default {
		name:"custom-xd",
		data() {
			return {
				userid:this.$store.state.userid,//用户ID
				sendLocation:[{
					sendAddress:"",//发件地址
					sendFullAddress:'',//发件详细地址
					sender:'',//发件人
					sendPhone:'',//发件电话号码
					latitude:'',//纬度
					longitude:'',//经度
					address:'',
				}],
				receLocation:[{
					recipient:'',//收件人
					recePhone:'',//收件电话号码
					receAddress:'',//收件地址
					receFullAddress:'',//收件详细地址
					latitude:'',//纬度
					longitude:'',//经度
				}],
				receAddress:'',//收件地址
				remark:'',//备注
				radiolist1: [{
				    name: '是',
				    disabled: false
				}, {
				    name: '否',
				    disabled: false
				}],
				
				show: false,//时间选择状态
				timeValue: '请选择',//时间
				value1: Number(new Date()),//获取当前时间
				inputStatus:false,
				price:'35',//价格
				itemName:"",//物品名称
				itemWeight:"",//物品重量
				itemVolume:"",//物品体积
				itemNum:"",//数量
				isShow:false,
				sendState:1,
				receState:2,
			};
		},
		mounted () {
			this.getLocationInfo() //获取当前定位
			// this.getLocationInfo()
			// 监听事件  
			let that = this
			// uni.$on('upSendData',function(data){
			// 	// that.sendLocation = data
			// 	that.sendLocation.sendAddress = data.addressName
			// 	that.sendLocation.sendFullAddress=data.address
			// 	that.sendLocation.sender = data.contactName
			// 	that.sendLocation.sendPhone = data.cantactPhone
			// 	that.sendLocation.latitude = data.latitude
			// 	that.sendLocation.longitude = data.longitude
			// 	console.log('监听到事件来自 upSendData ，携带参数为：' + that.sendLocation);
			// })
			uni.$on('upSendData',function(data){
				// that.sendLocation = data
				that.sendLocation.sendAddress = data.address
				that.sendLocation.sendFullAddress=data.fullAddress
				that.sendLocation.sender = data.name
				that.sendLocation.sendPhone = data.phone
				that.sendLocation.latitude = data.lat
				that.sendLocation.longitude = data.lng
				console.log('监听到事件来自 upSendData ，携带参数为：' + that.sendLocation.sendAddress);
			})
			uni.$on('upReceData',function(data){
				// that.sendLocation = data
				that.receAddress = data.address
				that.receLocation.receFullAddress=data.fullAddress
				that.receLocation.recipient = data.name
				that.receLocation.recePhone = data.phone
				that.receLocation.latitude = data.lat
				that.receLocation.longitude = data.lng
				console.log('监听到事件来自 upReceData ，携带参数为：' + that.receLocation);
			})	
			   
		},
		methods: {
			// 时间选择
			async confirm(e) {
				this.show = false;
				const timeFormat = uni.$u.timeFormat;
				let timeValue = await timeFormat(e.value, 'yyyy-mm-dd hh:MM');
				this.timeValue = timeValue;
				// console.log(timeValue);
			},
			//关闭时间选择器
			close() {
				this.show = false;
			},
			groupChange(n) {
			    // console.log('groupChange', n);
			},
			radioChange(n) {
				if(n=="是") {
					this.inputStatus=true
					this.wpname=""
				}else{
					this.inputStatus=false
				}
				
			    // console.log('radioChange', n);
			},
			
			//跳转至发货地址选择
			toSendAddress(){
				uni.navigateTo({
					url:'/pages/storemanage/addstore/addstore?sendState=' + this.sendState
				})
			},
			//跳转至收货地址选择
			toAddress(){
				uni.navigateTo({
					url:'/pages/storemanage/addstore/addstore?receState=' + this.receState
				})
			},
			//跳转到门店管理页携带参数发件标识参数
			toSelectStore(){
				uni.navigateTo({
					url: '/pages/storemanage/storemanage?sendState=' + this.sendState
				})
			},
			//跳转到门店管理页携带参数收件标识参数
			toReceStore(){
				uni.navigateTo({
					url: '/pages/storemanage/storemanage?receState=' + this.receState
				})
			},
			//下单
			addOrder(){
				this.$api.reqPost('api/yl_orders/CreateOrder',{
					params:{
						userid:this.userid,
						sender:this.sendLocation.sender,
						sendAddress:this.sendLocation.sendAddress,
						sendFullAddress:this.sendLocation.sendFullAddress,
						sendPhone:this.sendLocation.sendPhone,
						sendLat:this.sendLocation.latitude,
						sendLng:this.sendLocation.longitude,
						recipient:this.receLocation.recipient,
						receAddress:this.receAddress,
						receFullAddress:this.receLocation.receFullAddress,
						recePhone:this.receLocation.recePhone,
						receLat:this.receLocation.latitude,
						receLng:this.receLocation.longitude,
						amount:this.price,
						itemName:this.itemName,
						itemWeight:this.itemWeight,
						itemVolume:this.itemVolume,
						itemNum:this.itemNum,
						deliveryTime:this.timeValue
						}			
				}).then(res => {
					if(res.status){
						uni.showToast({
							title:'提交订单成功！',
							icon:'none'
						})
						
						console.log('提交成功',res)
					}else{
						uni.showToast({
							title:'提交订单失败！',
							icon:'none'
						})
						console.log('提交失败',res)
					}
				})
			},
			
			// 检测是否授权
			checkAuthorization() {
				var that = this
				uni.authorize({
					scope: 'scope.userLocation',
					success() { //1.1 允许授权
						that.getLocationInfo().then(function(value) {
							// that.address = value.address
							that.sendLocation.sendAddress = value.addressName
							that.location = value
							// that.sendLocation.latitude=value.latitude
							// that.sendLocation.longitude=value.longitude
							//保存缓存
							// uni.setStorage({
							//   key:'local',
							//   data:value,
							//   success() {
							//     console.log("用户地址信息已缓存")
							//   }
							// })              
						})
						console.log('成功')
					},
					fail() { //1.2 拒绝授权
						uni.showModal({
							content: '检测到您没打开权限，是否去设置打开？',
							confirmText: "确认",
							cancelText: '取消',
							success: (res) => {
								if (res.confirm) {
									uni.openSetting({
										success: (res) => {
											console.log(res);
											that.getLocationInfo().then(function(value) {											
												// that.address = value.address
												that.location = value
												// that.sendLocation.latitude=value.latitude
												// that.sendLocation.longitude=value.longitude
												
												//保存缓存
												uni.setStorage({
												  key:'local',
												  data:value,
												  success() {
												    console.log("用户地址信息已缓存")
												  }
												}) 
											})
										}
									})
								} else {
									console.log('取消');
									return false;
								}
							}
						})
						return false;
					}
				})
					 
			},			
			//获取位置信息
			async getLocationInfo() {
				return new Promise((resolve) => {
					// uni.showToast({
					// 	icon: "none",
					// 	title: "正在定位中…",
					// 	duration: 500
					// })
					 
					//位置信息默认数据
					let location = {
						longitude: 0,
						latitude: 0,
						province: "",
						city: "",
						area: "",
						street: "",
						address: "",
						addressName:"",
					};
					var that = this
			            
					uni.getLocation({
						type: "gcj02",
						altitude: false,
						isHighAccuracy: true,
						success(res) {
			                //先拿到经度和纬度，后面再用地图转换成具体的地址信息。
							location.longitude = res.longitude;
							location.latitude = res.latitude;
							// that.sendLocation.latitude=res.latitude;
							// that.sendLocation.longitude=res.longitude;
							
							// 腾讯地图Api
							const qqmapsdk = new QQMapWX({
								key: '3LYBZ-HJBC3-KG73O-R4M44-CXWWH-3ZF46' //这里填写自己申请的key，我就不展示了。
							});
							qqmapsdk.reverseGeocoder({
								location,
								success(response) {
									console.log('调用成功',res)
									let info = response.result;
									location.province = info.address_component.province;
									location.city = info.address_component.city;
									location.area = info.address_component.district;
									location.street = info.address_component.street;
									location.addressName = info.address_reference.landmark_l2.title;
									location.address= info.formatted_addresses.standard_address;
									that.sendLocation.sendAddress=info.address_reference.landmark_l2.title;
									that.sendLocation.latitude=info.location.lat
									that.sendLocation.longitude=info.location.lng
									// console.log('1',that.sendLocation.latitude)
									resolve(location);
									
								},
							});
						},
						fail(err) {
						
							if (err.errMsg.indexOf("fail") !== -1) {
								uni.showToast({
									icon: "none",
									title: "您拒绝了定位授权，将无法使用定位功能",
									duration: 1000
								})
								//跳转到手动开启页面
							}
							resolve(location);
						},
					});
				});
			},	
		
		},
				
	}
</script>

<style lang="scss" scoped>
	.delivery_t{
		display: flex;
		flex-direction:column;
		width: 94%;
		// height: 250rpx;
		background-color: white;
		// margin-top: 10rpx;
		margin-left: 3%;
		// border: 1rpx solid #efefef;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		.t_item{
			width: 90%;
			height: 100rpx;
			display: flex;
			background-color: #efefef;
			border: 1rpx solid #efefef;
			border-radius: 30rpx;
			align-content:center;
			justify-content: space-between;
			align-items:center;
			margin-top:15rpx;
			margin-left: 4.5%;
			.item_list{
				display: flex;
				padding-left: 10rpx;
			}
			.item_md{
				font-size: 26rpx;
				padding-right: 10rpx;
			}
		}
		.add_address{
			color: #808069;
			font-size: 22rpx;
			// padding-top: 15rpx;
			padding-left: 20rpx;
			line-height: 60rpx;
		}
	}

	.article_info{
		display: flex;
		width: 94%;
		background-color: white;
		// margin-top: 15rpx;
		margin-left: 3%;
		flex-direction:column;
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		.info_t{
			height: 60rpx;
			width: 100%;
			background-color: #b0e0e6;
			border: 1px solid #b0e0e6;
			border-top-left-radius: 30rpx;
			border-top-right-radius: 30rpx;
			display: flex;
			align-items:center;
			color: white;
			
			// font-size: 20rpx;
		}
		.info_t text{
			padding-left: 3%;
		}
		
		.add_annex{
			display: flex;
			height: 120rpx;
			width: 95%;
			background-color: #efefef;
			padding-top: 10rpx;
			margin-left: 2.5%;
			margin-top: 10rpx;
			flex-direction:column;
			font-size: 26rpx;
			border: 1px solid #efefef;
			border-radius: 30rpx;
			.add_t{
				height: 50rpx;
				width: 100%;
				display: flex;

				.add_icon{
					display: flex;
				}
				.add_icon image{
					width: 55rpx;
					height: 50rpx;
					// margin-left: 15rpx;
				}
				.add_icon text{
					font-size: 22rpx;
					color: #808069;
					padding-top: 10rpx;
				}
			}
			.download_annex{
				height: 50rpx;
				width:25%;
				display: flex;
			    align-self:flex-end;
				margin-top: 20rpx;

			}
			.download_annex text{
				font-size: 20rpx;
				padding-top: 10rpx;
				font-size: 26rpx;
			}
			.download_annex image{
				width: 50rpx;
				height: 50rpx;
			}
		}
		.info_list{
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 94%;
			margin-left: 3%;
			font-size: 26rpx;
			.info_item{
				height: 65rpx;
				display: flex;
				align-items: center;
				margin-top: 10rpx;
				border-bottom: 2rpx solid #efefef;
			}
			.info_item input{
				font-size:26rpx;
			}
		}
		
	}
	.delivery_order{
		display: flex;
		height: 220rpx;
		width: 95%;
		background-color: #ffffff;
		padding-top: 10rpx;
		margin-left: 2.5%;
		margin-top: 10rpx;
		flex-direction:column;
	
		border-radius: 30rpx;
	}
	.price{
		padding-left: 45%;
		padding-top: 10rpx;
	}
	.add_button{
		width: 94%;
		padding: 10rpx 0 0 3%;
	}
</style>
		