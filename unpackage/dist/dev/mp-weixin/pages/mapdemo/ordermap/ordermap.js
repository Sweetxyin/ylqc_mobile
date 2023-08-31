"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => _ctx.getMapLocation && _ctx.getMapLocation(...args)),
    b: _ctx.reportInfo.lttd,
    c: _ctx.reportInfo.lgtd,
    d: _ctx.covers
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/daima/dm/ylqc_mobile/pages/mapdemo/ordermap/ordermap.vue"]]);
wx.createPage(MiniProgramPage);
