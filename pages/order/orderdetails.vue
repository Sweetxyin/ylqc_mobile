<template>
	<view class="container">
		<!-- 地图 -->
		<view class="order_map">
			<orderMap></orderMap>
		</view>
		<!-- 服务信息 -->
		<view class="serve_info">
			<!-- 司机信息 -->
			<view class="driver_info">
				<!-- 司机头像 -->
				<view class="driver_avatar">
					<u-avatar size="45" :src="avatarSrc"></u-avatar>
				</view>
				<!-- 其他信息 -->
				<view class="driver_item">
					<text>{{licensePlate}}</text>
					<view class="info_s">
						<text style="padding-right: 16rpx;">{{driverName}}</text>
						<u-icon name="star-fill" color="orange" size="18"></u-icon>
						<text>{{score}}</text>				
					</view>
				</view>
			</view>
			<!-- 其他服务 -->
			<view class="serve">
				<u-grid class="grid" :border="false" col="4">
				    <u-grid-item  v-for="(listItem,listIndex) in list" :key="listIndex">
				        <u-icon :customStyle="{paddingTop:15+'rpx'}"
				            :name="listItem.name" :size="26"></u-icon>
				        <text style="font-size: 26rpx;">{{listItem.title}}</text>
				    </u-grid-item>
				</u-grid>
			</view>
		</view>
		<!-- 间隔槽 -->
		<u-gap height="15" bgColor="#efefef"></u-gap>
		
		<!-- 订单信息 -->
		<view class="order_info">
			<!-- 订单信息 -->
			<view class="info_title">
				<text style=" font-weight: bold; padding-left: 20rpx;">订单信息</text>
				<text style="padding-right: 25rpx; font-size: 26rpx; color:dimgray">订单总价{{totalPrice}}元</text>
			</view>
			<!-- 订单地址及订单详情 -->
			<view class="address_info" v-for="(item,index) in orderList" :key="index">
				<!-- 发件信息 -->
				<view class="address_list">
					<u-icon name="car-fill" color="#00cc33" size="16"></u-icon>
					<text style="font-weight: bold; font-size: 30rpx;">{{item.startName}}</text>
				</view>
				<view class="address_txt">
					<text>{{item.startAddress}}</text>
				</view>
				<view class="address_txt">
					<text>{{item.contacts}}</text>
					<text style="padding-left: 30rpx;">{{item.conPhone}}</text>
				</view>
				
				<!-- 途径地址信息 -->
				<view class="orad_list" v-for="(oradItem,oradIndex) in roadList" :key="oradIndex">
					<view class="orad_item">
						<view class="address_list">
							<u-icon name="car-fill" color="#666666" size="16"></u-icon>
							<text style="font-weight: bold; font-size: 30rpx;">{{oradItem.roadName}}</text>
						</view>
						<view class="inventory">
							<text style="font-size: 26rpx; font-weight: bold;">货物清单</text>
							<u-icon name="arrow-right" size="14"></u-icon>
						</view>
					</view>
					<view class="orad_item">
						<view class="address_txt">
							<text>{{oradItem.roadAddress}}</text>
						</view>
						<view class="order_state" v-show="oradItem.orderStatus==='订单已完成'">
							<text style="color: darkgray;">{{oradItem.orderStatus}}</text>
						</view>
						<view class="order_state" v-show="oradItem.orderStatus==='订单进行中'">
							<text style="color: goldenrod;">{{oradItem.orderStatus}}</text>
						</view>
					</view>
					<view class="address_txt">
						<text>{{oradItem.contacts}}</text>
						<text style="padding-left: 30rpx;">{{oradItem.conPhone}}</text>
					</view>
					
				</view>
				
				<!-- 收件地址信息 -->
				<view class="orad_item">
					<view class="address_list">
						<u-icon name="car-fill" color="red" size="16"></u-icon>
						<text style="font-weight: bold; font-size: 30rpx;">{{item.endName}}</text>
					</view>
					<view class="inventory">
						<text style="font-size: 26rpx; font-weight: bold;">货物清单</text>
						<u-icon name="arrow-right" size="14"></u-icon>
					</view>
				</view>
				<view class="orad_item">
					<view class="address_txt">
						<text>{{item.endAddress}}</text>
					</view>
					<view class="order_state" v-show="item.orderStatus==='订单已完成'">
						<text style="color: darkgray;">{{item.orderStatus}}</text>
					</view>
					<view class="order_state" v-show="item.orderStatus==='订单进行中'">
						<text style=" color: goldenrod; ">{{item.orderStatus}}</text>
					</view>
				</view>
				<view class="address_txt">
					<text>{{item.contacts}}</text>
					<text style="padding-left: 30rpx;">{{item.conPhone}}</text>
				</view>
				
				<!-- 分割线 -->
				<view class="line"></view>
				
				<!-- 其他信息 -->
				<view class="other_info">
					<view class="other_item">
						<text>订单编号</text>
						<text style="padding-right: 15rpx;">{{item.orderId}}</text>
					</view>
					<view class="other_item">
						<text>订单时间</text>
						<text style="padding-right: 15rpx;">{{item.orderTime}}</text>
					</view>
					<view class="other_item">
						<text>联系人</text>
						<text style="padding-right: 15rpx;">{{item.conPhone}}</text>
					</view>
					<view class="other_item">
						<text>货物数量</text>
						<text style="padding-right: 15rpx;">{{item.goodsNumber}}件</text>
					</view>
					<view class="other_item">
						<text>订单备注</text>
						<text style="padding-right: 15rpx;">{{item.notes}}</text>
					</view>
				</view>
			</view>
				
		</view>
		
		
		
	</view>
