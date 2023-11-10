"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {}
};
if (!Array) {
  const _easycom_tabbar2 = common_vendor.resolveComponent("tabbar");
  _easycom_tabbar2();
}
const _easycom_tabbar = () => "../../components/tabbar/tabbar.js";
if (!Math) {
  _easycom_tabbar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      selectedIndex: "3"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/daima/dm/ylqc_mobile/pages/change_electricity/change_electricity.vue"]]);
wx.createPage(MiniProgramPage);
