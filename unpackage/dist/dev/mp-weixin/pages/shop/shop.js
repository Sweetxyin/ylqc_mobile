"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      list: [
        {
          name: "photo",
          title: "图片"
        },
        {
          name: "lock",
          title: "锁头"
        },
        {
          name: "star",
          title: "星星"
        },
        {
          name: "hourglass",
          title: "沙漏"
        },
        {
          name: "home",
          title: "首页"
        },
        {
          name: "star",
          title: "音量"
        }
      ],
      info: [
        {
          name: "photo",
          title: ""
        },
        {
          name: "photo",
          title: ""
        },
        {
          name: "photo",
          title: ""
        },
        {
          name: "photo",
          title: ""
        },
        {
          name: "photo",
          title: ""
        },
        {
          name: "photo",
          title: ""
        }
      ]
    };
  },
  methods: {}
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_grid_item2 = common_vendor.resolveComponent("u-grid-item");
  const _easycom_u_grid2 = common_vendor.resolveComponent("u-grid");
  const _easycom_u_toast2 = common_vendor.resolveComponent("u-toast");
  (_easycom_u_icon2 + _easycom_u_grid_item2 + _easycom_u_grid2 + _easycom_u_toast2)();
}
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_grid_item = () => "../../uni_modules/uview-plus/components/u-grid-item/u-grid-item.js";
const _easycom_u_grid = () => "../../uni_modules/uview-plus/components/u-grid/u-grid.js";
const _easycom_u_toast = () => "../../uni_modules/uview-plus/components/u-toast/u-toast.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_grid_item + _easycom_u_grid + _easycom_u_toast)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.list, (listItem, listIndex, i0) => {
      return {
        a: "2a6aaf81-2-" + i0 + "," + ("2a6aaf81-1-" + i0),
        b: common_vendor.p({
          customStyle: {
            paddingTop: "20rpx"
          },
          name: listItem.name,
          size: 22
        }),
        c: common_vendor.t(listItem.title),
        d: listIndex,
        e: "2a6aaf81-1-" + i0 + ",2a6aaf81-0"
      };
    }),
    b: common_vendor.p({
      border: false,
      col: "5"
    }),
    c: common_vendor.sr("uToast", "2a6aaf81-3"),
    d: common_vendor.f($data.info, (infoItem, infoIndex, i0) => {
      return {
        a: "2a6aaf81-6-" + i0 + "," + ("2a6aaf81-5-" + i0),
        b: common_vendor.p({
          customStyle: {
            paddingTop: "20rpx"
          },
          name: infoItem.name,
          size: 99
        }),
        c: common_vendor.t(infoItem.title),
        d: infoIndex,
        e: "2a6aaf81-5-" + i0 + ",2a6aaf81-4"
      };
    }),
    e: common_vendor.p({
      border: false,
      col: "2"
    }),
    f: common_vendor.sr("uToast", "2a6aaf81-7")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2a6aaf81"], ["__file", "F:/daima/dm/ylqc_mobile/pages/shop/shop.vue"]]);
wx.createPage(MiniProgramPage);
