"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      recruitList: [
        {
          id: "",
          job: "",
          keywords: [],
          //关键词
          salary: ""
          //薪资
        }
      ]
    };
  },
  mounted() {
    this.getRecruitList();
  },
  methods: {
    toRecruitDetails(item) {
      common_vendor.index.navigateTo({
        url: "/pages/other_services/recruit_details/recruit_details?id=" + item.id
      });
    },
    //获取用户门店管理数据
    getRecruitList() {
      var _this = this;
      _this.$api.reqPost("api/yl_user/RecruitList").then((res) => {
        if (res.code == 200) {
          _this.recruitList = res.data.recruitList;
          console.log("获取招聘信息成功", res);
        } else if (res.code == 500) {
          _this.isData = false;
          console.log("招聘信息为空", res);
        } else {
          console.log("获取招聘信息失败", res);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.recruitList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.job),
        b: common_vendor.t(item.salary),
        c: common_vendor.f(item.keywords, (keyitem, index2, i1) => {
          return {
            a: common_vendor.t(keyitem),
            b: index2
          };
        }),
        d: common_vendor.o(($event) => $options.toRecruitDetails(item), index),
        e: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c54a9a84"], ["__file", "F:/daima/dm/ylqc_mobile/pages/other_services/recruit/recruit.vue"]]);
wx.createPage(MiniProgramPage);
