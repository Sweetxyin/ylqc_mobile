"use strict";
const common_vendor = require("../../common/vendor.js");
const Delivery = () => "../../components/delivery/delivery.js";
const Custom = () => "../../components/custom-xd/custom-xd.js";
const _sfc_main = {
  data() {
    return {
      list: ["配送VIP", "客户下单"],
      subIndex: 0
      //导航条索引值
    };
  },
  components: {
    Delivery,
    Custom
  },
  onLoad() {
  },
  methods: {
    //获取当前的导航索引，并赋值给subIndex
    sectionChange(index) {
      this.subIndex = index;
    }
    // zxts(){
    // 	uni.navigateTo({
    // 	    url: '/pages/complaint/complaint'
    // 	})
    // }
  }
};
if (!Array) {
  const _easycom_u_subsection2 = common_vendor.resolveComponent("u-subsection");
  const _component_Delivery = common_vendor.resolveComponent("Delivery");
  const _component_Custom = common_vendor.resolveComponent("Custom");
  (_easycom_u_subsection2 + _component_Delivery + _component_Custom)();
}
const _easycom_u_subsection = () => "../../uni_modules/uview-plus/components/u-subsection/u-subsection.js";
if (!Math) {
  _easycom_u_subsection();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.sectionChange),
    b: common_vendor.p({
      list: $data.list,
      mode: "button",
      inactiveColor: "#fff",
      activeColor: "#000000",
      current: $data.subIndex
    }),
    c: $data.subIndex === 0
  }, $data.subIndex === 0 ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "F:/daima/dm/ylqc_mobile/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
