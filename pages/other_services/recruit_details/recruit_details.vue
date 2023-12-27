<template>
	<view class="container">
		<view class="details-title">
			<view class="company">
				<text>柳州延龙汽车有限公司</text>
			</view>
			<view class="introduce">
				<text>100-301人 民营企业 汽车</text>
			</view>
		</view>
		
		<u-gap height="1" bgColor="#efefef"></u-gap>
		
		<view class="post-concent">
			<u-gap height="15" bgColor="#ffffff"></u-gap>
			<view class="post-name">
				<text>岗位名称：{{recruitList.job}}</text>
			</view>
			<u-gap height="15" bgColor="#ffffff"></u-gap>
			<view class="post-zz">
				<text style="font-size: 35rpx;">岗位职责：</text>
				<u-gap height="5" bgColor="#ffffff"></u-gap>
				<view class="">
					{{recruitList.responsibility}}
				</view>
			</view>
			<u-gap height="15" bgColor="#ffffff"></u-gap>
			<view class="post-zz">
				<text style="font-size: 35rpx;">任职要求：</text>
				<u-gap height="5" bgColor="#ffffff"></u-gap>
				<view class="">
					{{recruitList.requirements}}
				</view>
				
			</view>
			<u-gap height="15" bgColor="#ffffff"></u-gap>
			<view class="post-zz">
				<text>联系人：{{recruitList.contacts}}</text>
			</view>
			<u-gap height="15" bgColor="#ffffff"></u-gap>
			<view class="post-zz">
				<text>联系电话：{{recruitList.phone}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recruitList:{
					id:'',
					job:'',
					responsibility:''
				},
				id:'',
			}	
		},
		onLoad(option) {
			this.id = option.id
			console.log(option.id)
			
		},
		onShow() {
			this.getDetail()
		},
		methods: {
			//获取岗位详情
			getDetail(){
				this.$api.reqPost('api/yl_user/RecruitDesc',
				{
					params:{id:this.id}
				}).then(res =>{
					if(res.code==200){
						this.recruitList = res.data.recruitDesc
					}else{
						console.log('获取岗位详细信息失败！',res)
					}
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
		// background-color: #efefef;
	}
	.details-title{
		width: 100%;
		height: 150rpx;
		
		.company{
			padding-top: 4%;
			padding-left: 4%;
			font-size: 35rpx;
			font-weight: bold;
		}
		.introduce{
			padding-top: 2%;
			padding-left: 4%;
			color: darkgray;
		}
	}
	.post-concent{
		width: 100%;
		// height: 600rpx;
		.post-name{
			width: 90%;
			padding-left: 4%;
			font-weight: bold;
		}
		.post-zz{
			padding-left: 4%;
			padding-right: 20rpx;
		}
	}
</style>
