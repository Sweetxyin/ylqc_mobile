<template>
	<view class="container">
		<!-- 地图 -->
		<view class="order_map">
			<!-- <orderMap></orderMap> -->
			<map @tap="getMapLocation" style="width: 100vw; height: 500rpx;" :latitude="reportInfo.lttd"
				:longitude="reportInfo.lgtd" :scale="scale" :polyline="polyline"  :markers="covers" enable-3D="true" >
			</map>
		</view>
		<!-- 订单信息 -->
		<view class="order_info" v-for="(item,index) in orderList" :key="index">
			
			<!-- 服务信息 -->
			<view class="serve_info" v-if="item.state==2 || item.state==3 || item.state==4">
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
	
			<!-- 订单地址及订单详情 -->
			<view class="address_info" >
				<!-- 订单信息 -->
				<view class="info_title">
					<text style=" font-weight: bold; padding-left: 20rpx;">订单信息</text>
					<text style="padding-right: 25rpx; font-size: 26rpx; color:dimgray">订单总价{{item.amount}}元</text>
				</view>
				<!-- 发件信息 -->
				<view class="address_list">
					<u-icon name="car-fill" color="#00cc33" size="16"></u-icon>
					<text style="font-weight: bold; font-size: 30rpx;">{{item.sendAddress}}</text>
				</view>
				<view class="address_txt">
					<text>{{item.sendFullAddress}}</text>
				</view>
				<view class="address_txt">
					<text>{{item.sender}}</text>
					<text style="padding-left: 30rpx;">{{item.sendPhone}}</text>
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
						<view class="order_state" v-if="oradItem.state=='4'">
							<text style="color: darkgray;">{{oradItem.state}}</text>
						</view>
						<view class="order_state" v-if="oradItem.state=='3'">
							<text style="color: goldenrod;">{{oradItem.state}}</text>
						</view>
					</view>
					<view class="address_txt">
						<text>{{oradItem.recipient}}</text>
						<text style="padding-left: 30rpx;">{{oradItem.recePhone}}</text>
					</view>
					
				</view>
				
				<!-- 收件地址信息 -->
				<view class="orad_item">
					<view class="address_list">
						<u-icon name="car-fill" color="red" size="16"></u-icon>
						<text style="font-weight: bold; font-size: 30rpx;">{{item.receAddress}}</text>
					</view>
					<view class="inventory">
						<text style="font-size: 26rpx; font-weight: bold;">货物清单</text>
						<u-icon name="arrow-right" size="14"></u-icon>
					</view>
				</view>
				<view class="orad_item">
					<view class="address_txt">
						<text>{{item.receFullAddress}}</text>
					</view>
					<view class="order_state" v-if="item.state==0">
						<text style="color: goldenrod;">订单待确认</text>
					</view>
					<view class="order_state" v-if="item.state==1">
						<text style="color: goldenrod;">订单已生成</text>
					</view>
					<view class="order_state" v-if="item.state==2">
						<text style="color: goldenrod;">订单已接单</text>
					</view>
					<view class="order_state" v-if="item.state==4">
						<text style="color: darkgray;">订单已完成</text>
					</view>
					<view class="order_state" v-if="item.state==3">
						<text style=" color: goldenrod; ">订单运输中</text>
					</view>
					<view class="order_state" v-if="item.state== -1">
						<text style="color: darkgray;">订单已取消</text>
					</view>
				</view>
				<view class="address_txt">
					<text>{{item.recipient}}</text>
					<text style="padding-left: 30rpx;">{{item.recePhone}}</text>
				</view>
				
				<!-- 分割线 -->
				<view class="line"></view>
				
				<!-- 其他信息 -->
				<view class="other_info">
					<view class="other_item">
						<text>订单编号</text>
						<text style="padding-right: 15rpx;">{{item.number}}</text>
					</view>
					<view class="other_item">
						<text>订单时间</text>
						<text style="padding-right: 15rpx;">{{item.deliveryTime}}</text>
					</view>
					<view class="other_item">
						<text>联系人</text>
						<text style="padding-right: 15rpx;">{{item.recePhone}}</text>
					</view>
					<view class="other_item">
						<text>货物数量</text>
						<text style="padding-right: 15rpx;">{{item.itemNum}}件</text>
					</view>
					<view class="other_item">
						<text>订单备注</text>
						<text style="padding-right: 15rpx;">{{item.remark}}</text>
					</view>
				</view>
			</view>
				
		</view>
		
		
		
	</view>
</template>

