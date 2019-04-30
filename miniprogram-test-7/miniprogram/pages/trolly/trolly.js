Page({
  data: {
    active: 0,
    view: 'datong',
    animation: '',
    text: "Page animation"
  },


  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    this.animation = wx.createAnimation({

      duration: 1000,

      timingFunction: 'ease',
      delay: 100,

      transformOrigin: 'left top 0',
      success: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 旋转
   */
  rotate: function () {
    //顺时针旋转10度
    //
    this.animation.scale(0.1).translate(400, 1800).opacity(0.01).step().scale(1).translate(1, 1).opacity(1).step()


    this.setData({
      //输出动画
      animation: this.animation.export()
    })
  },





  datong: function (event) {

    var tap = 'view';
    this.setData({
      [tap]: 'datong'
    })
  },

  huajia: function (event) {

    var tap = 'view';
    this.setData({
      [tap]: 'huajia'
    })
  },

  f2: function (event) {


    wx.navigateTo({ url: '/pages/trolly1/trolly1' })

  },



  wings: function (event) {

    var tap = 'view';
    this.setData({
      [tap]: 'wings'
    })
  },

  onChange(event) {
    wx.showToast({
      icon: 'none',
      title: `切换至第${event.detail}项`
    });
  }
},
);
