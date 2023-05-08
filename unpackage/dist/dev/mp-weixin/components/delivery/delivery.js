"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "delivery",
  data() {
    return {
      start_address: "柳州延龙汽车",
      end_address: "输入您的目的地",
      r1: "",
      r2: ""
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.start_address),
    b: common_vendor.t($data.end_address),
    c: $data.r1,
    d: $data.r2,
    e: common_vendor.o((...args) => _ctx.formSubmit && _ctx.formSubmit(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/daima/dm/ylqc_mobile/components/delivery/delivery.vue"]]);
wx.createComponent(Component);
