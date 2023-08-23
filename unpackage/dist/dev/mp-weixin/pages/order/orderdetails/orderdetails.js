"use strict";
const common_vendor = require("../../../common/vendor.js");
const orderMap = () => "../../mapdemo/mapdemo2.js";
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
        sendAddress: "",
        //发件地名称
        sendFullAddress: "",
        //发件地址
        receAddress: "",
        //收件地址
        receFullAddress: "",
        //收件地址
        amount: "",
        //订单总价
        sender: "",
        //发件人
        sendPhone: "",
        //发件人联系电话
        recipient: "",
        //收件人
        recePhone: "",
        //收件人联系电话
        itemNum: "",
        //货物数量
        remark: ""
        //订单备注
      }],
      roadList: [{
        state: "",
        //订单状态
        deliveryTime: "",
        //订单时间
        roadName: "",
        //发件地址
        roadAddress: "",
        //收件地址
        recipient: "",
        //联系人
        recePhone: ""
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
    //获取订单详情
    getDetail() {
      this.$api.reqPost(
        "api/yl_orders/QueryForDetail",
        {
          params: { number: this.number }
        }
      ).then((res) => {
        if (res.status) {
          for (var i = 0; i < 1; i++) {
            this.orderList[i] = res.data[i];
          }
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
const _easycom_u_avatar = () => "../../../uni_modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_u_icon = () => "../../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_grid_item = () => "../../../uni_modules/uview-plus/components/u-grid-item/u-grid-item.js";
const _easycom_u_grid = () => "../../../uni_modules/uview-plus/components/u-grid/u-grid.js";
const _easycom_u_gap = () => "../../../uni_modules/uview-plus/components/u-gap/u-gap.js";
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
        a: "bde4f0ef-5-" + i0 + "," + ("bde4f0ef-4-" + i0),
        b: common_vendor.p({
          customStyle: {
            paddingTop: "15rpx"
          },
          name: listItem.name,
          size: 26
        }),
        c: common_vendor.t(listItem.title),
        d: listIndex,
        e: "bde4f0ef-4-" + i0 + ",bde4f0ef-3"
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
    i: common_vendor.f($data.orderList, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.amount),
        b: "bde4f0ef-7-" + i0,
        c: common_vendor.t(item.sendAddress),
        d: common_vendor.t(item.sendFullAddress),
        e: common_vendor.t(item.sender),
        f: common_vendor.t(item.sendPhone),
        g: common_vendor.f($data.roadList, (oradItem, oradIndex, i1) => {
          return common_vendor.e({
            a: "bde4f0ef-8-" + i0 + "-" + i1,
            b: common_vendor.t(oradItem.roadName),
            c: "bde4f0ef-9-" + i0 + "-" + i1,
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
        h: "bde4f0ef-10-" + i0,
        i: common_vendor.t(item.receAddress),
        j: "bde4f0ef-11-" + i0,
        k: common_vendor.t(item.receFullAddress),
        l: item.state == 0
      }, item.state == 0 ? {} : {}, {
        m: item.state == 1
      }, item.state == 1 ? {} : {}, {
        n: item.state == 2
      }, item.state == 2 ? {} : {}, {
        o: item.state == 4
      }, item.state == 4 ? {} : {}, {
        p: item.state == 3
      }, item.state == 3 ? {} : {}, {
        q: item.state == -1
      }, item.state == -1 ? {} : {}, {
        r: common_vendor.t(item.recipient),
        s: common_vendor.t(item.recePhone),
        t: common_vendor.t(item.number),
        v: common_vendor.t(item.deliveryTime),
        w: common_vendor.t(item.recePhone),
        x: common_vendor.t(item.itemNum),
        y: common_vendor.t(item.remark),
        z: index
      });
    }),
    j: common_vendor.p({
      name: "car-fill",
      color: "#00cc33",
      size: "16"
    }),
    k: common_vendor.p({
      name: "car-fill",
      color: "#666666",
      size: "16"
    }),
    l: common_vendor.p({
      name: "arrow-right",
      size: "14"
    }),
    m: common_vendor.p({
      name: "car-fill",
      color: "red",
      size: "16"
    }),
    n: common_vendor.p({
      name: "arrow-right",
      size: "14"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bde4f0ef"], ["__file", "F:/daima/dm/ylqc_mobile/pages/order/orderdetails/orderdetails.vue"]]);
wx.createPage(MiniProgramPage);
