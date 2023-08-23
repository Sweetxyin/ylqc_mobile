"use strict";
const common_vendor = require("../../common/vendor.js");
const Delivery = () => "../../components/delivery/delivery.js";
const Custom = () => "../../components/custom-xd/custom-xd.js";
const _sfc_main = {
  data() {
    return {
      list: ["客户下单", "配送VIP"],
      subIndex: 0,
      //导航条索引值
      position: "",
      addressName: ""
    };
  },
  components: {
    Delivery,
    Custom
  },
  onLoad() {
  },
  methods: {
    //获取当前的导航索引，并赋值给subIndex
    sectionChange(index) {
      this.subIndex = index;
    }
    // // 检测是否授权
    // 			checkAuthorization() {
    // 				var that = this
    // 				uni.authorize({
    // 					scope: 'scope.userLocation',
    // 					success() { //1.1 允许授权
    // 						that.getLocationInfo().then(function(value) {
    // 							// that.address = value.address
    // 							that.addressName = value.addressName
    // 							that.location = value
    // 							that.latitude=value.latitude
    // 							that.longitude=value.longitude
    // 							//保存缓存
    // 							uni.setStorage({
    // 							  key:'local',
    // 							  data:value,
    // 							  success() {
    // 							    console.log("用户地址信息已缓存")
    // 							  }
    // 							})              
    // 						})
    // 						console.log('成功')
    // 					},
    // 					fail() { //1.2 拒绝授权
    // 						uni.showModal({
    // 							content: '检测到您没打开权限，是否去设置打开？',
    // 							confirmText: "确认",
    // 							cancelText: '取消',
    // 							success: (res) => {
    // 								if (res.confirm) {
    // 									uni.openSetting({
    // 										success: (res) => {
    // 											console.log(res);
    // 											that.getLocationInfo().then(function(value) {											
    // 												that.address = value.address
    // 												that.location = value
    // 												that.latitude=value.latitude
    // 												that.longitude=value.longitude
    // 												//保存缓存
    // 												uni.setStorage({
    // 												  key:'local',
    // 												  data:value,
    // 												  success() {
    // 												    console.log("用户地址信息已缓存")
    // 												  }
    // 												}) 
    // 											})
    // 										}
    // 									})
    // 								} else {
    // 									console.log('取消');
    // 									return false;
    // 								}
    // 							}
    // 						})
    // 						return false;
    // 					}
    // 				})
    // 			},
    // //获取位置信息
    // 			async getLocationInfo() {
    // 				return new Promise((resolve) => {
    // 					uni.showToast({
    // 						icon: "none",
    // 						title: "正在定位中…",
    // 						duration: 500
    // 					})
    // 					//位置信息默认数据
    // 					let location = {
    // 						longitude: 0,
    // 						latitude: 0,
    // 						province: "",
    // 						city: "",
    // 						area: "",
    // 						street: "",
    // 						address: "",
    // 						addressName:"",
    // 					};
    // 					var that = this
    // 					uni.getLocation({
    // 						type: "gcj02",
    // 						success(res) {
    //                             //先拿到经度和纬度，后面再用地图转换成具体的地址信息。
    // 							location.longitude = res.longitude;
    // 							location.latitude = res.latitude;
    // 							// 腾讯地图Api
    // 							const qqmapsdk = new QQMapWX({
    // 								key: '3LYBZ-HJBC3-KG73O-R4M44-CXWWH-3ZF46' //这里填写自己申请的key，我就不展示了。
    // 							});
    // 							qqmapsdk.reverseGeocoder({
    // 								location,
    // 								success(response) {
    // 									console.log('调用成功',res)
    // 									let info = response.result;
    // 									location.province = info.address_component.province;
    // 									location.city = info.address_component.city;
    // 									location.area = info.address_component.district;
    // 									location.street = info.address_component.street;
    // 									location.addressName = info.formatted_addresses.recommend;
    // 									location.address= info.formatted_addresses.standard_address
    // 									that.addressName=info.formatted_addresses.recommend;
    // 									// that.latitude=info.latitude
    // 									// that.longitude=info.longitude
    // 									resolve(location);
    // 								},
    // 							});
    // 						},
    // 						fail(err) {
    // 							if (err.errMsg.indexOf("fail") !== -1) {
    // 								uni.showToast({
    // 									icon: "none",
    // 									title: "您拒绝了定位授权，将无法使用定位功能",
    // 									duration: 1000
    // 								})
    // 								//跳转到手动开启页面
    // 							}
    // 							resolve(location);
    // 						},
    // 					});
    // 				});
    // 			},
  }
};
if (!Array) {
  const _easycom_u_subsection2 = common_vendor.resolveComponent("u-subsection");
  const _component_Delivery = common_vendor.resolveComponent("Delivery");
  const _component_Custom = common_vendor.resolveComponent("Custom");
  (_easycom_u_subsection2 + _component_Delivery + _component_Custom)();
}
const _easycom_u_subsection = () => "../../uni_modules/uview-plus/components/u-subsection/u-subsection.js";
if (!Math) {
  _easycom_u_subsection();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.sectionChange),
    b: common_vendor.p({
      list: $data.list,
      mode: "button",
      inactiveColor: "#fff",
      activeColor: "#000000",
      current: $data.subIndex
    }),
    c: $data.subIndex === 1
  }, $data.subIndex === 1 ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "F:/daima/dm/ylqc_mobile/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
