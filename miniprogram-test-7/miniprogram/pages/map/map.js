// 引入SDK核心类
var QQMapWX = require('sdk/qqmap-wx-jssdk.js');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'VE4BZ-OLO6I-M33GE-5R26M-2ARGJ-IMFN3' // 必填
});
  Page({
  data:({
   markers:'',
   searchvalue:'',
 recordlist: [
        {
          photo: "/pages/image/pic1.jpg",
         
 },
        {
          photo: "/pages/image/pic2.jpg",
      
 },
        {
          photo: "/pages/image/pic3.jpg",

        
 }
      ],
  }),

  f1:function(event) {
   
    wx.switchTab({url:'/pages/trolly/trolly'})
  },

  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindReplaceInput: function (e) {
    var value = e.detail.value
    var pos = e.detail.cursor
    var left
    if (pos !== -1) {
      // 光标在中间
      left = e.detail.value.slice(0, pos)
      // 计算光标的位置
      pos = left.replace(/11/g, '2').length
    }

    // 直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }

    // 或者直接返回字符串,光标在最后边
    // return value.replace(/11/g,'2'),
  },
  bindHideKeyboard: function (e) {
    if (e.detail.value === '123') {
      // 收起键盘
      wx.hideKeyboard()
    }
  },


  onLoad: function () {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: "GB6BZ-3OIHO-4BEWH-SBMZX-XLWSJ-VNBTE"
    })
  },
  
  onAdd: function () {
    const db = wx.cloud.database()
    db.collection('location').add({
      data: {
        latitude: ' 30.659840000000003',
        longtitude: '104.10194000000001',
        name: '大通冰室',
        type: '饮料'
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          
        })
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

  onQuery: function () {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('location').where({
      _openid: this.data.openid,
      
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),
          locationlist: res.data
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
    // 事件触发，调用接口
    nearby_search: function () {
      var _this = this;
      // 调用接口
      qqmapsdk.search({
        keyword: '饮料',  //搜索关键词
        location: '30.6757490000,104.1005480000',  //设置周边搜索中心点
        success: function (res) { //搜索成功后的回调
          var mks = []
          for (var i = 0; i < res.data.length; i++) {
            mks.push({ // 获取返回结果，放到mks数组中
              title: res.data[i].title,
              id: res.data[i].id,
              latitude: res.data[i].location.lat,
              longitude: res.data[i].location.lng,
              iconPath: "/pages/image/pin.png", //图标路径
              width: 20,
              height: 20
            })
          }
          _this.setData({ //设置markers属性，将搜索结果显示在地图中
            markers: mks
          })
        },
        fail: function (res) {
          console.log(res);
        },
        complete: function (res) {
          console.log(res);
        }
      });
    },

      nearby_search1: function (event) {
      var _this = this;
      // 调用接口
      var value=event.detail.value;
      

      qqmapsdk.search({
        keyword: value,  //搜索关键词
        location: '30.6757490000,104.1005480000',  //设置周边搜索中心点
        success: function (res) { //搜索成功后的回调
          var mks = []
          for (var i = 0; i < res.data.length; i++) {
            mks.push({ // 获取返回结果，放到mks数组中
              title: res.data[i].title,
              id: res.data[i].id,
              latitude: res.data[i].location.lat,
              longitude: res.data[i].location.lng,
              iconPath: "/pages/image/pin.png", //图标路径
              width: 20,
              height: 20
            })
          }
          _this.setData({ //设置markers属性，将搜索结果显示在地图中
            markers: mks
          })
        },
        fail: function (res) {
          console.log(res);
        },
        complete: function (res) {
          console.log(res);
        }
      });
    }
  })

