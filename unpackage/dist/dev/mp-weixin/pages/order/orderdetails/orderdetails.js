"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_qqmapWxJssdk = require("../../../utils/qqmap-wx-jssdk.js");
var qqmapsdk = new utils_qqmapWxJssdk.QQMapWX({
  key: "3LYBZ-HJBC3-KG73O-R4M44-CXWWH-3ZF46"
});
const _sfc_main = {
  data() {
    return {
      number: "",
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
      orderList: [{
        number: "",
        //订单编号
        state: "",
        //订单状态
        deliveryTime: "",
        //订单时间
        sendAddress: "",
        //发件地名称
        sendFullAddress: "",
        //发件地址
        receAddress: "",
        //收件地址
        receFullAddress: "",
        //收件地址
        amount: "",
        //订单总价
        sender: "",
        //发件人
        sendPhone: "",
        //发件人联系电话
        recipient: "",
        //收件人
        recePhone: "",
        //收件人联系电话
        itemNum: "",
        //货物数量
        remark: "",
        //订单备注
        sendLat: "",
        //发件纬度
        sendLng: "",
        //发件经度
        receLat: "",
        //收件纬度
        receLng: ""
        //收件经度
      }],
      // roadList: [{
      // 	state:'',//订单状态
      // 	deliveryTime:'',//订单时间
      // 	roadName:'',//发件地址
      // 	roadAddress:'',//收件地址
      // 	recipient:'',//联系人
      // 	recePhone:'',//联系电话
      // }],
      roadList: [],
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
      destLng: "",
      driverList: {}
    };
  },
  // components: {
  // 	orderMap
  // },
  onLoad(option) {
    this.number = option.number;
    console.log(option.number);
  },
  onShow() {
    this.getDetail();
  },
  methods: {
    //获取订单详情
    getDetail() {
      this.$api.reqPost(
        "api/yl_orders/QueryForDetail",
        {
          params: { number: this.number }
        }
      ).then((res) => {
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
          this.driverList = res.data[1];
          console.log("输出司机信息成功！", this.driverList);
          console.log("获取订单详细信息成功！", res);
          this.initMap();
        } else {
          console.log("获取订单详细信息失败！", res);
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
  const _easycom_u_avatar2 = common_vendor.resolveComponent("u-avatar");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_grid_item2 = common_vendor.resolveComponent("u-grid-item");
  const _easycom_u_grid2 = common_vendor.resolveComponent("u-grid");
  const _easycom_u_gap2 = common_vendor.resolveComponent("u-gap");
  (_easycom_u_avatar2 + _easycom_u_icon2 + _easycom_u_grid_item2 + _easycom_u_grid2 + _easycom_u_gap2)();
}
const _easycom_u_avatar = () => "../../../uni_modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_u_icon = () => "../../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_grid_item = () => "../../../uni_modules/uview-plus/components/u-grid-item/u-grid-item.js";
const _easycom_u_grid = () => "../../../uni_modules/uview-plus/components/u-grid/u-grid.js";
const _easycom_u_gap = () => "../../../uni_modules/uview-plus/components/u-gap/u-gap.js";
if (!Math) {
  (_easycom_u_avatar + _easycom_u_icon + _easycom_u_grid_item + _easycom_u_grid + _easycom_u_gap)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => _ctx.getMapLocation && _ctx.getMapLocation(...args)),
    b: $data.reportInfo.lttd,
    c: $data.reportInfo.lgtd,
    d: $data.scale,
    e: $data.polyline,
    f: $data.covers,
    g: common_vendor.f($data.orderList, (item, index, i0) => {
      return common_vendor.e({
        a: item.state == 2 || item.state == 3 || item.state == 4
      }, item.state == 2 || item.state == 3 || item.state == 4 ? {
        b: "bde4f0ef-0-" + i0,
        c: common_vendor.p({
          size: "45",
          src: _ctx.avatarSrc
        }),
        d: common_vendor.t($data.driverList.licensePlate),
        e: common_vendor.t($data.driverList.realName),
        f: "bde4f0ef-1-" + i0,
        g: common_vendor.p({
          name: "star-fill",
          color: "orange",
          size: "18"
        }),
        h: common_vendor.t($data.score),
        i: common_vendor.f($data.list, (listItem, listIndex, i1) => {
          return {
            a: "bde4f0ef-4-" + i0 + "-" + i1 + "," + ("bde4f0ef-3-" + i0 + "-" + i1),
            b: common_vendor.p({
              customStyle: {
                paddingTop: "15rpx"
              },
              name: listItem.name,
              size: 26
            }),
            c: common_vendor.t(listItem.title),
            d: listIndex,
            e: "bde4f0ef-3-" + i0 + "-" + i1 + "," + ("bde4f0ef-2-" + i0)
          };
        }),
        j: "bde4f0ef-2-" + i0,
        k: common_vendor.p({
          border: false,
          col: "4"
        })
      } : {}, {
        l: "bde4f0ef-5-" + i0,
        m: common_vendor.t(item.amount),
        n: "bde4f0ef-6-" + i0,
        o: common_vendor.t(item.sendAddress),
        p: common_vendor.t(item.sendFullAddress),
        q: common_vendor.t(item.sender),
        r: common_vendor.t(item.sendPhone),
        s: common_vendor.f($data.roadList, (oradItem, oradIndex, i1) => {
          return common_vendor.e({
            a: "bde4f0ef-7-" + i0 + "-" + i1,
            b: common_vendor.t(oradItem.roadName),
            c: "bde4f0ef-8-" + i0 + "-" + i1,
            d: common_vendor.t(oradItem.roadAddress),
            e: oradItem.state == "4"
          }, oradItem.state == "4" ? {
            f: common_vendor.t(oradItem.state)
          } : {}, {
            g: oradItem.state == "3"
          }, oradItem.state == "3" ? {
            h: common_vendor.t(oradItem.state)
          } : {}, {
            i: common_vendor.t(oradItem.recipient),
            j: common_vendor.t(oradItem.recePhone),
            k: oradIndex
          });
        }),
        t: "bde4f0ef-9-" + i0,
        v: common_vendor.t(item.receAddress),
        w: "bde4f0ef-10-" + i0,
        x: common_vendor.t(item.receFullAddress),
        y: item.state == 0
      }, item.state == 0 ? {} : {}, {
        z: item.state == 1
      }, item.state == 1 ? {} : {}, {
        A: item.state == 2
      }, item.state == 2 ? {} : {}, {
        B: item.state == 4
      }, item.state == 4 ? {} : {}, {
        C: item.state == 3
      }, item.state == 3 ? {} : {}, {
        D: item.state == -1
      }, item.state == -1 ? {} : {}, {
        E: common_vendor.t(item.recipient),
        F: common_vendor.t(item.recePhone),
        G: common_vendor.t(item.number),
        H: common_vendor.t(item.deliveryTime),
        I: common_vendor.t(item.recePhone),
        J: common_vendor.t(item.itemNum),
        K: common_vendor.t(item.remark),
        L: index
      });
    }),
    h: common_vendor.p({
      height: "15",
      bgColor: "#efefef"
    }),
    i: common_vendor.p({
      name: "car-fill",
      color: "#00cc33",
      size: "16"
    }),
    j: common_vendor.p({
      name: "car-fill",
      color: "#666666",
      size: "16"
    }),
    k: common_vendor.p({
      name: "arrow-right",
      size: "14"
    }),
    l: common_vendor.p({
      name: "car-fill",
      color: "red",
      size: "16"
    }),
    m: common_vendor.p({
      name: "arrow-right",
      size: "14"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bde4f0ef"], ["__file", "F:/daima/dm/ylqc_mobile/pages/order/orderdetails/orderdetails.vue"]]);
wx.createPage(MiniProgramPage);
