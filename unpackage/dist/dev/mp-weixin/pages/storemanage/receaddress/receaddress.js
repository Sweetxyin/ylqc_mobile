"use strict";
const common_vendor = require("../../../common/vendor.js");
const Map = () => "../../../components/map/map.js";
const _sfc_main = {
  data() {
    return {
      userid: this.$store.state.userid,
      //用户ID
      receLocation: [{
        addressName: "",
        //地址名称
        address: "",
        //地址
        addressNotes: "",
        //地址备注
        contactName: "",
        //姓名
        cantactPhone: "",
        //电话
        latitude: "",
        //纬度
        longitude: ""
        //经度
      }]
      // address:this.$refs.list.address	
    };
  },
  components: {
    Map
  },
  onLoad() {
    var self = this;
    common_vendor.index.getStorage({
      key: "local",
      success(res) {
        self.receLocation.addressName = res.data.addressName;
        self.receLocation.address = res.data.address;
        self.receLocation.latitude = res.data.latitude;
        self.receLocation.longitude = res.data.longitude;
        console.log("1", res.data);
      }
    });
  },
  methods: {
    //跳转到地址选择页
    toSelectAddress() {
      common_vendor.index.navigateTo({
        url: "/pages/storemanage/selectaddress/selectaddress"
      });
    },
    conReceAddress() {
      common_vendor.index.$emit("upReceData", this.receLocation);
      common_vendor.index.navigateBack({
        delta: 1
      });
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
    a: common_vendor.t($data.receLocation.addressName),
    b: common_vendor.o($options.toSelectAddress),
    c: common_vendor.p({
      size: "mini",
      type: "info"
    }),
    d: common_vendor.t($data.receLocation.address),
    e: common_vendor.p({
      height: "15",
      bgColor: "f0ffff"
    }),
    f: common_vendor.o(($event) => $data.receLocation.addressNotes = $event),
    g: common_vendor.p({
      placeholder: "楼层及门牌号码",
      border: "none",
      inputAlign: "right",
      fontSize: "32rpx",
      modelValue: $data.receLocation.addressNotes
    }),
    h: common_vendor.o(($event) => $data.receLocation.contactName = $event),
    i: common_vendor.p({
      placeholder: "姓名",
      border: "none",
      inputAlign: "right",
      fontSize: "32rpx",
      modelValue: $data.receLocation.contactName
    }),
    j: common_vendor.o(($event) => $data.receLocation.cantactPhone = $event),
    k: common_vendor.p({
      placeholder: "联系电话",
      border: "none",
      inputAlign: "right",
      fontSize: "32rpx",
      modelValue: $data.receLocation.cantactPhone
    }),
    l: common_vendor.p({
      height: "15",
      bgColor: "f0ffff"
    }),
    m: common_vendor.o($options.conReceAddress),
    n: common_vendor.p({
      type: "primary"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d62d3f48"], ["__file", "F:/daima/dm/ylqc_mobile/pages/storemanage/receaddress/receaddress.vue"]]);
wx.createPage(MiniProgramPage);
