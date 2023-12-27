"use strict";
const common_vendor = require("../common/vendor.js");
const store_config_static_tabbar_data = require("./config_static/tabbar_data.js");
const store = common_vendor.createStore({
  state: {
    //存放状态
    TABBAR_INDEX_PATH: null,
    //首页路径
    //登录状态，默认未登录
    hasLogin: false,
    token: "",
    //用户信息
    userInfo: {
      // name: '',//用户昵称
      // avatar: ''//头像
    },
    openid: "",
    userid: ""
  },
  getters: {},
  mutations: {
    setTabbarList(state) {
      let userRole = "3";
      {
        state.TABBAR_INDEX_PATH = store_config_static_tabbar_data.setOfficialTabbar(userRole, ["8", "9"]);
      }
    },
    // 关闭产品或退出登录 初始化tabbar状态 防止不同角色多或者少tabbar减少配置
    clearState(state) {
      store_config_static_tabbar_data.cleaarTabbar();
    },
    setToken(state, auth) {
      state.token = auth.token;
    },
    //用户登录设置
    login(state, userInfo) {
      state.hasLogin = true;
      state.userInfo = userInfo;
      state.openid = userInfo.openid;
      state.userid = userInfo.id;
      if (userInfo.roles == "driver" && !common_vendor.index.getStorageSync("isLogout")) {
        common_vendor.index.reLaunch({
          url: "/pages/seizeorders/seizeorders"
        });
      }
    },
    userOpenId(state) {
      state.openid = state;
    },
    //用户退出设置
    userLogout(state) {
      state.hasLogin = false;
      state.userInfo = {
        // name: '',
        // avatar: ''
      };
      state.token = "";
      state.openid = null;
    }
  },
  actions: {
    //提交注册用户登录方法
    userLoginAction(context, userInfo) {
      context.commit("userLogin", userInfo);
    },
    //提交注册用户退出方法
    userLogoutAction(context) {
      context.commit("userLogout");
    }
  }
});
exports.store = store;
