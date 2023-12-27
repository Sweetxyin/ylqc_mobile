"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      recruitList: {
        id: "",
        job: "",
        responsibility: ""
      },
      id: ""
    };
  },
  onLoad(option) {
    this.id = option.id;
    console.log(option.id);
  },
  onShow() {
    this.getDetail();
  },
  methods: {
    //获取岗位详情
    getDetail() {
      this.$api.reqPost(
        "api/yl_user/RecruitDesc",
        {
          params: { id: this.id }
        }
      ).then((res) => {
        if (res.code == 200) {
          this.recruitList = res.data.recruitDesc;
        } else {
          console.log("获取岗位详细信息失败！", res);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_u_gap2 = common_vendor.resolveComponent("u-gap");
  _easycom_u_gap2();
}
const _easycom_u_gap = () => "../../../uni_modules/uview-plus/components/u-gap/u-gap.js";
if (!Math) {
  _easycom_u_gap();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      height: "1",
      bgColor: "#efefef"
    }),
    b: common_vendor.p({
      height: "15",
      bgColor: "#ffffff"
    }),
    c: common_vendor.t($data.recruitList.job),
    d: common_vendor.p({
      height: "15",
      bgColor: "#ffffff"
    }),
    e: common_vendor.p({
      height: "5",
      bgColor: "#ffffff"
    }),
    f: common_vendor.t($data.recruitList.responsibility),
    g: common_vendor.p({
      height: "15",
      bgColor: "#ffffff"
    }),
    h: common_vendor.p({
      height: "5",
      bgColor: "#ffffff"
    }),
    i: common_vendor.t($data.recruitList.requirements),
    j: common_vendor.p({
      height: "15",
      bgColor: "#ffffff"
    }),
    k: common_vendor.t($data.recruitList.contacts),
    l: common_vendor.p({
      height: "15",
      bgColor: "#ffffff"
    }),
    m: common_vendor.t($data.recruitList.phone)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7e4ff8d4"], ["__file", "F:/daima/dm/ylqc_mobile/pages/other_services/recruit_details/recruit_details.vue"]]);
wx.createPage(MiniProgramPage);
