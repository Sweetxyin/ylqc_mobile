"use strict";
const common_vendor = require("./common/vendor.js");
const utils_qqmapWxJssdk_min = require("./utils/qqmap-wx-jssdk.min.js");
const _sfc_main = {
  data() {
    return {
      latitude: "",
      //纬度
      longitude: "",
      //经度
      scale: 14
      //地图缩放程度
    };
  },
  // components:{
  // 	QQMapWX,
  // },
  onShow() {
    this.getLocationInfo();
  },
  onLoad() {
    const location = this.getLocationInfo();
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  },
  methods: {
    async getLocationInfo() {
      return new Promise((resolve) => {
        let location = {
          longitude: 0,
          latitude: 0,
          province: "",
          city: "",
          area: "",
          street: "",
          address: ""
        };
        common_vendor.index.getLocation({
          type: "gcj02",
          success(res) {
            location.longitude = res.longitude;
            location.latitude = res.latitude;
            const qqmapsdk = new utils_qqmapWxJssdk_min.QQMapWX({
              key: "3LYBZ-HJBC3-KG73O-R4M44-CXWWH-3ZF46"
              //这里填写自己申请的key
            });
            qqmapsdk.reverseGeocoder({
              location,
              success(response) {
                let info = response.result;
                console.log(info);
                location.province = info.address_component.province;
                location.city = info.address_component.city;
                location.area = info.address_component.district;
                location.street = info.address_component.street;
                location.address = info.address;
                this.position = info.address;
                console.log("测试", this.position);
                resolve(location);
              }
            });
          },
          fail(err) {
            console.log(err);
            resolve(location);
          }
        });
      });
    }
    //  async getLocationInfo(){
    // 	const _this = this
    // 	console.log("1")
    // 	uni.authorize({
    // 		scope: 'scope.userLocation',
    // 		success() {
    // 			let location = {
    // 				longitude: _this.longitude,
    // 				latitude: _this.latitude,
    // 				province: "",
    // 				city: "",
    // 				area: "",
    // 				street: "",
    // 				address: "",
    // 			};
    // 			uni.getLocation({
    // 				type: 'gcj02',
    // 				geocode: true,
    // 				success: function(res) {
    // 					uni.setStorageSync('latitude', _this.latitude)
    // 					uni.setStorageSync('longitude', _this.longitude)
    // 					location.longitude = res.longitude;
    // 					location.latitude = res.latitude;
    // 					const qqmapsdk = new QQMapWX({
    // 						key: '3LYBZ-HJBC3-KG73O-R4M44-CXWWH-3ZF46'  //申请的key
    // 					});
    // 					qqmapsdk.reverseGeocoder({
    // 						location,
    // 					    success: function(res) {
    // 							let info = res.result;
    // 							location.province = info.address_component.province;
    // 							location.city = info.address_component.city;
    // 							location.area = info.address_component.district;
    // 							location.street = info.address_component.street;
    // 							location.address = info.address;
    // 							console.log(location);
    //                         },
    // 					});
    // 				},	
    // 				fail: function(err) {
    // 					uni.showToast({
    // 							title: '获取定位失败',
    // 							icon: 'none'
    // 					})
    // 				}
    // 			})
    // 		}
    // 	})
    // },
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.latitude,
    b: $data.longitude,
    c: $data.scale,
    d: _ctx.marker,
    e: common_vendor.o(($event) => _ctx.toMap()),
    f: common_vendor.o((...args) => _ctx.getLocation && _ctx.getLocation(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9aa50452"], ["__file", "F:/daima/dm/ylqc_mobile/pages/mapdemo/mapdemo.vue"]]);
exports.MiniProgramPage = MiniProgramPage;
