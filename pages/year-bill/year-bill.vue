<template>
	<view class="container">
	
		<!-- 月账单 -->
		<view class="month_bill">
			<view class="bill_title">
				<text>月账单</text>
			</view>
			
			<view class="bill_item">
				<!-- 下拉选择日期 -->
				<view class="" @click="show = true">
					<u-datetime-picker  :show="show" v-model="value1" mode="year-month" @confirm="confirm" @cancel="close"></u-datetime-picker>
					<view>
						<text style="float: left; font-weight: bold;">{{ timeValue }}</text>
						<u-icon style="padding: 2rpx 0 0 5rpx;" name="arrow-down" size="18"></u-icon>
					</view>
				</view>
				
				<!-- 月账单支出收入选择器 -->
				<view class="bill_status">
					<u-subsection
						:list="list"
						mode="subsection"
						:current="month_current"
						@change="month_change"
					></u-subsection>
				</view>
			</view>
			
			<!-- 月账单支出显示 -->
			<view v-show="month_current===0">
				<text style="font-size: 28rpx;">共支出{{monthzc_sum}}笔，合计</text>
			</view>
			<view v-show="month_current===0">
				<text style="font-size: 40rpx; font-weight: bold;padding-top: 25rpx;">￥{{moothzc_money}}</text>
			</view>
			<!-- 月账单收入显示 -->
			<view v-show="month_current===1">
				<text style="font-size: 28rpx;">共收入{{monthsr_sum}}笔，合计</text>
			</view>
			<view v-show="month_current===1">
				<text style="font-size: 40rpx; font-weight: bold;padding-top: 25rpx;">￥{{moothsr_money}}</text>
			</view>
		</view>
		
		<!-- 年账单 -->
		<view class="year_bill">
			<view class="bill_title">
				<text>年账单</text>
			</view>
			
			<view class="bill_item">
				<!-- 下拉选择日期 -->
				<view class="" @click="year_show = true">
					<u-datetime-picker  :show="year_show" v-model="yaerValue" mode="year-month" @confirm="confirm1" @cancel="close"></u-datetime-picker>
					<view>
						<text style="float: left; font-weight: bold;">{{ yaerValue }}</text>
						<u-icon style="padding: 2rpx 0 0 5rpx;" name="arrow-down" size="18"></u-icon>
					</view>
				</view>
				<!-- 年账单支出收入选择器 -->
				<view class="bill_status">
					<u-subsection
						:list="list"
						mode="subsection"
						:current="year_current"
						@change="year_change"
					></u-subsection>
				</view>
			</view>
		
			<!-- 年账单支出显示 -->
			<view v-show="year_current===0">
				<text style="font-size: 28rpx;">共支出{{yearzc_sum}}笔，合计</text>
			</view>
			<view v-show="year_current===0">
				<text style="font-size: 40rpx; font-weight: bold;" >￥{{yearzc_money}}</text>
			</view>
			
			<!-- 年账单收入显示 -->
			<view v-show="year_current===1">
				<text style="font-size: 28rpx;">共收入{{yearsr_sum}}笔，合计</text>
			</view>
			<view v-show="year_current===1">
				<text style="font-size: 40rpx; font-weight: bold;padding-top: 25rpx;">￥{{yearsr_money}}</text>
			</view>
		
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			const d = new Date()
			const year = d.getFullYear()
			let month = uni.$u.padZero(d.getMonth() + 1)
			const dt = d.getDate()
			return {
				monthzc_sum:'12',//月账单支出总数
				moothzc_money:'888',//月账单支出金额
				monthsr_sum:'0',//月账单收入总数
				moothsr_money:'0',//月账单收入金额
				yearzc_sum:34,//年账单支出总数
				yearsr_sum:0,//年账单收入总数
				yearzc_money:1888,//年账单支出金额
				yearsr_money:0,//年账单收入金额
				month_current: 0,//月账单选择器索引值
				year_current:0,//年账单选择器索引值
				list: ['支出', '收入'],//账单状态
				show: false,//月账单选择状态
				year_show:false,//年账单日期选择状态
				timeValue:year +'-'+ month ,//月账单日期显示
				yaerValue:year,//年账单日期显示
				value1: Number(new Date()),//获取当前时间
			}
		},
		onLoad() {

		},
		methods: {
			month_change(index) {
				this.month_current = index
			},
			year_change(index) {
				this.year_current = index
			},
			// 月账单日期选择
			async confirm(e) {
				this.show = false;
				const timeFormat = uni.$u.timeFormat;
				let timeValue = await timeFormat(e.value, 'yyyy-mm');
				this.timeValue = timeValue;
				console.log(timeValue);
			},
			
			// 年账单日期
			async confirm1(e) {
				this.year_show = false;
				const timeFormat = uni.$u.timeFormat;
				let yaerValue = await timeFormat(e.value, 'yyyy');
				this.yaerValue = yaerValue;
				console.log(yaerValue);
			},
			//关闭时间选择器
			close() {
				this.show = false;
				this.year_show = false;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		// background-color: #efefef;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.month_bill{
		width: 89%;
		height: 300rpx;
		background-color: #f0ffff;
		border-radius: 30rpx;
		margin-left: 3%;
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
		padding: 0 20rpx 0 20rpx;
		justify-content: space-around;
		
	}
	
	.bill_title{
		font-size: 34rpx;
		color: #b0e0e6;
		font-weight: bold;
		padding: 10rpx 0 15rpx 0rpx;
	}
	.bill_title text{border-bottom: 6rpx solid #b0e0e6;}
	.bill_item{
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.bill_status{
			width: 200rpx;
			display: flex;
		}
	}
	.year_bill{
		width: 89%;
		height: 300rpx;
		background-color: #f0ffff;
		border-radius: 30rpx;
		margin-left: 3%;
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
		padding: 0 20rpx 0 20rpx;
		justify-content: space-around;
	}
	

</style>
