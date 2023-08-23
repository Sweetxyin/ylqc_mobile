"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      historyList: [
        {
          complaintTime: "2023.05.21",
          complaintName: "张三",
          result: "您的反馈已收到，平台将持续关注，一经核实将从严处理。"
        },
        {
          complaintTime: "2023.05.10",
          complaintName: "小明",
          result: "您的反馈已收到，平台将持续关注，一经核实将从严处理。"
        }
      ]
    };
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.historyList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.complaintTime),
        b: common_vendor.t(item.complaintName),
        c: common_vendor.t(item.result),
        d: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a5f545bd"], ["__file", "F:/daima/dm/ylqc_mobile/pages/complaint/history/history.vue"]]);
wx.createPage(MiniProgramPage);
