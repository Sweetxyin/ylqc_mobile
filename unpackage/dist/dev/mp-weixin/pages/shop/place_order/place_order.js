"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      list: ["商家配送", "到店取货"],
      subIndex: 0,
      //导航条索引值
      shopList: {},
      //商品；列表
      totalPrice: "",
      //商品总价
      value: 1,
      //商品数量
      remark: "",
      //备注
      disabled: false,
      //提交按钮是否禁用
      userid: this.$store.state.userid,
      //用户ID
      recePhone: this.$store.state.phone,
      //收货电话
      id: "",
      //商品id
      sourceStr: "",
      //订单号
      sendAddress: "柳州延龙汽车有限公司"
    };
  },
  onLoad(option) {
    this.id = option.id;
    console.log(option.id);
  },
  onShow() {
    this.getDetail();
  },
  methods: {
    valChange(e) {
      var sum = e.value * this.shopList.advance;
      this.totalPrice = sum;
    },
    //获取当前的导航索引，并赋值给subIndex
    sectionChange(index) {
      this.subIndex = index;
      if (this.shopList.taketype == "1" && this.subIndex == 0) {
        this.disabled = true;
      } else if (this.shopList.taketype == "2" && this.subIndex == 1) {
        this.disabled = true;
      } else if (this.shopList.taketype == "1" && this.subIndex == 1) {
        this.disabled = false;
      } else if (this.shopList.taketype == "2" && this.subIndex == 0) {
        this.disabled = false;
      }
    },
    //获取商品详情
    getDetail() {
      this.$api.reqPost(
        "api/yl_goods/GetYLGoodInfo",
        {
          params: { id: this.id }
        }
      ).then((res) => {
        if (res.status) {
          this.shopList = res.data;
          this.totalPrice = this.value * this.shopList.advance;
          if (res.data.taketype == "1") {
            this.subIndex = 1;
          } else {
            this.subIndex = 0;
          }
          console.log("获取商品详情信息成功！", res);
        } else {
          console.log("获取商品详情信息失败！", res);
        }
      });
    },
    //下单
    addOrder() {
      this.$api.reqPost("api/yl_goods/CreateYLGoodsOrder", {
        data: {
          userid: this.userid,
          orderType: 1,
          selfid: 0,
          sendAddress: this.sendAddress,
          recePhone: this.recePhone,
          goodsid: this.id,
          price: this.shopList.advance,
          amount: this.totalPrice,
          remark: this.remark,
          itemName: this.shopList.goodname,
          itemNum: this.value,
          paytype: 1,
          state: 1
        }
      }).then((res) => {
        if (res.status) {
          common_vendor.index.showToast({
            title: "提交订单成功！",
            icon: "none"
          });
          console.log("提交成功", res);
          this.sourceStr = res.data.Ids;
          this.toPay();
        } else {
          common_vendor.index.showToast({
            title: "提交订单失败！",
            icon: "none"
          });
          console.log("提交失败", res);
        }
      });
    },
    //支付
    toPay() {
      var that = this;
      that.$api.reqPost("api/yl_goods/Pay", {
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
          console.log("支付失败", res);
        }
      });
    },
    //确认下单
    conOrder() {
      this.$api.reqPost("api/yl_goods/AddOrder", {
        params: {
          number: this.sourceStr
        }
      }).then((res) => {
        if (res.status) {
          console.log("确认下单成功", res);
        } else {
          console.log("确认下单失败", res);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_u_subsection2 = common_vendor.resolveComponent("u-subsection");
  const _easycom_u_gap2 = common_vendor.resolveComponent("u-gap");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_number_box2 = common_vendor.resolveComponent("u-number-box");
  const _easycom_u__textarea2 = common_vendor.resolveComponent("u--textarea");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_subsection2 + _easycom_u_gap2 + _easycom_u_icon2 + _easycom_u_number_box2 + _easycom_u__textarea2 + _easycom_u_button2)();
}
const _easycom_u_subsection = () => "../../../uni_modules/uview-plus/components/u-subsection/u-subsection.js";
const _easycom_u_gap = () => "../../../uni_modules/uview-plus/components/u-gap/u-gap.js";
const _easycom_u_icon = () => "../../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_number_box = () => "../../../uni_modules/uview-plus/components/u-number-box/u-number-box.js";
const _easycom_u__textarea = () => "../../../uni_modules/uview-plus/components/u--textarea/u--textarea.js";
const _easycom_u_button = () => "../../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_subsection + _easycom_u_gap + _easycom_u_icon + _easycom_u_number_box + _easycom_u__textarea + _easycom_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.sectionChange),
    b: common_vendor.p({
      list: $data.list,
      mode: "button",
      inactiveColor: "#000000",
      activeColor: "#00BAB2",
      fontSize: "16",
      current: $data.subIndex
    }),
    c: common_vendor.p({
      height: "7",
      bgColor: "#ffffff"
    }),
    d: $data.subIndex == 0,
    e: common_vendor.p({
      name: "map-fill",
      size: "26"
    }),
    f: common_vendor.t($data.sendAddress),
    g: common_vendor.p({
      height: "7",
      bgColor: "#ffffff"
    }),
    h: common_vendor.t($data.recePhone),
    i: $data.subIndex == 1,
    j: $data.shopList.goodimage_first,
    k: common_vendor.t($data.shopList.goodname),
    l: common_vendor.t($data.shopList.advance),
    m: common_vendor.t($data.value),
    n: common_vendor.o($options.valChange),
    o: common_vendor.o(($event) => $data.value = $event),
    p: common_vendor.p({
      buttonSize: "25",
      modelValue: $data.value
    }),
    q: common_vendor.o(($event) => $data.remark = $event),
    r: common_vendor.p({
      placeholder: "请输入备注",
      count: true,
      height: "80",
      maxlength: "300",
      modelValue: $data.remark
    }),
    s: common_vendor.t($data.value),
    t: common_vendor.t($data.totalPrice),
    v: common_vendor.o($options.addOrder),
    w: common_vendor.p({
      type: "primary",
      size: "small",
      disabled: $data.disabled,
      text: "提交订单"
    }),
    x: common_vendor.o((...args) => _ctx.placeOrder && _ctx.placeOrder(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bed3463d"], ["__file", "F:/daima/dm/ylqc_mobile/pages/shop/place_order/place_order.vue"]]);
wx.createPage(MiniProgramPage);
