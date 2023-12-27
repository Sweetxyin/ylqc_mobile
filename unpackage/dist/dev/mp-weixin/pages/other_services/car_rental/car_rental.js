"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      carList: [
        {
          id: "1",
          image: "https://www.baexnyqc.cn//upload/20231219/20231219163755_3943.jpg",
          name: "纯电动高压清洗车",
          brand: "延龙汽车",
          volume: "6.4/6.7m",
          rent: "3000-3500/月"
        },
        {
          id: "2",
          image: "https://www.baexnyqc.cn//upload/20231219/20231219163755_3943.jpg",
          name: "纯电动高压清洗车",
          brand: "延龙汽车",
          volume: "6.4/6.7m",
          rent: "3000-3500/月"
        },
        {
          id: "3",
          image: "https://www.baexnyqc.cn//upload/20231219/20231219163755_3943.jpg",
          name: "纯电动高压清洗车",
          brand: "延龙汽车",
          volume: "6.4/6.7m",
          rent: "3000-3500/月"
        }
      ]
    };
  },
  methods: {
    //跳转到订单详情页
    toCarDetail(item) {
      common_vendor.index.navigateTo({
        url: "/pages/other_services/car_rental/car_detail/car_detail?id=" + item.id
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.carList, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.brand),
        d: common_vendor.t(item.volume),
        e: common_vendor.t(item.rent),
        f: common_vendor.o(($event) => $options.toCarDetail(item), index),
        g: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c222ca73"], ["__file", "F:/daima/dm/ylqc_mobile/pages/other_services/car_rental/car_rental.vue"]]);
wx.createPage(MiniProgramPage);