</template>

<script>
	import orderMap from "../../components/order-map/order-map.vue"
	export default {
		data() {
			return {
				licensePlate:"桂B12343",//车牌
				driverName:"韦师傅",//司机姓名
				score:"4.9",//评分
				totalPrice:49,//订单总价
				list: [{
					 name: 'chat-fill',
					 title: '信息联系'
				},{
					name: 'phone-fill',
					title: '电话联系'
				},
				{
					name: 'server-fill',
					title: '联系客服'
				},
				{
					name: 'edit-pen-fill',
					title: '评价司机'
				},
				],
				orderList: [{
					orderId:'1234566',//订单编号
					orderStatus:'订单进行中',//订单状态
					orderTime:'2023.5.17',//订单时间
					startName:'柳州市延龙汽车',//发件地名称
					startAddress:'广西壮族自治区柳州市鱼峰区和悦路1号',//发件地址
					endName:'柳州市万象城',//收件地址
					endAddress:'广西壮族自治区柳州市鱼峰区文昌路17号',//收件地址
					totalPrice:50,//订单总价
					contacts:'小明',//联系人
					conPhone:'155664455',//联系电话
					goodsNumber:'3',//货物数量
					notes:'无',//订单备注
				}],
				roadList: [{
					orderStatus:'订单已完成',//订单状态
					orderTime:'2023.5.17',//订单时间
					roadName:'柳州市汽贸园',//发件地址
					roadAddress:'广西壮族自治区柳州市鱼峰区和悦路1号',//收件地址
					contacts:'小明',//联系人
					conPhone:'155664455',//联系电话
				},{
					orderStatus:'订单进行中',//订单状态
					orderTime:'2023.5.17',//订单时间
					roadName:'柳州市汽贸园',//发件地址
					roadAddress:'广西壮族自治区柳州市鱼峰区和悦路1号',//收件地址
					contacts:'小明',//联系人
					conPhone:'155664455',//联系电话
				}],
				

			}
		},
		components: {
			orderMap
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		position: absolute;
		width: 100%;
	
		background-color: #efefef;
		display: flex;
		flex-direction: column;
	}
	.order_map{
		width: 100%;
		height: 300rpx;
	}
	.serve_info{
		// position: absolute;
		// position: relative;
		width: 94%;
		height: 230rpx;
		background-color: white;
		border-radius: 30rpx;
		display: flex;
		margin-left: 3%;
		
		flex-direction: column;
		
		.driver_info{
			display: flex;
			width: 94%;
			height: 115rpx;
			border-bottom: 1rpx solid #efefef;
			align-items: center;
			margin-left: 3%;
			.driver_avatar{
				display: flex;
				
			}
			.driver_item{
				padding-left: 14rpx;
				display: flex;
				flex-direction: column;
			}
		}
		
	}
	.serve{
		display: flex;
		width: 100%;
		// align-items: center;
		// justify-content: space-around;
	}
	.grid{
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
	.info_s{
		display: flex;
		font-size: 26rpx;
		margin-top: 15rpx;
		
	}
	
	.order_info{
		width: 94%;
		background-color: white;
		border-radius: 30rpx;
		display: flex;
		margin-left: 3%;
		flex-direction: column;
		margin-bottom: 20rpx;
		.info_title{
			width: 94%;
			display: flex;
			justify-content: space-between;
			margin-top: 15rpx;
			align-items: center;
			border-bottom: 1rpx solid #efefef;
			padding-bottom: 10rpx;
			margin-left: 3%;
		}
	}
	.address_list{
		display: flex;
		flex-direction: row;
		padding-left: 25rpx;
		padding-top: 15rpx;
	}
	.address_txt{
		font-size: 24rpx;
		margin-left: 30rpx;
		padding-top: 5rpx;
	}
	.orad_item{
		display: flex;
		justify-content: space-between;
		.inventory{
			display: flex;
			flex-direction: row;
			padding-top: 15rpx;
			padding-right: 15rpx;
		}
		
	}
	.line{
		width: 94%;
		border-bottom: 1rpx solid #efefef;
		margin: 15rpx 0 0 3%;
	}
	.other_info{
		width: 94%;
		margin: 0rpx 15rpx 15rpx  15rpx;
		font-size: 26rpx;
		display: flex;
		flex-direction: column;
		.other_item{
			width: 100%;
			display: flex;
			justify-content: space-between;
			padding-left: 15rpx;
			padding-top: 15rpx;

		}
		
	}
	.order_state{
		font-size: 24rpx;
		padding-right: 26rpx;
		padding-top: 5rpx;
	}
</style>
