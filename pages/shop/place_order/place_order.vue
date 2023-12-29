<template>
	<view class="container">
		<view class="menuTab">
			<view class="menu">
				<view class="menu_item">
					 <u-subsection 
					 :list="list" 
					 mode="button"
					 inactiveColor="#000000"
					 activeColor="#00BAB2" 
					 fontSize="16"
					 :current="subIndex"
					  @change="sectionChange"
					  style=" background-color:transparent;">
					  </u-subsection>
				</view>
			</view>
		</view>
		
		<view class="order_addres">
			<!-- 商家配送 -->
			<view class="delivery" v-show="subIndex==0">
				<view class="">
					<text style="font-size: 33rpx;">暂不支持配送</text>
				</view>
				<u-gap height="7" bgColor="#ffffff"></u-gap>
				<view class="">
					<text style="font-size: 26rpx;">公司地址:柳州延龙汽车有限公司鱼峰区和悦路北1号</text>
				</view>
			</view>
			
			<!-- 到店取货 -->
			<view class="tostore" v-show="subIndex==1">
				<view class="company_addres">
					<view>
						<u-icon name="map-fill"  size="26"></u-icon>
					</view>
					<view><text style="font-size: 33rpx;">{{sendAddress}}</text></view>
					
				</view>
				<u-gap height="7" bgColor="#ffffff"></u-gap>
				<view class="">
					<text style="font-size: 26rpx;">预留电话:{{recePhone}}</text>
				</view>
			</view>
		</view>
		
		<view class="order_info">
			<view class="store_name"><text style="font-size: 33rpx;">柳州延龙汽车有限公司(和悦路)</text></view>
			
			<view class="shop_item">
				<view class="shop_image">
					<image :src="shopList.goodimage_first" mode=""></image>
				</view>
				<view class="shop_name">
					{{shopList.goodname}}
				</view>
				<view class="shop_price">
					<text style="color: red;">定金￥{{shopList.advance}}</text>
					<view class="">
						<text>×{{value}}</text>
					</view>
				</view>
			</view>
			
			<view class="amount">
				<view class=""><text>购买数量</text></view>
				<view class="">
					<u-number-box v-model="value" @change="valChange" buttonSize="25"></u-number-box>
				</view>
			</view>
			
			<view class="item_content">
				<text style="padding-left: 25rpx;">订单备注:</text>
				<view class="content">
					 <u--textarea v-model="remark" placeholder="请输入备注" count height="80" maxlength="300"></u--textarea>
				</view>
				
			</view>
		</view>
		
		
		<view class="details_btm" @click="placeOrder">
			<view class="an">
				<text>共{{value}}件</text>
				<text style="padding-left:50rpx;">合计：</text>
				<text style="color: red;">￥{{totalPrice}}</text>
			</view>
			<view class="submit_button">
				 <u-button @click="addOrder" style="margin-left: 15rpx;" type="primary" size="small" :disabled="disabled" text="提交订单"></u-button>
			</view>
			
		</view>
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				list: ['商家配送', '到店取货'],
				subIndex:0,//导航条索引值
				shopList: {},//商品；列表
				totalPrice:'',//商品总价
				value: 1,//商品数量
				remark:'',//备注
				disabled:false,//提交按钮是否禁用
				userid:this.$store.state.userid,//用户ID
				recePhone:this.$store.state.phone,//收货电话
				id:'',//商品id
				sourceStr:'',//订单号
				sendAddress:'柳州延龙汽车有限公司'
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
			valChange(e) {
				var sum = e.value * this.shopList.advance
				this.totalPrice= sum
				// console.log('当前值为: ' + e.value)
			},
			//获取当前的导航索引，并赋值给subIndex
			sectionChange(index){
				this.subIndex=index
				if(this.shopList.taketype =="1" && this.subIndex==0){
					this.disabled = true
				}else if(this.shopList.taketype =="2" && this.subIndex==1){
					this.disabled = true
				}else if(this.shopList.taketype =="1" && this.subIndex==1){
					this.disabled = false
				}else if(this.shopList.taketype =="2" && this.subIndex==0){
					this.disabled = false
				}
				// console.log(this.subIndex)
			},
			//获取商品详情
			getDetail(){
				this.$api.reqPost('api/yl_goods/GetYLGoodInfo',
				{
					params:{id:this.id}
				}).then(res =>{
					if(res.status){
						this.shopList = res.data
						this.totalPrice=this.value*this.shopList.advance
						if( res.data.taketype=="1"){
							this.subIndex = 1
						}else{
							this.subIndex = 0
						}
						
						console.log('获取商品详情信息成功！',res)
					}else{
						console.log('获取商品详情信息失败！',res)
					}
				})
			},
			
			//下单
			addOrder(){
				
				this.$api.reqPost('api/yl_goods/CreateYLGoodsOrder',{
					data:{
						userid:this.userid,
						orderType:1,
						selfid:0,
						sendAddress:this.sendAddress,
						recePhone:this.recePhone,
						goodsid:this.id,
						price:this.shopList.advance,
						amount:this.totalPrice,
						remark:this.remark,
						itemName:this.shopList.goodname,
						itemNum:this.value,
						paytype:1,
						state:1,
						}			
				}).then(res => {
					if(res.status){
						uni.showToast({
							title:'提交订单成功！',
							icon:'none'
						})
						
						console.log('提交成功',res)
						//订单号赋值
						this.sourceStr = res.data.Ids
						//提交订单后，执行支付功能
						this.toPay()
					}else{
						uni.showToast({
							title:'提交订单失败！',
							icon:'none'
						})
						console.log('提交失败',res)
					}
				})
				
				
			},
			//支付
			toPay(){
				var that = this
				that.$api.reqPost('api/yl_goods/Pay',{
					data:{
						ids:that.sourceStr,
						payment_code:'wechatpay',
						payment_type:1,
						params:{
							trade_type:"JSAPI"
						}
					}
				}).then(res=>{
					if(res.status){
						console.log('测试支付后端接口成功',res)
						uni.requestPayment({
						    provider: 'wxpay',
							timeStamp: res.data.timeStamp,//后端返回的时间戳
							nonceStr: res.data.nonceStr,//后端返回的随机字符串
							package: res.data.package,//后端返回的prepay_id
							signType: 'MD5',
							paySign: res.data.paySign, //后端返回的签名
							success: function (res) {
								//执行确认订单功能
								that.conOrder()
								console.log('success:' + JSON.stringify(res));
								// this.confirmOrder()
								
							},
							fail: function (err) {
								uni.showToast({
									title:'取消支付',
									icon:'none'
								})
								
								console.log('fail:' + JSON.stringify(err));
							}
						});
					}else{
						console.log('支付失败',res)
					}
				})
			},
			//确认下单
			conOrder(){
				this.$api.reqPost('api/yl_goods/AddOrder',{
					params:{
						number:this.sourceStr
					}
				}).then(res=>{
					if(res.status){
						console.log('确认下单成功',res)
					
					}else{
						console.log('确认下单失败',res)	
					}	
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.container{
	position: absolute;
	width: 100%;
	height: 100%;
	// background-color: #f0ffff;
	background-color:#E9FEFF;
		
	}
	.menuTab {
		margin-top: 10rpx;
		padding-left: 10%;
		padding-right: 10%;
		// margin-bottom: 10rpx;
	    background-color: transparent;
		// background-color: #ffffff;
	}
	.menu {
		// margin:-58rpx 0rpx 0rpx 0rpx;
		// z-index: 1;
		
		.menu_item  .u-tabs{
			// width: 100rpx;
		}
	
	}
	.order_addres{
		width: 90%;
		height: 200rpx;
		background-color: #ffffff;
		margin-left: 5%;
		border-radius: 6.5%;
	}
	.delivery{
		padding-top: 5%;
		padding-left:8%;
		
		
	}
	.tostore{
		padding-top: 5%;
		padding-left:8%;
	}
	.company_addres{
		display: flex;
	}
	.order_info{
		width: 90%;
		height: 700rpx;
		background-color: #ffffff;
		margin-top: 20rpx;
		margin-left: 5%;
		border-radius: 6.5%;
		.store_name{
			padding-top: 20rpx;
			padding-left: 25rpx;
		}
	}
	.shop_item{
		width: 100%;
		height: 240rpx;
		display: flex;
		flex-direction: row;
		padding-left: 2.5%;
	}
	.shop_image image{
		width: 250rpx;
		height:210rpx;
		padding-top: 9%;
	}
	.shop_name{
		width: 180rpx;
		padding-left: 25rpx;
		padding-top: 15%;
		font-size: 30rpx;
	}
	.shop_price{
		width: 170rpx;
		padding-left: 4%;
		padding-top: 15%;
		font-size: 30rpx;
		// background-color: red;
	}
	.amount{
		display: flex;
		justify-content: space-between;
		padding-left: 25rpx;
		padding-right: 25rpx;
		
	}
	.item_content{
		height: 200rpx;
		margin-top: 15rpx;

		.content{
			width: 95%;
			padding: 20rpx ;
		}
	}
	.details_btm{
		width:100%;
		height: 98rpx;
		position:fixed;
		bottom:0;
		// margin-left: 30%;
		background-color: #ffffff;
		text-align: center;
		display: flex;
		flex-direction: row;
	}
	.an{
		margin-top: 2.8%;
		padding-left: 15%;
	}
	.submit_button{
		padding-left: 60rpx;
		margin-top: 1.7%;
	}
	.details_btm text{
		padding-top: 100rpx;
	}
</style>
