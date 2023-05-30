<template>
	<view class="container">
		<view class="tocomplaint_info">
			<view class="info_item">
				<text style="padding-left: 35rpx;">被投诉人</text>
				 <u--input placeholder="请输入" border="none" inputAlign="right"
				    v-model="complaintName" fontSize="26rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
				  ></u--input>
			</view>
			<view class="info_item">
				<text style="padding-left: 35rpx;">被投诉原因</text>
				 <u--input placeholder="请输入" border="none" inputAlign="right"
				    v-model="complaintReason" fontSize="26rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
				  ></u--input>
			</view>
			<view class="item_content">
				<text style="padding-left: 35rpx;">详细内容:</text>
				<view class="content">
					 <u--textarea v-model="complaintContent" placeholder="请输入内容" count height="120" maxlength="300"></u--textarea>
				</view>
				
			</view>
			<view class="item_content">
				<text style="padding-left: 35rpx;">上传照片:</text>
				<view class="content">
					<u-upload
							:fileList="fileList1"
							@afterRead="afterRead"
							@delete="deletePic"
							name="1"
							multiple
							:maxCount="10"
							:previewFullImage="true"
						></u-upload>
				</view>
			</view>
			
		</view>
		
		<view class="invoiceFormButton">
			<u-button @click="submit" type="primary" size="small">提交</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				complaintName:'',//被投诉人
				complaintReason:'',//被投诉原因
				complaintContent:'',//详细内容
				fileList1: [],
			}
		},
		methods: {
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
		}
		
	}
</script>

<style lang="scss" scoped>
	.container{
		width: 100%;
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
</style>
