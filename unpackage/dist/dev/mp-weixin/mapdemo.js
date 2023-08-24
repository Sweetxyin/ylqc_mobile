"use strict";
const common_vendor = require("./common/vendor.js");
const utils_qqmapWxJssdk = require("./utils/qqmap-wx-jssdk.js");
const tMap = new utils_qqmapWxJssdk.QQMapWX({
  key: "3LYBZ-HJBC3-KG73O-R4M44-CXWWH-3ZF46"
  // 存入你的key
});
const _sfc_main = {
  data() {
    return {
      content: "（一）将回收价值高的可回收物率先分类投放，如报纸杂志、纸板箱、包装盒、PET塑料瓶、易拉罐等，确保这一类可回收物不被混合垃圾污染。（二）不要将已被污染、潮湿、污渍无法清除的物品投入可回收物收集容器，如被油渍污染的餐盒、食品包装盒等。瓶罐投放前倒空瓶内液体并简单清洗，有瓶盖的不需将瓶盖与瓶体分开投放，确保可回收物收集容器中的其他废品不被污染，尊重和维护他人分类的成果。（三）不确定是否可以回收（或本指引中未明确说明）的废纸、废塑料，在未被污染的情况下，请先投放至可回收物收集容器",
      // 默认坐标北京
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
      },
      distance: 0.1
    };
  },
  methods: {
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
          var obj = {
            width: 30,
            height: 30,
            latitude: Number(self.reportInfo.lttd),
            longitude: Number(self.reportInfo.lgtd),
            iconPath: "../../static/images/index_icon/dw.png"
            // 成功绘制
          };
          var bin = {
            id: "0",
            latitude: Number(24.44379),
            longitude: Number(118.08243),
            width: 20,
            height: 20,
            iconPath: "../../static/images/index_icon/dw.png",
            // 成功绘制
            title: "垃圾桶"
          };
          var bin2 = {
            id: "1",
            latitude: Number(24.44879),
            longitude: Number(118.09243),
            width: 20,
            height: 20,
            iconPath: "../../static/images/index_icon/dw.png",
            // 成功绘制
            title: "垃圾桶"
          };
          self.distance = self.getMapDistance(
            self.reportInfo.lttd,
            self.reportInfo.lgtd,
            24.44879,
            118.09243
          );
          var arr = [];
          arr.push(obj);
          arr.push(bin);
          arr.push(bin2);
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
      var obj = {
        width: 30,
        height: 30,
        latitude: that.reportInfo.lttd,
        longitude: that.reportInfo.lgtd,
        iconPath: "../../static/images/index_icon/dw.png"
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
        },
        fail: function(res) {
          console.log("调用接口失败了", res);
        }
      });
    },
    //导航到指定位置 ltt lgt ====> 导航点击时触发的按钮
    markertap() {
      common_vendor.index.getLocation({
        // 1、点击导航要获取用户的位置
        success: (res) => {
          common_vendor.index.openLocation({
            // 3、 使用应用内置地图查看位置。  
            // 跳出去以后是可以调用系统自带的导航 并显示以下的位置信息
            latitude: Number(24.44579),
            // 纬度(必选)
            longitude: Number(118.08243),
            // 精度 （必选 ，感觉可以用作动态的地址 
            name: "康佰家厦门小药房",
            // 	位置名 可选
            address: "药店",
            success: (res2) => {
            },
            fail: function() {
              common_vendor.index.showModal({
                title: "错误",
                content: "请检查定位是否打开",
                showCancel: false,
                success: function(res2) {
                  if (res2.confirm) {
                    console.log("用户点击确定");
                  } else if (res2.cancel) {
                    console.log("用户点击取消");
                  }
                }
              });
            }
          });
        },
        fail: (res) => {
          console.log("方法调用失败", res);
        }
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
      return s;
    }
  },
  components: {},
  onLoad() {
    console.log("in onload触发，执行getAuthorize");
    this.getAuthorize();
  },
  onShow() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.getMapLocation && $options.getMapLocation(...args)),
    b: $data.reportInfo.lttd,
    c: $data.reportInfo.lgtd,
    d: $data.covers,
    e: common_vendor.t($data.plot.rough),
    f: common_vendor.t($data.distance),
    g: common_vendor.o((...args) => $options.markertap && $options.markertap(...args)),
    h: {
      "borderColor": "#678D5D"
    }
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9aa50452"], ["__file", "F:/daima/dm/ylqc_mobile/pages/mapdemo/mapdemo.vue"]]);
exports.MiniProgramPage = MiniProgramPage;
