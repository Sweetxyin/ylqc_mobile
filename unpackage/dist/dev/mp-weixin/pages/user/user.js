"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      hasLogin: this.$store.state.hasLogin,
      //登录状态
      openid: this.$store.state.openid,
      avatarSrc: "https://www.baexnyqc.cn/images/other/tx.jpg",
      userInfo: {
        name: "",
        //昵称
        avatar: ""
        //头像
      },
      identify: common_vendor.index.getStorageSync("identify")
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
        if (_this.identify == "driver") {
          _this.$api.reqPost("api/yl_driver/GetUser", {
            params: {
              openid: _this.openid
            }
          }).then((res) => {
            if (res.status) {
              _this.userInfo = res.data;
              if (res.data.name == null) {
                let val = res.data.phone;
                let reg = /^(.{3}).*(.{4})$/;
                _this.userInfo.name = val.replace(reg, "$1****$2");
              }
              console.log("获取司机用户信息成功！", res);
            } else {
              console.log("获取司机用户信息失败！", res);
            }
          });
        } else {
          _this.$api.reqPost("api/yl_user/GetUserInfo").then((res) => {
            if (res.status) {
              _this.userInfo = res.data;
              if (res.data.name == null) {
                let val = res.data.phone;
                let reg = /^(.{3}).*(.{4})$/;
                _this.userInfo.name = val.replace(reg, "$1****$2");
              }
              console.log("获取客户信息成功！", res);
            } else {
              console.log("获取客户信息失败！", res);
            }
          });
        }
      }
    }
  }
};
if (!Array) {
  const _easycom_u_gap2 = common_vendor.resolveComponent("u-gap");
  const _easycom_u_avatar2 = common_vendor.resolveComponent("u-avatar");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u__text2 = common_vendor.resolveComponent("u--text");
  const _easycom_u_cell2 = common_vendor.resolveComponent("u-cell");
  const _easycom_u_cell_group2 = common_vendor.resolveComponent("u-cell-group");
  const _easycom_tabbar2 = common_vendor.resolveComponent("tabbar");
  (_easycom_u_gap2 + _easycom_u_avatar2 + _easycom_u_icon2 + _easycom_u__text2 + _easycom_u_cell2 + _easycom_u_cell_group2 + _easycom_tabbar2)();
}
const _easycom_u_gap = () => "../../uni_modules/uview-plus/components/u-gap/u-gap.js";
const _easycom_u_avatar = () => "../../uni_modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u__text = () => "../../uni_modules/uview-plus/components/u--text/u--text.js";
const _easycom_u_cell = () => "../../uni_modules/uview-plus/components/u-cell/u-cell.js";
const _easycom_u_cell_group = () => "../../uni_modules/uview-plus/components/u-cell-group/u-cell-group.js";
const _easycom_tabbar = () => "../../components/tabbar/tabbar.js";
if (!Math) {
  (_easycom_u_gap + _easycom_u_avatar + _easycom_u_icon + _easycom_u__text + _easycom_u_cell + _easycom_u_cell_group + _easycom_tabbar)();
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
    e: common_vendor.o((...args) => $options.toAuth && $options.toAuth(...args)),
    f: $data.identify != "driver"
  } : {
    h: common_vendor.p({
      name: "account",
      size: "50"
    }),
    i: common_vendor.p({
      text: "立即登录/认证"
    }),
    j: common_vendor.o((...args) => $options.onLogin && $options.onLogin(...args))
  }, {
    g: $data.hasLogin == false,
    k: common_vendor.p({
      name: "setting",
      size: "25"
    }),
    l: $data.identify == "driver"
  }, $data.identify == "driver" ? {
    m: common_vendor.p({
      name: "red-packet",
      size: "30"
    })
  } : {
    n: common_vendor.p({
      name: "red-packet",
      color: "#FA7473",
      size: "30"
    })
  }, {
    o: common_vendor.p({
      name: "gift",
      color: "#87CEEB",
      size: "30"
    }),
    p: common_vendor.p({
      name: "rmb-circle",
      color: "#F9CE5D",
      size: "30"
    }),
    q: common_vendor.p({
      name: "order",
      color: "#ADD8E6",
      size: "30"
    }),
    r: $data.identify != "driver",
    s: common_vendor.p({
      url: "/pages/shop/shop_order/shop_order",
      title: "商城订单",
      isLink: true
    }),
    t: common_vendor.p({
      border: false
    }),
    v: common_vendor.p({
      selectedIndex: "4"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0f7520f0"], ["__file", "F:/daima/dm/ylqc_mobile/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
