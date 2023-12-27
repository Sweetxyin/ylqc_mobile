<template>
	<view class="nr">
		<view class="container">
			<u-gap height="10" bgColor="#f0ffff"></u-gap>
		
			<view class="store_search" >
				<u-search placeholder="搜索地址" v-model="searchKey" :clearabled="true" :showAction="false" @change="changeSearch"></u-search>
			</view>
			<u-gap height="5" bgColor="#f0ffff"></u-gap>
			<view class="" v-if="isData">
				<view class="store_list" v-for="(item, index) in storeList " :key="index">
					<view class=""  @click="conStoreData(index)">
						<view class="list_info" >
							<view class="item_cname">
								<u-icon name="map-fill"  size="18"></u-icon>
								<text>{{item.address}}</text>
							</view>
							<!-- <text style="color:darkgray; font-size: 26rpx; padding:13rpx 35rpx 0rpx 0;">{{item.distance}}</text> -->
						</view>
						
						<u-gap height="6" bgColor="#ffffff"></u-gap>
									
						<view>
							<text style="margin-left: 65rpx; font-size: 26rpx;">{{item.fullAddress}}</text>
						</view>
						
						<u-gap height="6" bgColor="#ffffff"></u-gap>
						
						<view class="item_name">
							<text style="padding-left: 65rpx; font-size: 26rpx;">{{item.name}}</text>
							<text style="padding-left: 35rpx; font-size: 26rpx;">{{item.phone}}</text>
						</view>
					</view>
					
					
					<view class="list_button">
						<u-button type="info" shape="circle" size="small" :plain="true" text="编辑" @click="editStore(item)"></u-button>
						<u-button class="del" type="info" shape="circle" size="small" :plain="true" text="删除" @click="delStore(item)"></u-button>
					</view>
					
				</view>
				<view class="noData">
					{{tips}}
				</view>
			</view>
			
			<view class="noData" v-else>
				您还未添加门店哦！
			</view>
			
			<view class="store_button" >
				<u-button @click="addStore" type="primary">添加门店</u-button>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				userid:this.$store.state.userid,//用户ID
				searchKey: '',//搜索值
				storeList: [{
					id:'',
					address:'',//公司名称
					fullAddress:'',//地址
					name:'',//姓名
					phone:'',//电话
					lat:'',//纬度
					lng:'',//经度
				}],
				storeState:'',//门店状态
				allList:[],//全部数据
				searchList:[],//搜索数据
				isData:false,
				tips:"",//搜索提示语
			}
		},
		
		onShow() {
			this.getStoreList()
		},
		onLoad(option) {
			this.getStoreList()
			if(option.sendState==1){
				this.storeState = option.sendState
			}else if(option.receState == 2){
				this.storeState = option.receState
			}
			
			console.log('门店状态',this.storeState)
		},
		onPullDownRefresh() {
			
			this.getStoreList()

		},
		methods: {
			//跳转至添加门店页
			addStore(){
				uni.navigateTo({
				    url: '/pages/storemanage/addstore/addstore'
				})
			},
			//返回上一页
			conStoreData(index){
				//状态为1时，返回发件数据
				if(this.storeState==1){
					uni.$emit('upSendData', this.storeList[index])
					uni.navigateBack({
						delta: 1
					})
					// console.log('zhes',this.storeList[index])
				//状态为2时，返回收件数据
				}else if(this.storeState==2){
					uni.$emit('upReceData', this.storeList[index])
					uni.navigateBack({
						delta: 1
					})	
				}else{
					console.log('什么都不做')
					// let it  = this.storeList[index]
					// console.log(it)
				}
				
				
			},
			//获取用户门店管理数据
			getStoreList(){
				var _this = this
				_this.$api.reqPost('api/yl_address/QueryForUser',{
					params:{userid:_this.userid}
				}).then(res=>{
					if(res.status){
						_this.storeList = res.data
						_this.allList = res.data
						_this.isData = true
						console.log('获取门店信息成功',res)
					}else if(res.code==500){
						_this.isData=false
						console.log('门店信息为空',res)
					}else{
						console.log('获取门店信息失败',res)
					}
				})
			},
			//调转到编辑页面
			editStore(item){
				uni.navigateTo({
					url: '/pages/storemanage/eidtstore/eidtstore?id=' + item.id
				})
			},
			//删除门店
			delStore(item){
				var _this = this
				uni.showModal({
					title:'确定要删除'+item.id+'门店吗？',
					success:function(res){
						if(res.confirm){
							_this.$api.reqPost('api/yl_address/Delete',{
								params:{
									id:item.id
								}
							}).then(res => {
								if(res.status){
									console.log('删除门店成功!',res)
									uni.showToast({
										title:'删除门店成功'
									})
									_this.getStoreList()
								}else{
									console.log('删除门店失败!')
								}
							})
				
						}else if(res.cancel){
							console.log('用户点击取消')
						}
					}
				})
			},
			//搜索地址
			changeSearch(){
				var _this = this
				//搜索值为空时，显示数据为全部数据
				if(_this.searchKey === ""){
					_this.storeList =_this.allList
					_this.tips=""
				}else{
					_this.storeList=[]
					_this.tips=""
					_this.$api.reqPost('api/yl_address/QueryForName',{
						params:{
							userid:_this.userid,
							name:_this.searchKey
						}
					}).then(res => {
						if(res.status){
							_this.storeList=res.data
							console.log('搜索信息成功',res)
							
						}else if(res.code==500){
							// _this.isData=false
							_this.tips="没有搜索结果"
							console.log('暂无收藏地址',res)
							// console.log('暂无收藏地址',_this.tips)
						}else{
							console.log('搜索信息失败',res)
						}
					})
				}
				
			
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.container{
		// position: absolute;
		width: 100%;
		height: 100%;
		// background-color: #f6f6f6;
		// z-index: -1;
		background-color: #f0ffff;

	}
	.store_search{
		width: 95%;
		// background-color: white;
		margin-left: 2.5%;
	}
	.store_list{
		width:94%;
		background-color: white;
		border-radius: 30rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin-left: 3%;
		margin-top: 15rpx;
	}
	.list_info{
		display: flex;
		width: 94%;
		flex-direction: row;
		padding-left: 10rpx;
		padding-top: 5rpx;
		justify-content: space-between;
	}
	.item_cname{
		margin: 10rpx 0 0 20rpx;
		display: flex;
	}
	.item_name{
		// width: 94%;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #efefef;
	}
	.list_button{
		width:40%;
		display: flex;
		flex-direction: row;
		padding: 10rpx 0 10rpx 55%;
	}
	.store_button{
		width: 60%;
		height: 80rpx;
		position:fixed;
		bottom:0;
		margin-left: 20%;
		margin-bottom: 5%;
	}
	.noData{
		display: flex;
		font-size: 36rpx;
		margin-top: 70%;
		margin-left: 30%;
		height: 100vh;
		background-color: #f0ffff;
	}
	.del{
		margin-left: 15rpx;
	}
</style>
