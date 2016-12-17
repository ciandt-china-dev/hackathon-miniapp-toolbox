// pages/exchange-rate/exchange-rate.js
var appurl = 'https://sapi.k780.com/';
var appkey = "22192";
var secret = "29c46969bcd1a5a25a23a7af28e06de1";
var sign = "9437958a31ca08fba8ff87013d7ab7ba";
Page({
  data: {
    usdToCny: "",
    country: [],
    fromIndex: '',
    toIndex: '',
    fromMoney: 1,
    toMoney: '',
    notice:'',
  },
  onLoad: function (options) {
    console.log('initCountry');
    this.initCountry();
  },
  onReady: function () {
    console.log('onready');
    var from = wx.getStorageSync('default_ex_rate_from');
    if (from == "") {
      from = "USD 美元";
      wx.setStorageSync('default_ex_rate_from', from);
    }
    var to = wx.getStorageSync('default_ex_rate_to');
    if (to == "") {
      to = "CNY 人民币";
      wx.setStorageSync('default_ex_rate_to', to);
    }
    var _t = this;
    wx.getStorage({
      key: 'country',
      success: function (res) {
        _t.setData({
          country: res.data,
          fromIndex: res.data.indexOf(from),
          toIndex: res.data.indexOf(to),
        });
      }
    });
    wx.request({
      url: appurl,
      data: {
        'app': 'finance.rate',
        'scur': from.substring(0, 3),
        'tcur': to.substring(0, 3),
        'appkey': appkey,
        'sign': sign,
        'format': 'json',
      },
      method: "GET",
      success: function (res) {
        var data = res.data;
        if (data.success == "1") {
          var rate = data.result.rate;
          var update = data.result.update;
          _t.setData({
            usdToCny: rate.toFixed(6),
            notice:'数据仅供参考，更新：' + update,
          });
        }
      },
      fail: function () { },
      complete: function () {}
    });
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
  formSubmit: function (e) {
    var fromIndex = e.detail.value.from_country;
    var toIndex = e.detail.value.to_country;
    var fromMoney = e.detail.value.from_money;
    var country = wx.getStorageSync('country');
    var _t = this;
    wx.showToast({
      'title' : '加载中',
      icon: 'loading',
      duration: 2000,
    });
    wx.request({
      url: appurl,
      data: {
        'app': 'finance.rate',
        'scur': country[fromIndex].substring(0, 3),
        'tcur': country[toIndex].substring(0, 3),
        'appkey': appkey,
        'sign': sign,
        'format': 'json',
      },
      method: "GET",
      success: function (res) {
        var data = res.data;
        console.log(data);
        if (data.success == "1") {
          var rate = data.result.rate;
          var update = data.result.update;
          _t.setData({
            toMoney: (rate * fromMoney).toFixed(6),
            notice:'数据仅供参考，更新：' + update,
          });
        }
      },
      fail: function () { },
      complete: function () {
        wx.hideToast();
      }
    })
  },
  switchCountry: function (e) {
    var from = wx.getStorageSync('default_ex_rate_from');
    var to = wx.getStorageSync('default_ex_rate_to');
    var _t = this;
    wx.getStorage({
      key: 'country',
      success: function (res) {
        _t.setData({
          fromIndex: res.data.indexOf(to),
          toIndex: res.data.indexOf(from),
        })
        wx.setStorageSync('default_ex_rate_from', to);
        wx.setStorageSync('default_ex_rate_to', from);
      }
    })
  },
  bindFromCountryChange: function (e) {
    this.setData({
      fromIndex: e.detail.value
    });
    var country = wx.getStorageSync('country');
    wx.setStorageSync('default_ex_rate_from', country[e.detail.value]);
  },
  bindToCountryChange: function (e) {
    this.setData({
      toIndex: e.detail.value
    })
    var country = wx.getStorageSync('country');
    wx.setStorageSync('default_ex_rate_to', country[e.detail.value]);
  }
})