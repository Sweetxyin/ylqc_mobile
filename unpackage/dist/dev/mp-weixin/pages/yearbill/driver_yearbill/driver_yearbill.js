"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    const d = /* @__PURE__ */ new Date();
    const year = d.getFullYear();
    let month = common_vendor.index.$u.padZero(d.getMonth() + 1);
    d.getDate();
    return {
      hasLogin: this.$store.state.hasLogin,
      //登录状态
      userid: this.$store.state.userid,
      monthzc_sum: "0",
      //月账单支出总数
      moothzc_money: "0",
      //月账单支出金额
      monthsr_sum: "0",
      //月账单收入总数
      monthsr_money: "0",
      //月账单收入金额
      yearzc_sum: 0,
      //年账单支出总数
      yearsr_sum: 0,
      //年账单收入总数
      yearzc_money: 0,
      //年账单支出金额
      yearsr_money: 0,
      //年账单收入金额
      month_current: 0,
      //月账单选择器索引值
      year_current: 0,
      //年账单选择器索引值
      list: ["支出", "收入"],
      //账单状态
      show: false,
      //月账单选择状态
      year_show: false,
      //年账单日期选择状态
      timeValue: year + "-" + month,
      //月账单日期显示
      yearValue: year,
      //年账单日期显示
      value1: Number(/* @__PURE__ */ new Date())
      //获取当前时间
    };
  },
  mounted() {
    var arr = this.timeValue.split("-");
    this.queryForMonth(arr[0], arr[1]);
    this.queryForYears(this.yearValue);
  },
  methods: {
    month_change(index) {
      this.month_current = index;
    },
    year_change(index) {
      this.year_current = index;
    },
    // 月账单日期选择
    async confirm(e) {
      this.show = false;
      const timeFormat = common_vendor.index.$u.timeFormat;
      let timeValue = await timeFormat(e.value, "yyyy-mm");
      this.timeValue = timeValue;
      var datetime = timeValue.split("-");
      this.queryForMonth(datetime[0], datetime[1]);
      console.log(timeValue);
    },
    // 年账单日期
    async confirm1(e) {
      this.year_show = false;
      const timeFormat = common_vendor.index.$u.timeFormat;
      let yearValue = await timeFormat(e.value, "yyyy");
      this.yearValue = yearValue;
      this.queryForYears(this.yearValue);
      console.log(yearValue);
    },
    //关闭时间选择器
    close() {
      this.show = false;
      this.year_show = false;
    },
    queryForMonth(years, month) {
      var _this = this;
      _this.$api.reqPost("api/yl_orders/QueryForMonth_Driver", {
        params: {
          id: _this.userid,
          year: years,
          month
        }
      }).then((res) => {
        _this.monthsr_sum = res.data.count;
        _this.monthsr_money = res.data.sum;
        if (res.status) {
          console.log("查询成功", res);
        } else {
          console.log("查询失败", res);
        }
      });
    },
    queryForYears(years) {
      var _this = this;
      _this.$api.reqPost("api/yl_orders/QueryForYear_Driver", {
        params: {
          id: _this.userid,
          year: years
        }
      }).then((res) => {
        _this.yearsr_sum = res.data.count;
        _this.yearsr_money = res.data.sum;
        if (res.status) {
          console.log("查询成功", res);
        } else {
          console.log("查询失败", res);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_u_datetime_picker2 = common_vendor.resolveComponent("u-datetime-picker");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_subsection2 = common_vendor.resolveComponent("u-subsection");
  (_easycom_u_datetime_picker2 + _easycom_u_icon2 + _easycom_u_subsection2)();
}
const _easycom_u_datetime_picker = () => "../../../uni_modules/uview-plus/components/u-datetime-picker/u-datetime-picker.js";
const _easycom_u_icon = () => "../../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_subsection = () => "../../../uni_modules/uview-plus/components/u-subsection/u-subsection.js";
if (!Math) {
  (_easycom_u_datetime_picker + _easycom_u_icon + _easycom_u_subsection)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.confirm),
    b: common_vendor.o($options.close),
    c: common_vendor.o(($event) => $data.value1 = $event),
    d: common_vendor.p({
      show: $data.show,
      mode: "year-month",
      modelValue: $data.value1
    }),
    e: common_vendor.t($data.timeValue),
    f: common_vendor.p({
      name: "arrow-down",
      size: "18"
    }),
    g: common_vendor.o(($event) => $data.show = true),
    h: common_vendor.o($options.month_change),
    i: common_vendor.p({
      list: $data.list,
      mode: "subsection",
      current: $data.month_current
    }),
    j: common_vendor.t($data.monthzc_sum),
    k: $data.month_current === 0,
    l: common_vendor.t($data.moothzc_money),
    m: $data.month_current === 0,
    n: common_vendor.t($data.monthsr_sum),
    o: $data.month_current === 1,
    p: common_vendor.t($data.monthsr_money),
    q: $data.month_current === 1,
    r: common_vendor.o($options.confirm1),
    s: common_vendor.o($options.close),
    t: common_vendor.o(($event) => $data.yearValue = $event),
    v: common_vendor.p({
      show: $data.year_show,
      mode: "year-month",
      modelValue: $data.yearValue
    }),
    w: common_vendor.t($data.yearValue),
    x: common_vendor.p({
      name: "arrow-down",
      size: "18"
    }),
    y: common_vendor.o(($event) => $data.year_show = true),
    z: common_vendor.o($options.year_change),
    A: common_vendor.p({
      list: $data.list,
      mode: "subsection",
      current: $data.year_current
    }),
    B: common_vendor.t($data.yearzc_sum),
    C: $data.year_current === 0,
    D: common_vendor.t($data.yearzc_money),
    E: $data.year_current === 0,
    F: common_vendor.t($data.yearsr_sum),
    G: $data.year_current === 1,
    H: common_vendor.t($data.yearsr_money),
    I: $data.year_current === 1
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3886d8f4"], ["__file", "F:/daima/dm/ylqc_mobile/pages/yearbill/driver_yearbill/driver_yearbill.vue"]]);
wx.createPage(MiniProgramPage);
