Page({
  data: ({
    
    queryResult: '',
    query:[],
    totalprice:0,
 
      
  }),

  onReady: function () {
    this.setData({
      triit: "调用setData（）修改后的值"
    })

  },


  showToast: function (event) {
    this.animation = wx.showToast({
      title: '已添加',
      icon: 'success',
      image: '',
      duration: 1000,
    })
    const db = wx.cloud.database()
    const newCount = event.target.dataset.count+1;
    const thiscolumn = event.target.dataset.column;
    
    var that=this
    var price = event.target.dataset.price;
    var endprice= that.data.totalprice;
  endprice=endprice+price;
    console.log('price ', price)
    console.log('endprice ', endprice)
    this.setData({
      totalprice:endprice
    })
    db.collection(thiscolumn).doc(this.data.counterId).update({
      data: {
        count: newCount
      },
      success: res => {
        this.setData({
          count: newCount
        })
      },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },

  onAdd: function () {
    const db = wx.cloud.database()
    db.collection('jichi').add({
      
      data:{
        name: '虾仁鸡翅',
        description: '虾仁塞进无骨鸡翅',
        count: 0,
        spicy: false,
        photo: '/pages/image/wings.png'
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



  touch: function (e) {
    const db = wx.cloud.database()
    var _this=this
    var id = e.target.dataset.db;
   var que = []
    console.log(id);
     db.collection(id).where({
      _openid: this.data.openid
    }).get({
      success: res => {
        for (var i = 0; i < res.data.length; i++) {
          que.push({ // 获取返回结果，放到mks数组中
            name: res.data[i].name,
            price: res.data[i].price,
            count: res.data[i].count,
            photo:  res.data[i].photo,
            description: res.data[i].description,
            column:res.data[i].column

          })
        }
        _this.setData({ //设置markers属性，将搜索结果显示在地图中
          query:que
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

  
   


})