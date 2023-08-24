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
<template>
	<view><map id="tencentMap" 
	:style="[...mapStyle]" 
	:show-compass="showCompass"
	 :enable-traffic="enableTraffic"
	  :longitude="longitude"
	  :latitude="latitude"
	   :markers="markers" 
	   :show-location="showLocation"
		@markertap="markertap"></map></view>
</template>

export default {
	props:{
		mapStyle: {
		type: Object,
		default:{
		width: '100%',height: '300rpx'}},
	showCompass: {
		//	是否显示指南针
		type: Boolean,default: false},
		enableTraffic: { 
			//	是否开启实时路况
			type: Boolean,default: false},
			showLocation: {
				//	是否显示带有方向的当前定位点
				type: Boolean,default: true},},
				data() {
					return {longitude: '118.72495',latitude: '32.00834',markers: [],
					}},
		onReady() {
			let vm = thisvm.map = uni.createMapContext('tencentMap', this)
			vm.getLocation()},
			methods: {
				//   初次位置授权
			getAuthorize() {
				return new Promise((resolve, reject) => {
					uni.authorize({
						scope: "scope.userLocation",success: () => {resolve(); 
						// 允许授权
						},fail: () => {reject(); 
						// 拒绝授权
						},
						});
						});
						},
						// 确认授权后，获取用户位置
						getLocationInfo() {
							const that = this;
							uni.getLocation({
								type: "gcj02",
								success: function(res) {
									that.longitude = res.longitude;
									 that.latitude = res.latitude;
									 that.markers = [{
										 id:2,
										latitude:32.00834,
										longitude:118.72495,
										callout:{
											content:'奥林皮克体育中心',color:'#000',
											fontSize:10,
											bgColor:'#fff',
											padding:5,
											display:'ALWAYS',textAlign:'center'
											}},
											]},
											});
											},
				// 拒绝授权后，弹框提示是否手动打开位置授权
			openConfirm() {
				return new Promise((resolve, reject) => {
				uni.showModal({
					title: "请求授权当前位置",
					content: "我们需要获取地理位置信息，为您推荐附近的商家",
					success: (res) => {
						if (res.confirm) {
							uni.openSetting().then((res) => {
							if (res[1].authSetting["scope.userLocation"] === true) {
								resolve(); 
								// 打开地图权限设置
								} else {
									reject();
									}});
									} else if (res.cancel) {
										reject();
										}},});});},
			// 彻底拒绝位置获取
			rejectGetLocation() {
				uni.showToast({
					title: "您拒绝了授权，无法获得周边信息",
					icon: "none",
					duration: 2000,
					});
					},
			//地图标点 点击事件
			markertap(e){
				let plugin = requirePlugin('routePlan');
				let key = '5ZKBZ-W3TCU-LSDVC-4XJLB-KQOYO-TVBQ6'; 
				 //	使用在腾讯位置服务申请的keylet 
				 referer = 'test';  
				 //	调用插件的app的名称
				 let navigation = 1  //	值为1时，开启驾车导航功能；默认不开启此功能
				 let endPoint = JSON.stringify({
					 //	终点
					 'name': '奥林皮克体育中心',
					 'latitude': 32.00834,'longitude': 118.72495});
					 wx.navigateTo({
						 url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint + '&navigation=' + navigation});
						 }},
						 onReady() {
							 //   wx请求获取位置权限
							 this.getAuthorize().then(() => {
							//   同意后获取
							this.getLocationInfo();
							}).catch(() => {
								//   不同意给出弹框，再次确认
								this.openConfirm().then(() => {
									this.getLocationInfo();
								}).catch(() => {
									this.rejectGetLocation();
									});});},
}

