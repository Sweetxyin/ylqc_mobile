<template>
	<view class="container">
		<view class="invoice_header">
			
		</view>
		<view class="invoice_list" v-for="(item, index) in indexList"
					:key="index">			
			<view class="order_code">
				<u-checkbox-group
				    v-model="checkboxValue"
				    placement="column"
					shape="circle"
					size="18"
				    @change="checkboxChange">
					<u-checkbox
					    :customStyle="{marginBottom: '5px',marginTop:'2px'}"
					    >
					</u-checkbox>
				</u-checkbox-group>
				<text>订单编号：{{item.orderId}}</text>
			</view>
			<view class="order_time">
				<u-icon name="clock-fill"  size="16"></u-icon>
                <text>订单时间：{{item.orderTime}}</text>
			</view>
			<view class="">{{item.startAddress}}</view>
			<view>
			<text class="order_endAddress">{{item.endAddress}}</text>
			<text class="order_price">{{item.price}}元</text>
			</view>
			
		</view>
 
		<!-- 底部 -->
		<view class="invoice_bottom">
			<view class="order_number">
			    <text style="color: #F99B04;">{{order_total}}</text>
			    <text>个订单，共</text>
			    <text style="color: #F99B04;">{{order_price}}</text>
				<text>元</text>
			</view>
			<view class="checkbox_status">
			    <!-- <u-radio-group v-model="value">
			    	<u-radio :customStyle="{marginRight: '10px'}" label="全选"></u-radio>
					<u-radio :customStyle="{marginRight: '15px'}" label="全不选"></u-radio>
			    </u-radio-group> -->
				<u-radio-group
				    v-model="radiovalue"
					size="20"
				    placement="row"
				    @change="groupChange"
					style="padding-left: 10rpx;"
				  >
				    <u-radio
					size="20"
					labelSize="13"
				     :customStyle="{marginLeft: '10rpx',marginRight: '10rpx'}"
				      v-for="(item, index) in radiolist1"
				      :key="index"
				      :label="item.name"
				      :name="item.name"
				      @change="radioChange"
				    >
				    </u-radio>
				  </u-radio-group>
				<view class="next_button">
				    <u-button @click="next_invoice" style="margin-left: 15rpx;" type="primary" size="small" text="下一步"></u-button>
				</view>
			</view>
			 
		</view>
		           
		         
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checkboxValue:[],
				radiovalue:[],
				indexList: [{
					orderId:'123',
					orderTime:'2023.5.17',
					startAddress:'柳州市延龙汽车',
					endAddress:'柳州市万象城',
					price:50
				},{
					orderId:'234',
					orderTime:'2023.5.18',
					startAddress:'柳州市阳和科三考场',
					endAddress:'柳州市地王新天地',
					price:65
					}
				],
				order_total:2,//订单数量
				order_price:115,//订单价格
				radiolist1: [{
				    name: '全页全选',
				    disabled: false
				}, {
				    name: '全部全选',
				    disabled: false
				}],
			
			}
		},
		methods: {
			checkboxChange(n) {
			            console.log('change', n);
			},
			groupChange(n) {
			    console.log('groupChange', n);
			},
			radioChange(n) {
				if(n=="全选"){
					
				}
				console.log('radioChange', n);
			},
			next_invoice(){
				uni.navigateTo({
				    url: '/pages/orderinvoice/invoicing'
				   
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
		background-color: #efefef;
		display: flex;
		flex-direction: column;
	}
	.invoice_list{
		height:190rpx;
		width: 92%;
		background-color: white;
		border-radius: 30rpx;
		margin: 10rpx 0 0 2.5%;
		padding: 10rpx 15rpx 0 13rpx;
		font-size: 26rpx;
		display: flex;
		flex-direction: column;
		line-height: 44rpx;
		.order_code{
			display: flex;
			flex-direction: row;
			font-size: 30rpx;
			font-weight: bold;
		}
		.order_time{
			display: flex;
			flex-direction: row;
		}
		.order_price{
			color:#999999;
			font-size: 36rpx;
			font-weight: bold;
			float: right;
		}
	}
	.invoice_bottom{
		width: 100%;
		height: 160rpx;
		position:fixed;
		bottom:0;
		background-color: white;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		margin-bottom: 2%;
		.order_number{
			width: 94%;
			border-bottom: 1rpx solid #efefef;
			text-align: center;

		}
		.checkbox_status{
			display: flex;
			flex-direction: row;
			// margin: 0rpx 18rpx 0 12rpx;
			margin-bottom: 10rpx;

		}
	}
</style>
