<template>
	<view class="container">
		<u-gap height="10" bgColor="#efefef"></u-gap>

		<view class="illustrate">
			<u--textarea v-model="signdesc" border="none"  placeholder="拍照说明:" ></u--textarea>
			<!-- <view class="upload">
				<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic"
					name="1" multiple :maxCount="10"></u-upload>
			</view> -->
			<view class="photo-area">
				<view class="photo-list">
					<view class="photo-item" v-for="(item,index) in photoList" :key="index">
						<image :src="item" mode="scaleToFill"></image>
						<view class="iconfont icon-close" @click="deletePhoto(index)">
							<u-icon name="close" color="red" size="16" bold="true"></u-icon>
						</view>
					</view>
				</view>
				<view class="btn-camera" @click="openCamera" v-if="photoList.length < 3">
					<text class="iconfont icon-camera"></text>
					<u-icon name="camera" size="34"></u-icon>
				</view>
			</view>
		</view>
		<view class="serviceButton">
			<u-button @click="uploadPhoto" type="primary">提交</u-button>
		</view>
	</view>
</template>

<script>

	import pathToBase64 from '@/api/image-deal.js'
	
	export default {
		data() {
			return {
				fileList1: [],
				number:'',
				signdesc:'',//签收说明
				photoList: [],
				imageList: [],
			}
		},
		onLoad(option) {
			this.number = option.number
			console.log(option.number)
			
		},
		methods: {
			
			//确认送达
			conDelivery(){
				var _this = this
				if(_this.photoList.length == 0){
					uni.showToast({
						title:'请拍摄照片！',
						icon: 'none',
					})
				}
				if(_this.signdesc == ''){
					uni.showToast({
						title:'请填写拍照说明！',
						icon: 'none',
					})
				}
				_this.$api.reqPost('api/yl_orders/OrderConfirm',{
					params:{
						number:_this.number,
						urlsList:_this.imageList.join(),
						signdesc:_this.signdesc
					}			
				}).then(res => {
					if(res.status){
						uni.showToast({
							title:'提交送达成功！',
							icon:'none'
						})
						uni.navigateBack({
							delta: 1
						})
						console.log('提交成功',res)
					}else{
						uni.showToast({
							title:'提交送达失败！',
							icon:'none'
						})
					    console.log('提交失败',res)
					}
				})
							// }
						},				

			openCamera() {
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['camera'], //album 从相册选图，camera 使用相机
					success: function(res) {
						let paths = res.tempFilePaths
						that.pathToBase(paths)
					},
					fail: function(err){
						console.log(err)
						uni.showModal({
							title: err
						})
					}
				});
			},
			pathToBase(paths) {
				paths.forEach((item, index) => {
					pathToBase64.pathToBase64(item, 30).then(base64 => {
						this.photoList.push(base64)
					})
				})
			},
			deletePhoto(index) {
				this.photoList.splice(index, 1)
			},
			uploadPhoto() {				
				let that = this
				Promise.all(this.photoList.map(data => this.getPhotoPath(data)))
					.then(res => {
						console.log('图片上传成功',res)
						that.imageList = res
						that.conDelivery()
					})
					.catch(err => {
						that.isDisabled = false
						console.log('图片上传失败',res)
						// that.$showToast(err.message || '图片上传失败,请稍后重试')
					})
			},
			getPhotoPath(data) {
				
				return new Promise((resolve, reject) => {
					let params = {
						base64: data
					}
					let isdata = data
					this.$api.reqPost('api/yl_files/UploadFilesByBase64',{
						data:{
							base64: isdata
						}
					}).then(res => {
							console.log(res)
							if (res.status) {
								console.log('图片上传cg',res)
								resolve(res.data.src)
							} else {
								
								console.log('错误')
								reject(res)
							}
			
						})
						.catch(err => {
							reject(err)
						})
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
	.illustrate{
		width: 94%;
		height: 370rpx;
		background-color: white;
		border-radius: 30rpx;
		margin-left: 3%;
	}
	.upload{
		padding-left: 15rpx;
	}
	.serviceButton{
		width: 60%;
		height: 100rpx;
		position:fixed;
		bottom:0;
		margin-left: 20%;
	}
	.photo-area {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
	
		.photo-list {
			flex: 0 0 auto;
			overflow: hidden;
			display: flex;
			align-items: center;
	
			.photo-item {
				width: 180rpx;
				height: 180rpx;
				background: #f2f6f9;
				margin-right: 5px;
				position: relative;
	
				image {
					width: 180rpx;
					height: 180rpx;
				}
	
				.iconfont {
					color: #FFFFFF;
					font-size: 32rpx;
					position: absolute;
					right: 4rpx;
					top: 4rpx;
				}
			}
	
			.photo-item:nth-child(3) {
				margin-right: 0px;
			}
		}
	
		.btn-camera {
			width: 180rpx;
			height: 180rpx;
			flex: 0 0 auto;
			flex-wrap: wrap;
			background: #F7F7F7;
			border-radius: 9rpx;
			display: flex;
			align-items: center;
			justify-content: center;
	
			.iconfont {
				color: #FFFFFF;
				font-size: 100rpx;
			}
		}
	}
</style>
