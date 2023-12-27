<template>
	<view class="container">
		<view class="tocomplaint_info">
			<view class="info_item">
				<text style="padding-left: 35rpx;">被投诉人</text>
				 <u--input placeholder="请输入" border="none" inputAlign="right"
				    v-model="driverName" fontSize="26rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
				  ></u--input>
			</view>
			<view class="info_item">
				<text style="padding-left: 35rpx;">被投诉原因</text>
				 <u--input placeholder="请输入" border="none" inputAlign="right"
				    v-model="reason" fontSize="26rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
				  ></u--input>
			</view>
			<view class="item_content">
				<text style="padding-left: 35rpx;">详细内容:</text>
				<view class="content">
					 <u--textarea v-model="details" placeholder="请输入内容" count height="120" maxlength="300"></u--textarea>
				</view>
				
			</view>
			<view class="item_content">
				<text style="padding-left: 35rpx;">上传照片:</text>
				<view class="content">
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
			</view>
			
		</view>
		
		<view class="invoiceFormButton">
			<u-button @click="uploadPhoto" type="primary" size="small">提交</u-button>
		</view>
	</view>
</template>

<script>
	import pathToBase64 from '@/api/image-deal.js'
	export default {
		data() {
			return {
				userid:this.$store.state.userid,//用户ID
				driverName:'',//被投诉人
				reason:'',//被投诉原因
				details:'',//详细内容
				photoList: [],
				imageList: [],
			}
		},
		methods: {
			//提交投诉
			subComplaint(){
				var _this = this
				if(_this.photoList.length == 0){
					uni.showToast({
						title:'请拍摄上传照片！',
						icon: 'none',
					})
				}else if(_this.driverName == ''){
					uni.showToast({
						title:'请输入被投诉人！',
						icon: 'none',
					})
				}else if(_this.reason == ''){
					uni.showToast({
						title:'请输入被投诉原因！',
						icon: 'none',
					})
				}else{
					_this.$api.reqPost('api/yl_complaints/Add',{
						data:{
							userId:_this.userid,
							driverName:_this.driverName,
							imageList:_this.imageList,
							reason:_this.reason,
							details:_this.details
						}			
					}).then(res => {
						if(res.status){
							uni.showToast({
								title:'提交投诉成功！',
								icon:'none'
							})
							uni.navigateBack({
								delta: 1
							})
							console.log('提交成功',res)
						}else{
							uni.showToast({
								title:'提交投诉失败！',
								icon:'none'
							})
						    console.log('提交失败',res)
						}
					})
				}
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
						that.subComplaint()
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
		display: flex;
		background-color: #efefef;
		flex-direction: column;	
	}
	.tocomplaint_info{
		width:94%;
		// height: 950rpx;
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
	.item_content{
		height: 360rpx;
		margin-top: 15rpx;
		border-bottom: 2rpx solid #efefef;
		.content{
			width: 95%;
			padding: 20rpx ;
		}
	}
	.invoiceFormButton{
		width: 40%;
		height: 80rpx;
		position:fixed;
		bottom:0;
		margin-left: 30%;
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
