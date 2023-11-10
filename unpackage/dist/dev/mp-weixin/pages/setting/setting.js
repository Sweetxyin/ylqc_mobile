"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {
        avatar: "",
        //头像
        name: "",
        //昵称
        company: "",
        //公司名称
        realName: "",
        //真实姓名
        address: "",
        //公司地址
        idCrad: "",
        //身份证号
        phone: "",
        //电话号码
        licensePlate: "",
        //车牌
        carType: ""
        //车型
      },
      inputStatus: false,
      userToken: this.$store.state.token,
      identify: common_vendor.index.getStorageSync("identify"),
      openid: this.$store.state.openid
    };
  },
  onShow() {
    this.getUserInfo();
  },
  methods: {
    ...common_vendor.mapMutations(["userLogout"]),
    //选择头像
    chooseAvatar() {
    },
    //退出登录
    logout() {
      var _this = this;
      common_vendor.index.showModal({
        title: "确定要退出登录吗？",
        success: function(res) {
          if (res.confirm) {
            _this.$api.reqPost("api/yl_user/LogOut").then((res2) => {
              if (res2.status) {
                console.log("注销登录成功!");
                common_vendor.index.removeStorageSync("token");
                common_vendor.index.removeStorageSync("identify");
                console.log("检查token是否移除", common_vendor.index.getStorageSync("token"));
                console.log("检查identify是否移除", common_vendor.index.getStorageSync("identify"));
                _this.userLogout();
                console.log("检查是否成功将数据移除vuex", _this.$store.state);
                common_vendor.index.reLaunch({ url: "/pages/index/index" });
              } else {
                console.log("注销登录失败!");
              }
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    //获取用户信息
    getUserInfo() {
      var _this = this;
      if (_this.identify == "driver") {
        _this.$api.reqPost("api/yl_driver/GetUser", {
          params: {
            openid: _this.openid
          }
        }).then((res) => {
          if (res.status) {
            _this.userInfo = res.data;
            if (res.data.idCrad != "") {
              let val = res.data.idCrad;
              let reg = /^(.{3}).*(.{2})$/;
              _this.userInfo.idCrad = val.replace(reg, "$1*************$2");
              console.log("sfzh", val);
            }
            console.log("获取用户信息成功", res);
          } else {
            console.log("获取用户信息失败", res);
          }
        });
      } else {
        _this.$api.reqPost("api/yl_user/GetUserInfo").then((res) => {
          if (res.status) {
            _this.userInfo = res.data;
            if (res.data.idCrad != "") {
              let val = res.data.idCrad;
              let reg = /^(.{3}).*(.{2})$/;
              _this.userInfo.idCrad = val.replace(reg, "$1*************$2");
            }
            console.log("获取用户信息成功", res);
          } else {
            console.log("获取用户信息失败", res);
          }
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_u_cell2 = common_vendor.resolveComponent("u-cell");
  const _easycom_u_cell_group2 = common_vendor.resolveComponent("u-cell-group");
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_cell2 + _easycom_u_cell_group2 + _easycom_u__input2 + _easycom_u_button2)();
}
const _easycom_u_cell = () => "../../uni_modules/uview-plus/components/u-cell/u-cell.js";
const _easycom_u_cell_group = () => "../../uni_modules/uview-plus/components/u-cell-group/u-cell-group.js";
const _easycom_u__input = () => "../../uni_modules/uview-plus/components/u--input/u--input.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_cell + _easycom_u_cell_group + _easycom_u__input + _easycom_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: "头像",
      isLink: true
    }),
    b: common_vendor.p({
      border: false
    }),
    c: common_vendor.o(($event) => $data.userInfo.name = $event),
    d: common_vendor.p({
      placeholder: "请输入昵称",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: "false",
      modelValue: $data.userInfo.name
    }),
    e: common_vendor.o(($event) => $data.userInfo.realName = $event),
    f: common_vendor.p({
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: $data.inputStatus,
      modelValue: $data.userInfo.realName
    }),
    g: common_vendor.o(($event) => $data.userInfo.idCrad = $event),
    h: common_vendor.p({
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: $data.inputStatus,
      modelValue: $data.userInfo.idCrad
    }),
    i: common_vendor.o(($event) => $data.userInfo.phone = $event),
    j: common_vendor.p({
      placeholder: "请输入电话号码",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: $data.inputStatus,
      modelValue: $data.userInfo.phone
    }),
    k: $data.identify == "driver"
  }, $data.identify == "driver" ? {
    l: common_vendor.o(($event) => $data.userInfo.licensePlate = $event),
    m: common_vendor.p({
      border: "none",
      inputAlign: "right",
      fontSize: "30rpx",
      disabled: $data.inputStatus,
      modelValue: $data.userInfo.licensePlate
    }),
    n: common_vendor.o(($event) => $data.userInfo.carType = $event),
    o: common_vendor.p({
      border: "none",
      inputAlign: "right",
      fontSize: "30rpx",
      disabled: $data.inputStatus,
      modelValue: $data.userInfo.carType
    })
  } : {
    p: common_vendor.o(($event) => $data.userInfo.company = $event),
    q: common_vendor.p({
      placeholder: "请输入公司名称",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: $data.inputStatus,
      modelValue: $data.userInfo.company
    }),
    r: common_vendor.o(($event) => $data.userInfo.address = $event),
    s: common_vendor.p({
      placeholder: "请输入公司地址",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: $data.inputStatus,
      modelValue: $data.userInfo.address
    })
  }, {
    t: common_vendor.p({
      title: "关于延龙",
      isLink: true
    }),
    v: common_vendor.p({
      border: false
    }),
    w: common_vendor.p({
      title: "延龙法律条规",
      isLink: true
    }),
    x: common_vendor.p({
      border: false
    }),
    y: common_vendor.p({
      title: "收费标准",
      isLink: true
    }),
    z: common_vendor.p({
      border: false
    }),
    A: common_vendor.o($options.logout),
    B: common_vendor.p({
      type: "error",
      plain: true,
      text: "退出登录"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-018cdf56"], ["__file", "F:/daima/dm/ylqc_mobile/pages/setting/setting.vue"]]);
wx.createPage(MiniProgramPage);
