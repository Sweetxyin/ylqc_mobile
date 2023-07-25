"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      hasLogin: this.$store.state.hasLogin,
      //登录状态
      avatarSrc: "../../static/images/other/tx.jpg",
      userInfo: {
        name: "",
        //昵称
        avatar: ""
        //头像
      }
    };
  },
  onShow() {
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    //跳转到登录页
    onLogin() {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    },
    //跳转到认证页面
    toAuth() {
      common_vendor.index.navigateTo({
        url: "/pages/user/authentication"
      });
    },
    //获取用户信息
    getUserInfo() {
      var _this = this;
      if (_this.hasLogin) {
        _this.$api.reqPost("api/yl_user/GetUserInfo").then((res) => {
          if (res.status) {
            _this.userInfo = res.data;
            if (res.data.name == null) {
              let val = res.data.phone;
              let reg = /^(.{3}).*(.{4})$/;
              _this.userInfo.name = val.replace(reg, "$1****$2");
            }
            console.log("获取用户信息成功！", res);
          } else {
            console.log("获取用户信息失败！", res);
          }
        });
      }
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
    b: $data.hasLogin == true
  }, $data.hasLogin == true ? {
    c: common_vendor.p({
      size: "50",
      src: $data.userInfo.avatar
    }),
    d: common_vendor.t($data.userInfo.name),
    e: common_vendor.o((...args) => $options.toAuth && $options.toAuth(...args))
  } : {
    g: common_vendor.p({
      name: "account",
      size: "50"
    }),
    h: common_vendor.p({
      text: "立即登录/认证"
    }),
    i: common_vendor.o((...args) => $options.onLogin && $options.onLogin(...args))
  }, {
    f: $data.hasLogin == false,
    j: common_vendor.p({
      name: "setting",
      size: "25"
    }),
    k: common_vendor.p({
      name: "red-packet",
      size: "30"
    }),
    l: common_vendor.p({
      name: "gift",
      size: "30"
    }),
    m: common_vendor.p({
      name: "rmb-circle",
      size: "30"
    }),
    n: common_vendor.p({
      name: "order",
      size: "30"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0f7520f0"], ["__file", "F:/daima/dm/ylqc_mobile/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
