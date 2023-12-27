"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userid: this.$store.state.userid,
      realName: "",
      //真实姓名
      phone: "",
      //电话号码
      idCard: "",
      //身份证号
      licensePlate: "",
      //车牌
      carType: ""
      //车型
    };
  },
  methods: {
    ...common_vendor.mapMutations(["userLogout"]),
    //提交认证
    toAuthentication() {
      var _this = this;
      if (_this.realName == "") {
        common_vendor.index.showToast({
          title: "请填写真实姓名！",
          icon: "none"
        });
      } else if (_this.phone == "") {
        common_vendor.index.showToast({
          title: "请填写电话号码！",
          icon: "none"
        });
      } else if (_this.idCard == "") {
        common_vendor.index.showToast({
          title: "请填写身份证号！",
          icon: "none"
        });
      } else if (_this.licensePlate == "") {
        common_vendor.index.showToast({
          title: "请填写车牌！",
          icon: "none"
        });
      } else if (_this.carType == "") {
        common_vendor.index.showToast({
          title: "请填写车型！",
          icon: "none"
        });
      } else {
        _this.$api.reqPost("api/yl_driver/Edit", {
          data: {
            id: _this.userid,
            realName: _this.realName,
            phone: _this.phone,
            idCard: _this.idCard,
            licensePlate: _this.licensePlate,
            carType: _this.carType,
            status: 1,
            action: 1
          }
        }).then((res) => {
          if (res.code == 200) {
            common_vendor.index.showToast({
              title: "提交认证成功！",
              icon: "none"
            });
            console.log("提交成功", res);
            common_vendor.index.navigateTo({
              url: "/pages/seizeorders/seizeorders"
            });
          } else {
            common_vendor.index.showToast({
              title: "提交认证失败！",
              icon: "none"
            });
            console.log("提交失败", res);
          }
        });
      }
    },
    //退出登录
    logout() {
      var _this = this;
      _this.$api.reqPost("api/yl_user/LogOut").then((res) => {
        if (res.status) {
          console.log("注销登录成功!");
          common_vendor.index.removeStorageSync("token");
          common_vendor.index.removeStorageSync("identify");
          console.log("检查token是否移除", common_vendor.index.getStorageSync("token"));
          console.log("检查identify是否移除", common_vendor.index.getStorageSync("identify"));
          _this.userLogout();
          console.log("检查是否成功将数据移除vuex", _this.$store.state);
          common_vendor.index.reLaunch({ url: "/pages/login/login" });
        } else {
          console.log("注销登录失败!");
        }
      });
    }
  }
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
    a: common_vendor.o(($event) => $data.realName = $event),
    b: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "30rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.realName
    }),
    c: common_vendor.o(($event) => $data.phone = $event),
    d: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "30rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.phone
    }),
    e: common_vendor.o(($event) => $data.idCard = $event),
    f: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "30rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.idCard
    }),
    g: common_vendor.o(($event) => $data.licensePlate = $event),
    h: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "30rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.licensePlate
    }),
    i: common_vendor.o(($event) => $data.carType = $event),
    j: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "30rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.carType
    }),
    k: common_vendor.o($options.toAuthentication),
    l: common_vendor.p({
      type: "primary",
      text: "提交认证"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ae7e1909"], ["__file", "F:/daima/dm/ylqc_mobile/pages/authentication/authentication.vue"]]);
wx.createPage(MiniProgramPage);
