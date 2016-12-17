// pages/x/x.js
Page({
  data:{
    isAddBoxShow: false,
    addButtonText: '+',
    date: new Date(),
    lists: [
      {
        name: '星期六',
        date: '2016-12-12',
        className: 'already',
        numberText: '12'
      },{
        name: '星期六',
        date: '2016-12-12',
        className: 'besides',
        numberText: '12'
      }
    ]
  },
  handleAddButton: function() {
    var _t = this;
    this.setData({
      isAddBoxShow: !_t.data.isAddBoxShow,
      addButtonText: _t.data.isAddBoxShow ? '+' : '-'
    });
  },
  formSubmit: function(e) {
    var _t = this;
    var formData = e.detail.value;
    var oldLists = _t.data.lists;
    if (formData.name === '') return;
    oldLists.push(_t.processSingleItem(formData));
    _t.setData({
      lists: oldLists,
      isAddBoxShow: !_t.data.isAddBoxShow,
      addButtonText: _t.data.isAddBoxShow ? '+' : '-'
    });
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
      date: item.date
    }
    if (now > date) {
      item.className = 'already';
    } else {
      item.className = 'besides';
    }
    item.numberText = Math.abs(Math.round((now - date)/(1000 * 60 * 60 * 24)));

    return item;
  },
  onLoad:function(options){
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
  }
})