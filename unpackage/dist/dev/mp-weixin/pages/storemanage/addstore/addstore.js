"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_qqmapWxJssdk = require("../../../utils/qqmap-wx-jssdk.js");
const tMap = new utils_qqmapWxJssdk.QQMapWX({
  key: "3LYBZ-HJBC3-KG73O-R4M44-CXWWH-3ZF46"
  // 存入你的key
});
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
      currentLocation: {},
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
      storeState: "",
      reportInfo: {
        lgtd: 116.39742,
        lttd: 39.909
      },
      id: 0,
      // 使用 marker点击事件 需要填写id
      title: "map",
      latitude: 39.909,
      longitude: 116.39742,
      //第一组为匹配的垃圾桶
      covers: [],
      //存放标记点数组
      isLocated: false,
      // 是否被定位
      //小区
      plot: {},
      //详细地址
      address: "",
      //地址组成
      addressComponent: {
        city: "",
        district: "",
        nation: "",
        province: "",
        street: "",
        street_number: ""
      }
    };
  },
  components: {
    Map
  },
  onShow() {
    var self = this;
    common_vendor.index.getStorage({
      key: "currentLocation",
      success: (res) => {
        self.currentLocation = res.data;
        self.storeList.address = res.data.name;
        self.storeList.fullAddress = res.data.address;
        self.storeList.lat = res.data.latitude;
        self.storeList.lng = res.data.longitude;
        self.reportInfo.lttd = res.data.latitude;
        self.reportInfo.lgtd = res.data.longitude;
        var obj = {
          width: 30,
          height: 30,
          latitude: res.data.latitude,
          longitude: res.data.longitude,
          iconPath: "../../../static/images/index_icon/dw.png"
        };
        var arr = [];
        arr.push(obj);
        self.covers = arr;
      }
    });
  },
  onLoad(option) {
    var self = this;
    console.log("in onload触发，执行getAuthorize");
    self.getAuthorize();
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
      common_vendor.index.getSetting({
        success: (res) => {
          if (res.authSetting["scope.userLocation"]) {
            this.handerChooseLocation();
          } else if (res.authSetting["scope.userLocation"] === void 0) {
            console.log("没有授权");
            this.handleOpenSetting();
          } else {
            console.log("拒绝了授权 false");
            this.handleOpenSetting();
          }
        }
      });
    },
    handerChooseLocation(latitude, longitude) {
      common_vendor.index.chooseLocation({
        latitude: latitude || "",
        longitude: longitude || "",
        success: (res) => {
          console.log("wx.chooseLocation res=", res);
          common_vendor.index.setStorageSync("currentLocation", res);
        },
        fail: function(err) {
          console.log("取消按钮", err);
        }
      });
    },
    handleOpenSetting() {
      common_vendor.wx$1.openSetting({
        success: (res) => {
          console.log("定位 openSetting", res);
          if (res.authSetting["scope.userLocation"]) {
            this.handerChooseLocation();
          }
        }
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
    },
    /**
     * 获取经纬度并触发回调函数 ========== 调用这个方法 203行
     * @param {Function} successCb 获取成功回调
     * @param {Function} authDenyCb 获取失败回调
     */
    getLocationA(successCb, authDenyCb) {
      const self = this;
      common_vendor.index.getLocation({
        // 这个方法就可以获取定位
        type: "gcj02",
        // 'wgs84'默认gps 坐标 'gcj02'国测
        altitude: false,
        // 是否返回高度
        accuracy: "best",
        // 精度值为20m
        geocode: false,
        // 默认false，是否解析地址信息 === 文档内提示仅app平台支持，这里改为false
        // 接口调用成功的方法 === 正常触发，问题已解决，可以获取用户所在的地址信息
        success(res) {
          console.log("成功获取用户所在地址", res);
          successCb && successCb(res);
          self.isLocated = true;
          self.reportInfo.lttd = res.latitude;
          self.reportInfo.lgtd = res.longitude;
          self.storeList.lat = res.latitude;
          self.storeList.lng = res.longitude;
          var obj = {
            width: 30,
            height: 30,
            latitude: Number(self.reportInfo.lttd),
            longitude: Number(self.reportInfo.lgtd),
            iconPath: "../../../static/images/index_icon/dw.png"
            // 成功绘制
          };
          var arr = [];
          arr.push(obj);
          self.covers = arr;
        },
        fail(err) {
          console.log("获取定位出错", err);
          if (err.errMsg === "getLocation:fail 频繁调用会增加电量损耗，可考虑使用 wx.onLocationChange 监听地理位置变化") {
            common_vendor.index.showToast({
              title: "请勿频繁定位",
              icon: "none"
            });
          }
          if (err.errMsg === "getLocation:fail auth deny") {
            common_vendor.index.showToast({
              title: "无法定位，请重新获取位置信息",
              icon: "none"
            });
            authDenyCb && authDenyCb();
            self.isLocated = false;
          }
          if (err.errMsg === "getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF") {
            common_vendor.index.showModal({
              content: "请开启手机定位服务",
              showCancel: false
            });
          }
        },
        complete() {
          console.log("进入了complete方法，用户的定位信息：", self.reportInfo);
          tMap.reverseGeocoder({
            // 这个方法的作用 ：提供由坐标到坐标所在位置的文字描述的转换。输入坐标返回地理位置信息和附近poi列表 
            location: {
              // 位置坐标 发送 获取属性的 
              latitude: self.reportInfo.lttd,
              longitude: self.reportInfo.lgtd
            },
            // 改用res,data的形式测试接收的结果
            success: function(res) {
              console.log("坐标所在位置的文字描述", res.result);
              self.plot = res.result.formatted_addresses;
              self.address = res.result.address;
              self.addressComponent = res.result.address_component;
              self.storeList.address = res.result.formatted_addresses.rough;
              self.storeList.fullAddress = res.result.formatted_addresses.standard_address;
            },
            fail: function(res) {
              console.log("定位获取错误", res);
            }
            // complete: function(res) { //无论成功失败都会执行  测试后也是获取一样的内容，表示可以注释掉
            // 	console.log('无论成功失败都会执行',res);
            // }
          });
        }
      });
    },
    /**
     * 重新授权并调用定位方法  == 这个方法在电脑调试可以正常运行  在页面onload加载时调用，一解读完毕，
     * @param {Function} successCb 授权成功回调
     * @param {Function} authDenyCb 授权失败回调
     */
    getAuthorize(successCb, authDenyCb) {
      common_vendor.index.authorize({
        scope: "scope.userLocation",
        // 需要获取权限的 scope，其中scope.userLocation 指地理位置 需要配置小程序弹出时的提示信息
        success: () => {
          this.getLocationA(successCb, authDenyCb);
        },
        fail: (err) => {
          err = err["errMsg"];
          common_vendor.index.showModal({
            content: "需要授权位置信息",
            confirmText: "确认授权"
          }).then((res) => {
            if (res[1]["confirm"]) {
              common_vendor.index.openSetting({
                // 调起客户端小程序设置界面，返回用户设置的操作结果。 https://uniapp.dcloud.net.cn/api/other/setting.html#opensetting
                success: (res2) => {
                  if (res2.authSetting["scope.userLocation"]) {
                    common_vendor.index.showToast({
                      title: "授权成功",
                      icon: "none"
                    });
                  } else {
                    common_vendor.index.showToast({
                      title: "授权失败",
                      icon: "none"
                    });
                  }
                  this.getLocationA(successCb, authDenyCb);
                }
              });
            }
            if (res[1]["cancel"]) {
              console.log("取消");
              this.getLocationA(successCb, authDenyCb);
            }
          });
        }
      });
    },
    //手动动获取定位  这个方法挂在<map>组件的tap事件上  ,可以目标就是通过点击地图更换用户所在的当期那位置
    getMapLocation(target) {
      var that = this;
      that.reportInfo.lttd = target.detail.latitude;
      that.reportInfo.lgtd = target.detail.longitude;
      that.storeList.lat = target.detail.latitude;
      that.storeList.lng = target.detail.longitude;
      var obj = {
        width: 30,
        height: 30,
        latitude: that.reportInfo.lttd,
        longitude: that.reportInfo.lgtd,
        iconPath: "../../../static/images/index_icon/dw.png"
      };
      var arr = [];
      arr.push(obj);
      that.covers = arr;
      console.log("要调用txmap的参数是", that.reportInfo);
      tMap.reverseGeocoder({
        location: {
          latitude: that.reportInfo.lttd,
          longitude: that.reportInfo.lgtd
        },
        success: function(res) {
          console.log("将坐标转换为文字描述===解析地址成功", res.result.location);
          that.plot = res.result.formatted_addresses;
          that.address = res.result.address;
          that.addressComponent = res.result.address_component;
          res.result.ad_info.city;
          that.storeList.address = res.result.formatted_addresses.rough;
          that.storeList.fullAddress = res.result.formatted_addresses.standard_address;
        },
        fail: function(res) {
          console.log("调用接口失败了", res);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_gap2 = common_vendor.resolveComponent("u-gap");
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  (_easycom_u_button2 + _easycom_u_gap2 + _easycom_u__input2)();
}
const _easycom_u_button = () => "../../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_gap = () => "../../../uni_modules/uview-plus/components/u-gap/u-gap.js";
const _easycom_u__input = () => "../../../uni_modules/uview-plus/components/u--input/u--input.js";
if (!Math) {
  (_easycom_u_button + _easycom_u_gap + _easycom_u__input)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.getMapLocation && $options.getMapLocation(...args)),
    b: $data.reportInfo.lttd,
    c: $data.reportInfo.lgtd,
    d: $data.covers,
    e: common_vendor.t($data.storeList.address),
    f: common_vendor.o($options.toSelectAddress),
    g: common_vendor.p({
      size: "mini",
      type: "info"
    }),
    h: common_vendor.t($data.storeList.fullAddress),
    i: common_vendor.p({
      height: "15",
      bgColor: "f0ffff"
    }),
    j: common_vendor.o(($event) => $data.storeList.remark = $event),
    k: common_vendor.p({
      placeholder: "楼层及门牌号码",
      border: "none",
      inputAlign: "right",
      fontSize: "28rpx",
      modelValue: $data.storeList.remark
    }),
    l: common_vendor.o(($event) => $data.storeList.name = $event),
    m: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "28rpx",
      modelValue: $data.storeList.name
    }),
    n: common_vendor.o(($event) => $data.storeList.phone = $event),
    o: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "28rpx",
      modelValue: $data.storeList.phone
    }),
    p: common_vendor.p({
      height: "15",
      bgColor: "f0ffff"
    }),
    q: $data.storeState == ""
  }, $data.storeState == "" ? {
    r: common_vendor.o($options.addStore),
    s: common_vendor.p({
      type: "primary"
    })
  } : {}, {
    t: $data.storeState == "1"
  }, $data.storeState == "1" ? {
    v: common_vendor.o($options.conSendAddress),
    w: common_vendor.p({
      type: "primary"
    })
  } : {}, {
    x: $data.storeState == "2"
  }, $data.storeState == "2" ? {
    y: common_vendor.o($options.conReceAddress),
    z: common_vendor.p({
      type: "primary"
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e171403a"], ["__file", "F:/daima/dm/ylqc_mobile/pages/storemanage/addstore/addstore.vue"]]);
wx.createPage(MiniProgramPage);
