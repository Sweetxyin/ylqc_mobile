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
					<view class><text style="font-size: 33rpx;">柳州延龙汽车有限公司</text></view>
					
				</view>
				<u-gap height="7" bgColor="#ffffff"></u-gap>
				<view class="">
					<text style="font-size: 26rpx;">预留电话:</text>
				</view>
			</view>
		</view>
		
		<view class="order_info">
			
		</view>
		
		
		
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				list: ['商家配送', '到店取货'],
				subIndex:0,//导航条索引值
			}
			
		},
		methods: {
			//获取当前的导航索引，并赋值给subIndex
			sectionChange(index){
				this.subIndex=index
				// console.log(this.subIndex)
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
		height: 500rpx;
		background-color: #ffffff;
		margin-top: 20rpx;
		margin-left: 5%;
		border-radius: 6.5%;
	}

</style>
