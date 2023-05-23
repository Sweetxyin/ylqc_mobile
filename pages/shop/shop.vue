<template>
	<view class="container">
		<view class="shop_header">
			
		</view>
		
		<view class="shop_list">
			 <u-grid :border="false" col="5">
			    <u-grid-item
			    v-for="(listItem,listIndex) in list"
			    :key="listIndex">
			        <u-icon :customStyle="{paddingTop:20+'rpx'}"
			        :name="listItem.name"
			        :size="22"></u-icon>
			        <text class="grid-text">{{listItem.title}}</text>
				</u-grid-item>
			</u-grid>
			<u-toast ref="uToast" />
		</view>
		
		<view class="shop_info">
			 <u-grid :border="false" col="2">
			    <u-grid-item
			    v-for="(infoItem,infoIndex) in info"
			    :key="infoIndex">
			        <u-icon :customStyle="{paddingTop:20+'rpx'}"
			        :name="infoItem.name"
			        :size="99"></u-icon>
			        <text class="grid-text">{{infoItem.title}}</text>
				</u-grid-item>
			</u-grid>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
				    name: 'photo',
				    title: '图片',
					}, {
				    name: 'lock',
				    title: '锁头'
				     },{
				    name: 'star',
				    title: '星星'
				    },{
				    name: 'hourglass',
				    title: '沙漏'
				    },{
				    name: 'home',
				    title: '首页'
				    },{
				    name: 'star',
				    title: '音量'
				    },
				],
				info: [{
				    name: 'photo',
				    title: '',
					}, {
				    name: 'photo',
				    title: ''
				    },{
					name: 'photo',
					title: '',
					}, {
					name: 'photo',
					title: ''
					},{
					name: 'photo',
					title: '',
					}, {
					name: 'photo',
					title: ''
					}
				],
			}
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		background-color: #f0ffff;
	}
	.shop_header{
		height: 300rpx;
		width: 100%;
		background-color: #b0e0e6;
	}
	.shop_list{
		height: 200rpx;
		width: 100%;
	}


</style>
