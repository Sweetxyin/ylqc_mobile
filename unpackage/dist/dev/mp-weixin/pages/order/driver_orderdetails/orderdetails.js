"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_qqmapWxJssdk = require("../../../utils/qqmap-wx-jssdk.js");
var qqmapsdk = new utils_qqmapWxJssdk.QQMapWX({
  key: "3LYBZ-HJBC3-KG73O-R4M44-CXWWH-3ZF46"
});
const _sfc_main = {
  data() {
    return {
      licensePlate: "桂B12343",
      //车牌
      driverName: "韦师傅",
      //司机姓名
      score: "4.9",
      //评分
      totalPrice: 49,
      //订单总价
      list: [
        {
          name: "chat-fill",
          title: "信息联系"
        },
        {
          name: "phone-fill",
          title: "电话联系"
        },
        {
          name: "server-fill",
          title: "联系客服"
        },
        {
          name: "edit-pen-fill",
          title: "评价司机"
        }
      ],
      orderList: [],
      roadList: [],
      number: "",
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
      scale: 12,
      //详细地址
      address: "",
      polyline: [],
      //地址组成
      addressComponent: {
        city: "",
        district: "",
        nation: "",
        province: "",
        street: "",
        street_number: ""
      },
      startLat: "",
      startLng: "",
      destLat: "",
      destLng: ""
    };
  },
  onLoad(option) {
    this.number = option.number;
    console.log(option.number);
  },
  mounted() {
    this.load();
  },
  methods: {
    toService(item) {
      common_vendor.index.navigateTo({
        url: "/pages/order/service/service?number=" + item.number
      });
    },
    load() {
      var _this = this;
      _this.$api.reqPost("api/yl_orders/QueryForDetail", {
        params: {
          number: _this.number
        }
      }).then((res) => {
        if (res.status) {
          for (var i = 0; i < 1; i++) {
            this.orderList[i] = res.data[i];
            this.reportInfo.lttd = res.data[i].receLat;
            this.reportInfo.lgtd = res.data[i].receLng;
            this.startLat = res.data[i].sendLat;
            this.startLng = res.data[i].sendLng;
            this.destLat = res.data[i].receLat;
            this.destLng = res.data[i].receLng;
            var obj = {
              width: 30,
              height: 30,
              latitude: Number(res.data[i].sendLat),
              longitude: Number(res.data[i].sendLng),
              iconPath: "https://www.baexnyqc.cn/images/other/send.png"
              // 成功绘制
            };
            var bin = {
              id: "0",
              latitude: Number(res.data[i].receLat),
              longitude: Number(res.data[i].receLng),
              width: 25,
              height: 35,
              iconPath: "https://www.baexnyqc.cn/images/other/end.png"
              // 成功绘制
            };
            var arr = [];
            arr.push(obj);
            arr.push(bin);
            this.covers = arr;
          }
          console.log("获取订单详细信息成功！", res);
          this.initMap();
        } else {
          console.log("查询失败", res);
        }
      });
    },
    //根据起点和终点绘制路线
    initMap() {
      const that = this;
      console.log("进入initmap");
      qqmapsdk.direction({
        mode: "driving",
        //可选值：'driving'（驾车）  trucking 货车
        //from参数不填默认当前地址
        // latitude纬度    longitude 经度
        from: {
          latitude: that.startLat,
          longitude: that.startLng
        },
        to: {
          latitude: that.destLat,
          longitude: that.destLng
        },
        size: 1,
        // 车型 1: 微型车  2: 轻型车 3: 中型车 4: 重型车
        policy: "LEAST_TIME",
        //'9',  //参考实时路况，高速优先，尽量躲避拥堵
        height: 4,
        width: 2.5,
        length: 13,
        weight: 6.8,
        axle_weight: 34,
        axle_count: 6,
        is_trailer: 1,
        success: function(res, data) {
          let distance = data[0].distance / 1e3;
          console.log(res);
          console.log(data);
          if (distance > 500) {
            var scale = 7;
          } else if (distance > 200) {
            var scale = 10;
          } else if (distance > 100) {
            var scale = 12;
          } else {
            var scale = 15;
          }
          var ret = res;
          var coors = ret.result.routes[0].polyline, pl = [];
          var kr = 1e6;
          for (var i = 2; i < coors.length; i++) {
            coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
          }
          for (var i = 0; i < coors.length; i += 2) {
            pl.push({
              latitude: coors[i],
              longitude: coors[i + 1]
            });
          }
          that.polyline = [{
            points: pl,
            color: "#4AC37A",
            width: 5
          }];
          that.scale = scale;
        },
        fail: function(error) {
          common_vendor.index.showToast({
            title: error.message,
            duration: 3e3,
            icon: "none"
          });
          console.log("调取失败");
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_u_gap2 = common_vendor.resolveComponent("u-gap");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_gap2 + _easycom_u_icon2 + _easycom_u_button2)();
}
const _easycom_u_gap = () => "../../../uni_modules/uview-plus/components/u-gap/u-gap.js";
const _easycom_u_icon = () => "../../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_button = () => "../../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_gap + _easycom_u_icon + _easycom_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => _ctx.getMapLocation && _ctx.getMapLocation(...args)),
    b: $data.reportInfo.lttd,
    c: $data.reportInfo.lgtd,
    d: $data.scale,
    e: $data.polyline,
    f: $data.covers,
    g: common_vendor.p({
      height: "15",
      bgColor: "#efefef"
    }),
    h: common_vendor.f($data.orderList, (item, index, i0) => {
      return common_vendor.e({
        a: "cc6159b0-1-" + i0,
        b: common_vendor.t(item.amount),
        c: "cc6159b0-2-" + i0,
        d: common_vendor.t(item.sendAddress),
        e: common_vendor.t(item.sendFullAddress),
        f: common_vendor.t(item.sender),
        g: common_vendor.t(item.sendPhone),
        h: "cc6159b0-3-" + i0,
        i: common_vendor.t(item.receAddress),
        j: "cc6159b0-4-" + i0,
        k: common_vendor.t(item.receFullAddress),
        l: item.state == 0
      }, item.state == 0 ? {} : {}, {
        m: item.state == 1
      }, item.state == 1 ? {} : {}, {
        n: item.state == 2
      }, item.state == 2 ? {} : {}, {
        o: item.state == 4
      }, item.state == 4 ? {} : {}, {
        p: item.state == 3
      }, item.state == 3 ? {} : {}, {
        q: item.state == -1
      }, item.state == -1 ? {} : {}, {
        r: common_vendor.t(item.recipient),
        s: common_vendor.t(item.recePhone),
        t: "cc6159b0-5-" + i0,
        v: common_vendor.o(($event) => $options.toService(item), index),
        w: common_vendor.t(item.number),
        x: common_vendor.t(item.createTime),
        y: common_vendor.t(item.recePhone),
        z: common_vendor.t(item.itemNum),
        A: common_vendor.t(item.remark),
        B: index
      });
    }),
    i: common_vendor.p({
      height: "15",
      bgColor: "#efefef"
    }),
    j: common_vendor.p({
      name: "car-fill",
      color: "#00cc33",
      size: "16"
    }),
    k: common_vendor.p({
      name: "car-fill",
      color: "red",
      size: "16"
    }),
    l: common_vendor.p({
      name: "arrow-right",
      size: "14"
    }),
    m: common_vendor.p({
      type: "info",
      shape: "circle",
      plain: true,
      text: "送达确认",
      size: "mini"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cc6159b0"], ["__file", "F:/daima/dm/ylqc_mobile/pages/order/driver_orderdetails/orderdetails.vue"]]);
wx.createPage(MiniProgramPage);
