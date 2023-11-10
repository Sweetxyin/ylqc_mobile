"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      hasLogin: this.$store.state.hasLogin,
      //登录状态
      userid: this.$store.state.userid,
      orderList: [],
      longitude: 0,
      latitude: 0,
      sourceStr: ""
      //订单号 
    };
  },
  // onLoad() {
  //    	this.load();
  // },
  onShow() {
    this.load();
    this.getLocation();
  },
  // mounted() {
  // 	// this.tabChang(0)
  // 	this.getLocation();
  // 	setTimeout(this.load,1000);
  // },
  methods: {
    load() {
      var _this = this;
      _this.$api.reqPost("api/yl_orders/QueryAll").then((res) => {
        if (res.status) {
          _this.orderList = res.data;
          if (res.data != null) {
            for (let i = 0; i < _this.orderList.length; i++) {
              _this.driving(_this.orderList[i].sendLat, _this.orderList[i].sendLng).then((res2) => {
                _this.orderList[i].distance = res2;
              });
            }
          }
          console.log("查询订单成功", res);
        } else {
          console.log("查询订单为0", res);
        }
      });
    },
    addOrders(id) {
      var _this = this;
      _this.$api.reqPost("api/yl_orders/AddOrderForDeiver", {
        params: {
          number: id,
          userid: _this.userid
        }
      }).then((res) => {
        if (res.status) {
          common_vendor.index.showToast({
            title: "抢单成功",
            icon: "success",
            duration: 850
          });
          _this.load();
          console.log("抢单成功", res);
        } else {
          console.log("抢单失败", res);
        }
      });
    },
    toLogin() {
      common_vendor.index.reLaunch({ url: "/pages/login/login" });
    },
    async driving(sendLat, sendLng) {
      var _this = this;
      var km = 0;
      await _this.$api.reqPost("api/BaiduMap/Driving", {
        params: {
          origin: this.latitude + "," + this.longitude,
          destination: sendLat + "," + sendLng
        }
      }).then((res) => {
        km = res.data.result.routes[0].distance / 1e3;
      });
      return km.toFixed(1);
    },
    getLocation() {
      let that = this;
      common_vendor.index.getSetting({
        success(res) {
          console.log(res);
          if (!res.authSetting["scope.userLocation"]) {
            common_vendor.index.authorize({
              scope: "scope.userLocation",
              success() {
                common_vendor.index.getLocation({
                  type: "gcj02",
                  success: function(res2) {
                    that.x = res2.longitude;
                    that.y = res2.latitude;
                    console.log(res2);
                    console.log("当前位置的经度：" + res2.longitude);
                    console.log("当前位置的纬度：" + res2.latitude);
                    that.longitude = res2.longitude;
                    that.latitude = res2.latitude;
                  },
                  fail(error) {
                    console.log("失败", error);
                  }
                });
              },
              fail(error) {
                console.log("拒绝授权", error);
                common_vendor.index.showModal({
                  title: "提示",
                  content: "若点击不授权，将无法使用位置功能",
                  cancelText: "不授权",
                  cancelColor: "#999",
                  confirmText: "授权",
                  confirmColor: "#f94218",
                  success(res2) {
                    console.log(res2);
                    if (res2.confirm) {
                      common_vendor.index.openSetting({
                        success(res3) {
                          console.log(res3.authSetting);
                        }
                      });
                    } else if (res2.cancel) {
                      console.log("用户点击不授权");
                    }
                  }
                });
              }
            });
          } else {
            common_vendor.index.getLocation({
              type: "gcj02",
              success: function(res2) {
                that.x = res2.longitude;
                that.y = res2.latitude;
                console.log(res2);
                console.log("当前位置的经度：" + res2.longitude);
                console.log("当前位置的纬度：" + res2.latitude);
                that.longitude = res2.longitude;
                that.latitude = res2.latitude;
              },
              fail(error) {
                common_vendor.index.showToast({
                  title: "请勿频繁调用！",
                  icon: "none"
                });
                console.log("失败", error);
              }
            });
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_tabbar2 = common_vendor.resolveComponent("tabbar");
  (_easycom_u_button2 + _easycom_u_icon2 + _easycom_tabbar2)();
}
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_tabbar = () => "../../components/tabbar/tabbar.js";
if (!Math) {
  (_easycom_u_button + _easycom_u_icon + _easycom_tabbar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.hasLogin
  }, !$data.hasLogin ? {
    b: common_vendor.o($options.toLogin),
    c: common_vendor.p({
      type: "primary",
      plain: true,
      size: "small",
      text: "去登录"
    })
  } : {
    d: common_vendor.f($data.orderList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.wholeCourse),
        b: common_vendor.t(item.distance),
        c: "c994d4eb-1-" + i0,
        d: common_vendor.t(item.modifyTime),
        e: "c994d4eb-2-" + i0,
        f: common_vendor.t(item.sendAddress),
        g: "c994d4eb-3-" + i0,
        h: common_vendor.t(item.receAddress),
        i: common_vendor.t(item.itemType),
        j: common_vendor.t(item.deliveryTime),
        k: common_vendor.t(item.amount),
        l: common_vendor.o(($event) => $options.addOrders(item.number), index),
        m: "c994d4eb-4-" + i0,
        n: index
      };
    }),
    e: common_vendor.p({
      name: "clock-fill",
      size: "14"
    }),
    f: common_vendor.p({
      name: "car-fill",
      color: "#00cc33",
      size: "16"
    }),
    g: common_vendor.p({
      name: "car-fill",
      color: "#dc143c",
      size: "16"
    }),
    h: common_vendor.p({
      type: "error",
      size: "small",
      text: "抢单"
    })
  }, {
    i: $data.hasLogin && $data.orderList.length == 0
  }, $data.hasLogin && $data.orderList.length == 0 ? {} : {}, {
    j: common_vendor.p({
      selectedIndex: "0"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c994d4eb"], ["__file", "F:/daima/dm/ylqc_mobile/pages/seizeorders/seizeorders.vue"]]);
wx.createPage(MiniProgramPage);
