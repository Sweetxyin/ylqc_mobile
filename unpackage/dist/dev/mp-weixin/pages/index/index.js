"use strict";
const common_vendor = require("../../common/vendor.js");
const Delivery = () => "../../components/delivery/delivery.js";
const Custom = () => "../../components/custom-xd/custom-xd.js";
const _sfc_main = {
  data() {
    return {
      hasLogin: this.$store.state.hasLogin,
      //登录状态
      list: ["客户下单", "配送VIP"],
      subIndex: 0,
      //导航条索引值
      position: "",
      addressName: ""
    };
  },
  components: {
    Delivery,
    Custom
  },
  onLoad() {
  },
  methods: {
    //获取当前的导航索引，并赋值给subIndex
    sectionChange(index) {
      this.subIndex = index;
    },
    isLoginAction() {
      if (this.hasLogin == false) {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      } else {
        console.log("什么也不做");
      }
    },
    driverJion() {
      if (this.hasLogin == false) {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/authentication/authentication"
        });
      }
    },
    zxts() {
      if (this.hasLogin == false) {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/complaint/complaint"
        });
      }
    },
    community() {
      if (this.hasLogin == false) {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/other_services/community/community"
        });
      }
    },
    zcar() {
      common_vendor.index.navigateTo({
        url: "/pages/other_services/car_rental/car_rental"
      });
    }
  }
};
if (!Array) {
  const _easycom_u_gap2 = common_vendor.resolveComponent("u-gap");
  const _easycom_u_subsection2 = common_vendor.resolveComponent("u-subsection");
  const _component_Delivery = common_vendor.resolveComponent("Delivery");
  const _component_Custom = common_vendor.resolveComponent("Custom");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_tabbar2 = common_vendor.resolveComponent("tabbar");
  (_easycom_u_gap2 + _easycom_u_subsection2 + _component_Delivery + _component_Custom + _easycom_u_icon2 + _easycom_tabbar2)();
}
const _easycom_u_gap = () => "../../uni_modules/uview-plus/components/u-gap/u-gap.js";
const _easycom_u_subsection = () => "../../uni_modules/uview-plus/components/u-subsection/u-subsection.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_tabbar = () => "../../components/tabbar/tabbar.js";
if (!Math) {
  (_easycom_u_gap + _easycom_u_subsection + _easycom_u_icon + _easycom_tabbar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      height: "40",
      bgColor: "#f0ffff"
    }),
    b: common_vendor.o((...args) => $options.zcar && $options.zcar(...args)),
    c: common_vendor.o($options.sectionChange),
    d: common_vendor.p({
      list: $data.list,
      mode: "button",
      inactiveColor: "#000000",
      activeColor: "#00BAB2",
      fontSize: "16",
      current: $data.subIndex
    }),
    e: $data.subIndex === 1
  }, $data.subIndex === 1 ? {} : {}, {
    f: common_vendor.p({
      name: "kefu-ermai",
      color: "#FA7473",
      size: "32",
      bold: "true"
    }),
    g: common_vendor.o((...args) => $options.zxts && $options.zxts(...args)),
    h: common_vendor.p({
      name: "car",
      color: "#87CEEB",
      size: "32",
      bold: "true"
    }),
    i: common_vendor.o((...args) => $options.driverJion && $options.driverJion(...args)),
    j: common_vendor.p({
      name: "plus-people-fill",
      color: "#F9CE5D",
      size: "32"
    }),
    k: common_vendor.p({
      name: "integral",
      color: "#87CEEB",
      size: "32"
    }),
    l: common_vendor.o((...args) => $options.community && $options.community(...args)),
    m: common_vendor.p({
      selectedIndex: "0"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "F:/daima/dm/ylqc_mobile/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
