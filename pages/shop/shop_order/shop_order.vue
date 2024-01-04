<template>
   <view class="my-release">
      <view class="bg"></view>
      <view class="tabs">
         <u-tabs
            :list="tabsList" 
            :scrollable='false' 
            lineColor="#3c9cff" 
            :activeStyle="{color:'#3c9cff'}"
            :inactiveStyle="{color:'#898989'}"
            @change="change"
         ></u-tabs>
      </view>
      
	<!-- 根据是否登录显示不同内容 -->
	<view class="order_content">

			<!-- 订单为空时显示 -->
		<view v-if="orderTotal===0" class="order_none">
			<u-empty mode="order" icon="http://cdn.uviewui.com/uview/empty/car.png">
			</u-empty>
		</view>
		<!-- 订单不为空时显示 -->
		<view v-else class="">
			<view  v-for="(item,index) in typeList" :key="index">
				<view class="box-item">
		        <view class="processing_1" @click="toOrderDetail(item)">
		       	<view class="order_status">
		       		<text style="font-size: 28rpx; padding-left: 15rpx; font-weight: bold;">{{item.shoppername}}</text>
		       		<text v-if="item.state==1" style="font-size: 22rpx; padding-right: 10rpx; ">待支付></text>
		       		<text v-if="item.state==2" style="font-size: 22rpx; padding-right: 10rpx; ">待核销></text>
		       		<text v-if="item.state==3" style="font-size: 22rpx; padding-right: 10rpx; ">已完成></text>
		       		<text v-if="item.state==4 || item.state==5" style="font-size: 22rpx; padding-right: 10rpx;">待付款></text>
					<text v-if="item.state==6" style="font-size: 22rpx; padding-right: 10rpx; ">预付已支付></text>
					<text v-if="item.state==7" style="font-size: 22rpx; padding-right: 10rpx; ">退款中></text>
					<text v-if="item.state==8" style="font-size: 22rpx; padding-right: 10rpx; ">已退款></text>
		       	</view>
		       	
		       	<view class="shop_item">
		       		<view class="shop_image">
		       			<image :src="item.goodimage_first" mode=""></image>
		       		</view>
		       		<view class="shop_name">
		       			{{item.itemName}}
		       		</view>
		       		<view class="shop_price">
		       			<text style="color: red;">定金￥{{item.price}}</text>
		       			<view class="">
		       				<text>×{{item.itemNum}}</text>
		       			</view>
		       		</view>
		       	</view>
		       	<view class="order_price">
		       		<text >实付款：</text>
					<text style="color: red;">￥{{item.amount}}</text>
		       	</view>
					
		       
		      
			   </view>
		       
		       <view class="processing_2">
		       	<u-button v-if="item.state==1 || item.state==4 || item.state==5 " type="info" shape="circle" size="small" :plain="true" text="立即支付" @click="toPay(item)"></u-button>
		       	<u-button v-if="item.state==1 || item.state==2 || item.state==4 || item.state==5 || item.state==6 " type="info" shape="circle" style="margin-left:15rpx;" size="small" :plain="true" text="取消订单" @click="cancelOrder(item)"></u-button>
		       	<u-button v-if="item.state==-1 || item.state==8" type="info" shape="circle" style="margin-left:15rpx;" size="small" :plain="true" text="删除订单" @click="doDelete(item)"></u-button>
		       </view>
		        
		     </view>
		  </view>
	  	
	  </view>
      
	  </view>
	  
	  <!-- 未登录显示 -->
	<!--  <view class="noLogin" v-if="hasLogin == false">
	  	
	  	<view class="notext">
	  		<text class="text1">您还没有登录哦！</text>
	  		<view class="submit_button">
	  			<u-button type="primary"  text="去登录" @click="toLogin"></u-button>
	  		</view>
	  	</view>
	  </view> -->

   </view>

</template>
 
