"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userid: this.$store.state.userid,
      //用户ID
      searchKey: "",
      //搜索值
      storeList: [{
        id: "",
        address: "",
        //公司名称
        fullAddress: "",
        //地址
        name: "",
        //姓名
        phone: "",
        //电话
        lat: "",
        //纬度
        lng: ""
        //经度
      }],
      storeState: "",
      //门店状态
      allList: [],
      //全部数据
      searchList: [],
      //搜索数据
      isData: false,
      tips: ""
      //搜索提示语
    };
  },
  onShow() {
    this.getStoreList();
  },
  onLoad(option) {
    this.getStoreList();
    if (option.sendState == 1) {
      this.storeState = option.sendState;
    } else if (option.receState == 2) {
      this.storeState = option.receState;
    }
    console.log("门店状态", this.storeState);
  },
  onPullDownRefresh() {
    this.getStoreList();
  },
  methods: {
    //跳转至添加门店页
    addStore() {
      common_vendor.index.navigateTo({
        url: "/pages/storemanage/addstore/addstore"
      });
    },
    //返回上一页
    conStoreData(index) {
      if (this.storeState == 1) {
        common_vendor.index.$emit("upSendData", this.storeList[index]);
        common_vendor.index.navigateBack({
          delta: 1
        });
      } else if (this.storeState == 2) {
        common_vendor.index.$emit("upReceData", this.storeList[index]);
        common_vendor.index.navigateBack({
          delta: 1
        });
      } else {
        console.log("什么都不做");
      }
    },
    //获取用户门店管理数据
    getStoreList() {
      var _this = this;
      _this.$api.reqPost("api/yl_address/QueryForUser", {
        params: { userid: _this.userid }
      }).then((res) => {
        if (res.status) {
          _this.storeList = res.data;
          _this.allList = res.data;
          _this.isData = true;
          console.log("获取门店信息成功", res);
        } else if (res.code == 500) {
          _this.isData = false;
          console.log("门店信息为空", res);
        } else {
          console.log("获取门店信息失败", res);
        }
      });
    },
    //调转到编辑页面
    editStore(item) {
      common_vendor.index.navigateTo({
        url: "/pages/storemanage/eidtstore/eidtstore?id=" + item.id
      });
    },
    //删除门店
    delStore(item) {
      var _this = this;
      common_vendor.index.showModal({
        title: "确定要删除" + item.id + "门店吗？",
        success: function(res) {
          if (res.confirm) {
            _this.$api.reqPost("api/yl_address/Delete", {
              params: {
                id: item.id
              }
            }).then((res2) => {
              if (res2.status) {
                console.log("删除门店成功!", res2);
                common_vendor.index.showToast({
                  title: "删除门店成功"
                });
                _this.getStoreList();
              } else {
                console.log("删除门店失败!");
              }
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    //搜索地址
    changeSearch() {
      var _this = this;
      if (_this.searchKey === "") {
        _this.storeList = _this.allList;
        _this.tips = "";
      } else {
        _this.storeList = [];
        _this.tips = "";
        _this.$api.reqPost("api/yl_address/QueryForName", {
          params: {
            userid: _this.userid,
            name: _this.searchKey
          }
        }).then((res) => {
          if (res.status) {
            _this.storeList = res.data;
            console.log("搜索信息成功", res);
          } else if (res.code == 500) {
            _this.tips = "没有搜索结果";
            console.log("暂无收藏地址", res);
          } else {
            console.log("搜索信息失败", res);
          }
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_u_gap2 = common_vendor.resolveComponent("u-gap");
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_gap2 + _easycom_u_search2 + _easycom_u_icon2 + _easycom_u_button2)();
}
const _easycom_u_gap = () => "../../uni_modules/uview-plus/components/u-gap/u-gap.js";
const _easycom_u_search = () => "../../uni_modules/uview-plus/components/u-search/u-search.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_gap + _easycom_u_search + _easycom_u_icon + _easycom_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      height: "10",
      bgColor: "#f0ffff"
    }),
    b: common_vendor.o($options.changeSearch),
    c: common_vendor.o(($event) => $data.searchKey = $event),
    d: common_vendor.p({
      placeholder: "搜索地址",
      clearabled: true,
      showAction: false,
      modelValue: $data.searchKey
    }),
    e: common_vendor.p({
      height: "5",
      bgColor: "#f0ffff"
    }),
    f: $data.isData
  }, $data.isData ? {
    g: common_vendor.f($data.storeList, (item, index, i0) => {
      return {
        a: "69cfbcd8-3-" + i0,
        b: common_vendor.t(item.address),
        c: "69cfbcd8-4-" + i0,
        d: common_vendor.t(item.fullAddress),
        e: "69cfbcd8-5-" + i0,
        f: common_vendor.t(item.name),
        g: common_vendor.t(item.phone),
        h: common_vendor.o(($event) => $options.conStoreData(index), index),
        i: common_vendor.o(($event) => $options.editStore(item), index),
        j: "69cfbcd8-6-" + i0,
        k: common_vendor.o(($event) => $options.delStore(item), index),
        l: "69cfbcd8-7-" + i0,
        m: index
      };
    }),
    h: common_vendor.p({
      name: "map-fill",
      size: "18"
    }),
    i: common_vendor.p({
      height: "6",
      bgColor: "#ffffff"
    }),
    j: common_vendor.p({
      height: "6",
      bgColor: "#ffffff"
    }),
    k: common_vendor.p({
      type: "info",
      shape: "circle",
      size: "small",
      plain: true,
      text: "编辑"
    }),
    l: common_vendor.p({
      type: "info",
      shape: "circle",
      size: "small",
      plain: true,
      text: "删除"
    }),
    m: common_vendor.t($data.tips)
  } : {}, {
    n: common_vendor.o($options.addStore),
    o: common_vendor.p({
      type: "primary"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-69cfbcd8"], ["__file", "F:/daima/dm/ylqc_mobile/pages/storemanage/storemanage.vue"]]);
wx.createPage(MiniProgramPage);
