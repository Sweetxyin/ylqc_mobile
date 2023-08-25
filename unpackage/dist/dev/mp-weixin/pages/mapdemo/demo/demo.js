"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      currentLocation: {}
    };
  },
  onShow() {
    common_vendor.index.getStorage({
      key: "currentLocation",
      success: (res) => {
        this.currentLocation = res.data;
      }
    });
  },
  methods: {
    authVerification() {
      common_vendor.index.getSetting({
        success: (res) => {
          if (res.authSetting["scope.userLocation"]) {
            this.handerChooseLocation();
          } else if (res.authSetting["scope.userLocation"] === void 0) {
            console.log("没有授权");
            this.handleOpenSetting();
          } else {
            console.log("拒绝了授权 false");
            this.handleOpenSetting();
          }
        }
      });
    },
    handerChooseLocation(latitude, longitude) {
      common_vendor.index.chooseLocation({
        latitude: latitude || "",
        longitude: longitude || "",
        success: (res) => {
          console.log("wx.chooseLocation res=", res);
          common_vendor.index.setStorageSync("currentLocation", res);
        },
        fail: function(err) {
          console.log("取消按钮", err);
        }
      });
    },
    handleOpenSetting() {
      common_vendor.wx$1.openSetting({
        success: (res) => {
          console.log("定位 openSetting", res);
          if (res.authSetting["scope.userLocation"]) {
            this.handerChooseLocation();
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.authVerification && $options.authVerification(...args)),
    b: $data.currentLocation.address
  }, $data.currentLocation.address ? {
    c: common_vendor.t($data.currentLocation.name),
    d: common_vendor.t($data.currentLocation.address),
    e: common_vendor.t($data.currentLocation.latitude),
    f: common_vendor.t($data.currentLocation.longitude)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/daima/dm/ylqc_mobile/pages/mapdemo/demo/demo.vue"]]);
wx.createPage(MiniProgramPage);
