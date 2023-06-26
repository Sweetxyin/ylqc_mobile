"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      checkboxValue: [],
      radiovalue: [],
      indexList: [
        {
          orderId: "123",
          orderTime: "2023.5.17",
          startAddress: "柳州市延龙汽车",
          endAddress: "柳州市万象城",
          price: 50
        },
        {
          orderId: "234",
          orderTime: "2023.5.18",
          startAddress: "柳州市阳和科三考场",
          endAddress: "柳州市地王新天地",
          price: 65
        }
      ],
      order_total: 2,
      //订单数量
      order_price: 115,
      //订单价格
      radiolist1: [{
        name: "全页全选",
        disabled: false
      }, {
        name: "全部全选",
        disabled: false
      }]
    };
  },
  methods: {
    checkboxChange(n) {
      console.log("change", n);
    },
    groupChange(n) {
      console.log("groupChange", n);
    },
    radioChange(n) {
      console.log("radioChange", n);
    },
    next_invoice() {
      common_vendor.index.navigateTo({
        url: "/pages/orderinvoice/invoicing"
      });
    }
  }
};
if (!Array) {
  const _easycom_u_checkbox2 = common_vendor.resolveComponent("u-checkbox");
  const _easycom_u_checkbox_group2 = common_vendor.resolveComponent("u-checkbox-group");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_radio2 = common_vendor.resolveComponent("u-radio");
  const _easycom_u_radio_group2 = common_vendor.resolveComponent("u-radio-group");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_checkbox2 + _easycom_u_checkbox_group2 + _easycom_u_icon2 + _easycom_u_radio2 + _easycom_u_radio_group2 + _easycom_u_button2)();
}
const _easycom_u_checkbox = () => "../../uni_modules/uview-plus/components/u-checkbox/u-checkbox.js";
const _easycom_u_checkbox_group = () => "../../uni_modules/uview-plus/components/u-checkbox-group/u-checkbox-group.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_radio = () => "../../uni_modules/uview-plus/components/u-radio/u-radio.js";
const _easycom_u_radio_group = () => "../../uni_modules/uview-plus/components/u-radio-group/u-radio-group.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_checkbox + _easycom_u_checkbox_group + _easycom_u_icon + _easycom_u_radio + _easycom_u_radio_group + _easycom_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.indexList, (item, index, i0) => {
      return {
        a: "3b7f7ffb-1-" + i0 + "," + ("3b7f7ffb-0-" + i0),
        b: common_vendor.o($options.checkboxChange, index),
        c: "3b7f7ffb-0-" + i0,
        d: common_vendor.o(($event) => $data.checkboxValue = $event, index),
        e: common_vendor.t(item.orderId),
        f: "3b7f7ffb-2-" + i0,
        g: common_vendor.t(item.orderTime),
        h: common_vendor.t(item.startAddress),
        i: common_vendor.t(item.endAddress),
        j: common_vendor.t(item.price),
        k: index
      };
    }),
    b: common_vendor.p({
      customStyle: {
        marginBottom: "5px",
        marginTop: "2px"
      }
    }),
    c: common_vendor.p({
      placement: "column",
      shape: "circle",
      size: "18",
      modelValue: $data.checkboxValue
    }),
    d: common_vendor.p({
      name: "clock-fill",
      size: "16"
    }),
    e: common_vendor.t($data.order_total),
    f: common_vendor.t($data.order_price),
    g: common_vendor.f($data.radiolist1, (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.o($options.radioChange, index),
        c: "3b7f7ffb-4-" + i0 + ",3b7f7ffb-3",
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
    h: common_vendor.o($options.groupChange),
    i: common_vendor.o(($event) => $data.radiovalue = $event),
    j: common_vendor.p({
      size: "20",
      placement: "row",
      modelValue: $data.radiovalue
    }),
    k: common_vendor.o($options.next_invoice),
    l: common_vendor.p({
      type: "primary",
      size: "small",
      text: "下一步"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3b7f7ffb"], ["__file", "F:/daima/dm/ylqc_mobile/pages/orderinvoice/orderinvoice.vue"]]);
wx.createPage(MiniProgramPage);
