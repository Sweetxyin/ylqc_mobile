"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_qqmapWxJssdk_min = require("../../utils/qqmap-wx-jssdk.min.js");
var qqmapsdk = new utils_qqmapWxJssdk_min.QQMapWX({
  key: "3LYBZ-HJBC3-KG73O-R4M44-CXWWH-3ZF46"
  //腾讯地图key值，
});
const _sfc_main = {
  name: "delivery",
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
      price: 0.01,
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
      receState: 2,
      sourceStr: "",
      //订单号 
      distance: 0.1
      //距离
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
      that.initMap();
    });
    common_vendor.index.$on("upReceData", function(data) {
      that.receAddress = data.address;
      that.receLocation.receFullAddress = data.fullAddress;
      that.receLocation.recipient = data.name;
      that.receLocation.recePhone = data.phone;
      that.receLocation.latitude = data.lat;
      that.receLocation.longitude = data.lng;
      console.log("监听到事件来自 upReceData ，携带参数为：" + that.receLocation);
      that.initMap();
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
    //根据起点和终点绘制路线,计算其路线公里数，再根据公里数计算订单价格
    initMap() {
      const that = this;
      qqmapsdk.direction({
        mode: "driving",
        //可选值：'driving'（驾车）  trucking 货车
        //from参数不填默认当前地址
        // latitude纬度    longitude 经度
        from: {
          latitude: that.sendLocation.latitude,
          longitude: that.sendLocation.longitude
        },
        to: {
          latitude: that.receLocation.latitude,
          longitude: that.receLocation.longitude
        },
        success: function(res, data) {
          that.distance = data[0].distance / 1e3;
          console.log(data[0].distance / 1e3);
          if (that.distance > 5) {
            var n = (that.distance - 5) * 3.5;
            that.price = Number(n + 40).toFixed(1);
          } else {
            that.price = 40;
          }
        },
        fail: function(error) {
          console.log("调取失败", error);
        }
      });
    },
    //下单
    addOrder() {
      if (this.itemWeight == "") {
        common_vendor.index.showToast({
          title: "请填写总重量！",
          icon: "none"
        });
      } else if (this.itemVolume == "") {
        common_vendor.index.showToast({
          title: "请填写总体积！",
          icon: "none"
        });
      } else if (this.itemNum == "") {
        common_vendor.index.showToast({
          title: "请填写数量！",
          icon: "none"
        });
      } else if (this.timeValue == "") {
        common_vendor.index.showToast({
          title: "请填写上门时间！",
          icon: "none"
        });
      } else {
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
            deliveryTime: this.timeValue,
            state: 0
          }
        }).then((res) => {
          if (res.status) {
            common_vendor.index.showToast({
              title: "提交订单成功！",
              icon: "none"
            });
            console.log("提交成功", res);
            this.sourceStr = res.data;
            this.toPay();
          } else {
            common_vendor.index.showToast({
              title: "提交订单失败！",
              icon: "none"
            });
            console.log("提交失败", res);
          }
        });
      }
    },
    //支付
    toPay() {
      var that = this;
      that.$api.reqPost("api/yl_user/Pay", {
        data: {
          ids: that.sourceStr,
          payment_code: "wechatpay",
          payment_type: 1,
          params: {
            trade_type: "JSAPI"
          }
        }
      }).then((res) => {
        if (res.status) {
          console.log("测试支付后端接口成功", res);
          common_vendor.index.requestPayment({
            provider: "wxpay",
            timeStamp: res.data.timeStamp,
            //后端返回的时间戳
            nonceStr: res.data.nonceStr,
            //后端返回的随机字符串
            package: res.data.package,
            //后端返回的prepay_id
            signType: "MD5",
            paySign: res.data.paySign,
            //后端返回的签名
            success: function(res2) {
              that.conOrder();
              console.log("success:" + JSON.stringify(res2));
            },
            fail: function(err) {
              common_vendor.index.showToast({
                title: "取消支付",
                icon: "none"
              });
              console.log("fail:" + JSON.stringify(err));
            }
          });
        } else {
          console.log("测试失败", res);
        }
      });
    },
    //确认下单
    conOrder() {
      this.$api.reqPost("api/yl_orders/AddOrder", {
        params: {
          number: this.sourceStr
        }
      }).then((res) => {
        if (res.status) {
          console.log("确认下单成功", res);
          var sta = 1;
          this.editOrderState(sta);
        } else {
          console.log("确认下单失败", res);
        }
      });
    },
    //修改订单状态
    editOrderState(sta) {
      this.$api.reqPost("api/yl_orders/EditOrder", {
        params: {
          number: this.sourceStr,
          state: sta
        }
      }).then((res) => {
        if (res.status) {
          console.log("修改订单状态成功", res);
        } else {
          console.log("修改订单状态失败", res);
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
    },
    //进行经纬度转换为距离的计算 ===  和下面的方法进行了绑定；也不管他
    Rad(d) {
      return d * Math.PI / 180;
    },
    /*
     计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
     默认单位km // 封装好的方法，也不管了
    */
    getMapDistance(lat1, lng1, lat2, lng2) {
      var radLat1 = this.Rad(lat1);
      var radLat2 = this.Rad(lat2);
      var a = radLat1 - radLat2;
      var b = this.Rad(lng1) - this.Rad(lng2);
      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
      s = s * 6378.137;
      s = Math.round(s * 1e4) / 1e4;
      console.log("输出公里数", s);
      return s;
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
    h: common_vendor.t($data.distance),
    i: common_vendor.f($data.radiolist1, (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.o($options.radioChange, index),
        c: "f0b2b093-1-" + i0 + ",f0b2b093-0",
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
    j: common_vendor.o($options.groupChange),
    k: common_vendor.o(($event) => _ctx.radiovalue1 = $event),
    l: common_vendor.p({
      size: "16",
      placement: "row",
      modelValue: _ctx.radiovalue1
    }),
    m: common_vendor.o(($event) => $data.itemName = $event),
    n: common_vendor.p({
      placeholder: "请输入物品名称",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: $data.inputStatus,
      modelValue: $data.itemName
    }),
    o: common_vendor.o(($event) => $data.itemWeight = $event),
    p: common_vendor.p({
      placeholder: "请输入总重量",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: $data.inputStatus,
      modelValue: $data.itemWeight
    }),
    q: common_vendor.o(($event) => $data.itemVolume = $event),
    r: common_vendor.p({
      placeholder: "请输入总体积",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      modelValue: $data.itemVolume
    }),
    s: common_vendor.o(($event) => $data.itemNum = $event),
    t: common_vendor.p({
      placeholder: "请输入数量",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      modelValue: $data.itemNum
    }),
    v: common_vendor.o($options.confirm),
    w: common_vendor.o($options.close),
    x: common_vendor.o(($event) => $data.value1 = $event),
    y: common_vendor.p({
      show: $data.show,
      mode: "datetime",
      modelValue: $data.value1
    }),
    z: common_vendor.t($data.timeValue),
    A: common_vendor.o(($event) => $data.show = true),
    B: common_vendor.o((...args) => _ctx.formSubmit && _ctx.formSubmit(...args)),
    C: $data.sendLocation.sendAddress != "" && $data.receAddress != ""
  }, $data.sendLocation.sendAddress != "" && $data.receAddress != "" ? {
    D: common_vendor.t($data.price),
    E: common_vendor.o($options.addOrder),
    F: common_vendor.p({
      type: "primary",
      text: "支付并叫车"
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f0b2b093"], ["__file", "F:/daima/dm/ylqc_mobile/components/delivery/delivery.vue"]]);
wx.createComponent(Component);
