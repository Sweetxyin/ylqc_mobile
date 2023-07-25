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
				<view v-else class="">
					<Processing></Processing>
				</view>
			
			</view>
			<!-- 订单已完成 -->
			<view class="order_complete" v-else-if="tabIndex===1">
				<!-- 订单为空时显示 -->
				<view class="order_none" v-if="tabIndex===0">
					<u-empty
					        mode="order"
					        icon="http://cdn.uviewui.com/uview/empty/car.png"
					>
					</u-empty>
				</view>
				<!-- 订单数量不为空显示 -->
				<view v-else class="">
					<Complete></Complete>
				</view>
			</view>
			<!-- 订单已取消 -->
			<view class="order_cancel" v-else>
				<!-- 订单为空时显示 -->
				<view  class="order_none" v-if="tabIndex===0">
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
				userid:this.$store.state.userid,
				list1: [{
				     name: '进行中', 
				},{
					name: '已完成',
				}, {
				    name: '已取消'
				}],
				tabIndex:0,
				// tabStatus:true
				orderTotal:1,//订单数量
				order_state:1,
			};
		},
		components:{
			Processing,
			Complete,
			Cancel
		},
		mounted() {
			// this.tabChang(0)
			this.getOrderList()
		},
		methods:{
			tabChang(index){
				this.tabIndex=index.index
				// console.log(this.tabIndex)
				// console.log("index的值为："+this.tabIndex+"和index"+index.index)
				
			},
			toLogin(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},
			getOrderList(){
				var _this = this
				_this.$api.reqPost('api/yl_orders/QueryForUser',{
					params:{userid:_this.userid}
				}).then(res=>{
					if(res.status){
						console.log('获取订单信息成功',res)
					}else{
						console.log('获取订单信息失败',res)
					}
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.container{
		background-color: #efefef;
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
</style>
