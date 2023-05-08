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
				         fontWeight: 'bold',
				         transform: 'scale(1.05)'
				     }">
				 </u-tabs>
			   </u-sticky>
		</view>
		<!-- 根据状态标签显示不同订单状态内容 -->
		<view class="order_content" >
			<!-- 订单进行中 -->
			<view class="order_have" v-if="tabIndex===0">
				111
			</view>
			<!-- 订单已完成 -->
			<view class="order_complete" v-else-if="tabIndex===1">
				222
			</view>
			<!-- 订单已取消 -->
			<view class="order_cancel" v-else>
				333
			</view>
	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list1: [{
				     name: '进行中', 
				},{
					name: '已完成',
				}, {
				    name: '已取消'
				}],
				tabIndex:0,
				tabStatus:true
			};
		},
		methods:{
			tabChang(index){
				this.tabIndex=index.index
				console.log(this.tabIndex)
				console.log("index的值为："+this.tabIndex+"和index"+index.index)
				
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
</style>
