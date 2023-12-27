"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    selectedIndex: {
      // 当前选中的tab index
      default: 0
    }
  },
  data() {
    return {
      color: "#666666",
      selectedColor: "#00BAB2",
      list: [],
      currentIndex: 0,
      firstshow: true
    };
  },
  onLoad() {
  },
  created() {
    console.log("触发tabbar created");
    const _this = this;
    var userInfo = this.$store.state.userInfo;
    console.log("获取存进的token", common_vendor.index.getStorageSync("token"));
    console.log("是否登出", common_vendor.index.getStorageSync("isLogout"));
    if (Object.keys(userInfo).length != 0 || common_vendor.index.getStorageSync("isLogout")) {
      console.log("获取到store.state用户数据");
      console.log(this.$store.state.userInfo);
    } else {
      _this.doToken();
    }
    this.tabbarinit();
  },
  onShow() {
    if (!this.firstshow) {
      console.log("回到前台");
      this.tabbarinit();
    }
    this.firstshow = false;
  },
  methods: {
    ...common_vendor.mapMutations(["login", "setToken"]),
    tabbarinit() {
      this.currentIndex = this.selectedIndex;
      var _this = this;
      console.log("获取角色", common_vendor.index.getStorageSync("identify"));
      if (common_vendor.index.getStorageSync("identify") == "driver") {
        _this.list = [
          {
            "text": "抢单",
            "pagePath": "/pages/seizeorders/seizeorders",
            "iconPath": "/static/images/tab_icon/seize.png",
            "selectedIconPath": "/static/images/tab_icon/seize_active.png"
          },
          {
            "text": "订单",
            "pagePath": "/pages/order/order",
            "iconPath": "/static/images/tab_icon/order.png",
            "selectedIconPath": "/static/images/tab_icon/order_active.png"
          },
          {
            "text": "消息",
            "pagePath": "/pages/message/message",
            "iconPath": "/static/images/tab_icon/message.png",
            "selectedIconPath": "/static/images/tab_icon/message_active.png"
          },
          {
            "text": "换电",
            "pagePath": "/pages/change_electricity/change_electricity",
            "iconPath": "/static/images/tab_icon/change.png",
            "selectedIconPath": "/static/images/tab_icon/change_active.png"
          },
          {
            "text": "我的",
            "pagePath": "/pages/user/user",
            "iconPath": "/static/images/tab_icon/user.png",
            "selectedIconPath": "/static/images/tab_icon/user_active.png"
          }
        ];
      } else {
        _this.list = [
          {
            "text": "首页",
            "pagePath": "/pages/index/index",
            "iconPath": "/static/images/tab_icon/index.png",
            "selectedIconPath": "/static/images/tab_icon/index_active.png"
          },
          {
            "text": "订单",
            "pagePath": "/pages/order/orderlist/orderlist",
            "iconPath": "/static/images/tab_icon/order.png",
            "selectedIconPath": "/static/images/tab_icon/order_active.png"
          },
          {
            "text": "消息",
            "pagePath": "/pages/message/message",
            "iconPath": "/static/images/tab_icon/message.png",
            "selectedIconPath": "/static/images/tab_icon/message_active.png"
          },
          {
            "text": "商城",
            "pagePath": "/pages/shop/shop",
            "iconPath": "/static/images/tab_icon/shop.png",
            "selectedIconPath": "/static/images/tab_icon/shop_active.png"
          },
          {
            "text": "我的",
            "pagePath": "/pages/user/user",
            "iconPath": "/static/images/tab_icon/user.png",
            "selectedIconPath": "/static/images/tab_icon/user_active.png"
          }
        ];
      }
    },
    // 获取code
    getLoginCode(callback) {
      common_vendor.index.login({
        provider: "weixin",
        success: async (res) => {
          this.code = res.code;
          return callback(res.code);
        }
      });
    },
    //获取token
    doToken() {
      if (common_vendor.index.getStorage("identify"))
        common_vendor.index.removeStorage("identify");
      const _this = this;
      console.log("重新获取用户数据");
      _this.getLoginCode(function(code) {
        _this.$api.reqPost("api/yl_user/OnLogin", {
          data: {
            code: _this.code
          }
        }).then((res) => {
          if (res.status) {
            if (res.data.auth) {
              _this.setToken(res.data.auth);
              common_vendor.index.setStorageSync("token", res.data.auth.token);
              console.log("检查是否成功存进token", common_vendor.index.getStorageSync("token"));
              console.log("检查是否成功将token存进vuex", _this.$store.state);
            }
            if (res.data.user) {
              _this.login(res.data.user);
              console.log("检查是否成功将数据存进vuex", _this.$store.state);
            }
            _this.openid = res.otherData;
            console.log("成功后获取openid：" + _this.$store.state.openid);
            if (res.data.user) {
              if (res.data.user.roles == "driver") {
                common_vendor.index.setStorageSync("identify", "driver");
              } else {
                common_vendor.index.setStorageSync("identify", "user");
              }
            }
          }
        });
      });
    },
    switchTab(item, index) {
      this.currentIndex = index;
      let url = item.pagePath;
      common_vendor.index.reLaunch({
        url
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: $data.currentIndex == index ? item.selectedIconPath : item.iconPath,
        b: common_vendor.t(item.text),
        c: $data.currentIndex == index ? $data.selectedColor : $data.color,
        d: index,
        e: common_vendor.o(($event) => $options.switchTab(item, index), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/daima/dm/ylqc_mobile/components/tabbar/tabbar.vue"]]);
wx.createComponent(Component);
