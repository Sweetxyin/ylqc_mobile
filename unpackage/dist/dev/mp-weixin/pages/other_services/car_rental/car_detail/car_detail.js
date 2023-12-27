"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      carDetailList: {
        id: "2",
        image: "https://www.baexnyqc.cn//upload/20231219/20231219163755_3943.jpg",
        name: "纯电动高压清洗车",
        deimage: "../../../../static/images/tab_icon/xq1.png",
        rent: "3000-3500/月"
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
    //获取订单详情
    getDetail() {
      this.$api.reqPost(
        "api/yl_orders/QueryForDetail",
        {
          params: { id: this.id }
        }
      ).then((res) => {
        if (res.status) {
          this.carDetailList = res.data;
          console.log("获取租车详情信息成功！", res);
        } else {
          console.log("获取租车详情信息失败！", res);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_u_gap2 = common_vendor.resolveComponent("u-gap");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_u_gap2 + _easycom_u_icon2)();
}
const _easycom_u_gap = () => "../../../../uni_modules/uview-plus/components/u-gap/u-gap.js";
const _easycom_u_icon = () => "../../../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_gap + _easycom_u_icon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      height: "10",
      bgColor: "#ffffff"
    }),
    b: common_vendor.t($data.carDetailList.name),
    c: common_vendor.p({
      height: "5",
      bgColor: "#ffffff"
    }),
    d: $data.carDetailList.image,
    e: common_vendor.t($data.carDetailList.rent),
    f: common_vendor.p({
      height: "5",
      bgColor: "#ffffff"
    }),
    g: $data.carDetailList.deimage,
    h: common_vendor.p({
      height: "58",
      bgColor: "#ffffff"
    }),
    i: common_vendor.p({
      name: "map",
      color: "#ffffff",
      size: "20"
    }),
    j: common_vendor.p({
      name: "phone",
      color: "#ffffff",
      size: "20"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4af9e785"], ["__file", "F:/daima/dm/ylqc_mobile/pages/other_services/car_rental/car_detail/car_detail.vue"]]);
wx.createPage(MiniProgramPage);
