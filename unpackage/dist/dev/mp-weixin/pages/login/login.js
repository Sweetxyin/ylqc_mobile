"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      tips: "",
      //验证码提示文字
      phone: "",
      //手机号码
      Scode: "",
      //验证码
      code: "",
      //验证码
      openid: "",
      session_key: "",
      //秘钥
      iv: "",
      //本机号码秘钥
      encryptedData: "",
      //本机号码秘钥
      invitecode: "",
      treaty: [],
      treatyType: false
    };
  },
  onLoad() {
  },
  mounted() {
    const _this = this;
    var userInfo = this.$store.state.userInfo;
    if (Object.keys(userInfo).length != 0) {
      console.log("获取到store.state用户数据");
      console.log(this.$store.state.userInfo);
    } else {
      _this.doToken();
    }
  },
  methods: {
    ...common_vendor.mapMutations(["login", "setToken"]),
    doToken() {
      const _this = this;
      console.log("重新获取用户数据");
      _this.getLoginCode(function(code) {
        _this.$api.reqPost(
          "api/yl_user/OnLogin",
          {
            data: { code: _this.code }
          }
        ).then((res) => {
          if (res.status) {
            if (res.data.auth) {
              _this.setToken(res.data.auth);
              console.log("检查是否成功将token存进vuex", _this.$store.state);
            }
            if (res.data.user) {
              _this.login(res.data.user);
              console.log("检查是否成功将数据存进vuex", _this.$store.state);
            }
            _this.openid = res.otherData;
            console.log("成功后获取openid：" + _this.$store.state.openid);
          } else {
            this.openid = res.otherData;
            console.log("失败后获取openid：" + _this.openid);
          }
        });
      });
    },
    // 获取SessionKey
    // updateSessionKey() {
    // 	this.getLoginCode() //获取微信登录js_code
    // 	// console.log('code=',jsCode)
    // },	
    // 获取code
    getLoginCode(callback) {
      common_vendor.index.login({
        provider: "weixin",
        success: async (res) => {
          this.code = res.code;
          return callback(res.code);
        }
      });
    },
    // get_miyao(){ // 获取密钥 === 需要登录才可以获取密钥
    // 	uni.request({
    // 		    url: 'https://api.weixin.qq.com/sns/jscode2session',// 请求微信服务器
    // 		    method:'GET',
    // 		    data: {
    // 				appid: 'wxc0935a2d2bfeada7',        //你的小程序的APPID
    // 				secret: '1d1f7a68d6bacdad125c35fe9ae9ef21',    //你的小程序秘钥secret,  
    // 				js_code: this.code,    //wx.login 登录成功后的code
    // 				grant_type:'authorization_code'
    // 		    },
    // 		    success: (res) => {
    // 		        console.log('获取信息',res);  // 换取成功后 暂存这些数据 留作后续操作
    // 		        this.openid=res.data.openid    //openid 用户唯一标识
    // 		        this.session_key=res.data.session_key    //session_key  会话密钥
    // 		    }
    // 		});
    // 	},
    boxcheck(n) {
      if (this.treaty.length == 0) {
        this.treatyType = true;
      } else {
        this.treatyType = false;
      }
    },
    changeTreaty() {
      if (this.treaty.length == 0) {
        common_vendor.index.showToast({
          title: "请勾选《用户服务协议》《隐私协议》！",
          icon: "none",
          duration: 2e3
        });
      } else {
        console.log("no", this.treaty.length);
      }
    },
    // toLogin(){
    // 	let _this = this
    // 	_this.$api.reqPost('api/yl_user/OnLogin',
    // 	{
    // 		data:{code:_this.code},
    // 		header: {
    // 			"Connection": "keep-alive",
    // 			"Content-Type":"application/json"
    // 		}
    // 	}).then(res => {
    // 		 if(res.status){
    // 			console.log(res,'登录成功');
    // 			_this.openid=res.data    //openid 用户唯一标识
    // 			_this.session_key=res.data.session_key    //session_key  会话密钥
    // 			console.log(_this.openid,'1')
    // 			// _this.getUserPhoneNumber(e)
    // 		 }else{
    // 			console.log(res,'登录失败');
    // 		 }
    // 	 })
    // },
    getUserPhoneNumber(e) {
      let _this = this;
      if (e.detail.errMsg == "getPhoneNumber:ok") {
        console.log(e);
        common_vendor.index.showToast({
          title: "登录中",
          icon: "loading",
          mask: true
        });
        var data = {
          sessionAuthId: _this.openid,
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData
        };
        _this.toGetPhoneNumber(data);
      } else {
        console.log(e);
      }
    },
    toGetPhoneNumber(data) {
      let _this = this;
      _this.$api.reqPost(
        "api/yl_user/DecryptPhoneNumber",
        {
          data
        }
      ).then((res) => {
        if (res.status) {
          console.log(res, "登录成功");
          common_vendor.index.showToast({
            title: "登录成功",
            icon: "loading",
            duration: 3e3
          });
          _this.setToken(res.data);
          common_vendor.index.setStorageSync("token", res.data.token);
          if (res.data.roles == "driver") {
            common_vendor.index.setStorageSync("identify", "driver");
            common_vendor.index.reLaunch({ url: "/pages/seizeorders/seizeorders" });
          } else {
            common_vendor.index.setStorageSync("identify", "user");
            common_vendor.index.reLaunch({ url: "/pages/index/index" });
          }
        } else {
          common_vendor.index.showToast({
            title: "登录失败",
            icon: "loading",
            mask: true
          });
          console.log(res, "登录失败");
        }
      });
    },
    // 微信获取用户信息
    weichatlogin() {
      let _this = this;
      common_vendor.index.getUserProfile({
        lang: "zh_CN",
        desc: "获取你的昵称、头像、地区及性别",
        success: (res) => {
          _this.info = res.userInfo;
          _this.invitecode = res.iv;
          _this.encryptedData = res.encryptedData;
          console.log(res);
          common_vendor.index.showToast({
            icon: "none",
            title: "获取成功"
          });
        },
        fail: (err) => {
          console.log(err);
          common_vendor.index.showToast({
            icon: "none",
            title: "用户拒绝获取"
          });
        }
      });
    },
    //跳转到短信登录页
    toPhoneLogin() {
      if (this.treaty.length == 0) {
        common_vendor.index.showToast({
          title: "请勾选《用户服务协议》《隐私协议》！",
          icon: "none",
          duration: 2e3
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/login/phonelogin"
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_checkbox2 = common_vendor.resolveComponent("u-checkbox");
  const _easycom_u_checkbox_group2 = common_vendor.resolveComponent("u-checkbox-group");
  (_easycom_u_button2 + _easycom_u_checkbox2 + _easycom_u_checkbox_group2)();
}
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_checkbox = () => "../../uni_modules/uview-plus/components/u-checkbox/u-checkbox.js";
const _easycom_u_checkbox_group = () => "../../uni_modules/uview-plus/components/u-checkbox-group/u-checkbox-group.js";
if (!Math) {
  (_easycom_u_button + _easycom_u_checkbox + _easycom_u_checkbox_group)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.treatyType == false
  }, $data.treatyType == false ? {
    b: common_vendor.o($options.changeTreaty),
    c: common_vendor.p({
      type: "success",
      icon: "weixin-fill",
      text: "微信一键登录"
    })
  } : {
    e: common_vendor.o($options.getUserPhoneNumber),
    f: common_vendor.p({
      type: "success",
      icon: "weixin-fill",
      text: "微信一键登录",
      ["open-type"]: "getPhoneNumber"
    })
  }, {
    d: $data.treatyType == true,
    g: common_vendor.p({
      type: "success",
      plain: true,
      text: "短信验证码登录"
    }),
    h: common_vendor.o((...args) => $options.toPhoneLogin && $options.toPhoneLogin(...args)),
    i: common_vendor.p({
      activeColor: "green",
      shape: "circle"
    }),
    j: common_vendor.o(($event) => _ctx.dealClick("用户服务协议")),
    k: common_vendor.o(($event) => _ctx.dealClick("隐私协议")),
    l: common_vendor.o($options.boxcheck),
    m: common_vendor.o(($event) => $data.treaty = $event),
    n: common_vendor.p({
      placement: "row",
      modelValue: $data.treaty
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"], ["__file", "F:/daima/dm/ylqc_mobile/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
