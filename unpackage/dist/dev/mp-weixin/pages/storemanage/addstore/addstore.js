"use strict";
const common_vendor = require("../../../common/vendor.js");
const Map = () => "../../../components/map/map.js";
const _sfc_main = {
  data() {
    return {
      userid: this.$store.state.userid,
      //用户ID
      // addressName:'',//地址名称
      // address:'',//地址
      // addressNotes:'',//地址备注
      // contactName:'',//姓名
      // cantactPhone:'',//电话
      // address:this.$refs.list.address	
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
        remark: "",
        //备注
        lat: "",
        //纬度
        lng: ""
        //经度
      }],
      storeState: ""
    };
  },
  components: {
    Map
  },
  onLoad(option) {
    var self = this;
    common_vendor.index.getStorage({
      key: "local",
      success(res) {
        self.storeList.address = res.data.addressName;
        self.storeList.fullAddress = res.data.address;
        self.storeList.lat = res.data.latitude;
        self.storeList.lng = res.data.longitude;
        console.log("1", self.storeList);
      }
    });
    if (option.sendState == 1) {
      this.storeState = option.sendState;
    } else if (option.receState == 2) {
      this.storeState = option.receState;
    }
    console.log("门店状态", this.storeState);
  },
  methods: {
    //跳转到地址选择页
    toSelectAddress() {
      common_vendor.index.navigateTo({
        url: "/pages/storemanage/selectaddress/selectaddress"
      });
    },
    //返回上一页携带返回发件地址
    conSendAddress() {
      common_vendor.index.$emit("upSendData", this.storeList);
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    //返回上一页携带收件地址
    conReceAddress() {
      common_vendor.index.$emit("upReceData", this.storeList);
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    //提交添加门店
    addStore() {
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
        _this.$api.reqPost("api/yl_address/add", {
          data: {
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
              title: "添加门店成功成功！",
              icon: "none"
            });
            common_vendor.index.navigateBack({
              url: "/pages/storemanage/storemanage"
            });
            console.log("提交成功", res);
          } else {
            common_vendor.index.showToast({
              title: "添加门店失败！",
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
  return common_vendor.e({
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
    m: $data.storeState == ""
  }, $data.storeState == "" ? {
    n: common_vendor.o($options.addStore),
    o: common_vendor.p({
      type: "primary"
    })
  } : {}, {
    p: $data.storeState == "1"
  }, $data.storeState == "1" ? {
    q: common_vendor.o($options.conSendAddress),
    r: common_vendor.p({
      type: "primary"
    })
  } : {}, {
    s: $data.storeState == "2"
  }, $data.storeState == "2" ? {
    t: common_vendor.o($options.conReceAddress),
    v: common_vendor.p({
      type: "primary"
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e171403a"], ["__file", "F:/daima/dm/ylqc_mobile/pages/storemanage/addstore/addstore.vue"]]);
wx.createPage(MiniProgramPage);
