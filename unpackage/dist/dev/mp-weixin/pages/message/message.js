"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      time: "5.30"
    };
  },
  methods: {}
};
if (!Array) {
  const _easycom_u_gap2 = common_vendor.resolveComponent("u-gap");
  const _easycom_u_avatar2 = common_vendor.resolveComponent("u-avatar");
  const _easycom_tabbar2 = common_vendor.resolveComponent("tabbar");
  (_easycom_u_gap2 + _easycom_u_avatar2 + _easycom_tabbar2)();
}
const _easycom_u_gap = () => "../../uni_modules/uview-plus/components/u-gap/u-gap.js";
const _easycom_u_avatar = () => "../../uni_modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_tabbar = () => "../../components/tabbar/tabbar.js";
if (!Math) {
  (_easycom_u_gap + _easycom_u_avatar + _easycom_tabbar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      height: "10",
      bgColor: "#ffffff"
    }),
    b: common_vendor.p({
      height: "10",
      bgColor: "#ffffff"
    }),
    c: common_vendor.p({
      src: _ctx.src
    }),
    d: common_vendor.t($data.time),
    e: common_vendor.p({
      height: "10",
      bgColor: "#ffffff"
    }),
    f: common_vendor.p({
      src: _ctx.src
    }),
    g: common_vendor.t($data.time),
    h: common_vendor.p({
      selectedIndex: "2"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4c1b26cf"], ["__file", "F:/daima/dm/ylqc_mobile/pages/message/message.vue"]]);
wx.createPage(MiniProgramPage);
