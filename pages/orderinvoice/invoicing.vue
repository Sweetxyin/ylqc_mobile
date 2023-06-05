<template>
	<view class="container">
		<view class="invocing_info">
			<view class="info_header">
				<text style="padding-left:4%;">发票详情</text>
			</view>
			<view class="invocing_item">
				<view class="invoicing_form">
					<u-form :model="form" ref="uForm" label-width="120">
					    <u-form-item class="invoicing_form" label="抬头类型" prop="radiolist1">
					    	<!-- <u-input v-model="form.heading_type" /> -->
							<u-radio-group
							    v-model="radiovalue"
								size="20"
							    placement="row"
							    @change="groupChange"
								style="padding-left: 10rpx;"
							  >
							    <u-radio
								size="20"
								labelSize="13"
							     :customStyle="{marginLeft: '10rpx',marginRight: '10rpx'}"
							      v-for="(item, index) in radiolist1"
							      :key="index"
							      :label="item.name"
							      :name="item.name"
							      @change="radioChange"
							    >
							    </u-radio>
							  </u-radio-group>
						</u-form-item>
						<u-form-item class="invoicing_form" label="公司名称" prop="companyName">
							<u-input v-model="form.companyName" border="none" placeholder="请输入公司名称" inputAlign="right"/>
					    </u-form-item>
					    <u-form-item class="invoicing_form" label="公司税号" prop="dutyParagraph">
					        <u-input v-model="form.dutyParagraph" border="none" placeholder="请输入纳税人识别号" inputAlign="right"/>
					    </u-form-item>
					    <u-form-item class="invoicing_form" label="更多内容" prop="contents">
					        <u-input v-model="form.contents" border="none" placeholder="请填写备注/地址等(非必填)" inputAlign="right"/>
					    </u-form-item>
						<u-form-item class="invoicing_form" label="总金额" prop="totalMoney">
						    <u-input v-model="form.totalMoney" border="none" inputAlign="right"/>
						</u-form-item>
						<u-form-item class="invoicing_form" label="电子邮箱" prop="companyName">
							<u-input v-model="form.companyName" border="none" placeholder="用于向您发送电子发票和行程" inputAlign="right"/>
						</u-form-item>
						<u-form-item class="invoicing_form" label="发送行程单" prop="dutyParagraph">
						    <u-input v-model="form.dutyParagraph" border="none" placeholder="" inputAlign="right"/>
						</u-form-item>
						
					</u-form>
				</view>
			</view>
			<view class="invoiceFormButton">
				<u-button @click="submit" type="primary" size="small">提交</u-button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 form: {
				    companyName: '',
				    dutyParagraph: '',
				    contents: '',
					totalMoney:''
				},
				radiovalue:[],
				radiolist1: [{
				    name: '企业单位',
				    disabled: false
				}, {
				    name: '个人/非企业单位',
				    disabled: false
				}],
				rules: {
				    name: [{
						required: true,
						message: '请输入姓名',
						// 可以单个或者同时写两个触发验证方式
						trigger: 'blur'
				    }],
				    intro: [{
				        required: true,
				        min: 5,
				        message: '简介不能少于5个字',
				        trigger: 'blur'
				    }],
				}
			}
		},
		methods: {
			submit() {
			    this.$refs.uForm.validate(valid => {
			    if (valid) {
			        console.log('验证通过');
			    } else {
			        console.log('验证失败');
			    }
			    });
			},
			groupChange(n) {
			    console.log('groupChange', n);
			},
			radioChange(n) {
				console.log('radioChange', n);
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
	.invocing_info{
		width: 100%;
		.info_header{
			height: 60rpx;
			padding-top: 15rpx;
		}
		.invocing_item{
			width: 94%;
			background-color: white;
			border: 1rpx solid #efefef;
			border-radius: 30rpx;
			margin-left: 3% ;
			display: flex;
			flex-direction: column;
			font-size: 26rpx;
			.invoicing_form{
				display: flex;
				padding-left: 5rpx;
				border-bottom: 2rpx solid #efefef;
			}
			
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
