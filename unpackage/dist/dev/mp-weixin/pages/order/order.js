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
      list1: [{
        name: "进行中"
      }, {
        name: "已完成"
      }, {
        name: "已取消"
      }],
      tabIndex: 0,
      // tabStatus:true
      orderTotal: 1,
      //订单数量
      order_state: 1
    };
  },
  components: {
    Processing,
    Complete,
    Cancel
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    tabChang(index) {
      this.tabIndex = index.index;
    },
    toLogin() {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    },
    getOrderList() {
      var _this = this;
      _this.$api.reqPost("api/yl_orders/QueryForUser", {
        params: { userid: _this.userid }
      }).then((res) => {
        if (res.status) {
          console.log("获取订单信息成功", res);
        } else {
          console.log("获取订单信息失败", res);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_sticky2 = common_vendor.resolveComponent("u-sticky");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _component_Processing = common_vendor.resolveComponent("Processing");
  const _component_Complete = common_vendor.resolveComponent("Complete");
  const _component_Cancel = common_vendor.resolveComponent("Cancel");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_tabs2 + _easycom_u_sticky2 + _easycom_u_empty2 + _component_Processing + _component_Complete + _component_Cancel + _easycom_u_button2)();
}
const _easycom_u_tabs = () => "../../uni_modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_u_sticky = () => "../../uni_modules/uview-plus/components/u-sticky/u-sticky.js";
const _easycom_u_empty = () => "../../uni_modules/uview-plus/components/u-empty/u-empty.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_tabs + _easycom_u_sticky + _easycom_u_empty + _easycom_u_button)();
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
  } : {}) : $data.tabIndex === 1 ? common_vendor.e({
    i: $data.tabIndex === 0
  }, $data.tabIndex === 0 ? {
    j: common_vendor.p({
      mode: "order",
      icon: "http://cdn.uviewui.com/uview/empty/car.png"
    })
  } : {}) : common_vendor.e({
    k: $data.tabIndex === 0
  }, $data.tabIndex === 0 ? {
    l: common_vendor.p({
      mode: "order",
      icon: "http://cdn.uviewui.com/uview/empty/car.png"
    })
  } : {}), {
    h: $data.tabIndex === 1
  }) : {}, {
    m: $data.hasLogin == false
  }, $data.hasLogin == false ? {
    n: common_vendor.o($options.toLogin),
    o: common_vendor.p({
      type: "primary",
      text: "去登录"
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/daima/dm/ylqc_mobile/pages/order/order.vue"]]);
wx.createPage(MiniProgramPage);
