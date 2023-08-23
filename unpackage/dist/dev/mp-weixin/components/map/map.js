"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_qqmapWxJssdk_min = require("../../utils/qqmap-wx-jssdk.min.js");
const _sfc_main = {
  name: "map",
  data() {
    return {
      latitude: "",
      //纬度
      longitude: "",
      //经度
      marker: [],
      scale: 14,
      //地图缩放程度
      address: "",
      location: ""
    };
  },
  // components:{
  // 	QQMapWX,
  // },
  onShow() {
    this.checkAuthorization();
  },
  mounted() {
    this.checkAuthorization();
  },
  methods: {
    // 检测是否授权
    checkAuthorization() {
      var that = this;
      common_vendor.index.authorize({
        scope: "scope.userLocation",
        success() {
          that.getLocationInfo().then(function(value) {
            that.location = value;
            that.latitude = value.latitude;
            that.longitude = value.longitude;
            common_vendor.index.setStorage({
              key: "local",
              data: value,
              success() {
                console.log("用户地址信息已缓存");
              }
            });
          });
          console.log("成功");
        },
        fail() {
          common_vendor.index.showModal({
            content: "检测到您没打开权限，是否去设置打开？",
            confirmText: "确认",
            cancelText: "取消",
            success: (res) => {
              if (res.confirm) {
                common_vendor.index.openSetting({
                  success: (res2) => {
                    console.log(res2);
                    that.getLocationInfo().then(function(value) {
                      that.address = value.address;
                      that.location = value;
                      that.latitude = value.latitude;
                      that.longitude = value.longitude;
                      common_vendor.index.setStorage({
                        key: "local",
                        data: value,
                        success() {
                          console.log("用户地址信息已缓存");
                        }
                      });
                    });
                  }
                });
              } else {
                console.log("取消");
                return false;
              }
            }
          });
          return false;
        }
      });
    },
    //获取位置信息
    async getLocationInfo() {
      return new Promise((resolve) => {
        common_vendor.index.showToast({
          icon: "none",
          title: "正在定位中…",
          duration: 500
        });
        let location = {
          longitude: 0,
          latitude: 0,
          province: "",
          city: "",
          area: "",
          street: "",
          address: "",
          addressName: ""
        };
        common_vendor.index.getLocation({
          type: "gcj02",
          success(res) {
            location.longitude = res.longitude;
            location.latitude = res.latitude;
            const qqmapsdk = new utils_qqmapWxJssdk_min.QQMapWX({
              key: "3LYBZ-HJBC3-KG73O-R4M44-CXWWH-3ZF46"
              //这里填写自己申请的key，我就不展示了。
            });
            qqmapsdk.reverseGeocoder({
              location,
              success(response) {
                console.log("调用成功", res);
                let info = response.result;
                location.province = info.address_component.province;
                location.city = info.address_component.city;
                location.area = info.address_component.district;
                location.street = info.address_component.street;
                location.addressName = info.formatted_addresses.recommend;
                location.address = info.formatted_addresses.standard_address;
                resolve(location);
              }
            });
          },
          fail(err) {
            if (err.errMsg.indexOf("fail") !== -1) {
              common_vendor.index.showToast({
                icon: "none",
                title: "您拒绝了定位授权，将无法使用定位功能",
                duration: 1e3
              });
            }
            resolve(location);
          }
        });
      });
    }
    // getMapAddress() {
    //       const tMap = new QQMapWX({
    //         key: '3LYBZ-HJBC3-KG73O-R4M44-CXWWH-3ZF46' //开发者密钥
    //       });
    //       //使用 uni.getLocation获取用户所在经纬度
    //       uni.getLocation({
    //         type: 'wgs84',
    //         geocode: true,
    //         success: (res) => {
    //           console.log("获取经纬度成功");
    //           this.latitude = res.latitude;
    //           this.longitude = res.longitude;
    //         },
    //         fail: () => {
    //           console.log("获取经纬度失败");
    //         },
    //         complete: () => {
    //           // 使用腾讯sdk的reverseGeocoder方法 解析经纬度
    //           tMap.reverseGeocoder({
    //             location: {
    //               latitude: this.latitude,
    //               longitude: this.longitude
    //             },
    //             success: function(res) {
    //               console.log("解析地址成功", res);
    //               console.log("当前地址：", res.result.address);
    //               //保存缓存
    //               uni.setStorage({
    //                 key:'local',
    //                 data:res.result.address,
    //                 success() {
    //                   console.log("用户地址信息已缓存")
    //                 }
    //               })
    //             },
    //             fail: function(res) {
    //               uni.showToast({
    //                 title: '定位失败',
    //                 duration: 2000,
    //                 icon: "none"
    //               })
    //               console.log(res);
    //             },
    //             complete: function(res) { //无论成功失败都会执行
    //               wx.switchTab({
    //                 url: '../appointment/appointment'
    //               })
    //             }
    //           })
    //         }
    //       })
    //     },
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.latitude,
    b: $data.longitude,
    c: $data.scale,
    d: $data.marker,
    e: common_vendor.o(($event) => _ctx.toMap())
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-86c82c5c"], ["__file", "F:/daima/dm/ylqc_mobile/components/map/map.vue"]]);
wx.createComponent(Component);
