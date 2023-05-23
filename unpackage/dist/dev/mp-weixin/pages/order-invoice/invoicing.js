"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      form: {
        companyName: "",
        dutyParagraph: "",
        contents: "",
        totalMoney: ""
      },
      radiovalue: [],
      radiolist1: [{
        name: "企业单位",
        disabled: false
      }, {
        name: "个人/非企业单位",
        disabled: false
      }],
      rules: {
        name: [{
          required: true,
          message: "请输入姓名",
          // 可以单个或者同时写两个触发验证方式
          trigger: "blur"
        }],
        intro: [{
          required: true,
          min: 5,
          message: "简介不能少于5个字",
          trigger: "blur"
        }]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          console.log("验证通过");
        } else {
          console.log("验证失败");
        }
      });
    },
    groupChange(n) {
      console.log("groupChange", n);
    },
    radioChange(n) {
      console.log("radioChange", n);
    }
  }
};
if (!Array) {
  const _easycom_u_radio2 = common_vendor.resolveComponent("u-radio");
  const _easycom_u_radio_group2 = common_vendor.resolveComponent("u-radio-group");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_form2 = common_vendor.resolveComponent("u-form");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_radio2 + _easycom_u_radio_group2 + _easycom_u_form_item2 + _easycom_u_input2 + _easycom_u_form2 + _easycom_u_button2)();
}
const _easycom_u_radio = () => "../../uni_modules/uview-plus/components/u-radio/u-radio.js";
const _easycom_u_radio_group = () => "../../uni_modules/uview-plus/components/u-radio-group/u-radio-group.js";
const _easycom_u_form_item = () => "../../uni_modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_u_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_u_form = () => "../../uni_modules/uview-plus/components/u-form/u-form.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_radio + _easycom_u_radio_group + _easycom_u_form_item + _easycom_u_input + _easycom_u_form + _easycom_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.radiolist1, (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.o($options.radioChange, index),
        c: "9f55bd17-3-" + i0 + ",9f55bd17-2",
        d: common_vendor.p({
          size: "20",
          labelSize: "13",
          customStyle: {
            marginLeft: "10rpx",
            marginRight: "10rpx"
          },
          label: item.name,
          name: item.name
        })
      };
    }),
    b: common_vendor.o($options.groupChange),
    c: common_vendor.o(($event) => $data.radiovalue = $event),
    d: common_vendor.p({
      size: "20",
      placement: "row",
      modelValue: $data.radiovalue
    }),
    e: common_vendor.p({
      label: "抬头类型",
      prop: "radiolist1"
    }),
    f: common_vendor.o(($event) => $data.form.companyName = $event),
    g: common_vendor.p({
      border: "none",
      placeholder: "请输入公司名称",
      inputAlign: "right",
      modelValue: $data.form.companyName
    }),
    h: common_vendor.p({
      label: "公司名称",
      prop: "companyName"
    }),
    i: common_vendor.o(($event) => $data.form.dutyParagraph = $event),
    j: common_vendor.p({
      border: "none",
      placeholder: "请输入纳税人识别号",
      inputAlign: "right",
      modelValue: $data.form.dutyParagraph
    }),
    k: common_vendor.p({
      label: "公司税号",
      prop: "dutyParagraph"
    }),
    l: common_vendor.o(($event) => $data.form.contents = $event),
    m: common_vendor.p({
      border: "none",
      placeholder: "请填写备注/地址等(非必填)",
      inputAlign: "right",
      modelValue: $data.form.contents
    }),
    n: common_vendor.p({
      label: "更多内容",
      prop: "contents"
    }),
    o: common_vendor.o(($event) => $data.form.totalMoney = $event),
    p: common_vendor.p({
      border: "none",
      inputAlign: "right",
      modelValue: $data.form.totalMoney
    }),
    q: common_vendor.p({
      label: "总金额",
      prop: "totalMoney"
    }),
    r: common_vendor.o(($event) => $data.form.companyName = $event),
    s: common_vendor.p({
      border: "none",
      placeholder: "用于向您发送电子发票和行程",
      inputAlign: "right",
      modelValue: $data.form.companyName
    }),
    t: common_vendor.p({
      label: "电子邮箱",
      prop: "companyName"
    }),
    v: common_vendor.o(($event) => $data.form.dutyParagraph = $event),
    w: common_vendor.p({
      border: "none",
      placeholder: "",
      inputAlign: "right",
      modelValue: $data.form.dutyParagraph
    }),
    x: common_vendor.p({
      label: "发送行程单",
      prop: "dutyParagraph"
    }),
    y: common_vendor.sr("uForm", "9f55bd17-0"),
    z: common_vendor.p({
      model: $data.form,
      ["label-width"]: "120"
    }),
    A: common_vendor.o($options.submit),
    B: common_vendor.p({
      type: "primary",
      size: "small"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9f55bd17"], ["__file", "F:/daima/dm/ylqc_mobile/pages/order-invoice/invoicing.vue"]]);
wx.createPage(MiniProgramPage);
