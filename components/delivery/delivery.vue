<template>
	<view class="container">
		<view class="delivery_t">
			<view class="t_item">
				<navigator url="" class="item_list">{{start_address}}</navigator>
				<navigator url="" class="item_md">|&nbsp;门店选择</navigator>
			</view>
			<view class="t_item">
				<navigator url="" class="item_list">{{end_address}}</navigator>
				<navigator url="" class="item_md">|&nbsp;门店选择</navigator>
			</view>
			<view class="add_address">
				<navigator>添加地址</navigator>
			</view>
		</view>
		 
		<view class="article_info">
			<form action=""  @submit="formSubmit" >
				<view class="info_t"><text>物品信息</text></view>
				<view class="add_annex">
					<view class="add_t">
						<text>添加附件</text>
						<radio-group name="addAnnex">
							<label>
								<radio :value="r1"  checked="true" style="transform:scale(0.7)"/><text>是</text>
							</label>
							<label>
								<radio :value="r2" style="transform:scale(0.7)"/><text>否</text>
							</label>
						</radio-group>
						<navigator url="" class="add_icon">
							<image src="../../static/images/index_icon/add_annex.png" ></image>
							<text>自动识别物件信息生成订单列表</text>
						</navigator>
					</view>
				
					<view class="download_annex">
						<text>附件模板</text>
						<image src="../../static/images/index_icon/download.png" mode=""></image>
					</view>	
				</view>
				<view class="info_list">
					<view class="info_item">
						<text>物品名称：</text>
						<input type="text" placeholder="请输入物品名称">
					</view>
					<view class="info_item">
						<text>预估总重量(kg)：</text>
						<input type="text" placeholder="请输入总重量">
					</view>
					<view class="info_item">
						<text>总体积(m²)：</text>
						<input type="text" placeholder="请输入总体积">
					</view>
					<view class="info_item">
						<text>件数：</text>
						<input type="text" placeholder="请输入件数">
					</view>
					<view class="info_item">
						<text>预约上门时间：</text>
						<input type="text" placeholder="请输入件数">
					</view>
				</view>
				
			
				
			</form>
		
		</view>
	</view>
</template>

<script>
	export default {
		name:"delivery",
		data() {
			return {
				start_address:"柳州延龙汽车",
				end_address:"输入您的目的地",
				r1:"",
				r2:""
				
			};
		}
	}
</script>

<style lang="scss">
	.delivery_t{
		display: flex;
		flex-direction:column;
		width: 94%;
		// height: 250rpx;
		background-color: white;
		margin-top: 10rpx;
		margin-left: 3%;
		// border: 1rpx solid #efefef;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		.t_item{
			width: 90%;
			height: 100rpx;
			display: flex;
			background-color: #efefef;
			border: 1rpx solid #efefef;
			border-radius: 30rpx;
			align-content:center;
			justify-content: space-between;
			align-items:center;
			margin-top:15rpx;
			margin-left: 4.5%;
			.item_list{
				display: flex;
				padding-left: 10rpx;
			}
			.item_md{
				font-size: 26rpx;
				padding-right: 10rpx;
			}
		}
		.add_address{
			color: #808069;
			font-size: 22rpx;
			// padding-top: 15rpx;
			padding-left: 20rpx;
			line-height: 60rpx;
		}
	}
	.article_info{
		display: flex;
		width: 94%;
		background-color: white;
		// margin-top: 15rpx;
		margin-left: 3%;
		flex-direction:column;
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		.info_t{
			height: 60rpx;
			width: 100%;
			background-color: #b0e0e6;
			border: 1px solid #b0e0e6;
			border-top-left-radius: 30rpx;
			border-top-right-radius: 30rpx;
			display: flex;
			align-items:center;
			color: white;
			
			// font-size: 20rpx;
		}
		.info_t text{
			padding-left: 3%;
		}
		
		.add_annex{
			display: flex;
			height: 120rpx;
			width: 95%;
			background-color: #efefef;
			padding-top: 10rpx;
			margin-left: 2.5%;
			margin-top: 10rpx;
			flex-direction:column;
			font-size: 26rpx;
			border: 1px solid #efefef;
			border-radius: 30rpx;
			.add_t{
				height: 50rpx;
				width: 100%;
				display: flex;
				.add_icon{
					display: flex;
				}
				.add_icon image{
					width: 55rpx;
					height: 50rpx;
					margin-left: 15rpx;
				}
				.add_icon text{
					font-size: 22rpx;
					color: #808069;
					padding-top: 10rpx;
				}
			}
			.download_annex{
				height: 50rpx;
				width:25%;
				display: flex;
			    align-self:flex-end;
				margin-top: 20rpx;

			}
			.download_annex text{
				font-size: 20rpx;
				padding-top: 10rpx;
				font-size: 26rpx;
			}
			.download_annex image{
				width: 50rpx;
				height: 50rpx;
			}
		}
		.info_list{
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 94%;
			margin-left: 3%;
			font-size: 26rpx;
			.info_item{
				height: 65rpx;
				display: flex;
				align-items: center;
				margin-top: 10rpx;
				border-bottom: 2rpx solid #efefef;
			}
			.info_item input{
				font-size:26rpx;
			}
		}
		
	}
</style>
		