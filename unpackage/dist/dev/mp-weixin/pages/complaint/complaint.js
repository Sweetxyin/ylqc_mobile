"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // consult_phone:'123456'
    };
  },
  methods: {}
};
if (!Array) {
  const _easycom_u_cell2 = common_vendor.resolveComponent("u-cell");
  const _easycom_u_cell_group2 = common_vendor.resolveComponent("u-cell-group");
  (_easycom_u_cell2 + _easycom_u_cell_group2)();
}
const _easycom_u_cell = () => "../../uni_modules/uview-plus/components/u-cell/u-cell.js";
const _easycom_u_cell_group = () => "../../uni_modules/uview-plus/components/u-cell-group/u-cell-group.js";
if (!Math) {
  (_easycom_u_cell + _easycom_u_cell_group)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "我要投诉",
      url: "/pages/complaint/tocomplaint",
      isLink: true
    }),
    b: common_vendor.p({
      border: false
    }),
    c: common_vendor.p({
      title: "历史信息",
      url: "/pages/complaint/history",
      isLink: true
    }),
    d: common_vendor.p({
      border: false
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-516bbc45"], ["__file", "F:/daima/dm/ylqc_mobile/pages/complaint/complaint.vue"]]);
wx.createPage(MiniProgramPage);
