"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      tips: "",
      //验证码提示文字
      phone: "",
      //手机号码
      Scode: "",
      //验证码
      code: "",
      //验证码
      openId: "",
      sessionKey: "",
      //秘钥
      iv: "",
      //本机号码秘钥
      encryptedData: "",
      //本机号码秘钥
      info: []
    };
  },
  onLoad() {
    this.updateSessionKey();
  },
  methods: {
    // 获取code
    getLoginCode() {
      common_vendor.index.login({
        provider: "weixin",
        success: async (res) => {
          this.code = res.code;
          console.log(res);
          console.log(this.code);
        }
      });
    },
    // 微信登陆
    weichatlogin() {
      let _this = this;
      let token = common_vendor.index.getStorageSync("token");
      if (token) {
        common_vendor.index.redirectTo({
          url: "/pages/index/index"
        });
      } else {
        common_vendor.index.getUserProfile({
          lang: "zh_CN",
          desc: "获取你的昵称、头像、地区及性别",
          success: (res) => {
            _this.info = res.userInfo;
            console.log(res);
            common_vendor.index.showToast({
              icon: "none",
              title: "获取成功"
            });
          },
          fail: (err) => {
            console.log(err);
            common_vendor.index.showToast({
              icon: "none",
              title: "用户拒绝获取"
            });
          }
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  _easycom_u_button2();
}
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  _easycom_u_button();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "success",
      icon: "weixin-fill",
      text: "微信一键登录"
    }),
    b: common_vendor.o((...args) => $options.weichatlogin && $options.weichatlogin(...args)),
    c: common_vendor.p({
      type: "success",
      plain: true,
      text: "手机号登录/注册"
    }),
    d: common_vendor.o((...args) => _ctx.toPhoneLogin && _ctx.toPhoneLogin(...args)),
    e: common_vendor.o(($event) => _ctx.dealClick("用户服务协议")),
    f: common_vendor.o(($event) => _ctx.dealClick("隐私协议"))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"], ["__file", "F:/daima/dm/ylqc_mobile/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
