// pages/x/x.js
Page({
  data:{
    isAddBoxShow: false,
    addButtonText: '+',
    date: '2016-12-18',
    lists: [],
    index: 1,
    storedLists: [],
    currentItemName: '',
    currentIndex: ''
  },
  handleAddButton: function() {
    var _t = this;
    this.setData({
      isAddBoxShow: !_t.data.isAddBoxShow,
      addButtonText: _t.data.isAddBoxShow ? '+' : '-'
    });
  },
  handleEditDelModal: function(e) {
    var _t = this;
    _t.setData({
      currentItemName: e.target.dataset.name,
      currentIndex: e.target.dataset.index
    });
    wx.showActionSheet({
      itemList: ['删除'],
      success: function(res) {
        if (!res.cancel) {
          console.log(res.tapIndex);
          if (res.tapIndex === 0) {
            _t.deleteItem();
          } else {
            _t.editItem();
          }
        }
      }
    })
  },
  deleteItem: function() {
    var _t = this;
    var name = _t.data.currentItemName;
    var index = _t.data.currentIndex;
    var oldLists = _t.data.lists;    
    var newLists = oldLists.filter(function(item) {
      if (item.index != index) {
        return item;
      }
    });
    _t.setData({
      lists: newLists
    });
    wx.setStorageSync('storedLists', newLists);
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 1000
    })
  },
  editItem: function() {

  },
  formSubmit: function(e) {
    var _t = this;
    var formData = e.detail.value;
    var oldLists = _t.data.lists;
    if (formData.name === '') return;
    formData.index = _t.data.index + 1;
    oldLists.push(_t.processSingleItem(formData));
    _t.setData({
      lists: oldLists,
      index: _t.data.index + 1,
      isAddBoxShow: !_t.data.isAddBoxShow,
      addButtonText: _t.data.isAddBoxShow ? '+' : '-'
    });
    wx.setStorageSync('storedLists', oldLists);
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  processSingleItem: function(item) {
    var now = new Date();
    var date = new Date(item.date);
    var item = {
      name: item.name,
      date: item.date,
      index: item.index
    }
    if (now > date) {
      item.className = 'already';
    } else {
      item.className = 'besides';
    }
    item.numberText = Math.abs(Math.round((now - date)/(1000 * 60 * 60 * 24)));

    return item;
  },
  processAllItem: function(lists) {
    var _t = this;
    var newLists = lists.map(function(item) {
      return _t.processSingleItem(item);
    });
    return newLists;
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    var _t = this;
    var storedLists = wx.getStorageSync('storedLists') || [{
      name: '过年',
      index: 1,
      date: '2017-01-27'
    }];
    var lists =  _t.processAllItem(storedLists)
    setTimeout(function() {
      _t.setData({
        lists: lists
      });
      wx.hideToast();
    }, 1000);

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
  }
})