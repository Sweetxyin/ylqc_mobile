"use strict";
const common_vendor = require("../common/vendor.js");
const pathToBase64 = (path, parseQuality) => {
  return new Promise(function(resolve, reject) {
    if (typeof window === "object" && "document" in window) {
      var canvas = document.createElement("canvas");
      var c2x = canvas.getContext("2d");
      var img = new Image();
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        c2x.drawImage(img, 0, 0);
        resolve(canvas.toDataURL());
      };
      img.onerror = reject;
      img.src = path;
      return;
    }
    if (typeof plus === "object") {
      let data_time = (/* @__PURE__ */ new Date()).getTime();
      let index = path.lastIndexOf(".");
      let img_type = "jpg";
      let img_ori_path = path.substring(0, index);
      plus.zip.compressImage({
        src: path,
        dst: img_ori_path + data_time + "." + img_type,
        quality: parseQuality || 10
      }, function(e) {
        plus.io.resolveLocalFileSystemURL(e.target, function(entry) {
          entry.file(function(file) {
            var fileReader = new plus.io.FileReader();
            fileReader.onloadend = function(data) {
              resolve(data.target.result);
            };
            fileReader.onerror = function(error) {
              reject(error);
            };
            fileReader.readAsDataURL(file);
          }, function(error) {
            reject(error);
          });
        }, function(error) {
          reject(error);
        });
      }, function(error) {
        reject(error);
      });
      return;
    }
    if (typeof common_vendor.wx$1 === "object" && common_vendor.wx$1.canIUse("getFileSystemManager")) {
      common_vendor.wx$1.getFileSystemManager().readFile({
        filePath: path,
        encoding: "base64",
        success: function(res) {
          resolve("data:image/png;base64," + res.data);
        },
        fail: function(error) {
          reject(error);
        }
      });
      return;
    }
    reject(new Error("not support"));
  });
};
const base64ToPath = (base64) => {
  return new Promise(function(resolve, reject) {
    if (typeof window === "object" && "document" in window) {
      base64 = base64.split(",");
      var type = base64[0].match(/:(.*?);/)[1];
      var str = atob(base64[1]);
      var n = str.length;
      var array = new Uint8Array(n);
      while (n--) {
        array[n] = str.charCodeAt(n);
      }
      return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], {
        type
      })));
    }
    var extName = base64.match(/data\:\S+\/(\S+);/);
    if (extName) {
      extName = extName[1];
    } else {
      reject(new Error("base64 error"));
    }
    var fileName = Date.now() + "." + extName;
    if (typeof plus === "object") {
      var bitmap = new plus.nativeObj.Bitmap("bitmap" + Date.now());
      bitmap.loadBase64Data(base64, function() {
        var filePath2 = "_doc/uniapp_temp/" + fileName;
        bitmap.save(filePath2, {}, function() {
          bitmap.clear();
          resolve(filePath2);
        }, function(error) {
          bitmap.clear();
          reject(error);
        });
      }, function(error) {
        bitmap.clear();
        reject(error);
      });
      return;
    }
    if (typeof common_vendor.wx$1 === "object" && common_vendor.wx$1.canIUse("getFileSystemManager")) {
      var filePath = common_vendor.wx$1.env.USER_DATA_PATH + "/" + fileName;
      common_vendor.wx$1.getFileSystemManager().writeFile({
        filePath,
        data: base64.replace(/^data:\S+\/\S+;base64,/, ""),
        encoding: "base64",
        success: function() {
          resolve(filePath);
        },
        fail: function(error) {
          reject(error);
        }
      });
      return;
    }
    reject(new Error("not support"));
  });
};
const pathToBase64$1 = {
  pathToBase64,
  base64ToPath
};
exports.pathToBase64 = pathToBase64$1;
