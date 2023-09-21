<template>
	<view class="container">
		<view class="invoice_header">
		</view>
		<view class="invoice_list" v-for="(item, index) in indexList" :key="index">			
			<view class="order_code">
			
				<u-checkbox-group
				    v-model="checkboxValue"
				    placement="column"
					shape="circle"
					size="18"
				    @change="changeitem(item)">
					<u-checkbox
						:label="item.number" :name="item.number" :checked="item.checked"
					    :customStyle="{marginBottom: '5px',marginTop:'2px'}" >
					</u-checkbox>
				</u-checkbox-group>
				<!-- <text>订单编号：{{item.orderId}}</text> -->
			</view>
			<view class="order_time">
				<u-icon name="clock-fill"  size="16"></u-icon>
                <text>订单时间：{{item.createTime}}</text>
			</view>
			<view class="">{{item.sendAddress}}</view>
			<view>
			<text class="order_endAddress">{{item.receAddress}}</text>
			<text class="order_price">{{item.amount}}元</text>
			</view>
			
		</view>
 
		<!-- 底部 -->
		<view class="invoice_bottom">
			<view class="order_number">
			    <text style="color: #F99B04;">{{totalNumber}}</text>
			    <text>个订单，共</text>
			    <text style="color: #F99B04;">{{totalPrice}}</text>
				<text>元</text>
			</view>
			<view class="checkbox_status">
		<!-- 	 <checkbox-group @change="selectAll">
			 	<checkbox :checked="allChecked">全选</checkbox>
			 </checkbox-group> -->
			 <u-checkbox-group
			    v-model="checkboxValue"
			    placement="column"
			 	shape="circle"
			 	size="20"
			    @change="selectAll">
			 	<u-checkbox label="全选" :checked="allChecked"  
				:customStyle="{marginRight: '15px'}">
			 	</u-checkbox>
			 </u-checkbox-group>
				<!-- <u-radio-group
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
				  </u-radio-group> -->
				<view class="next_button">
				    <u-button @click="nextInvoice" style="margin-left: 15rpx;" type="primary" size="small" text="下一步"></u-button>
				</view>
			</view>
			 
		</view>
		           
		         
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId:this.$store.state.userid,
				checkboxValue:[],
				radiovalue:[],
				indexList: [{
					number:'',
					createTime:'',
					sendAddress:'',
					receAddress:'',
					amount:0,
					checked: false,
					// numberBox: 1,
				}
				],

				radiolist1: [
				// 	{
				//     name: '全页全选',
				//     disabled: false
				// }, 
				{
				    name: '全部全选',
				    disabled: false
				}],
				checkList: [], //选中值
				allChecked: false, //是否全选
				// totalNumber:0
			}
		},
		onLoad() {
			this.getOrderInvoice()
			
		},
		//计算
		computed: {
			//计算总价
			totalPrice() {
				let totalPrice = 0
				this.indexList.map(item => {
					item.checked ? totalPrice += 1 * item.amount : totalPrice += 0
				})
				return totalPrice.toFixed(2); // 保留两位小数（否则会价格会出现多位小数）
			},
			//计算总算
			totalNumber() {
				let totalNumber = 0
				this.indexList.map(item => {
					item.checked ? totalNumber += 1 : totalNumber += 0
				})
				return totalNumber; 
			}
		},

		methods: {
			//获取开票订单
			getOrderInvoice(){
				var _this = this
				_this.$api.reqPost('api/yl_orders/QueryInvoice',{
					params:{
						id:this.userId
					}
				}).then(res => {
					if(res.status){
						_this.indexList = res.data
						console.log('获取订单开票信息成功！',res)
						// console.log('输出',_this.indexList.numberBox)
					}else{
						console.log('获取订单开票信息失败！',res)
					}
				})
			},
			//单选
			changeitem(item) {
				item.checked = !item.checked
				if (!item.checked) {
					this.allChecked = false
				} else {
					// 判断每一个商品是否是被选择的状态
					const cartList = this.indexList.every(item => {
						return item.checked === true
					})
					if (cartList) {
						this.allChecked = true
					} else {
						this.allChecked = false
					}
				}
			},			
			//全选，全不选
			selectAll() {
				this.allChecked = !this.allChecked
				if (this.allChecked) {
					this.indexList.map(item => {
						item.checked = true
					})
				} else {
					this.indexList.map(item => {
						item.checked = false
					})
				}
			},
			// groupChange(n) {
			//     console.log('groupChange', n);
			// },
			// radioChange(n) {
			// 	if(n=="全选"){
					
			// 	}
			// 	console.log('radioChange', n);
			// },
			
			//跳转到下一页
			nextInvoice(){
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
