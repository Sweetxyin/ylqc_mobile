"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {}
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u__text2 = common_vendor.resolveComponent("u--text");
  (_easycom_u_icon2 + _easycom_u__text2)();
}
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u__text = () => "../../uni_modules/uview-plus/components/u--text/u--text.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u__text)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      name: "account",
      size: "50"
    }),
    b: common_vendor.p({
      text: "立即登录/认证"
    }),
    c: common_vendor.p({
      name: "setting",
      size: "25"
    }),
    d: common_vendor.p({
      name: "red-packet",
      size: "30"
    }),
    e: common_vendor.p({
      name: "gift",
      size: "30"
    }),
    f: common_vendor.p({
      name: "rmb-circle",
      size: "30"
    }),
    g: common_vendor.p({
      name: "order",
      size: "30"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/daima/dm/ylqc_mobile/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
