"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      basic_name: "",
      info_name: "",
      //昵称
      corporate_name: "柳州延龙汽车",
      //公司名称
      company_address: "广西柳州市鱼峰区和悦路1号",
      //公司地址
      phone: "19956562365",
      //电话号码
      user_name: "白敬亭",
      //真实姓名
      user_id: "56532365623"
      //身份证号
    };
  },
  methods: {
    //选择头像
    chooseAvatar() {
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
  return {
    a: common_vendor.p({
      title: "头像",
      isLink: true
    }),
    b: common_vendor.p({
      border: false
    }),
    c: common_vendor.o(($event) => $data.info_name = $event),
    d: common_vendor.p({
      placeholder: "请输入昵称",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.info_name
    }),
    e: common_vendor.o(($event) => $data.corporate_name = $event),
    f: common_vendor.p({
      placeholder: "请输入公司名称",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.corporate_name
    }),
    g: common_vendor.o(($event) => $data.company_address = $event),
    h: common_vendor.p({
      placeholder: "请输入公司地址",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.company_address
    }),
    i: common_vendor.o(($event) => $data.phone = $event),
    j: common_vendor.p({
      placeholder: "请输入电话号码",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.phone
    }),
    k: common_vendor.o(($event) => $data.user_name = $event),
    l: common_vendor.p({
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.user_name
    }),
    m: common_vendor.o(($event) => $data.user_id = $event),
    n: common_vendor.p({
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.user_id
    }),
    o: common_vendor.p({
      title: "关于延龙",
      isLink: true
    }),
    p: common_vendor.p({
      border: false
    }),
    q: common_vendor.p({
      title: "延龙法律条规",
      isLink: true
    }),
    r: common_vendor.p({
      border: false
    }),
    s: common_vendor.p({
      title: "收费标准",
      isLink: true
    }),
    t: common_vendor.p({
      border: false
    }),
    v: common_vendor.p({
      type: "error",
      plain: true,
      text: "退出登录"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-018cdf56"], ["__file", "F:/daima/dm/ylqc_mobile/pages/setting/setting.vue"]]);
wx.createPage(MiniProgramPage);
