"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      companyName: "",
      //公司名称
      companyAddress: "",
      //公司地址
      realname: "",
      //真实姓名
      phone: "",
      //电话号码
      IDcard: "",
      //身份证号
      licensePlate: "",
      //车牌
      carType: "",
      //车型
      openid: this.$store.state.openid,
      identify: common_vendor.index.getStorageSync("identify")
      // token:this.$store.state.token
    };
  },
  computed: {
    userOpenid() {
      return this.$store.state.openid;
    }
  },
  methods: {
    //提交客户认证
    toAuthentication() {
      var _this = this;
      if (_this.realname == "") {
        common_vendor.index.showToast({
          title: "请填写真实姓名！",
          icon: "none"
        });
      } else if (_this.phone == "") {
        common_vendor.index.showToast({
          title: "请填写电话号码！",
          icon: "none"
        });
      } else if (_this.IDcard == "") {
        common_vendor.index.showToast({
          title: "请填写身份证号！",
          icon: "none"
        });
      } else {
        _this.$api.reqPost("api/yl_user/EditUser", {
          params: {
            company: _this.companyName,
            address: _this.companyAddress,
            realname: _this.realname,
            phone: _this.phone,
            IDcard: _this.IDcard,
            openid: _this.openid
          }
        }).then((res) => {
          if (res.status) {
            common_vendor.index.showToast({
              title: "提交认证成功！",
              icon: "none"
            });
            console.log("提交成功", res);
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
    //提交司机认证
    toDriverAuthentication() {
      var _this = this;
      if (_this.realname == "") {
        common_vendor.index.showToast({
          title: "请填写真实姓名！",
          icon: "none"
        });
      } else if (_this.phone == "") {
        common_vendor.index.showToast({
          title: "请填写电话号码！",
          icon: "none"
        });
      } else if (_this.IDcard == "") {
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
            realName: _this.realname,
            phone: _this.phone,
            idCard: _this.IDcard,
            licensePlate: _this.licensePlate,
            carType: _this.carType
          }
        }).then((res) => {
          if (res.status) {
            common_vendor.index.showToast({
              title: "提交认证成功！",
              icon: "none"
            });
            console.log("提交成功", res);
          } else {
            common_vendor.index.showToast({
              title: "提交认证失败！",
              icon: "none"
            });
            console.log("提交失败", res);
          }
        });
      }
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
  return common_vendor.e({
    a: common_vendor.o(($event) => $data.realname = $event),
    b: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "28rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.realname
    }),
    c: common_vendor.o(($event) => $data.phone = $event),
    d: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "28rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.phone
    }),
    e: common_vendor.o(($event) => $data.IDcard = $event),
    f: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "28rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.IDcard
    }),
    g: $data.identify == "driver"
  }, $data.identify == "driver" ? {
    h: common_vendor.o(($event) => $data.licensePlate = $event),
    i: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "30rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.licensePlate
    }),
    j: common_vendor.o(($event) => $data.carType = $event),
    k: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "30rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.carType
    }),
    l: common_vendor.o($options.toDriverAuthentication),
    m: common_vendor.p({
      type: "primary",
      text: "提交认证"
    })
  } : {
    n: common_vendor.o(($event) => $data.companyName = $event),
    o: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "28rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.companyName
    }),
    p: common_vendor.o(($event) => $data.companyAddress = $event),
    q: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "28rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.companyAddress
    }),
    r: common_vendor.o($options.toAuthentication),
    s: common_vendor.p({
      type: "primary",
      text: "提交认证"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-aab5e4ba"], ["__file", "F:/daima/dm/ylqc_mobile/pages/user/authentication.vue"]]);
wx.createPage(MiniProgramPage);
