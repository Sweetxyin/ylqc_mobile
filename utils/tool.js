//new Promise封装起来使用，避免代码多次重复

import QQMapWX from './utils/qqmap-wx-jssdk.min.js' //引入下载的js

// 腾讯地图经纬度转中文地址
export function getAddress (lng, lat) {
  return new Promise((resove, reject) => {
    const qqmapsdk = new QQMapWX({
      key: 'VNBBZ-SKMRW-U5TR5-OIYQZ-VEOMF-IABLP',  //之前在腾讯位置服务申请的key
    })
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: lat,
        longitude: lng,
      },
      success: (res) => {
        resove(res)
      },
      fail: (e) => {
        reject(e)
        // uni.showToast({
        //   title: '定位失败',
        //   duration: 2000,
        //   icon: 'none',
        // })
      },
    })
  })
}