"use strict";
const common_vendor = require("../../../common/vendor.js");
const Map = () => "../../../components/map/map.js";
const _sfc_main = {
  data() {
    return {
      userid: this.$store.state.userid,
      //用户ID
      id: "",
      storeList: [{
        id: "",
        address: "",
        //地址名称
        fullAddress: "",
        //地址详细位置
        name: "",
        //姓名
        phone: "",
        //电话
        remark: "",
        //备注
        lat: "",
        //纬度
        lng: ""
        //经度
      }]
    };
  },
  components: {
    Map
  },
  onLoad(option) {
    this.id = option.id;
    console.log(option.id);
    this.getStore();
  },
  methods: {
    //跳转到地址选择页
    toSelectAddress() {
      common_vendor.index.navigateTo({
        url: "/pages/storemanage/selectaddress/selectaddress"
      });
    },
    //获取本条门店信息
    getStore() {
      this.$api.reqPost(
        "api/yl_address/QueryForID",
        {
          params: { id: this.id }
        }
      ).then((res) => {
        if (res.status) {
          this.storeList = res.data;
          console.log("获取门店信息成功！", res);
        } else {
          console.log("获取门店信息失败！", res);
        }
      });
    },
    editStore() {
      var _this = this;
      if (_this.storeList.remark == "") {
        common_vendor.index.showToast({
          title: "请填写地址备注！",
          icon: "none"
        });
      } else if (_this.storeList.name == "") {
        common_vendor.index.showToast({
          title: "请填写联系人！",
          icon: "none"
        });
      } else if (_this.storeList.phone == "") {
        common_vendor.index.showToast({
          title: "请填写联系电话！",
          icon: "none"
        });
      } else {
        _this.$api.reqPost("api/yl_address/Update", {
          data: {
            id: _this.id,
            userid: _this.userid,
            address: _this.storeList.address,
            fullAddress: _this.storeList.fullAddress,
            remark: _this.storeList.remark,
            name: _this.storeList.name,
            phone: _this.storeList.phone,
            lat: _this.storeList.lat,
            lng: _this.storeList.lng
          }
        }).then((res) => {
          if (res.status) {
            common_vendor.index.showToast({
              title: "修改门店成功！",
              icon: "none"
            });
            common_vendor.index.$emit("refresh", { refresh: true });
            common_vendor.index.navigateBack({
              url: "/pages/storemanage/storemanage"
            });
            console.log("提交成功", res);
          } else {
            common_vendor.index.showToast({
              title: "修改门店失败！",
              icon: "none"
            });
            console.log("提交失败", res);
          }
        });
      }
    }
  }
};
if (!Array) {
  const _component_Map = common_vendor.resolveComponent("Map");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_gap2 = common_vendor.resolveComponent("u-gap");
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  (_component_Map + _easycom_u_button2 + _easycom_u_gap2 + _easycom_u__input2)();
}
const _easycom_u_button = () => "../../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_gap = () => "../../../uni_modules/uview-plus/components/u-gap/u-gap.js";
const _easycom_u__input = () => "../../../uni_modules/uview-plus/components/u--input/u--input.js";
if (!Math) {
  (_easycom_u_button + _easycom_u_gap + _easycom_u__input)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.storeList.address),
    b: common_vendor.o($options.toSelectAddress),
    c: common_vendor.p({
      size: "mini",
      type: "info"
    }),
    d: common_vendor.t($data.storeList.fullAddress),
    e: common_vendor.p({
      height: "15",
      bgColor: "f0ffff"
    }),
    f: common_vendor.o(($event) => $data.storeList.remark = $event),
    g: common_vendor.p({
      placeholder: "楼层及门牌号码",
      border: "none",
      inputAlign: "right",
      fontSize: "28rpx",
      modelValue: $data.storeList.remark
    }),
    h: common_vendor.o(($event) => $data.storeList.name = $event),
    i: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "28rpx",
      modelValue: $data.storeList.name
    }),
    j: common_vendor.o(($event) => $data.storeList.phone = $event),
    k: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "28rpx",
      modelValue: $data.storeList.phone
    }),
    l: common_vendor.p({
      height: "15",
      bgColor: "f0ffff"
    }),
    m: common_vendor.o($options.editStore),
    n: common_vendor.p({
      type: "primary"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b16831e9"], ["__file", "F:/daima/dm/ylqc_mobile/pages/storemanage/eidtstore/eidtstore.vue"]]);
wx.createPage(MiniProgramPage);
