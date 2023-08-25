<template>
	<view class="content">
		<button @tap="authVerification">请选择位置</button>
		<template v-if="currentLocation.address">
		  <div>name：{{currentLocation.name}}</div>
		  <div>address：{{currentLocation.address}}</div>
		  <div>latitude：{{currentLocation.latitude}}</div>
		  <div>longitude：{{currentLocation.longitude}}</div>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentLocation:{},
			}
		},
		onShow () {
		  uni.getStorage({
		    key: 'currentLocation',
		    success: (res) => {
		      this.currentLocation = res.data
		    }
		  })
		},
		methods: {
			authVerification () {
			  uni.getSetting({
			    success: (res) => {
			      if (res.authSetting['scope.userLocation']) { /* 用户授权成功时走这里 */
			        this.handerChooseLocation()
			      } else if (res.authSetting['scope.userLocation'] === undefined) { /* 用户未授权时走这里 */
			        console.log('没有授权')
			        this.handleOpenSetting()
			      } else { /* 用户拒绝了授权后走这里 */
			        console.log('拒绝了授权 false')
			        this.handleOpenSetting()
			      }
			    },
			  })
			},
			handerChooseLocation (latitude, longitude) {
			  uni.chooseLocation({
			    latitude: latitude || '',
			    longitude: longitude || '', 
			    success: (res) => {
			      console.log('wx.chooseLocation res=', res)
			      uni.setStorageSync('currentLocation', res)
			    },
			    fail: function (err) {
			      console.log('取消按钮', err)
			    }
			  })
			},
			handleOpenSetting () {
			  wx.openSetting({
			    success: (res) => {
			      console.log('定位 openSetting', res)
			      if (res.authSetting["scope.userLocation"]) {
			        this.handerChooseLocation()
			      }
			    }
			  })
			}
		}
	}
</script>
<style>

</style>
