<template>
	<view class="container">
		<!-- 订单状态标签 -->
		<view class="order_tab">
			  <u-sticky class="tab_list" bgColor="#fff">
			     <u-tabs :list="list1"  :scrollable="false"
				  :current="tabIndex" @change="tabChang" 
				 itemStyle="padding-left: 41px; padding-right:39px; height: 34px;"
				   :activeStyle="{
				         color: '#3c9cff',
				         transform: 'scale(1.05)'
				     }">
				 </u-tabs>
			   </u-sticky>
		</view>
		<!-- 根据状态标签显示不同订单状态内容 -->
		<view class="order_content" v-if="hasLogin == true">
			<!-- 订单进行中 -->
			<view class="order_have" v-if="tabIndex===0">
				<!-- 订单为空时显示 -->
				<view v-if="orderTotal===0" class="order_none">
					<u-empty
					        mode="order"
					        icon="http://cdn.uviewui.com/uview/empty/car.png"
					>
					</u-empty>
				</view>
				
				<!-- 订单数量不为空显示 -->
				<view v-if="orderList.state == 0" class="">
					<!-- <Processing></Processing> -->
					<view class="processing_list" v-for="(item, index) in orderList"
								:key="index">
						<view class="processing_1" @click="toOrderDetail(item)">
							<view class="order_status">
								<text style="font-size: 28rpx; padding-left: 15rpx; font-weight: bold;">订单：{{item.number}}</text>
								<text style="font-size: 22rpx; padding-right: 10rpx; ">{{item.state}}></text>
							</view>
							
							<view class="order_item">
								<u-icon name="clock-fill"  size="14"></u-icon>
							    <text>订单时间：{{item.deliveryTime}}</text>
							</view>
							
							<view class="order_item">
								<u-icon name="car-fill" color="#00cc33" size="16"></u-icon>
								<text>{{item.sendAddress}}</text>
							</view>
							<view class="item_end">
								<view class="order_item">
									<u-icon name="car-fill" color="#dc143c" size="16"></u-icon>
									<text>{{item.receAddress}}</text>
								</view>
							
							<text class="order_price">{{item.amount}}元</text>
							</view>
						</view>
						
						<view class="processing_2">
							<u-button type="info" shape="circle" size="small" :plain="true" text="修改订单" @click="doEditOrder(item)"></u-button>
							<u-button type="info" shape="circle" style="margin-left:15rpx;" size="small" :plain="true" text="取消订单"></u-button>
						</view>
						
					</view>
					
				</view>
			
			</view>
			<!-- 订单已完成 -->
			<view class="order_complete" v-else-if="tabIndex===1">
				<!-- 订单为空时显示 -->
				<view class="order_none" v-if="orderTotal===0 ">
					<u-empty
					        mode="order"
					        icon="http://cdn.uviewui.com/uview/empty/car.png"
					>
					</u-empty>
				</view>
				<!-- 订单数量不为空显示 -->
				<!-- <view v-else class="">
					<Complete></Complete>
				</view> -->
				<view v-if="orderTotal !=0 && orderList.state == 4" class="">
					<!-- <Processing></Processing> -->
					<view class="processing_list" v-for="(item, index) in orderList"
								:key="index">
						<view class="processing_1" @click="toOrderDetail(item)">
							<view class="order_status">
								<text style="font-size: 28rpx; padding-left: 15rpx; font-weight: bold;">订单：{{item.number}}</text>
								<text style="font-size: 22rpx; padding-right: 10rpx; ">{{item.state}}></text>
							</view>
							
							<view class="order_item">
								<u-icon name="clock-fill"  size="14"></u-icon>
							    <text>订单时间：{{item.deliveryTime}}</text>
							</view>
							
							<view class="order_item">
								<u-icon name="car-fill" color="#00cc33" size="16"></u-icon>
								<text>{{item.sendAddress}}</text>
							</view>
							<view class="item_end">
								<view class="order_item">
									<u-icon name="car-fill" color="#dc143c" size="16"></u-icon>
									<text>{{item.receAddress}}</text>
								</view>
							
							<text class="order_price">{{item.amount}}元</text>
							</view>
						</view>
						
						<view class="processing_2">
							<!-- <u-button type="info" shape="circle" size="small" :plain="true" text="修改订单" @click="onEditOrder"></u-button> -->
							<u-button type="info" shape="circle" style="margin-left:15rpx;" size="small" :plain="true" text="删除订单" @click="doDelete(item)"></u-button>
						</view>
						
					</view>
					
				</view>
			</view>
			<!-- 订单已取消 -->
			<view class="order_cancel" v-else>
				<!-- 订单为空时显示 -->
				<view  class="order_none" v-if="orderTotal===0">
					<u-empty
					        mode="order"
					        icon="http://cdn.uviewui.com/uview/empty/car.png"
					>
					</u-empty>
				</view>
				<!-- 订单数量不为空显示 -->
				<view v-else class="">
					<Cancel></Cancel>
				</view>
			</view>
	
		</view>
		
		<!-- 未登录显示 -->
		<view class="noLogin" v-if="hasLogin == false">
			
			<view class="notext">
				<text class="text1">您还没有登录哦！</text>
				<view class="submit_button">
					<u-button type="primary"  text="去登录" @click="toLogin"></u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Processing from "../../components/order-status/order-processing.vue"
	import Complete from "../../components/order-status/order-complete.vue"
	import Cancel from "../../components/order-status/order-cancel.vue"
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				hasLogin:this.$store.state.hasLogin,//登录状态
				userid:this.$store.state.userid,//用户ID
				list1: [{
				     name: '进行中', 
				},{
					name: '已完成',
				}, {
				    name: '已取消'
				}],
				orderList: [{
					id:'',
					number:'',//订单编号
					state:'',//订单状态
					deliveryTime:'',//订单时间
					sendAddress:'',//始发地址
					receAddress:'',//收件地址
					amount:'',//价格
				}],
				tabIndex:0,
				// tabStatus:true
				orderTotal:0,//订单数量
				order_state:1,
			};
		},
		components:{
			Processing,
			Complete,
			Cancel
		},
		onLoad() {
			// this.tabChang(0)
			this.getOrderList()
		},
		methods:{
			// 订单状态tab切换
			tabChang(index){
				this.tabIndex=index.index
			},
			// 跳转到登录页
			toLogin(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},
			// 获取用户订单信息
			getOrderList(){
				var _this = this
				_this.$api.reqPost('api/yl_orders/QueryForUser',{
					params:{userid:_this.userid}
				}).then(res=>{
					if(res.status){
						if(res.data==null){
							_this.orderTotal=0
							console.log('获取订单信息成功,订单数量为0',res)
						}else{
							_this.orderList=res.data
							_this.orderTotal=res.data.length
							// if(res.data.state == 0){
							// 	_this.orderList.state = '待确认'
							// }
							
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
					url: '/pages/order/orderdetails?number=' + item.number
				})
			},
			//跳转到订单详情页
			toOrderDetail(item){
				uni.navigateTo({
					url: '/pages/order/orderdetails?number=' + item.number
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
			}
			
			
		}
	}
</script>

<style lang="scss">
	.container{
		background-color: #efefef;
		height: 100vh;
	}
	.order_tab{
		width: 100%;
		display: flex;
		// justify-content: space-around;
		.tab_list {
			display: flex;
			// justify-content: space-between;
		}
	}
	.order_none{
		width: 100%;
		height: 1070rpx;
	}
	.noLogin{
		height: 100vh;
		width: 100%;
		background-color: #efefef;
		.notext {
			margin-top: 70%;
			.text1{
				padding-left:32.5%;
			}
		}
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
		color:#999999;
		font-weight: bold;
		
	}
	.processing_2{
		width:30%;
		display: flex;
		flex-direction: row;
		padding: 15rpx 0 0 60%;
	}
</style>
