<template>
	<view class="container">
		<view class="" v-show="isData==true">
			<view  class="history_info" v-for="(item, index) in historyList " :key="index" >
				<view class="info_item">
					<text style="padding-left: 35rpx;">投诉反馈</text>
					<text style=" font-size: 24rpx; margin-right: 30rpx;">已受理</text>
				</view>
				<view class="info_item">
					<text style="padding-left: 35rpx;">被投诉人</text>
					<text style=" font-size: 24rpx; margin-right: 30rpx;">{{item.driverName}}</text>
				</view>
				<view class="info_result">
					<text style="padding-left: 35rpx; width: 160rpx;">受理结果</text>
					<text style=" font-size: 24rpx; margin:0 10rpx 0 30rpx;">您的反馈已收到，平台将持续关注，一经核实将从严处理。</text>
				</view>
			</view>
		</view>
		
		<view class="noData" v-show="isData==false">
			您没有历史投诉信息哦！
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userid:this.$store.state.userid,//用户ID
				historyList:[{
					driverName:'',//被投诉人
					reason:'',//被投诉原因
					details:'',//详细内容'
					// results:'您的反馈已收到，平台将持续关注，一经核实将从严处理。',
				}
				],
				isData:false,
				
			}
		},
		onShow() {
			this.getHistory()
		},
		methods: {
			//获取历史信息
			getHistory(){
				this.$api.reqPost('api/yl_complaints/QueryForUser',
				{
					params:{userid:this.userid}
				}).then(res =>{
					if(res.status){
						console.log('获取历史信息成功！',res)
						this.historyList = res.data
						if(res.data.length!=0){
							this.isData=true
						}
						
					}else{
						console.log('获取历史信息失败！',res)
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
		display: flex;
		background-color: #efefef;
		flex-direction: column;	
	}
	.history_info{
		width:94%;
		background-color: white;
		border-radius: 30rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin-left: 3%;
		margin-top: 15rpx;
	}
	.info_item{
		height: 75rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 5rpx;
		border-bottom: 2rpx solid #efefef;
		
	}
	.info_result{
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 5rpx;
		border-bottom: 2rpx solid #efefef;
	}
	.noData{
		margin-top:55%;
		margin-left: 25%;
	}

</style>
