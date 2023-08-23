"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      hasLogin: this.$store.state.hasLogin,
      //登录状态
      userid: this.$store.state.userid,
      //用户ID
      tabsList: [
        { name: "进行中" },
        { name: "已完成" },
        { name: "已取消" }
      ],
      orderTotal: 0,
      //订单数量
      typeList: "",
      //显示的状态列表
      tabIndex: 0,
      allList: [{
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
      }]
    };
  },
  onShow() {
    this.getOrderList();
  },
  onLoad() {
    this.getOrderList();
  },
  methods: {
    // 跳转到登录页
    toLogin() {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    },
    change(e) {
      console.log(e);
      this.tabIndex = e.index;
      this.typeList = [];
      for (var i = 0; i < this.allList.length; i++) {
        if ((this.allList[i].state == 0 || this.allList[i].state == 1 || this.allList[i].state == 2 || this.allList[i].state == 3) && e.index == 0) {
          console.log(this.allList[i]);
          this.typeList.push(this.allList[i]);
        } else if (this.allList[i].state == 4 && e.index == 1) {
          console.log(this.allList[i]);
          this.typeList.push(this.allList[i]);
        } else if (this.allList[i].state == -1 && e.index == 2) {
          console.log(this.allList[i]);
          this.typeList.push(this.allList[i]);
        }
      }
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
            _this.allList = res.data;
            _this.orderTotal = res.data.length;
            _this.typeList = [];
            for (var i = 0; i < _this.allList.length; i++) {
              if ((_this.allList[i].state == 0 || _this.allList[i].state == 1 || _this.allList[i].state == 2 || _this.allList[i].state == 3) && _this.tabIndex == 0) {
                console.log(_this.allList[i]);
                _this.typeList.push(_this.allList[i]);
              } else if (_this.allList[i].state == 4 && _this.tabIndex == 1) {
                console.log(_this.allList[i]);
                _this.typeList.push(_this.allList[i]);
              } else if (_this.allList[i].state == -1 && _this.tabIndex == 2) {
                console.log(_this.allList[i]);
                _this.typeList.push(_this.allList[i]);
              }
            }
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
        url: "/pages/order/orderdetails/orderdetails?number=" + item.number
      });
    },
    //跳转到订单详情页
    toOrderDetail(item) {
      common_vendor.index.navigateTo({
        url: "/pages/order/orderdetails/orderdetails?number=" + item.number
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
    },
    //取消订单
    cancelOrder(item) {
      var _this = this;
      common_vendor.index.showModal({
        title: "确定要取消" + item.number + "订单吗？",
        success: function(res) {
          if (res.confirm) {
            _this.$api.reqPost("api/yl_orders/OrderCancel", {
              params: {
                id: item.id
              }
            }).then((res2) => {
              if (res2.status) {
                console.log("取消订单成功!", res2);
                common_vendor.index.showToast({
                  title: "取消订单成功"
                });
                _this.getOrderList();
              } else {
                console.log("取消订单失败!");
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
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_tabs2 + _easycom_u_empty2 + _easycom_u_icon2 + _easycom_u_button2)();
}
const _easycom_u_tabs = () => "../../../uni_modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_u_empty = () => "../../../uni_modules/uview-plus/components/u-empty/u-empty.js";
const _easycom_u_icon = () => "../../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_button = () => "../../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_tabs + _easycom_u_empty + _easycom_u_icon + _easycom_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.change),
    b: common_vendor.p({
      list: $data.tabsList,
      scrollable: false,
      lineColor: "#3c9cff",
      activeStyle: {
        color: "#3c9cff"
      },
      inactiveStyle: {
        color: "#898989"
      }
    }),
    c: $data.hasLogin == true
  }, $data.hasLogin == true ? common_vendor.e({
    d: $data.orderTotal === 0
  }, $data.orderTotal === 0 ? {
    e: common_vendor.p({
      mode: "order",
      icon: "http://cdn.uviewui.com/uview/empty/car.png"
    })
  } : {
    f: common_vendor.f($data.typeList, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.number),
        b: item.state == 0
      }, item.state == 0 ? {} : {}, {
        c: item.state == 1
      }, item.state == 1 ? {} : {}, {
        d: item.state == 2
      }, item.state == 2 ? {} : {}, {
        e: item.state == 3
      }, item.state == 3 ? {} : {}, {
        f: item.state == 4
      }, item.state == 4 ? {} : {}, {
        g: item.state == -1
      }, item.state == -1 ? {} : {}, {
        h: "70d1dd14-2-" + i0,
        i: common_vendor.t(item.deliveryTime),
        j: "70d1dd14-3-" + i0,
        k: common_vendor.t(item.sendAddress),
        l: "70d1dd14-4-" + i0,
        m: common_vendor.t(item.receAddress),
        n: common_vendor.t(item.amount),
        o: common_vendor.o(($event) => $options.toOrderDetail(item), index),
        p: item.state == 0
      }, item.state == 0 ? {
        q: common_vendor.o(($event) => _ctx.doEditOrder(item), index),
        r: "70d1dd14-5-" + i0,
        s: common_vendor.p({
          type: "info",
          shape: "circle",
          size: "small",
          plain: true,
          text: "修改订单"
        })
      } : {}, {
        t: item.state == 0 || item.state == 1
      }, item.state == 0 || item.state == 1 ? {
        v: common_vendor.o(($event) => $options.cancelOrder(item), index),
        w: "70d1dd14-6-" + i0,
        x: common_vendor.p({
          type: "info",
          shape: "circle",
          size: "small",
          plain: true,
          text: "取消订单"
        })
      } : {}, {
        y: item.state == -1 || item.state == 4
      }, item.state == -1 || item.state == 4 ? {
        z: common_vendor.o(($event) => $options.doDelete(item), index),
        A: "70d1dd14-7-" + i0,
        B: common_vendor.p({
          type: "info",
          shape: "circle",
          size: "small",
          plain: true,
          text: "删除订单"
        })
      } : {}, {
        C: index
      });
    }),
    g: common_vendor.p({
      name: "clock-fill",
      size: "14"
    }),
    h: common_vendor.p({
      name: "car-fill",
      color: "#00cc33",
      size: "16"
    }),
    i: common_vendor.p({
      name: "car-fill",
      color: "#dc143c",
      size: "16"
    })
  }) : {}, {
    j: $data.hasLogin == false
  }, $data.hasLogin == false ? {
    k: common_vendor.o($options.toLogin),
    l: common_vendor.p({
      type: "primary",
      text: "去登录"
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-70d1dd14"], ["__file", "F:/daima/dm/ylqc_mobile/pages/order/orderlist/orderlist.vue"]]);
wx.createPage(MiniProgramPage);
