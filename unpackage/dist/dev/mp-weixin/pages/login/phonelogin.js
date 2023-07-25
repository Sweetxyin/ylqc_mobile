"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      phoneNumber: "",
      //手机号码
      code: "",
      //验证码
      tips: "",
      // refCode: null,
      seconds: 60
    };
  },
  methods: {
    codeChange(text) {
      this.tips = text;
    },
    getCode() {
      let _this = this;
      if (_this.phoneNumber == "") {
        common_vendor.index.showToast({
          title: "请先输入手机号",
          icon: "none"
        });
      }
      let checkPhone = new RegExp(/^[1]([3-9])[0-9]{9}$/);
      if (!checkPhone.test(_this.phoneNumber)) {
        common_vendor.index.showToast({
          title: "请输入正确的手机号",
          icon: "none"
        });
        return;
      }
      if (_this.$refs.uCode.canGetCode) {
        _this.$api.reqPost(
          "api/yl_user/",
          {
            data: { phoneNumber: _this.phoneNumber },
            header: {
              "Connection": "keep-alive",
              "Content-Type": "application/json"
            }
          }
        ).then((res) => {
          if (res.status) {
            common_vendor.index.$u.toast("验证码已发送");
            console.log("验证码", res);
          }
        });
        common_vendor.index.showLoading({
          title: "正在获取验证码"
        });
        setTimeout(() => {
          common_vendor.index.hideLoading();
          common_vendor.index.$u.toast("验证码已发送");
          _this.$refs.uCode.start();
        }, 2e3);
      } else {
        common_vendor.index.$u.toast("倒计时结束后再重新发送哦");
      }
    },
    // end() {
    // 	uni.$u.toast('倒计时结束');
    // },
    start() {
      common_vendor.index.$u.toast("验证码已发送");
    },
    phonelogin() {
      if (this.phoneNumber == "") {
        common_vendor.index.showToast({
          title: "手机号不能为空",
          icon: "none"
        });
      } else if (this.code == "") {
        common_vendor.index.showToast({
          title: "验证码不能为空",
          icon: "none"
        });
      } else
        ;
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
    a: common_vendor.o(($event) => $data.phoneNumber = $event),
    b: common_vendor.p({
      placeholder: "请输入手机号",
      fontSize: "34rpx",
      border: "bottom",
      clearable: true,
      modelValue: $data.phoneNumber
    }),
    c: common_vendor.p({
      height: "2",
      bgColor: "#ffffff"
    }),
    d: common_vendor.o(($event) => $data.code = $event),
    e: common_vendor.p({
      placeholder: "请输入验证码",
      fontSize: "34rpx",
      border: "bottom",
      clearable: true,
      modelValue: $data.code
    }),
    f: common_vendor.sr("uToast", "452c255c-3"),
    g: common_vendor.sr("uCode", "452c255c-4"),
    h: common_vendor.o(_ctx.end),
    i: common_vendor.o($options.start),
    j: common_vendor.o($options.codeChange),
    k: common_vendor.p({
      seconds: $data.seconds
    }),
    l: common_vendor.t($data.tips),
    m: common_vendor.o($options.getCode),
    n: common_vendor.p({
      height: "35",
      bgColor: "#ffffff"
    }),
    o: common_vendor.p({
      type: "success",
      text: "登录"
    }),
    p: common_vendor.o((...args) => $options.phonelogin && $options.phonelogin(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-452c255c"], ["__file", "F:/daima/dm/ylqc_mobile/pages/login/phonelogin.vue"]]);
wx.createPage(MiniProgramPage);
