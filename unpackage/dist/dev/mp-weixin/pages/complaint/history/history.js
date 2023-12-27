"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userid: this.$store.state.userid,
      //用户ID
      historyList: [
        {
          driverName: "",
          //被投诉人
          reason: "",
          //被投诉原因
          details: ""
          //详细内容'
          // results:'您的反馈已收到，平台将持续关注，一经核实将从严处理。',
        }
      ],
      isData: false
    };
  },
  onShow() {
    this.getHistory();
  },
  methods: {
    //获取历史信息
    getHistory() {
      this.$api.reqPost(
        "api/yl_complaints/QueryForUser",
        {
          params: { userid: this.userid }
        }
      ).then((res) => {
        if (res.status) {
          console.log("获取历史信息成功！", res);
          this.historyList = res.data;
          if (res.data.length != 0) {
            this.isData = true;
          }
        } else {
          console.log("获取历史信息失败！", res);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.historyList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.driverName),
        b: index
      };
    }),
    b: $data.isData == true,
    c: $data.isData == false
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a5f545bd"], ["__file", "F:/daima/dm/ylqc_mobile/pages/complaint/history/history.vue"]]);
wx.createPage(MiniProgramPage);
