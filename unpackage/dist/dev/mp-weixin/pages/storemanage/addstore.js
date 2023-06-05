"use strict";
const common_vendor = require("../../common/vendor.js");
const Map = () => "../../components/map/map.js";
const _sfc_main = {
  data() {
    return {
      addressName: "柳州市延龙汽车有限公司",
      //地址名称
      address: "柳州市鱼峰区工业新区和悦路1号",
      //地址
      addressNotes: "",
      //地址备注
      contactName: "",
      //姓名
      cantactPhone: ""
      //电话
    };
  },
  components: {
    Map
  },
  methods: {}
};
if (!Array) {
  const _component_Map = common_vendor.resolveComponent("Map");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_gap2 = common_vendor.resolveComponent("u-gap");
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_component_Map + _easycom_u_icon2 + _easycom_u_gap2 + _easycom_u__input2 + _easycom_u_button2)();
}
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_gap = () => "../../uni_modules/uview-plus/components/u-gap/u-gap.js";
const _easycom_u__input = () => "../../uni_modules/uview-plus/components/u--input/u--input.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_gap + _easycom_u__input + _easycom_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.addressName),
    b: common_vendor.p({
      name: "map-fill",
      color: "red",
      ["label-color"]: "red",
      label: "定位",
      labelPos: "bottom",
      labelSize: "8",
      size: "16"
    }),
    c: common_vendor.t($data.address),
    d: common_vendor.p({
      height: "15",
      bgColor: "f0ffff"
    }),
    e: common_vendor.o(($event) => $data.addressNotes = $event),
    f: common_vendor.p({
      placeholder: "楼层及门牌号码",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      modelValue: $data.addressNotes
    }),
    g: common_vendor.o(($event) => $data.contactName = $event),
    h: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      modelValue: $data.contactName
    }),
    i: common_vendor.o(($event) => $data.cantactPhone = $event),
    j: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      modelValue: $data.cantactPhone
    }),
    k: common_vendor.p({
      height: "15",
      bgColor: "f0ffff"
    }),
    l: common_vendor.o(_ctx.addStore),
    m: common_vendor.p({
      type: "primary",
      size: "small"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a442d1f7"], ["__file", "F:/daima/dm/ylqc_mobile/pages/storemanage/addstore.vue"]]);
wx.createPage(MiniProgramPage);
