"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "delivery",
  data() {
    return {
      start_address: "柳州延龙汽车",
      end_address: "输入您的目的地",
      radiolist1: [{
        name: "是",
        disabled: false
      }, {
        name: "否",
        disabled: false
      }],
      show: false,
      //时间选择状态
      timeValue: "请选择",
      //时间
      value1: Number(/* @__PURE__ */ new Date()),
      //获取当前时间
      inputStatus: false,
      wpname: "",
      zzl: "",
      ztj: "",
      js: ""
    };
  },
  methods: {
    // 时间选择
    async confirm(e) {
      this.show = false;
      const timeFormat = common_vendor.index.$u.timeFormat;
      let timeValue = await timeFormat(e.value, "yyyy-mm-dd hh:MM");
      this.timeValue = timeValue;
      console.log(timeValue);
    },
    //关闭时间选择器
    close() {
      this.show = false;
    },
    groupChange(n) {
      console.log("groupChange", n);
    },
    radioChange(n) {
      if (n == "是") {
        this.inputStatus = true;
        this.wpname = "";
      } else {
        this.inputStatus = false;
      }
      console.log("radioChange", n);
    }
  }
};
if (!Array) {
  const _easycom_u_radio2 = common_vendor.resolveComponent("u-radio");
  const _easycom_u_radio_group2 = common_vendor.resolveComponent("u-radio-group");
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  const _easycom_u_datetime_picker2 = common_vendor.resolveComponent("u-datetime-picker");
  (_easycom_u_radio2 + _easycom_u_radio_group2 + _easycom_u__input2 + _easycom_u_datetime_picker2)();
}
const _easycom_u_radio = () => "../../uni_modules/uview-plus/components/u-radio/u-radio.js";
const _easycom_u_radio_group = () => "../../uni_modules/uview-plus/components/u-radio-group/u-radio-group.js";
const _easycom_u__input = () => "../../uni_modules/uview-plus/components/u--input/u--input.js";
const _easycom_u_datetime_picker = () => "../../uni_modules/uview-plus/components/u-datetime-picker/u-datetime-picker.js";
if (!Math) {
  (_easycom_u_radio + _easycom_u_radio_group + _easycom_u__input + _easycom_u_datetime_picker)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.start_address),
    b: common_vendor.t($data.end_address),
    c: common_vendor.f($data.radiolist1, (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.o($options.radioChange, index),
        c: "f0b2b093-1-" + i0 + ",f0b2b093-0",
        d: common_vendor.p({
          size: "16",
          labelSize: "13",
          customStyle: {
            marginLeft: "0rpx"
          },
          label: item.name,
          name: item.name
        })
      };
    }),
    d: common_vendor.o($options.groupChange),
    e: common_vendor.o(($event) => _ctx.radiovalue1 = $event),
    f: common_vendor.p({
      size: "16",
      placement: "row",
      modelValue: _ctx.radiovalue1
    }),
    g: common_vendor.o(($event) => $data.wpname = $event),
    h: common_vendor.p({
      placeholder: "请输入物品名称",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: $data.inputStatus,
      modelValue: $data.wpname
    }),
    i: common_vendor.o(($event) => $data.zzl = $event),
    j: common_vendor.p({
      placeholder: "请输入总重量",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: $data.inputStatus,
      modelValue: $data.zzl
    }),
    k: common_vendor.o(($event) => $data.ztj = $event),
    l: common_vendor.p({
      placeholder: "请输入总体积",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      modelValue: $data.ztj
    }),
    m: common_vendor.o(($event) => $data.js = $event),
    n: common_vendor.p({
      placeholder: "请输入件数",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      modelValue: $data.js
    }),
    o: common_vendor.o($options.confirm),
    p: common_vendor.o($options.close),
    q: common_vendor.o(($event) => $data.value1 = $event),
    r: common_vendor.p({
      show: $data.show,
      mode: "datetime",
      modelValue: $data.value1
    }),
    s: common_vendor.t($data.timeValue),
    t: common_vendor.o(($event) => $data.show = true),
    v: common_vendor.o((...args) => _ctx.formSubmit && _ctx.formSubmit(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f0b2b093"], ["__file", "F:/daima/dm/ylqc_mobile/components/delivery/delivery.vue"]]);
wx.createComponent(Component);
