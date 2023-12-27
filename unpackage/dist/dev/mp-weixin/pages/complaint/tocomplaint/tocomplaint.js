"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_imageDeal = require("../../../api/image-deal.js");
const _sfc_main = {
  data() {
    return {
      userid: this.$store.state.userid,
      //用户ID
      driverName: "",
      //被投诉人
      reason: "",
      //被投诉原因
      details: "",
      //详细内容
      photoList: [],
      imageList: []
    };
  },
  methods: {
    //提交投诉
    subComplaint() {
      var _this = this;
      if (_this.photoList.length == 0) {
        common_vendor.index.showToast({
          title: "请拍摄上传照片！",
          icon: "none"
        });
      } else if (_this.driverName == "") {
        common_vendor.index.showToast({
          title: "请输入被投诉人！",
          icon: "none"
        });
      } else if (_this.reason == "") {
        common_vendor.index.showToast({
          title: "请输入被投诉原因！",
          icon: "none"
        });
      } else {
        _this.$api.reqPost("api/yl_complaints/Add", {
          data: {
            userId: _this.userid,
            driverName: _this.driverName,
            imageList: _this.imageList,
            reason: _this.reason,
            details: _this.details
          }
        }).then((res2) => {
          if (res2.status) {
            common_vendor.index.showToast({
              title: "提交投诉成功！",
              icon: "none"
            });
            common_vendor.index.navigateBack({
              delta: 1
            });
            console.log("提交成功", res2);
          } else {
            common_vendor.index.showToast({
              title: "提交投诉失败！",
              icon: "none"
            });
            console.log("提交失败", res2);
          }
        });
      }
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
        that.subComplaint();
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
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  const _easycom_u__textarea2 = common_vendor.resolveComponent("u--textarea");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u__input2 + _easycom_u__textarea2 + _easycom_u_icon2 + _easycom_u_button2)();
}
const _easycom_u__input = () => "../../../uni_modules/uview-plus/components/u--input/u--input.js";
const _easycom_u__textarea = () => "../../../uni_modules/uview-plus/components/u--textarea/u--textarea.js";
const _easycom_u_icon = () => "../../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_button = () => "../../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u__input + _easycom_u__textarea + _easycom_u_icon + _easycom_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $data.driverName = $event),
    b: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.driverName
    }),
    c: common_vendor.o(($event) => $data.reason = $event),
    d: common_vendor.p({
      placeholder: "请输入",
      border: "none",
      inputAlign: "right",
      fontSize: "26rpx",
      disabled: _ctx.inputStatus,
      modelValue: $data.reason
    }),
    e: common_vendor.o(($event) => $data.details = $event),
    f: common_vendor.p({
      placeholder: "请输入内容",
      count: true,
      height: "120",
      maxlength: "300",
      modelValue: $data.details
    }),
    g: common_vendor.f($data.photoList, (item, index, i0) => {
      return {
        a: item,
        b: "810b14b9-3-" + i0,
        c: common_vendor.o(($event) => $options.deletePhoto(index), index),
        d: index
      };
    }),
    h: common_vendor.p({
      name: "close",
      color: "red",
      size: "16",
      bold: "true"
    }),
    i: $data.photoList.length < 3
  }, $data.photoList.length < 3 ? {
    j: common_vendor.p({
      name: "camera",
      size: "34"
    }),
    k: common_vendor.o((...args) => $options.openCamera && $options.openCamera(...args))
  } : {}, {
    l: common_vendor.o($options.uploadPhoto),
    m: common_vendor.p({
      type: "primary",
      size: "small"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-810b14b9"], ["__file", "F:/daima/dm/ylqc_mobile/pages/complaint/tocomplaint/tocomplaint.vue"]]);
wx.createPage(MiniProgramPage);
