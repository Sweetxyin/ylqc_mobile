"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userId: this.$store.state.userid,
      checkboxValue: [],
      radiovalue: [],
      indexList: [
        {
          number: "",
          createTime: "",
          sendAddress: "",
          receAddress: "",
          amount: 0,
          checked: false
          // numberBox: 1,
        }
      ],
      radiolist1: [
        // 	{
        //     name: '全页全选',
        //     disabled: false
        // }, 
        {
          name: "全部全选",
          disabled: false
        }
      ],
      checkList: [],
      //选中值
      allChecked: false
      //是否全选
      // totalNumber:0
    };
  },
  onLoad() {
    this.getOrderInvoice();
  },
  //计算
  computed: {
    //计算总价
    totalPrice() {
      let totalPrice = 0;
      this.indexList.map((item) => {
        item.checked ? totalPrice += 1 * item.amount : totalPrice += 0;
      });
      return totalPrice.toFixed(2);
    },
    //计算总算
    totalNumber() {
      let totalNumber = 0;
      this.indexList.map((item) => {
        item.checked ? totalNumber += 1 : totalNumber += 0;
      });
      return totalNumber;
    }
  },
  methods: {
    //获取开票订单
    getOrderInvoice() {
      var _this = this;
      _this.$api.reqPost("api/yl_orders/QueryInvoice", {
        params: {
          id: this.userId
        }
      }).then((res) => {
        if (res.status) {
          _this.indexList = res.data;
          console.log("获取订单开票信息成功！", res);
        } else {
          console.log("获取订单开票信息失败！", res);
        }
      });
    },
    //单选
    changeitem(item) {
      item.checked = !item.checked;
      if (!item.checked) {
        this.allChecked = false;
      } else {
        const cartList = this.indexList.every((item2) => {
          return item2.checked === true;
        });
        if (cartList) {
          this.allChecked = true;
        } else {
          this.allChecked = false;
        }
      }
    },
    //全选，全不选
    selectAll() {
      this.allChecked = !this.allChecked;
      if (this.allChecked) {
        this.indexList.map((item) => {
          item.checked = true;
        });
      } else {
        this.indexList.map((item) => {
          item.checked = false;
        });
      }
    },
    // groupChange(n) {
    //     console.log('groupChange', n);
    // },
    // radioChange(n) {
    // 	if(n=="全选"){
    // 	}
    // 	console.log('radioChange', n);
    // },
    //跳转到下一页
    nextInvoice() {
      common_vendor.index.navigateTo({
        url: "/pages/orderinvoice/invoicing"
      });
    }
  }
};
if (!Array) {
  const _easycom_u_checkbox2 = common_vendor.resolveComponent("u-checkbox");
  const _easycom_u_checkbox_group2 = common_vendor.resolveComponent("u-checkbox-group");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_checkbox2 + _easycom_u_checkbox_group2 + _easycom_u_icon2 + _easycom_u_button2)();
}
const _easycom_u_checkbox = () => "../../uni_modules/uview-plus/components/u-checkbox/u-checkbox.js";
const _easycom_u_checkbox_group = () => "../../uni_modules/uview-plus/components/u-checkbox-group/u-checkbox-group.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_checkbox + _easycom_u_checkbox_group + _easycom_u_icon + _easycom_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.indexList, (item, index, i0) => {
      return {
        a: "3b7f7ffb-1-" + i0 + "," + ("3b7f7ffb-0-" + i0),
        b: common_vendor.p({
          label: item.number,
          name: item.number,
          checked: item.checked,
          customStyle: {
            marginBottom: "5px",
            marginTop: "2px"
          }
        }),
        c: common_vendor.o(($event) => $options.changeitem(item), index),
        d: "3b7f7ffb-0-" + i0,
        e: common_vendor.o(($event) => $data.checkboxValue = $event, index),
        f: "3b7f7ffb-2-" + i0,
        g: common_vendor.t(item.createTime),
        h: common_vendor.t(item.sendAddress),
        i: common_vendor.t(item.receAddress),
        j: common_vendor.t(item.amount),
        k: index
      };
    }),
    b: common_vendor.p({
      placement: "column",
      shape: "circle",
      size: "18",
      modelValue: $data.checkboxValue
    }),
    c: common_vendor.p({
      name: "clock-fill",
      size: "16"
    }),
    d: common_vendor.t($options.totalNumber),
    e: common_vendor.t($options.totalPrice),
    f: common_vendor.p({
      label: "全选",
      checked: $data.allChecked,
      customStyle: {
        marginRight: "15px"
      }
    }),
    g: common_vendor.o($options.selectAll),
    h: common_vendor.o(($event) => $data.checkboxValue = $event),
    i: common_vendor.p({
      placement: "column",
      shape: "circle",
      size: "20",
      modelValue: $data.checkboxValue
    }),
    j: common_vendor.o($options.nextInvoice),
    k: common_vendor.p({
      type: "primary",
      size: "small",
      text: "下一步"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3b7f7ffb"], ["__file", "F:/daima/dm/ylqc_mobile/pages/orderinvoice/orderinvoice.vue"]]);
wx.createPage(MiniProgramPage);
