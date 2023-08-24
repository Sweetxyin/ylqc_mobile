"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_qqmapWxJssdk_min = require("../../utils/qqmap-wx-jssdk.min.js");
const _sfc_main = {
  name: "custom-xd",
  data() {
    return {
      userid: this.$store.state.userid,
      //用户ID
      sendLocation: [{
        sendAddress: "",
        //发件地址
        sendFullAddress: "",
        //发件详细地址
        sender: "",
        //发件人
        sendPhone: "",
        //发件电话号码
        latitude: "",
        //纬度
        longitude: "",
        //经度
        address: ""
      }],
      receLocation: [{
        recipient: "",
        //收件人
        recePhone: "",
        //收件电话号码
        receAddress: "",
        //收件地址
        receFullAddress: "",
        //收件详细地址
        latitude: "",
        //纬度
        longitude: ""
        //经度
      }],
      receAddress: "",
      //收件地址
      remark: "",
      //备注
      radiolist1: [{
        name: "是",
        disabled: false
      }, {
        name: "否",
        disabled: false
      }],
      show: false,
      //时间选择状态
      timeValue: "请选择",
      //时间
      value1: Number(/* @__PURE__ */ new Date()),
      //获取当前时间
      inputStatus: false,
      price: "35",
      //价格
      itemName: "",
      //物品名称
      itemWeight: "",
      //物品重量
      itemVolume: "",
      //物品体积
      itemNum: "",
      //数量
      isShow: false,
      sendState: 1,
      receState: 2
    };
  },
  mounted() {
    this.getLocationInfo();
    let that = this;
    common_vendor.index.$on("upSendData", function(data) {
      that.sendLocation.sendAddress = data.address;
      that.sendLocation.sendFullAddress = data.fullAddress;
      that.sendLocation.sender = data.name;
      that.sendLocation.sendPhone = data.phone;
      that.sendLocation.latitude = data.lat;
      that.sendLocation.longitude = data.lng;
      console.log("监听到事件来自 upSendData ，携带参数为：" + that.sendLocation.sendAddress);
    });
    common_vendor.index.$on("upReceData", function(data) {
      that.receAddress = data.address;
      that.receLocation.receFullAddress = data.fullAddress;
      that.receLocation.recipient = data.name;
      that.receLocation.recePhone = data.phone;
      that.receLocation.latitude = data.lat;
      that.receLocation.longitude = data.lng;
      console.log("监听到事件来自 upReceData ，携带参数为：" + that.receLocation);
    });
  },
  methods: {
    // 时间选择
    async confirm(e) {
      this.show = false;
      const timeFormat = common_vendor.index.$u.timeFormat;
      let timeValue = await timeFormat(e.value, "yyyy-mm-dd hh:MM");
      this.timeValue = timeValue;
    },
    //关闭时间选择器
    close() {
      this.show = false;
    },
    groupChange(n) {
    },
    radioChange(n) {
      if (n == "是") {
        this.inputStatus = true;
        this.wpname = "";
      } else {
        this.inputStatus = false;
      }
    },
    //跳转至发货地址选择
    toSendAddress() {
      common_vendor.index.navigateTo({
        url: "/pages/storemanage/addstore/addstore?sendState=" + this.sendState
      });
    },
    //跳转至收货地址选择
    toAddress() {
      common_vendor.index.navigateTo({
        url: "/pages/storemanage/addstore/addstore?receState=" + this.receState
      });
    },
    //跳转到门店管理页携带参数发件标识参数
    toSelectStore() {
      common_vendor.index.navigateTo({
        url: "/pages/storemanage/storemanage?sendState=" + this.sendState
      });
    },
    //跳转到门店管理页携带参数收件标识参数
    toReceStore() {
      common_vendor.index.navigateTo({
        url: "/pages/storemanage/storemanage?receState=" + this.receState
      });
    },
    //下单
    addOrder() {
      this.$api.reqPost("api/yl_orders/CreateOrder", {
        params: {
          userid: this.userid,
          sender: this.sendLocation.sender,
          sendAddress: this.sendLocation.sendAddress,
          sendFullAddress: this.sendLocation.sendFullAddress,
          sendPhone: this.sendLocation.sendPhone,
          sendLat: this.sendLocation.latitude,
          sendLng: this.sendLocation.longitude,
          recipient: this.receLocation.recipient,
          receAddress: this.receAddress,
          receFullAddress: this.receLocation.receFullAddress,
          recePhone: this.receLocation.recePhone,
          receLat: this.receLocation.latitude,
          receLng: this.receLocation.longitude,
          amount: this.price,
          itemName: this.itemName,
          itemWeight: this.itemWeight,
          itemVolume: this.itemVolume,
          itemNum: this.itemNum,
          deliveryTime: this.timeValue
        }
      }).then((res) => {
        if (res.status) {
          common_vendor.index.showToast({
            title: "提交订单成功！",
            icon: "none"
          });
          console.log("提交成功", res);
        } else {
          common_vendor.index.showToast({
            title: "提交订单失败！",
            icon: "none"
          });
          console.log("提交失败", res);
        }
      });
    },
    // 检测是否授权
    checkAuthorization() {
      var that = this;
      common_vendor.index.authorize({
        scope: "scope.userLocation",
        success() {
          that.getLocationInfo().then(function(value) {
            that.sendLocation.sendAddress = value.addressName;
            that.location = value;
          });
          console.log("成功");
        },
        fail() {
          common_vendor.index.showModal({
            content: "检测到您没打开权限，是否去设置打开？",
            confirmText: "确认",
            cancelText: "取消",
            success: (res) => {
              if (res.confirm) {
                common_vendor.index.openSetting({
                  success: (res2) => {
                    console.log(res2);
                    that.getLocationInfo().then(function(value) {
                      that.location = value;
                      common_vendor.index.setStorage({
                        key: "local",
                        data: value,
                        success() {
                          console.log("用户地址信息已缓存");
                        }
                      });
                    });
                  }
                });
              } else {
                console.log("取消");
                return false;
              }
            }
          });
          return false;
        }
      });
    },
    //获取位置信息
    async getLocationInfo() {
      return new Promise((resolve) => {
        let location = {
          longitude: 0,
          latitude: 0,
          province: "",
          city: "",
          area: "",
          street: "",
          address: "",
          addressName: ""
        };
        var that = this;
        common_vendor.index.getLocation({
          type: "gcj02",
          altitude: false,
          isHighAccuracy: true,
          success(res) {
            location.longitude = res.longitude;
            location.latitude = res.latitude;
            const qqmapsdk = new utils_qqmapWxJssdk_min.QQMapWX({
              key: "3LYBZ-HJBC3-KG73O-R4M44-CXWWH-3ZF46"
              //这里填写自己申请的key，我就不展示了。
            });
            qqmapsdk.reverseGeocoder({
              location,
              success(response) {
                console.log("调用成功", res);
                let info = response.result;
                location.province = info.address_component.province;
                location.city = info.address_component.city;
                location.area = info.address_component.district;
                location.street = info.address_component.street;
                location.addressName = info.address_reference.landmark_l2.title;
                location.address = info.formatted_addresses.standard_address;
                that.sendLocation.sendAddress = info.address_reference.landmark_l2.title;
                that.sendLocation.latitude = info.location.lat;
                that.sendLocation.longitude = info.location.lng;
                resolve(location);
              }
            });
          },
          fail(err) {
            if (err.errMsg.indexOf("fail") !== -1) {
              common_vendor.index.showToast({
                icon: "none",
                title: "您拒绝了定位授权，将无法使用定位功能",
                duration: 1e3
              });
            }
            resolve(location);
          }
        });
      });
    }
  }
};
if (!Array) {
  const _easycom_u_radio2 = common_vendor.resolveComponent("u-radio");
  const _easycom_u_radio_group2 = common_vendor.resolveComponent("u-radio-group");
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  const _easycom_u_datetime_picker2 = common_vendor.resolveComponent("u-datetime-picker");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_radio2 + _easycom_u_radio_group2 + _easycom_u__input2 + _easycom_u_datetime_picker2 + _easycom_u_button2)();
}
const _easycom_u_radio = () => "../../uni_modules/uview-plus/components/u-radio/u-radio.js";
const _easycom_u_radio_group = () => "../../uni_modules/uview-plus/components/u-radio-group/u-radio-group.js";
const _easycom_u__input = () => "../../uni_modules/uview-plus/components/u--input/u--input.js";
const _easycom_u_datetime_picker = () => "../../uni_modules/uview-plus/components/u-datetime-picker/u-datetime-picker.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_radio + _easycom_u_radio_group + _easycom_u__input + _easycom_u_datetime_picker + _easycom_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.sendLocation.sendAddress),
    b: common_vendor.o(($event) => $options.toSelectStore()),
    c: common_vendor.o((...args) => $options.toSendAddress && $options.toSendAddress(...args)),
    d: $data.receAddress != ""
  }, $data.receAddress != "" ? {
    e: common_vendor.t($data.receAddress)
  } : {}, {
    f: common_vendor.o(($event) => $options.toReceStore()),
    g: common_vendor.o((...args) => $options.toAddress && $options.toAddress(...args)),
    h: common_vendor.f($data.radiolist1, (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.o($options.radioChange, index),
        c: "8a31d45c-1-" + i0 + ",8a31d45c-0",
        d: common_vendor.p({
          size: "16",
          labelSize: "13",
          customStyle: {
            marginLeft: "0rpx"
          },
          label: item.name,
          name: item.name
        })
      };
    }),
    i: common_vendor.o($options.groupChange),
    j: common_vendor.o(($event) => _ctx.radiovalue1 = $event),
    k: common_vendor.p({
      size: "16",
      placement: "row",
      modelValue: _ctx.radiovalue1
    }),
    l: common_vendor.o(($event) => $data.itemName = $event),
    m: common_vendor.p({
      placeholder: "请输入物品名称",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: $data.inputStatus,
      modelValue: $data.itemName
    }),
    n: common_vendor.o(($event) => $data.itemWeight = $event),
    o: common_vendor.p({
      placeholder: "请输入总重量",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: $data.inputStatus,
      modelValue: $data.itemWeight
    }),
    p: common_vendor.o(($event) => $data.itemVolume = $event),
    q: common_vendor.p({
      placeholder: "请输入总体积",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      modelValue: $data.itemVolume
    }),
    r: common_vendor.o(($event) => $data.itemNum = $event),
    s: common_vendor.p({
      placeholder: "请输入件数",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      modelValue: $data.itemNum
    }),
    t: common_vendor.o($options.confirm),
    v: common_vendor.o($options.close),
    w: common_vendor.o(($event) => $data.value1 = $event),
    x: common_vendor.p({
      show: $data.show,
      mode: "datetime",
      modelValue: $data.value1
    }),
    y: common_vendor.t($data.timeValue),
    z: common_vendor.o(($event) => $data.show = true),
    A: common_vendor.o((...args) => _ctx.formSubmit && _ctx.formSubmit(...args)),
    B: $data.sendLocation.sendAddress != "" && $data.receAddress != ""
  }, $data.sendLocation.sendAddress != "" && $data.receAddress != "" ? {
    C: common_vendor.t($data.price),
    D: common_vendor.o($options.addOrder),
    E: common_vendor.p({
      type: "primary",
      text: "支付并叫车"
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8a31d45c"], ["__file", "F:/daima/dm/ylqc_mobile/components/custom-xd/custom-xd.vue"]]);
wx.createComponent(Component);
