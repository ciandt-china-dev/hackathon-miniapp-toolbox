// pages/exchange-rate/exchange-rate.js
var appurl = 'https://sapi.k780.com/';
var appkey = "22192";
var secret = "29c46969bcd1a5a25a23a7af28e06de1";
var sign = "9437958a31ca08fba8ff87013d7ab7ba";
Page({
  data: {
    usdToCny: "",
    // cnyToUsd: "",
    country: [],
    fromIndex: '',
    toIndex: '',
  },
  onLoad: function (options) {
    console.log('initCountry');
    this.initCountry();
  },
  onReady: function () {
    console.log('onready');
    var _t = this;
    wx.getStorage({
      key: 'country',
      success: function (res) {
        _t.setData({
          country: res.data
        });
      }
    })
    // this.setData({
    //   country: res
    //   usdToCny: 6.28320,
    //   cnyToUsd: 0.38239,
    // });
  },
  initCountry: function (cb) {
    var _t = this;
    // console.log('initCountry');
    wx.request({
      url: 'https://sapi.k780.com/?app=finance.rate_curlist&appkey=22192&sign=9437958a31ca08fba8ff87013d7ab7ba&format=json',
      data: {},
      // url: appurl,
      // data: {
      //   'app': 'finance.rate_curlist',
      //   'appkey': appkey,
      //   'sign': sign,
      // },
      method: 'GET',
      success: function (res) {
        var data = res.data;
        var result = [];
        if (data.success == "1") {
          for (var i in data.result) {
            result.push(data.result[i].curno + " " + data.result[i].curnm);
          }
          // console.log(result);
          wx.setStorageSync("country", result);
        }
      },
      fail: function () {
        // fail
      },
      complete: function () { }
    });

  },
  getRate: function (e) {
    console.log('test');
    wx.request({
      url: appurl,
      data: {
        'app': 'finance.rate',
        'scur': e.detail.value.from_country,
        'tcur': e.detail.value.to_country,
        'appkey': appkey,
        'sign': sign,
        'format': 'json',
      },
      method: "GET",
      success: function (res) {
        var data = res.data;
        if (data.success) {

        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        console.log(0)
      }
    })
  },
  switchCountry: function (e) {
    console.log('switch');

  }

})