"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      list: ["商家配送", "到店取货"],
      subIndex: 0
      //导航条索引值
    };
  },
  methods: {
    //获取当前的导航索引，并赋值给subIndex
    sectionChange(index) {
      this.subIndex = index;
    }
  }
};
if (!Array) {
  const _easycom_u_subsection2 = common_vendor.resolveComponent("u-subsection");
  const _easycom_u_gap2 = common_vendor.resolveComponent("u-gap");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_u_subsection2 + _easycom_u_gap2 + _easycom_u_icon2)();
}
const _easycom_u_subsection = () => "../../../uni_modules/uview-plus/components/u-subsection/u-subsection.js";
const _easycom_u_gap = () => "../../../uni_modules/uview-plus/components/u-gap/u-gap.js";
const _easycom_u_icon = () => "../../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_subsection + _easycom_u_gap + _easycom_u_icon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.sectionChange),
    b: common_vendor.p({
      list: $data.list,
      mode: "button",
      inactiveColor: "#000000",
      activeColor: "#00BAB2",
      fontSize: "16",
      current: $data.subIndex
    }),
    c: common_vendor.p({
      height: "7",
      bgColor: "#ffffff"
    }),
    d: $data.subIndex == 0,
    e: common_vendor.p({
      name: "map-fill",
      size: "26"
    }),
    f: common_vendor.p({
      height: "7",
      bgColor: "#ffffff"
    }),
    g: $data.subIndex == 1
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bed3463d"], ["__file", "F:/daima/dm/ylqc_mobile/pages/shop/place_order/place_order.vue"]]);
wx.createPage(MiniProgramPage);
