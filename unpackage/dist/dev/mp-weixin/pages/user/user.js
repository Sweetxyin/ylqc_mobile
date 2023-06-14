"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      isLogin: false,
      avatarSrc: "../../static/images/other/tx.jpg",
      userName: "Sweey",
      userList: [{
        userName: "Sweet"
      }]
    };
  },
  methods: {
    onLogin() {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    }
  }
};
if (!Array) {
  const _easycom_u_gap2 = common_vendor.resolveComponent("u-gap");
  const _easycom_u_avatar2 = common_vendor.resolveComponent("u-avatar");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u__text2 = common_vendor.resolveComponent("u--text");
  (_easycom_u_gap2 + _easycom_u_avatar2 + _easycom_u_icon2 + _easycom_u__text2)();
}
const _easycom_u_gap = () => "../../uni_modules/uview-plus/components/u-gap/u-gap.js";
const _easycom_u_avatar = () => "../../uni_modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u__text = () => "../../uni_modules/uview-plus/components/u--text/u--text.js";
if (!Math) {
  (_easycom_u_gap + _easycom_u_avatar + _easycom_u_icon + _easycom_u__text)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      height: "5",
      bgColor: "#f0ffff"
    }),
    b: $data.isLogin
  }, $data.isLogin ? {
    c: common_vendor.p({
      size: "50",
      src: $data.avatarSrc
    }),
    d: common_vendor.t($data.userName)
  } : {
    e: common_vendor.p({
      name: "account",
      size: "50"
    }),
    f: common_vendor.p({
      text: "立即登录/认证"
    }),
    g: common_vendor.o((...args) => $options.onLogin && $options.onLogin(...args))
  }, {
    h: common_vendor.p({
      name: "setting",
      size: "25"
    }),
    i: common_vendor.p({
      name: "red-packet",
      size: "30"
    }),
    j: common_vendor.p({
      name: "gift",
      size: "30"
    }),
    k: common_vendor.p({
      name: "rmb-circle",
      size: "30"
    }),
    l: common_vendor.p({
      name: "order",
      size: "30"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0f7520f0"], ["__file", "F:/daima/dm/ylqc_mobile/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
