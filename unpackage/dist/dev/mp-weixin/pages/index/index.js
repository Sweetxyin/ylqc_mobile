"use strict";
const common_vendor = require("../../common/vendor.js");
const Delivery = () => "../../components/delivery/delivery.js";
const Custom = () => "../../components/custom-xd/custom-xd.js";
const _sfc_main = {
  data() {
    return {};
  },
  components: {
    Delivery,
    Custom
  },
  onLoad() {
  },
  methods: {}
};
if (!Array) {
  const _component_Delivery = common_vendor.resolveComponent("Delivery");
  const _component_Custom = common_vendor.resolveComponent("Custom");
  (_component_Delivery + _component_Custom)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/daima/dm/ylqc_mobile/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