<script>
	
	// import orderMap from "../../mapdemo/ordermap/ordermap.vue"
	import QQMapWX from '@/utils/qqmap-wx-jssdk.js'
	var qqmapsdk = new QQMapWX({
	    key: '3LYBZ-HJBC3-KG73O-R4M44-CXWWH-3ZF46'
	});
	export default {
		data() {
			return {
				number:'',
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
				}],
				orderList: [{
					number:'',//订单编号
					state:'',//订单状态
					deliveryTime:'',//订单时间
					sendAddress:'',//发件地名称
					sendFullAddress:'',//发件地址
					receAddress:'',//收件地址
					receFullAddress:'',//收件地址
					amount:'',//订单总价
					sender:'',//发件人
					sendPhone:'',//发件人联系电话
					recipient:'',//收件人
					recePhone:'',//收件人联系电话
					itemNum:'',//货物数量
					remark:'',//订单备注
					sendLat:'',//发件纬度
					sendLng:'',//发件经度
					receLat:'',//收件纬度
					receLng:'',//收件经度
				}],
				// roadList: [{
				// 	state:'',//订单状态
				// 	deliveryTime:'',//订单时间
				// 	roadName:'',//发件地址
				// 	roadAddress:'',//收件地址
				// 	recipient:'',//联系人
				// 	recePhone:'',//联系电话
				// }],
				roadList:[],
				reportInfo: {
					lgtd: 116.39742,
					lttd: 39.909,
				},
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				//第一组为匹配的垃圾桶
				covers: [], //存放标记点数组
				isLocated: false, // 是否被定位
				//小区
				plot: {},
				scale:12,
				//详细地址
				address: '',
				polyline:[],
				//地址组成
				addressComponent: {
					city: "",
					district: "",
					nation: "",
					province: "",
					street: "",
					street_number: "",
				},
				startLat:'',
				startLng:'',
				destLat:'',
				destLng:'',
			}
		},
		// components: {
		// 	orderMap
		// },
		onLoad(option) {
			this.number = option.number
			console.log(option.number)
			
		},
		onShow() {
			this.getDetail()
		},
		methods: {
			//获取订单详情
			getDetail(){
				this.$api.reqPost('api/yl_orders/QueryForDetail',
				{
					params:{number:this.number}
				}).then(res =>{
					if(res.status){
						for(var i=0;i<1;i++){
							this.orderList[i] = res.data[i]
							this.reportInfo.lttd = res.data[i].receLat
							this.reportInfo.lgtd = res.data[i].receLng
							this.startLat = res.data[i].sendLat
							this.startLng = res.data[i].sendLng
							this.destLat = res.data[i].receLat
							this.destLng = res.data[i].receLng
							var obj = {
								width: 30,
								height: 30,
								latitude: Number(res.data[i].sendLat),
								longitude: Number(res.data[i].sendLng),
								iconPath: '../../../static/images/other/send.png' // 成功绘制
							};
							//垃圾桶====> 猜测是需要在地图上绘制点数
							var bin = {
								id: "0",
								latitude: Number(res.data[i].receLat),
								longitude: Number(res.data[i].receLng),
								width: 25,
								height: 35,
								iconPath: '../../../static/images/other/end.png', // 成功绘制
								
							};
							var arr = [];
							arr.push(obj);
							arr.push(bin);
							//标记点集合赋值个给了vue对象covers == > 打印出来看看
							this.covers = arr;
						}
						
						console.log('获取订单详细信息成功！',res)
						this.initMap()
					}else{
						console.log('获取订单详细信息失败！',res)
					}
				})
			},
			//根据起点和终点绘制路线
			initMap(){
			    const that = this;
				console.log("进入initmap")
			    qqmapsdk.direction({
			        mode: 'driving', //可选值：'driving'（驾车）  trucking 货车
			        //from参数不填默认当前地址
			        // latitude纬度    longitude 经度
			        from: {
			            latitude: that.startLat,
			            longitude: that.startLng
			        },
			        to: {
			            latitude: that.destLat,
			            longitude: that.destLng
			        },
			        size: 1, // 车型 1: 微型车  2: 轻型车 3: 中型车 4: 重型车
			        policy: 'LEAST_TIME', //'9',  //参考实时路况，高速优先，尽量躲避拥堵
			        height: 4,
			        width: 2.5,
			        length: 13,
			        weight: 6.8,
			        axle_weight: 34,
			        axle_count: 6,
			        is_trailer: 1,
			     success: function(res, data) {
			           
			            // distance number  是   方案总距离，单位：米
			            // duration number  是   方案估算时间（含路况），单位：分钟
			            //计算缩放比例
			            let distance = data[0].distance / 1000;
			            console.log(res);
			            console.log(data);
			            if (distance > 500) {
			            var scale = 7;
			            } else if (distance > 200) {
			                var scale = 10;
			            } else if (distance > 100) {
			                var scale = 12;
			            } else {
			                var scale = 15;
			            }
			            var ret = res;
			            var coors = ret.result.routes[0].polyline,
			                pl = [];                            
			            //坐标解压（返回的点串坐标，通过前向差分进行压缩）
			            var kr = 1000000;
			            for (var i = 2; i < coors.length; i++) {
			                coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
			            }
			            //将解压后的坐标放入点串数组pl中
			            for (var i = 0; i < coors.length; i += 2) {
			                pl.push({
			                    latitude: coors[i],
			                    longitude: coors[i + 1]
			                })
			            }
			            that.polyline = [{
			                points: pl,
			                color: '#4AC37A',
			                width: 5
			            }]
			            that.scale = scale;
			        },
			        fail: function(error) {
			            uni.showToast({
			                title: error.message,
			                duration: 3000,
			                icon: "none",
			            });
						console.log("调取失败")
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
		background-color: #efefef;
		display: flex;
		flex-direction: column;
	}
	.order_map{
		width: 100%;
		height: 500rpx;
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
