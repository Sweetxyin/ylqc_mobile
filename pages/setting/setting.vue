<template>
	<view class="container">
		
		
		<view class="setting_info">
			<view class="info_title">
				<text>基本信息</text>
			</view>
			<view class="basic_info">		
				<u-cell-group class="setting-list" :border="false">
					<u-cell class="setting-item" title="头像" isLink></u-cell>
				</u-cell-group>
				<view class="info_item">
					<text style="padding-left: 35rpx;">昵称</text>
					 <u--input placeholder="请输入昵称" border="none" inputAlign="right"
					    v-model="info_name" fontSize="26rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
				<view class="info_item">
					<text style="padding-left: 35rpx;">公司名称</text>
					 <u--input placeholder="请输入公司名称" border="none" inputAlign="right"
					    v-model="corporate_name" fontSize="26rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
				<view class="info_item">
					<text style="padding-left: 35rpx;">公司地址</text>
					 <u--input placeholder="请输入公司地址" border="none" inputAlign="right"
					    v-model="company_address" fontSize="26rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
				<view class="info_item">
					<text style="padding-left: 35rpx;">电话号码</text>
					 <u--input placeholder="请输入电话号码" border="none" inputAlign="right"
					    v-model="phone" fontSize="26rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
			</view>
			
			<view class="info_title">
				<text>实名认证</text>
			</view>
			
			<view class="authentication_info">
				<view class="info_item">
					<text style="padding-left: 35rpx;">真实姓名</text>
					 <u--input border="none" inputAlign="right"
					    v-model="user_name" fontSize="26rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
				<view class="info_item">
					<text style="padding-left: 35rpx;">身份证号</text>
					 <u--input border="none" inputAlign="right"
					    v-model="user_id" fontSize="26rpx" :disabled="inputStatus" style="padding-right: 25rpx;"
					  ></u--input>
				</view>
			</view>

			<view class="other_info">
				<u-cell-group class="setting-list" :border="false">
					<u-cell class="setting-item" title="关于延龙" isLink></u-cell>
				</u-cell-group>
				<u-cell-group class="setting-list" :border="false">
					<u-cell class="setting-item" title="延龙法律条规" isLink></u-cell>
				</u-cell-group>
				<u-cell-group class="setting-list" :border="false">
					<u-cell class="setting-item" title="收费标准" isLink></u-cell>
				</u-cell-group>
			</view>
			
			<view class="logout_button">
				<u-button type="error" :plain="true" text="退出登录"></u-button>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				basic_name:'',
				info_name:'',//昵称
				corporate_name:'柳州延龙汽车',//公司名称
				company_address:'广西柳州市鱼峰区和悦路1号',//公司地址
				phone:'19956562365',//电话号码
				user_name:'白敬亭',//真实姓名
				user_id:'56532365623',//身份证号
			}
		},
		methods: {
			//选择头像
      chooseAvatar() {
        
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
	.setting_info{
		width: 100%;
		display: flex;
		flex-direction: column;
			.basic_info{
			width:94%;
			background-color: white;
			border-radius: 30rpx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			margin-left: 3%;
		}
		.info_item{
			height: 75rpx;
			display: flex;
			align-items: center;
			margin-top: 5rpx;
			border-bottom: 2rpx solid #efefef;
		}
	}
	.info_title{
		height: 50rpx;
		padding-top: 15rpx;
		padding-left:35rpx;
	}
	.authentication_info{
		width:94%;
		background-color: white;
		border-radius: 30rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin-left: 3%;
	}
	.other_info{
		width:94%;
		background-color: white;
		border-radius: 30rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin-left: 3%;
		margin-top: 15rpx;
	}
	.logout_button{
		width: 94%;
		padding: 25rpx 0 0 3%;
	}
	

</style>
