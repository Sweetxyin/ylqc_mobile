"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      corporate_name: "",
      //公司名称
      company_address: "",
      //公司地址
      user_name: "",
      //真实姓名
      phone: "",
      //电话号码
      user_id: ""
      //身份证号
    };
  },
  methods: {}
};
if (!Array) {
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u__input2 + _easycom_u_button2)();
}
const _easycom_u__input = () => "../../uni_modules/uview-plus/components/u--input/u--input.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u__input + _easycom_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.corporate_name = $event),
    b: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.corporate_name
    }),
    c: common_vendor.o(($event) => $data.company_address = $event),
    d: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.company_address
    }),
    e: common_vendor.o(($event) => $data.user_name = $event),
    f: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.user_name
    }),
    g: common_vendor.o(($event) => $data.phone = $event),
    h: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.phone
    }),
    i: common_vendor.o(($event) => $data.user_id = $event),
    j: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.user_id
    }),
    k: common_vendor.p({
      type: "primary",
      text: "提交认证"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-aab5e4ba"], ["__file", "F:/daima/dm/ylqc_mobile/pages/user/authentication.vue"]]);
wx.createPage(MiniProgramPage);
