"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      searchKey: "",
      //搜索值
      storeList: [
        {
          companyName: "柳州市延龙汽车有限公司",
          //公司名称
          distance: "256",
          //距离
          address: "柳州市鱼峰区工业新区和悦路1号",
          //地址
          name: "张三",
          //姓名
          phone: "123456789"
          //电话
        },
        {
          companyName: "柳州市延龙汽车有限公司",
          //公司名称
          distance: "256",
          //距离
          address: "柳州市鱼峰区工业新区和悦路1号",
          //地址
          name: "张三",
          //姓名
          phone: "123456789"
          //电话
        }
      ]
    };
  },
  methods: {
    addStore() {
      common_vendor.index.navigateTo({
        url: "/pages/storemanage/addstore"
      });
    }
  }
};
if (!Array) {
  const _easycom_u_gap2 = common_vendor.resolveComponent("u-gap");
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_gap2 + _easycom_u_search2 + _easycom_u_icon2 + _easycom_u_button2)();
}
const _easycom_u_gap = () => "../../uni_modules/uview-plus/components/u-gap/u-gap.js";
const _easycom_u_search = () => "../../uni_modules/uview-plus/components/u-search/u-search.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_gap + _easycom_u_search + _easycom_u_icon + _easycom_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      height: "10",
      bgColor: "#f0ffff"
    }),
    b: common_vendor.o(($event) => $data.searchKey = $event),
    c: common_vendor.p({
      placeholder: "搜索地址/姓名/公司名称等",
      clearabled: true,
      showAction: false,
      modelValue: $data.searchKey
    }),
    d: common_vendor.p({
      height: "5",
      bgColor: "#f0ffff"
    }),
    e: common_vendor.f($data.storeList, (item, index, i0) => {
      return {
        a: "69cfbcd8-3-" + i0,
        b: common_vendor.t(item.companyName),
        c: common_vendor.t(item.distance),
        d: "69cfbcd8-4-" + i0,
        e: common_vendor.t(item.address),
        f: "69cfbcd8-5-" + i0,
        g: common_vendor.t(item.name),
        h: common_vendor.t(item.phone),
        i: "69cfbcd8-6-" + i0,
        j: "69cfbcd8-7-" + i0,
        k: index
      };
    }),
    f: common_vendor.p({
      name: "map-fill",
      size: "18"
    }),
    g: common_vendor.p({
      height: "6",
      bgColor: "#ffffff"
    }),
    h: common_vendor.p({
      height: "6",
      bgColor: "#ffffff"
    }),
    i: common_vendor.p({
      type: "info",
      shape: "circle",
      size: "small",
      plain: true,
      text: "编辑"
    }),
    j: common_vendor.p({
      type: "info",
      shape: "circle",
      size: "small",
      plain: true,
      text: "删除"
    }),
    k: common_vendor.o($options.addStore),
    l: common_vendor.p({
      type: "primary",
      size: "small"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-69cfbcd8"], ["__file", "F:/daima/dm/ylqc_mobile/pages/storemanage/storemanage.vue"]]);
wx.createPage(MiniProgramPage);
