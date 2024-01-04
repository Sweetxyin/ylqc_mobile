"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // hasLogin:this.$store.state.hasLogin,//登录状态
      userid: this.$store.state.userid,
      //用户ID
      tabsList: [
        { name: "进行中" },
        { name: "已完成" },
        { name: "已取消" }
      ],
      orderTotal: 1,
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
      }],
      sourceStr: ""
      //订单号 
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
        if ((this.allList[i].state == 1 || this.allList[i].state == 2 || this.allList[i].state == 4 || this.allList[i].state == 5 || this.allList[i].state == 6 || this.allList[i].state == 7) && e.index == 0) {
          console.log(this.allList[i]);
          this.typeList.push(this.allList[i]);
        } else if (this.allList[i].state == 3 && e.index == 1) {
          console.log(this.allList[i]);
          this.typeList.push(this.allList[i]);
        } else if (this.allList[i].state == 8 && e.index == 2) {
          console.log(this.allList[i]);
          this.typeList.push(this.allList[i]);
        }
      }
    },
    // 获取用户订单信息
    getOrderList() {
      var _this = this;
      _this.$api.reqPost("api/yl_goods/YLGoodsOrderList", {
        params: { status: 1 }
      }).then((res) => {
        if (res.status) {
          if (res.data == null) {
            _this.orderTotal = 0;
            console.log("获取商城订单信息成功,订单数量为0", res);
          } else {
            _this.allList = res.data.orders;
            _this.orderTotal = res.data.length;
            _this.typeList = [];
            for (var i = 0; i < _this.allList.length; i++) {
              if ((_this.allList[i].state == 1 || _this.allList[i].state == 2 || _this.allList[i].state == 4 || _this.allList[i].state == 5 || _this.allList[i].state == 6 || _this.allList[i].state == 7) && _this.tabIndex == 0) {
                console.log(_this.allList[i]);
                _this.typeList.push(_this.allList[i]);
              } else if (_this.allList[i].state == 3 && _this.tabIndex == 1) {
                console.log(_this.allList[i]);
                _this.typeList.push(_this.allList[i]);
              } else if (_this.allList[i].state == 8 && _this.tabIndex == 2) {
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
    },
    //支付
    toPay(item) {
      var that = this;
      that.$api.reqPost("api/yl_user/Pay", {
        data: {
          ids: item.number,
          payment_code: "wechatpay",
          payment_type: 1,
          params: {
            trade_type: "JSAPI"
          }
        }
      }).then((res) => {
        if (res.status) {
          console.log("测试支付后端接口成功", res);
          common_vendor.index.requestPayment({
            provider: "wxpay",
            timeStamp: res.data.timeStamp,
            //后端返回的时间戳
            nonceStr: res.data.nonceStr,
            //后端返回的随机字符串
            package: res.data.package,
            //后端返回的prepay_id
            signType: "MD5",
            paySign: res.data.paySign,
            //后端返回的签名
            success: function(res2) {
              that.sourceStr = item.number;
              that.conOrder();
              console.log("success:" + JSON.stringify(res2));
            },
            fail: function(err) {
              common_vendor.index.showToast({
                title: "取消支付",
                icon: "none"
              });
              console.log("fail:" + JSON.stringify(err));
            }
          });
        } else {
          console.log("支付失败", res);
        }
      });
    },
    //确认下单
    conOrder() {
      this.$api.reqPost("api/yl_orders/AddOrder", {
        params: {
          number: this.sourceStr
        }
      }).then((res) => {
        if (res.status) {
          console.log("确认下单成功", res);
          var sta = 1;
          this.editOrderState(sta);
        } else {
          console.log("确认下单失败", res);
        }
      });
    },
    //修改订单状态
    editOrderState(sta) {
      this.$api.reqPost("api/yl_orders/EditOrder", {
        params: {
          number: this.sourceStr,
          state: sta
        }
      }).then((res) => {
        if (res.status) {
          console.log("修改订单状态成功", res);
        } else {
          console.log("修改订单状态失败", res);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_tabs2 + _easycom_u_empty2 + _easycom_u_button2)();
}
const _easycom_u_tabs = () => "../../../uni_modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_u_empty = () => "../../../uni_modules/uview-plus/components/u-empty/u-empty.js";
const _easycom_u_button = () => "../../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_tabs + _easycom_u_empty + _easycom_u_button)();
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
    c: $data.orderTotal === 0
  }, $data.orderTotal === 0 ? {
    d: common_vendor.p({
      mode: "order",
      icon: "http://cdn.uviewui.com/uview/empty/car.png"
    })
  } : {
    e: common_vendor.f($data.typeList, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.shoppername),
        b: item.state == 1
      }, item.state == 1 ? {} : {}, {
        c: item.state == 2
      }, item.state == 2 ? {} : {}, {
        d: item.state == 3
      }, item.state == 3 ? {} : {}, {
        e: item.state == 4 || item.state == 5
      }, item.state == 4 || item.state == 5 ? {} : {}, {
        f: item.state == 6
      }, item.state == 6 ? {} : {}, {
        g: item.state == 7
      }, item.state == 7 ? {} : {}, {
        h: item.state == 8
      }, item.state == 8 ? {} : {}, {
        i: item.goodimage_first,
        j: common_vendor.t(item.itemName),
        k: common_vendor.t(item.price),
        l: common_vendor.t(item.itemNum),
        m: common_vendor.t(item.amount),
        n: common_vendor.o(($event) => $options.toOrderDetail(item), index),
        o: item.state == 1 || item.state == 4 || item.state == 5
      }, item.state == 1 || item.state == 4 || item.state == 5 ? {
        p: common_vendor.o(($event) => $options.toPay(item), index),
        q: "048bc1a1-2-" + i0,
        r: common_vendor.p({
          type: "info",
          shape: "circle",
          size: "small",
          plain: true,
          text: "立即支付"
        })
      } : {}, {
        s: item.state == 1 || item.state == 2 || item.state == 4 || item.state == 5 || item.state == 6
      }, item.state == 1 || item.state == 2 || item.state == 4 || item.state == 5 || item.state == 6 ? {
        t: common_vendor.o(($event) => $options.cancelOrder(item), index),
        v: "048bc1a1-3-" + i0,
        w: common_vendor.p({
          type: "info",
          shape: "circle",
          size: "small",
          plain: true,
          text: "取消订单"
        })
      } : {}, {
        x: item.state == -1 || item.state == 8
      }, item.state == -1 || item.state == 8 ? {
        y: common_vendor.o(($event) => $options.doDelete(item), index),
        z: "048bc1a1-4-" + i0,
        A: common_vendor.p({
          type: "info",
          shape: "circle",
          size: "small",
          plain: true,
          text: "删除订单"
        })
      } : {}, {
        B: index
      });
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-048bc1a1"], ["__file", "F:/daima/dm/ylqc_mobile/pages/shop/shop_order/shop_order.vue"]]);
wx.createPage(MiniProgramPage);
