"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  // 	onLoad() {
  // 		const _this = this
  //
  // 		// 启动加载框
  // 		uni.showLoading({
  // 			mask: true,
  // 			title: '加载中'
  // 		})
  // 		// 初始化tabbar
  // 		this.$store.commit('setFirstTabbar')
  // 		this.$store.commit('setTabbarList');
  // 		// 跳转
  // 		uni.reLaunch({
  // 			url: this.$store.state.TABBAR_INDEX_PATH
  // 		})
  // 		// uni.reLaunch({
  // 		// 	url: this.$store.state.TABBAR_INDEX_PATH,
  // 		// 	success: function(res, data) {
  // 		// 		_this.$store.commit('setTabbarList');
  // 		// 	},
  // 		// 	fail: function(res, data) {
  // 		// 		console.log("设置页面失败！",error)
  // 		// 	}
  // 		// })
  //
  // 		// 关闭loading
  // 		uni.hideLoading()
  // 	}
  // 
  onLoad() {
    common_vendor.index.hideTabBar();
    common_vendor.index.showLoading({
      mask: true,
      title: "加载中"
    });
    common_vendor.index.hideLoading();
  }
};
if (!Array) {
  const _easycom_tabbar2 = common_vendor.resolveComponent("tabbar");
  _easycom_tabbar2();
}
const _easycom_tabbar = () => "../../components/tabbar/tabbar.js";
if (!Math) {
  _easycom_tabbar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      selectedIndex: "0"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/daima/dm/ylqc_mobile/pages/defalutStart/defalutStart.vue"]]);
wx.createPage(MiniProgramPage);
