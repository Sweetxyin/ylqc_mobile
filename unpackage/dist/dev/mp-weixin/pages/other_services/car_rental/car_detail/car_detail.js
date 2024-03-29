"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      carDetailList: {},
      id: "",
      goodDescImages: {}
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
    //获取商品详情
    getDetail() {
      this.$api.reqPost(
        "api/yl_goods/GetYLGoodInfo",
        {
          params: { id: this.id }
        }
      ).then((res) => {
        if (res.status) {
          this.carDetailList = res.data;
          this.goodDescImages = res.data.gooddescimages_list;
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
    b: common_vendor.t($data.carDetailList.goodname),
    c: common_vendor.p({
      height: "5",
      bgColor: "#ffffff"
    }),
    d: $data.carDetailList.goodimage_first,
    e: common_vendor.t($data.carDetailList.rent),
    f: common_vendor.p({
      height: "5",
      bgColor: "#ffffff"
    }),
    g: common_vendor.f($data.goodDescImages, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
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
