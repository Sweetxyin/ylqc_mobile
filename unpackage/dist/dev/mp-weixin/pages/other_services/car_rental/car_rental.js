"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      carList: []
    };
  },
  onShow() {
    this.getCarList();
  },
  methods: {
    //跳转到订单详情页
    toCarDetail(item) {
      common_vendor.index.navigateTo({
        url: "/pages/other_services/car_rental/car_detail/car_detail?id=" + item.id
      });
    },
    //获取商品
    getCarList() {
      this.$api.reqPost("api/yl_goods/GetYLGoodList", {
        data: {
          "page": 1,
          "limit": 10,
          "where": '{catId:"5"}'
        }
      }).then((res) => {
        if (res.status) {
          this.carList = res.data;
          console.log("获取租车信息成功！", res);
        } else {
          console.log("获取租车信息失败！", res);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.carList, (item, index, i0) => {
      return {
        a: item.goodimage_first,
        b: common_vendor.t(item.goodname),
        c: common_vendor.t(item.volume),
        d: common_vendor.t(item.rent),
        e: common_vendor.o(($event) => $options.toCarDetail(item), index),
        f: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c222ca73"], ["__file", "F:/daima/dm/ylqc_mobile/pages/other_services/car_rental/car_rental.vue"]]);
wx.createPage(MiniProgramPage);
