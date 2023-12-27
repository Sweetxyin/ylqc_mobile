<template>
	<view class="container">
		<view class="recruit-list" v-for="(item,index) in recruitList" :key="index">
			<view class="recruit-item" @click="toRecruitDetails(item)">
				<view class="post-top">
					<view class="postname">
						<text>{{item.job}}</text>
					</view>
					<view class="salary">
						<text>{{item.salary}}</text>
					</view>
				</view>
				
				<view class="company">
					<text>柳州延龙汽车有限公司</text>
				</view>
				<view class="key-words" >
					
					<text v-for="(keyitem,index) in item.keywords" :key="index" style="color: dimgray;padding-right: 20rpx;">{{keyitem}}</text>
					
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recruitList:[{
					id:'',
					job:'',
					keywords:[],//关键词
					salary:'',//薪资
				}
				
				]
			}
		},
		mounted() {
		  this.getRecruitList()
		},
		methods: {
			toRecruitDetails(item){
				uni.navigateTo({
					url:'/pages/other_services/recruit_details/recruit_details?id=' + item.id
				})
			},
			//获取用户门店管理数据
			getRecruitList(){
				var _this = this
				_this.$api.reqPost('api/yl_user/RecruitList').then(res=>{
					if(res.code==200){
						_this.recruitList = res.data.recruitList
						console.log('获取招聘信息成功',res)
					}else if(res.code==500){
						_this.isData=false
						console.log('招聘信息为空',res)
					}else{
						console.log('获取招聘信息失败',res)
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
		background-color: #efefef;
	}
	.recruit-list{
		width: 100%;

		.recruit-item{
			// width: 100%;
			height: 200rpx;
			background-color: #ffffff;
			margin-top: 2%;
			padding-left: 2%;
			.post-top{
				display: flex;
				justify-content: space-between;
				.postname{
					padding-top: 2%;
					font-size: 35rpx;
					font-weight: bold;
				}
				.salary{
					padding-top: 2%;
					padding-right: 20rpx;
					color: crimson;
				}
			}
			
			.company{
				padding-top: 2%;
				// color:darkgray;
			}
				
			.key-words{
				padding-top: 2%;
				
				
			}
		}
	}
</style>
