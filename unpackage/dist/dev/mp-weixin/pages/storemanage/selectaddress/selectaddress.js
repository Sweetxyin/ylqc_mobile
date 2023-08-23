"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      city: "柳州市",
      //城市
      addressName: "",
      //地址
      addressList: [
        {
          addressName: "柳州市延龙汽车有限公司",
          //地址名称
          address: "柳州市鱼峰区工业新区和悦路1号"
          //地址
          // distance:'12km',//距离
        },
        {
          addressName: "柳州市延龙科三考场",
          //地址名称
          address: "柳州市鱼峰区工业新区和悦路1号"
          //地址
          // distance:'12km',//距离
        }
      ]
    };
  },
  methods: {}
};
if (!Array) {
  const _easycom_u_gap2 = common_vendor.resolveComponent("u-gap");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  (_easycom_u_gap2 + _easycom_u_icon2 + _easycom_u__input2)();
}
const _easycom_u_gap = () => "../../../uni_modules/uview-plus/components/u-gap/u-gap.js";
const _easycom_u_icon = () => "../../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u__input = () => "../../../uni_modules/uview-plus/components/u--input/u--input.js";
if (!Math) {
  (_easycom_u_gap + _easycom_u_icon + _easycom_u__input)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      height: "10",
      bgColor: "#f0ffff"
    }),
    b: common_vendor.t($data.city),
    c: common_vendor.p({
      name: "arrow-right",
      size: "20"
    }),
    d: common_vendor.o(($event) => $data.addressName = $event),
    e: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "left",
      modelValue: $data.addressName
    }),
    f: common_vendor.p({
      height: "10",
      bgColor: "#f0ffff"
    }),
    g: common_vendor.f($data.addressList, (item, index, i0) => {
      return {
        a: "4283b773-4-" + i0,
        b: common_vendor.t(item.addressName),
        c: "4283b773-5-" + i0,
        d: common_vendor.t(item.address),
        e: index
      };
    }),
    h: common_vendor.p({
      name: "map-fill",
      size: "18"
    }),
    i: common_vendor.p({
      height: "3",
      bgColor: "#ffffff"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4283b773"], ["__file", "F:/daima/dm/ylqc_mobile/pages/storemanage/selectaddress/selectaddress.vue"]]);
wx.createPage(MiniProgramPage);
