"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      shopList: [],
      list1: [{}],
      sortId: ""
    };
  },
  onShow() {
    this.getCategory();
    this.getShopList();
  },
  methods: {
    //跳转到订单详情页
    toCarDetail(item) {
      common_vendor.index.navigateTo({
        url: "/pages/shop/shop_detail/shop_detail?id=" + item.id
      });
    },
    click(item) {
      console.log("输出item", item);
      this.sortId = item.id;
      this.getShopList();
    },
    //获取商品类别
    getCategory() {
      this.$api.reqPost("api/yl_goods/GetAllCategories").then((res) => {
        if (res.status) {
          this.list1 = res.data;
          console.log("获取商品类别成功！", res);
        } else {
          console.log("获取商品类别失败！", res);
        }
      });
    },
    //获取商品
    getShopList() {
      var str1 = '{catId:"';
      var str2 = this.sortId;
      var str4 = '"}';
      var str3 = str1 + str2 + str4;
      this.$api.reqPost("api/yl_goods/GetYLGoodList", {
        data: {
          "page": 1,
          "limit": 10,
          "where": str3
        }
      }).then((res) => {
        if (res.status) {
          this.shopList = res.data;
          console.log("获取商品成功！", res);
        } else {
          console.log("获取商品失败！", res);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_gap2 = common_vendor.resolveComponent("u-gap");
  const _easycom_tabbar2 = common_vendor.resolveComponent("tabbar");
  (_easycom_u_tabs2 + _easycom_u_gap2 + _easycom_tabbar2)();
}
const _easycom_u_tabs = () => "../../uni_modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_u_gap = () => "../../uni_modules/uview-plus/components/u-gap/u-gap.js";
const _easycom_tabbar = () => "../../components/tabbar/tabbar.js";
if (!Math) {
  (_easycom_u_tabs + _easycom_u_gap + _easycom_tabbar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.click),
    b: common_vendor.p({
      lineWidth: "28",
      activeStyle: {
        color: "#303133",
        fontWeight: "bold",
        transform: "scale(1.05)"
      },
      list: $data.list1
    }),
    c: common_vendor.f($data.shopList, (item, index, i0) => {
      return {
        a: item.goodimage_first,
        b: common_vendor.t(item.goodname),
        c: "2a6aaf81-1-" + i0,
        d: common_vendor.t(item.goodprice),
        e: common_vendor.o(($event) => $options.toCarDetail(item), index),
        f: index
      };
    }),
    d: common_vendor.p({
      height: "6",
      bgColor: "#ffffff"
    }),
    e: common_vendor.p({
      selectedIndex: "3"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2a6aaf81"], ["__file", "F:/daima/dm/ylqc_mobile/pages/shop/shop.vue"]]);
wx.createPage(MiniProgramPage);
