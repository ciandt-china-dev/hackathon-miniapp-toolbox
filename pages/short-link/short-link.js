// pages/short-link/short-link.js
Page({
  data:{
    long_url:false,
    short_url:false,
    error_message:false
  },
  onLoad:function(options){
    //console.log(options);
    // 页面初始化 options为页面跳转所带来的参数
     
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  formSubmit: function(e) {
    var that = this;
   //请求ajax
   wx.request({
     url: 'https://api.t.sina.com.cn/short_url/shorten.json',
     data: {
       source:'3865616908',
       url_long:e.detail.value.url_long
     },
     method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
     // header: {}, // 设置请求的 header
     success: function(res){
       // success
       if (res.statusCode == 200) {
        var data = res.data[0];
        that.setData({
            url_long:data.url_long,
            url_short:data.url_short,
            error_message:false
        })
       }
       else {
         that.setData({
            error_message:'您输入的URL不正确，请重新输入。'
        })
       }
     },
     fail: function() {
       // fail
       wx.navigateTo({
       url:'../index/index'
       });
     }
   })
  }
})