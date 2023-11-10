"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_imageDeal = require("../../../api/image-deal.js");
const _sfc_main = {
  data() {
    return {
      fileList1: [],
      number: "",
      signdesc: "",
      //签收说明
      photoList: [],
      imageList: []
    };
  },
  onLoad(option) {
    this.number = option.number;
    console.log(option.number);
  },
  methods: {
    //确认送达
    conDelivery() {
      var _this = this;
      if (_this.photoList.length == 0) {
        common_vendor.index.showToast({
          title: "请拍摄照片！",
          icon: "none"
        });
      }
      if (_this.signdesc == "") {
        common_vendor.index.showToast({
          title: "请填写拍照说明！",
          icon: "none"
        });
      }
      _this.$api.reqPost("api/yl_orders/OrderConfirm", {
        params: {
          number: _this.number,
          urlsList: _this.imageList.join(),
          signdesc: _this.signdesc
        }
      }).then((res2) => {
        if (res2.status) {
          common_vendor.index.showToast({
            title: "提交送达成功！",
            icon: "none"
          });
          common_vendor.index.navigateBack({
            delta: 1
          });
          console.log("提交成功", res2);
        } else {
          common_vendor.index.showToast({
            title: "提交送达失败！",
            icon: "none"
          });
          console.log("提交失败", res2);
        }
      });
    },
    openCamera() {
      let that = this;
      common_vendor.index.chooseImage({
        count: 1,
        //默认9
        sizeType: ["original", "compressed"],
        //可以指定是原图还是压缩图，默认二者都有
        // sourceType: ['camera'], //album 从相册选图，camera 使用相机
        success: function(res2) {
          let paths = res2.tempFilePaths;
          that.pathToBase(paths);
        },
        fail: function(err) {
          console.log(err);
          common_vendor.index.showModal({
            title: err
          });
        }
      });
    },
    pathToBase(paths) {
      paths.forEach((item, index) => {
        api_imageDeal.pathToBase64.pathToBase64(item, 30).then((base64) => {
          this.photoList.push(base64);
        });
      });
    },
    deletePhoto(index) {
      this.photoList.splice(index, 1);
    },
    uploadPhoto() {
      let that = this;
      Promise.all(this.photoList.map((data) => this.getPhotoPath(data))).then((res2) => {
        console.log("图片上传成功", res2);
        that.imageList = res2;
        that.conDelivery();
      }).catch((err) => {
        that.isDisabled = false;
        console.log("图片上传失败", res);
      });
    },
    getPhotoPath(data) {
      return new Promise((resolve, reject) => {
        let isdata = data;
        this.$api.reqPost("api/yl_files/UploadFilesByBase64", {
          data: {
            base64: isdata
          }
        }).then((res2) => {
          console.log(res2);
          if (res2.status) {
            console.log("图片上传cg", res2);
            resolve(res2.data.src);
          } else {
            console.log("错误");
            reject(res2);
          }
        }).catch((err) => {
          reject(err);
        });
      });
    }
  }
};
if (!Array) {
  const _easycom_u_gap2 = common_vendor.resolveComponent("u-gap");
  const _easycom_u__textarea2 = common_vendor.resolveComponent("u--textarea");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_gap2 + _easycom_u__textarea2 + _easycom_u_icon2 + _easycom_u_button2)();
}
const _easycom_u_gap = () => "../../../uni_modules/uview-plus/components/u-gap/u-gap.js";
const _easycom_u__textarea = () => "../../../uni_modules/uview-plus/components/u--textarea/u--textarea.js";
const _easycom_u_icon = () => "../../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_button = () => "../../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_gap + _easycom_u__textarea + _easycom_u_icon + _easycom_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      height: "10",
      bgColor: "#efefef"
    }),
    b: common_vendor.o(($event) => $data.signdesc = $event),
    c: common_vendor.p({
      border: "none",
      placeholder: "拍照说明:",
      modelValue: $data.signdesc
    }),
    d: common_vendor.f($data.photoList, (item, index, i0) => {
      return {
        a: item,
        b: "47fe1204-2-" + i0,
        c: common_vendor.o(($event) => $options.deletePhoto(index), index),
        d: index
      };
    }),
    e: common_vendor.p({
      name: "close",
      color: "red",
      size: "16",
      bold: "true"
    }),
    f: $data.photoList.length < 3
  }, $data.photoList.length < 3 ? {
    g: common_vendor.p({
      name: "camera",
      size: "34"
    }),
    h: common_vendor.o((...args) => $options.openCamera && $options.openCamera(...args))
  } : {}, {
    i: common_vendor.o($options.uploadPhoto),
    j: common_vendor.p({
      type: "primary"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-47fe1204"], ["__file", "F:/daima/dm/ylqc_mobile/pages/order/service/service.vue"]]);
wx.createPage(MiniProgramPage);
