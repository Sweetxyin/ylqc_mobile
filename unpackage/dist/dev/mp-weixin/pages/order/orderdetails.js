"use strict";
const common_vendor = require("../../common/vendor.js");
const orderMap = () => "../../components/order-map/order-map.js";
const _sfc_main = {
  data() {
    return {
      number: "",
      licensePlate: "桂B12343",
      //车牌
      driverName: "韦师傅",
      //司机姓名
      score: "4.9",
      //评分
      totalPrice: 49,
      //订单总价
      list: [
        {
          name: "chat-fill",
          title: "信息联系"
        },
        {
          name: "phone-fill",
          title: "电话联系"
        },
        {
          name: "server-fill",
          title: "联系客服"
        },
        {
          name: "edit-pen-fill",
          title: "评价司机"
        }
      ],
      orderList: [{
        number: "",
        //订单编号
        state: "",
        //订单状态
        deliveryTime: "",
        //订单时间
        sendName: "柳州市延龙汽车",
        //发件地名称
        sendAddress: "",
        //发件地址
        endName: "柳州市万象城",
        //收件地址
        receAddress: "",
        //收件地址
        amount: "",
        //订单总价
        recipient: "",
        //联系人
        recePhone: "",
        //联系电话
        itemNum: "",
        //货物数量
        remark: ""
        //订单备注
      }],
      roadList: [{
        state: "3",
        //订单状态
        deliveryTime: "2023.5.17",
        //订单时间
        roadName: "柳州市汽贸园",
        //发件地址
        roadAddress: "广西壮族自治区柳州市鱼峰区和悦路1号",
        //收件地址
        recipient: "小明",
        //联系人
        recePhone: "155664455"
        //联系电话
      }]
    };
  },
  components: {
    orderMap
  },
  onLoad(option) {
    this.number = option.number;
    console.log(option.number);
  },
  onShow() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.$api.reqPost(
        "api/yl_orders/QueryForDetail",
        {
          params: { number: this.number }
        }
      ).then((res) => {
        if (res.status) {
          this.orderList = res.data;
          console.log("获取订单详细信息成功！", res);
        } else {
          console.log("获取订单详细信息失败！", res);
        }
      });
    }
  }
};
if (!Array) {
  const _component_orderMap = common_vendor.resolveComponent("orderMap");
  const _easycom_u_avatar2 = common_vendor.resolveComponent("u-avatar");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_grid_item2 = common_vendor.resolveComponent("u-grid-item");
  const _easycom_u_grid2 = common_vendor.resolveComponent("u-grid");
  const _easycom_u_gap2 = common_vendor.resolveComponent("u-gap");
  (_component_orderMap + _easycom_u_avatar2 + _easycom_u_icon2 + _easycom_u_grid_item2 + _easycom_u_grid2 + _easycom_u_gap2)();
}
const _easycom_u_avatar = () => "../../uni_modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_grid_item = () => "../../uni_modules/uview-plus/components/u-grid-item/u-grid-item.js";
const _easycom_u_grid = () => "../../uni_modules/uview-plus/components/u-grid/u-grid.js";
const _easycom_u_gap = () => "../../uni_modules/uview-plus/components/u-gap/u-gap.js";
if (!Math) {
  (_easycom_u_avatar + _easycom_u_icon + _easycom_u_grid_item + _easycom_u_grid + _easycom_u_gap)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      size: "45",
      src: _ctx.avatarSrc
    }),
    b: common_vendor.t($data.licensePlate),
    c: common_vendor.t($data.driverName),
    d: common_vendor.p({
      name: "star-fill",
      color: "orange",
      size: "18"
    }),
    e: common_vendor.t($data.score),
    f: common_vendor.f($data.list, (listItem, listIndex, i0) => {
      return {
        a: "9dc5548e-5-" + i0 + "," + ("9dc5548e-4-" + i0),
        b: common_vendor.p({
          customStyle: {
            paddingTop: "15rpx"
          },
          name: listItem.name,
          size: 26
        }),
        c: common_vendor.t(listItem.title),
        d: listIndex,
        e: "9dc5548e-4-" + i0 + ",9dc5548e-3"
      };
    }),
    g: common_vendor.p({
      border: false,
      col: "4"
    }),
    h: common_vendor.p({
      height: "15",
      bgColor: "#efefef"
    }),
    i: common_vendor.t($data.totalPrice),
    j: common_vendor.f($data.orderList, (item, index, i0) => {
      return common_vendor.e({
        a: "9dc5548e-7-" + i0,
        b: common_vendor.t(item.startName),
        c: common_vendor.t(item.sendAddress),
        d: common_vendor.t(item.recipient),
        e: common_vendor.t(item.recePhone),
        f: common_vendor.f($data.roadList, (oradItem, oradIndex, i1) => {
          return common_vendor.e({
            a: "9dc5548e-8-" + i0 + "-" + i1,
            b: common_vendor.t(oradItem.roadName),
            c: "9dc5548e-9-" + i0 + "-" + i1,
            d: common_vendor.t(oradItem.roadAddress),
            e: oradItem.state == "4"
          }, oradItem.state == "4" ? {
            f: common_vendor.t(oradItem.state)
          } : {}, {
            g: oradItem.state == "3"
          }, oradItem.state == "3" ? {
            h: common_vendor.t(oradItem.state)
          } : {}, {
            i: common_vendor.t(oradItem.recipient),
            j: common_vendor.t(oradItem.recePhone),
            k: oradIndex
          });
        }),
        g: "9dc5548e-10-" + i0,
        h: common_vendor.t(item.endName),
        i: "9dc5548e-11-" + i0,
        j: common_vendor.t(item.receAddress),
        k: item.state == 4
      }, item.state == 4 ? {
        l: common_vendor.t(item.state)
      } : {}, {
        m: item.state == 3
      }, item.state == 3 ? {
        n: common_vendor.t(item.state)
      } : {}, {
        o: common_vendor.t(item.recipient),
        p: common_vendor.t(item.recePhone),
        q: common_vendor.t(item.number),
        r: common_vendor.t(item.deliveryTime),
        s: common_vendor.t(item.recePhone),
        t: common_vendor.t(item.itemNum),
        v: common_vendor.t(item.remark),
        w: index
      });
    }),
    k: common_vendor.p({
      name: "car-fill",
      color: "#00cc33",
      size: "16"
    }),
    l: common_vendor.p({
      name: "car-fill",
      color: "#666666",
      size: "16"
    }),
    m: common_vendor.p({
      name: "arrow-right",
      size: "14"
    }),
    n: common_vendor.p({
      name: "car-fill",
      color: "red",
      size: "16"
    }),
    o: common_vendor.p({
      name: "arrow-right",
      size: "14"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9dc5548e"], ["__file", "F:/daima/dm/ylqc_mobile/pages/order/orderdetails.vue"]]);
wx.createPage(MiniProgramPage);
