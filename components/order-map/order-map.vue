<template>
	<view class="map_container">
		<view class="map_content">
			<text>地图显示司机位置</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"order-map",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.map_container{
		width: 100%;
		height: 100%;
		background-color: #efefef;
		display: flex;
	}
	.map_content{
		width: 100%;
		height: 300rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

</style>