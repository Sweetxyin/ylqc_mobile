"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      carDetailList: {
        advance: ""
      },
      id: "",
      value: 1,
      totalPrice: "",
      swiperImages: {},
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
    valChange(e) {
      var sum = e.value * this.carDetailList.advance;
      this.totalPrice = sum;
    },
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
          this.swiperImages = res.data.goodimages_list;
          this.totalPrice = this.value * this.carDetailList.advance;
          console.log("获取商品详情信息成功！", res);
        } else {
          console.log("获取商品详情信息失败！", res);
        }
      });
    },
    placeOrder() {
      common_vendor.index.navigateTo({
        url: "/pages/shop/place_order/place_order?id=" + this.id
      });
    }
  }
};
if (!Array) {
  const _easycom_u_gap2 = common_vendor.resolveComponent("u-gap");
  const _easycom_u_number_box2 = common_vendor.resolveComponent("u-number-box");
  (_easycom_u_gap2 + _easycom_u_number_box2)();
}
const _easycom_u_gap = () => "../../../uni_modules/uview-plus/components/u-gap/u-gap.js";
const _easycom_u_number_box = () => "../../../uni_modules/uview-plus/components/u-number-box/u-number-box.js";
if (!Math) {
  (_easycom_u_gap + _easycom_u_number_box)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      height: "10",
      bgColor: "#ffffff"
    }),
    b: common_vendor.f($data.swiperImages, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    c: common_vendor.t($data.carDetailList.goodprice),
    d: common_vendor.t($data.carDetailList.advance),
    e: common_vendor.t($data.carDetailList.goodname),
    f: common_vendor.p({
      height: "3",
      bgColor: "#ffffff"
    }),
    g: common_vendor.p({
      height: "2",
      bgColor: "#b0e0e6"
    }),
    h: common_vendor.p({
      height: "5",
      bgColor: "#ffffff"
    }),
    i: common_vendor.o($options.valChange),
    j: common_vendor.o(($event) => $data.value = $event),
    k: common_vendor.p({
      buttonSize: "25",
      modelValue: $data.value
    }),
    l: common_vendor.p({
      height: "3",
      bgColor: "#ffffff"
    }),
    m: common_vendor.p({
      height: "2",
      bgColor: "#b0e0e6"
    }),
    n: common_vendor.p({
      height: "5",
      bgColor: "#ffffff"
    }),
    o: common_vendor.f($data.goodDescImages, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    p: common_vendor.p({
      height: "58",
      bgColor: "#ffffff"
    }),
    q: common_vendor.t($data.totalPrice),
    r: common_vendor.o((...args) => $options.placeOrder && $options.placeOrder(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0ab01c5e"], ["__file", "F:/daima/dm/ylqc_mobile/pages/shop/shop_detail/shop_detail.vue"]]);
wx.createPage(MiniProgramPage);
