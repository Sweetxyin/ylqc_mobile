<template>
	<view>
		<view class="map">
			<!-- <Map></Map> -->
			<map @tap="getMapLocation" style="width: 100vw; height: 300rpx;" :latitude="reportInfo.lttd"
				:longitude="reportInfo.lgtd" show-location :markers="covers" enable-3D="true" >
			</map>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
