"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      tips: "",
      // refCode: null,
      seconds: 10
    };
  },
  methods: {
    codeChange(text) {
      this.tips = text;
    },
    getCode() {
      if (this.$refs.uCode.canGetCode) {
        common_vendor.index.showLoading({
          title: "正在获取验证码"
        });
        setTimeout(() => {
          common_vendor.index.hideLoading();
          common_vendor.index.$u.toast("验证码已发送");
          this.$refs.uCode.start();
        }, 2e3);
      } else {
        common_vendor.index.$u.toast("倒计时结束后再发送");
      }
    },
    end() {
      common_vendor.index.$u.toast("倒计时结束");
    },
    start() {
      common_vendor.index.$u.toast("倒计时开始");
    }
  }
};
if (!Array) {
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  const _easycom_u_gap2 = common_vendor.resolveComponent("u-gap");
  const _easycom_u_toast2 = common_vendor.resolveComponent("u-toast");
  const _easycom_u_code2 = common_vendor.resolveComponent("u-code");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u__input2 + _easycom_u_gap2 + _easycom_u_toast2 + _easycom_u_code2 + _easycom_u_button2)();
}
const _easycom_u__input = () => "../../uni_modules/uview-plus/components/u--input/u--input.js";
const _easycom_u_gap = () => "../../uni_modules/uview-plus/components/u-gap/u-gap.js";
const _easycom_u_toast = () => "../../uni_modules/uview-plus/components/u-toast/u-toast.js";
const _easycom_u_code = () => "../../uni_modules/uview-plus/components/u-code/u-code.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u__input + _easycom_u_gap + _easycom_u_toast + _easycom_u_code + _easycom_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      placeholder: "请输入手机号",
      border: "bottom",
      clearable: true
    }),
    b: common_vendor.p({
      height: "2",
      bgColor: "#ffffff"
    }),
    c: common_vendor.p({
      placeholder: "请输入验证码",
      border: "bottom",
      clearable: true
    }),
    d: common_vendor.sr("uToast", "452c255c-3"),
    e: common_vendor.sr("uCode", "452c255c-4"),
    f: common_vendor.o($options.end),
    g: common_vendor.o($options.start),
    h: common_vendor.o($options.codeChange),
    i: common_vendor.p({
      seconds: $data.seconds
    }),
    j: common_vendor.t($data.tips),
    k: common_vendor.o($options.getCode),
    l: common_vendor.p({
      height: "50",
      bgColor: "#ffffff"
    }),
    m: common_vendor.p({
      type: "success",
      text: "立即登录"
    }),
    n: common_vendor.o((...args) => _ctx.phonelogin && _ctx.phonelogin(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-452c255c"], ["__file", "F:/daima/dm/ylqc_mobile/pages/login/phonelogin.vue"]]);
wx.createPage(MiniProgramPage);
