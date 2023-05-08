"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      list1: [{
        name: "进行中"
      }, {
        name: "已完成"
      }, {
        name: "已取消"
      }],
      tabIndex: 0,
      tabStatus: true
    };
  },
  methods: {
    tabChang(index) {
      this.tabIndex = index.index;
      console.log(this.tabIndex);
      console.log("index的值为：" + this.tabIndex + "和index" + index.index);
    }
  }
};
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_sticky2 = common_vendor.resolveComponent("u-sticky");
  (_easycom_u_tabs2 + _easycom_u_sticky2)();
}
const _easycom_u_tabs = () => "../../uni_modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_u_sticky = () => "../../uni_modules/uview-plus/components/u-sticky/u-sticky.js";
if (!Math) {
  (_easycom_u_tabs + _easycom_u_sticky)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.tabChang),
    b: common_vendor.p({
      list: $data.list1,
      scrollable: false,
      current: $data.tabIndex,
      itemStyle: "padding-left: 41px; padding-right:39px; height: 34px;",
      activeStyle: {
        color: "#3c9cff",
        fontWeight: "bold",
        transform: "scale(1.05)"
      }
    }),
    c: common_vendor.p({
      bgColor: "#fff"
    }),
    d: $data.tabIndex === 0
  }, $data.tabIndex === 0 ? {} : $data.tabIndex === 1 ? {} : {}, {
    e: $data.tabIndex === 1
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/daima/dm/ylqc_mobile/pages/order/order.vue"]]);
wx.createPage(MiniProgramPage);
