"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "order-complete",
  data() {
    return {
      indexList: [
        {
          orderId: "123",
          orderStatus: "订单已完成",
          orderTime: "2023.5.17",
          startAddress: "柳州市延龙汽车",
          endAddress: "柳州市万象城",
          price: 50
        },
        {
          orderId: "234",
          orderStatus: "订单已完成",
          orderTime: "2023.5.18",
          startAddress: "柳州市阳和科三考场",
          endAddress: "柳州市地王新天地",
          price: 65
        }
      ]
    };
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.indexList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.orderStatus),
        b: "c04d84f7-0-" + i0,
        c: common_vendor.t(item.orderTime),
        d: "c04d84f7-1-" + i0,
        e: common_vendor.t(item.startAddress),
        f: "c04d84f7-2-" + i0,
        g: common_vendor.t(item.endAddress),
        h: common_vendor.t(item.price),
        i: index
      };
    }),
    b: common_vendor.p({
      name: "clock-fill",
      size: "14"
    }),
    c: common_vendor.p({
      name: "car-fill",
      color: "#00cc33",
      size: "16"
    }),
    d: common_vendor.p({
      name: "car-fill",
      color: "#dc143c",
      size: "16"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c04d84f7"], ["__file", "F:/daima/dm/ylqc_mobile/components/order-status/order-complete.vue"]]);
wx.createComponent(Component);
