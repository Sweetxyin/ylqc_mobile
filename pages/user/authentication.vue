<template>
	<view class="container">
		<view class="authentication_info">
			
			<view class="info_title">
				<text>公司信息</text>
			</view>
			<view class="company_info">
				<view class="info_item">
					<text style="padding-left: 35rpx;">公司名称</text>
					 <u--input placeholder="请输入" border="none" inputAlign="right" 
					    v-model="corporate_name" fontSize="26rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
				<view class="info_item">
					<text style="padding-left: 35rpx;">公司地址</text>
					 <u--input placeholder="请输入" border="none" inputAlign="right"
					    v-model="company_address" fontSize="26rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
			</view>
			
			<view class="info_title">
				<text>实名认证</text>
			</view>
			<view class="company_info">
				<view class="info_item">
					<text style="padding-left: 35rpx;">真实姓名</text>
					 <u--input placeholder="请输入" border="none" inputAlign="right"
					    v-model="user_name" fontSize="26rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
				<view class="info_item">
					<text style="padding-left: 35rpx;">电话号码</text>
					 <u--input placeholder="请输入" border="none" inputAlign="right"
					    v-model="phone" fontSize="26rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
				<view class="info_item">
					<text style="padding-left: 35rpx;">身份证号</text>
					 <u--input placeholder="请输入" border="none" inputAlign="right"
					    v-model="user_id" fontSize="26rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
			</view>
			
			<view class="submit_button">
				<u-button type="primary" text="提交认证"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				corporate_name:'',//公司名称
				company_address:'',//公司地址
				user_name:'',//真实姓名
				phone:'',//电话号码
				user_id:'',//身份证号
			}
		},
		methods: {
			
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
	.authentication_info{
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.info_title{
		height: 50rpx;
		padding-top: 15rpx;
		padding-left:35rpx;
	}
	.company_info{
		width:94%;
		background-color: white;
		border-radius: 30rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin-left: 3%;
	}
	.info_item{
		height: 65rpx;
		display: flex;
		align-items: center;
		margin-top: 5rpx;
		border-bottom: 2rpx solid #efefef;
	}
	.submit_button{
		width: 60%;
		padding: 25rpx 0 0 20%;
	}


</style>
