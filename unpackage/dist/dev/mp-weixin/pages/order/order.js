"use strict";
const common_vendor = require("../../common/vendor.js");
const Processing = () => "../../components/order-status/order-processing.js";
const Complete = () => "../../components/order-status/order-complete.js";
const Cancel = () => "../../components/order-status/order-cancel.js";
const _sfc_main = {
  data() {
    return {
      hasLogin: this.$store.state.hasLogin,
      //登录状态
      userid: this.$store.state.userid,
      //用户ID
      list1: [{
        name: "进行中"
      }, {
        name: "已完成"
      }, {
        name: "已取消"
      }],
      orderList: [{
        id: "",
        number: "",
        //订单编号
        state: "",
        //订单状态
        deliveryTime: "",
        //订单时间
        sendAddress: "",
        //始发地址
        receAddress: "",
        //收件地址
        amount: ""
        //价格
      }],
      tabIndex: 0,
      // tabStatus:true
      orderTotal: 0,
      //订单数量
      order_state: 1
    };
  },
  components: {
    Processing,
    Complete,
    Cancel
  },
  onLoad() {
    this.getOrderList();
  },
  methods: {
    // 订单状态tab切换
    tabChang(index) {
      this.tabIndex = index.index;
    },
    // 跳转到登录页
    toLogin() {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    },
    // 获取用户订单信息
    getOrderList() {
      var _this = this;
      _this.$api.reqPost("api/yl_orders/QueryForUser", {
        params: { userid: _this.userid }
      }).then((res) => {
        if (res.status) {
          if (res.data == null) {
            _this.orderTotal = 0;
            console.log("获取订单信息成功,订单数量为0", res);
          } else {
            _this.orderList = res.data;
            _this.orderTotal = res.data.length;
            console.log("获取订单信息成功", res);
          }
        } else {
          console.log("获取订单信息失败", res);
        }
      });
    },
    // 修改订单
    onEditOrder(item) {
      common_vendor.index.navigateTo({
        url: "/pages/order/orderdetails?number=" + item.number
      });
    },
    //跳转到订单详情页
    toOrderDetail(item) {
      common_vendor.index.navigateTo({
        url: "/pages/order/orderdetails?number=" + item.number
      });
    },
    // 删除订单
    doDelete(item) {
      var _this = this;
      common_vendor.index.showModal({
        title: "确定要删除" + item.number + "订单吗？",
        success: function(res) {
          if (res.confirm) {
            _this.$api.reqPost("api/yl_orders/Delete", {
              params: {
                number: item.number,
                userid: _this.userid
              }
            }).then((res2) => {
              if (res2.status) {
                console.log("删除订单成功!", res2);
                common_vendor.index.showToast({
                  title: "删除订单成功"
                });
                _this.getOrderList();
              } else {
                console.log("删除订单失败!");
              }
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_sticky2 = common_vendor.resolveComponent("u-sticky");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _component_Cancel = common_vendor.resolveComponent("Cancel");
  (_easycom_u_tabs2 + _easycom_u_sticky2 + _easycom_u_empty2 + _easycom_u_icon2 + _easycom_u_button2 + _component_Cancel)();
}
const _easycom_u_tabs = () => "../../uni_modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_u_sticky = () => "../../uni_modules/uview-plus/components/u-sticky/u-sticky.js";
const _easycom_u_empty = () => "../../uni_modules/uview-plus/components/u-empty/u-empty.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_tabs + _easycom_u_sticky + _easycom_u_empty + _easycom_u_icon + _easycom_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.tabChang),
    b: common_vendor.p({
      list: $data.list1,
      scrollable: false,
      current: $data.tabIndex,
      itemStyle: "padding-left: 41px; padding-right:39px; height: 34px;",
      activeStyle: {
        color: "#3c9cff",
        transform: "scale(1.05)"
      }
    }),
    c: common_vendor.p({
      bgColor: "#fff"
    }),
    d: $data.hasLogin == true
  }, $data.hasLogin == true ? common_vendor.e({
    e: $data.tabIndex === 0
  }, $data.tabIndex === 0 ? common_vendor.e({
    f: $data.orderTotal === 0
  }, $data.orderTotal === 0 ? {
    g: common_vendor.p({
      mode: "order",
      icon: "http://cdn.uviewui.com/uview/empty/car.png"
    })
  } : {}, {
    h: $data.orderList.state == 0
  }, $data.orderList.state == 0 ? {
    i: common_vendor.f($data.orderList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.number),
        b: common_vendor.t(item.state),
        c: "6e367b95-3-" + i0,
        d: common_vendor.t(item.deliveryTime),
        e: "6e367b95-4-" + i0,
        f: common_vendor.t(item.sendAddress),
        g: "6e367b95-5-" + i0,
        h: common_vendor.t(item.receAddress),
        i: common_vendor.t(item.amount),
        j: common_vendor.o(($event) => $options.toOrderDetail(item), index),
        k: common_vendor.o(($event) => _ctx.doEditOrder(item), index),
        l: "6e367b95-6-" + i0,
        m: "6e367b95-7-" + i0,
        n: index
      };
    }),
    j: common_vendor.p({
      name: "clock-fill",
      size: "14"
    }),
    k: common_vendor.p({
      name: "car-fill",
      color: "#00cc33",
      size: "16"
    }),
    l: common_vendor.p({
      name: "car-fill",
      color: "#dc143c",
      size: "16"
    }),
    m: common_vendor.p({
      type: "info",
      shape: "circle",
      size: "small",
      plain: true,
      text: "修改订单"
    }),
    n: common_vendor.p({
      type: "info",
      shape: "circle",
      size: "small",
      plain: true,
      text: "取消订单"
    })
  } : {}) : $data.tabIndex === 1 ? common_vendor.e({
    p: $data.orderTotal === 0
  }, $data.orderTotal === 0 ? {
    q: common_vendor.p({
      mode: "order",
      icon: "http://cdn.uviewui.com/uview/empty/car.png"
    })
  } : {}, {
    r: $data.orderTotal != 0 && $data.orderList.state == 4
  }, $data.orderTotal != 0 && $data.orderList.state == 4 ? {
    s: common_vendor.f($data.orderList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.number),
        b: common_vendor.t(item.state),
        c: "6e367b95-9-" + i0,
        d: common_vendor.t(item.deliveryTime),
        e: "6e367b95-10-" + i0,
        f: common_vendor.t(item.sendAddress),
        g: "6e367b95-11-" + i0,
        h: common_vendor.t(item.receAddress),
        i: common_vendor.t(item.amount),
        j: common_vendor.o(($event) => $options.toOrderDetail(item), index),
        k: common_vendor.o(($event) => $options.doDelete(item), index),
        l: "6e367b95-12-" + i0,
        m: index
      };
    }),
    t: common_vendor.p({
      name: "clock-fill",
      size: "14"
    }),
    v: common_vendor.p({
      name: "car-fill",
      color: "#00cc33",
      size: "16"
    }),
    w: common_vendor.p({
      name: "car-fill",
      color: "#dc143c",
      size: "16"
    }),
    x: common_vendor.p({
      type: "info",
      shape: "circle",
      size: "small",
      plain: true,
      text: "删除订单"
    })
  } : {}) : common_vendor.e({
    y: $data.orderTotal === 0
  }, $data.orderTotal === 0 ? {
    z: common_vendor.p({
      mode: "order",
      icon: "http://cdn.uviewui.com/uview/empty/car.png"
    })
  } : {}), {
    o: $data.tabIndex === 1
  }) : {}, {
    A: $data.hasLogin == false
  }, $data.hasLogin == false ? {
    B: common_vendor.o($options.toLogin),
    C: common_vendor.p({
      type: "primary",
      text: "去登录"
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/daima/dm/ylqc_mobile/pages/order/order.vue"]]);
wx.createPage(MiniProgramPage);