<script>
   export default {
      data() {
         return {
			 // hasLogin:this.$store.state.hasLogin,//登录状态
			 userid:this.$store.state.userid,//用户ID
            tabsList: [
               { name: '进行中' },
               { name: '已完成' },
               { name: '已取消' }
            ],
            orderTotal:1,//订单数量
            typeList: '',   //显示的状态列表
			tabIndex:0,
            allList:  [{
				id:'',
				number:'',//订单编号
				state:'',//订单状态
				deliveryTime:'',//订单时间
				sendAddress:'',//始发地址
				receAddress:'',//收件地址
				amount:'',//价格	
			}],
			sourceStr:'',//订单号 
         }
      },
	  onShow(){
		   this.getOrderList()
	  },
      onLoad() {
         
		 this.getOrderList()
		 // this.change(0)
      },
      methods: {
		  // 跳转到登录页
		  toLogin(){
		  	uni.navigateTo({
		  		url:'/pages/login/login'
		  	})
		  },
         change(e) {
            console.log(e); 
			 this.tabIndex=e.index
            // if ( e.index == 0 ) {
            //    this.typeList = this.allList;
            // } else {
               this.typeList = [];
               for (var i = 0; i < this.allList.length; i++) {
                  if ((this.allList[i].state == 1 || this.allList[i].state == 2 || this.allList[i].state == 4 || this.allList[i].state == 5 || this.allList[i].state == 6 || this.allList[i].state == 7) && e.index == 0 ) {
                     console.log(this.allList[i]);
                     this.typeList.push(this.allList[i]);
                  }else if(this.allList[i].state == 3 && e.index == 1 ){
					  console.log(this.allList[i]);
					  this.typeList.push(this.allList[i]);
				  }else if(this.allList[i].state == 8 && e.index == 2 ){
					  console.log(this.allList[i]); 
					  this.typeList.push(this.allList[i]);
				  }
               }
            // }
         },
		 // 获取用户订单信息
		 getOrderList(){
		 	var _this = this
		 	_this.$api.reqPost('api/yl_goods/YLGoodsOrderList',{
		 		params:{status:1}
		 	}).then(res=>{
		 		if(res.status){
		 			if(res.data==null){
		 				_this.orderTotal=0
		 				console.log('获取商城订单信息成功,订单数量为0',res)
		 			}else{
		 				_this.allList=res.data.orders
						// _this.typeList=res.data
		 				_this.orderTotal=res.data.length
						_this.typeList = [];
						for (var i = 0; i < _this.allList.length; i++) {
						   if ((_this.allList[i].state == 1 || _this.allList[i].state == 2 || _this.allList[i].state == 4 || _this.allList[i].state == 5 || _this.allList[i].state == 6 || _this.allList[i].state == 7) && _this.tabIndex == 0 ) {
						      console.log(_this.allList[i]);
						      _this.typeList.push(_this.allList[i]);
						   }else if(_this.allList[i].state == 3 && _this.tabIndex == 1 ){
								console.log(_this.allList[i]);
								_this.typeList.push(_this.allList[i]);
							}else if(_this.allList[i].state == 8 && _this.tabIndex == 2 ){
								console.log(_this.allList[i]);
								_this.typeList.push(_this.allList[i]);
							}
						}
		 				console.log('获取订单信息成功',res)
		 			}
		 		}else{
		 			console.log('获取订单信息失败',res)
		 		}
		 	})
		 },
		 // 修改订单
		 onEditOrder(item){
		 	uni.navigateTo({
		 		url: '/pages/order/orderdetails/orderdetails?number=' + item.number
		 	})
		 },
		 //跳转到订单详情页
		 toOrderDetail(item){
		 	uni.navigateTo({
		 		url: '/pages/order/orderdetails/orderdetails?number=' + item.number
		 	})
		 },
		 // 删除订单
		 doDelete(item){
		 	var _this = this 
		 	uni.showModal({
		 		title:'确定要删除'+item.number+'订单吗？',
		 		success:function(res){
		 			if(res.confirm){
		 				_this.$api.reqPost('api/yl_orders/Delete',{
		 					params:{
		 						number:item.number,
		 						userid:_this.userid
		 					}
		 				}).then(res => {
		 					if(res.status){
		 						console.log('删除订单成功!',res)
		 						uni.showToast({
		 							title:'删除订单成功'
		 						})
		 						_this.getOrderList()
		 					}else{
		 						console.log('删除订单失败!')
		 					}
		 				})
		 	
		 			}else if(res.cancel){
		 				console.log('用户点击取消')
		 			}
		 		}
		 	})
		 },
		 //取消订单
		 cancelOrder(item){
			 var _this = this
			 uni.showModal({
			 	title:'确定要取消'+item.number+'订单吗？',
			 	success:function(res){
			 		if(res.confirm){
			 			_this.$api.reqPost('api/yl_orders/OrderCancel',{
			 				params:{
			 					id:item.id
			 				}
			 			}).then(res => {
			 				if(res.status){
			 					console.log('取消订单成功!',res)
			 					uni.showToast({
			 						title:'取消订单成功'
			 					})
			 					_this.getOrderList()
			 				}else{
			 					console.log('取消订单失败!')
			 				}
			 			})
			 
			 		}else if(res.cancel){
			 			console.log('用户点击取消')
			 		}
			 	}
			 })
		 },
		 //支付
		 toPay(item){
		 	var that = this
		 	that.$api.reqPost('api/yl_user/Pay',{
		 		data:{
		 			ids:item.number,
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
							that.sourceStr=item.number
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
		 	this.$api.reqPost('api/yl_orders/AddOrder',{
		 		params:{
		 			number:this.sourceStr
		 		}
		 	}).then(res=>{
		 		if(res.status){
		 			console.log('确认下单成功',res)
		 			var sta = 1
		 			//确认下单成功后，修改订单状态为1(订单已生成)
		 			this.editOrderState(sta)
		 		}else{
		 			console.log('确认下单失败',res)	
		 		}	
		 	})
		 },
		 //修改订单状态
		 editOrderState(sta){
		 
		 	this.$api.reqPost('api/yl_orders/EditOrder',{
		 		params:{
		 			number:this.sourceStr,
		 			state:sta
		 		}
		 	}).then(res=>{
		 		if(res.status){
		 			console.log('修改订单状态成功',res)
		 		}else{
		 			console.log('修改订单状态失败',res)	
		 		}	
		 	})
		 },
      }
   }
</script>
 
<style lang="scss" scoped>
   .bg {
      position: fixed;
      height: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: #f6f6f6;
      z-index: -1;
   }
   .tabs{
      width: 100%;
      background-color: #FFFFFF;
   }
 
   .box-item{
      background-color: #FFFFFF;
      margin: 20rpx auto;
      padding: 30rpx 32rpx 38rpx 33rpx;
   }
   

   .order_none{
   	width: 100%;
   	height: 1070rpx;
   }
   .noLogin{
   	height: 100%;
   	width: 100%;
   	background-color: #f6f6f6;
   }
   .notext {
   	margin-top: 70%;
   	
   }
   .text1{
   	padding-left:32.5%;
   }
   .submit_button{
   	width: 50%;
   	padding-left: 25%;
   	padding-top: 5%;
   }
   .processing_list{
   	height:300rpx;
   	width: 92%;
   	background-color: white;
   	border-radius: 30rpx;
   	margin: 10rpx 0 0 2.5%;
   	padding: 10rpx 15rpx 0 13rpx;
   	font-size: 26rpx;
   	display: flex;
   	flex-direction: column;
   	line-height: 44rpx;
   }
   .processing_1{
   	border-bottom: 2rpx solid #efefef;
   }
   .order_status{
   	display: flex;
   	justify-content: space-between;
   }
   .order_item{
   	display: flex;
   	flex-direction: row;
   	padding-left: 10rpx;
   	padding-top: 5rpx;
   }
   .item_end{
   	display: flex;
   	justify-content: space-between;
   	padding-bottom: 20rpx;
   }
   .order_price{
   	// color:#999999;
   	font-weight: bold;
	text-align: right;
   	
   }
   .processing_2{
   	width:30%;
   	display: flex;
   	flex-direction: row;
   	padding: 15rpx 0 0 60%;
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
 
</style>
