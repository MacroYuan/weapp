// pages/recognition/recognition.js
var util = require('../../utils/util.js')

Page({
  data: {
    formdata: '',
    imgUrl: null
  },

  upload: function () {
    var that = this
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log("选择图片成功")
        var filePath = res.tempFilePaths
        console.log("filePath")
        that.setData({
          imgUrl: res.tempFilePaths,
        })
      },
      fail: function (e) {
        console.error(e)
      }
    })
  },
  //上传后预览图片
  previewImg: function () {
    current = this.data.imgUrl[0]
    wx.previewImage({
      current: current,
      urls: [this.data.imgUrl]
    })
  },

  callingAPI: function () {
    //接口API请求
    if(this.data.imgUrl)
    console.log(this.data.imgUrl)
    else
    console.log("没找到图片")

    /*
    *待编辑
    *需要将图片进行base64编码却不丢失，
    */

    var filePath = this.data.imgUrl
    console.log('1:'+filePath)
    wx.getFileSystemManager().readFile({
      filePath:filePath[0],
      encoding:'base64',
      success:res=>{
        //console.log('data:image/png;base64,'+res.data)
        console.log('2:'+res.data.filePath)
      }
    })

    let base64 = wx.getFileSystemManager().readFileSync(filePath[0],'base64')
    //console.log(base64)

    //upload上传
    /*wx.uploadFile({
      url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/general?access_token=24.c0d34d724aba71730680a2a870cc7019.2592000.1541513283.282335-11659918',
      filePath:filePath[0],
      name: 'file',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      formData: {
        'user': 'test'//额外的信息
      },

      success: function (res) {
        console.log("上传图片成功")
        console.log(res.data)
        console.log("返回成功的数据" + JSON.stringify(res.data))

        //显示API返回的结果
        //弹窗显示待编辑
      },

      fail: function (res) {
        console.log("上传图片失败")
        //显示失败原因
      },

      complete: function () {

      }
    })*/

    //request请求
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=24.c0d34d724aba71730680a2a870cc7019.2592000.1541513283.282335-11659918',
      data: {image:base64},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },

      success: function (res) {
        console.log('image='+base64)
        console.log("上传图片成功")
        console.log(res.data)
        console.log("返回成功的数据" + JSON.stringify(res.data))

        //

      },

      fail: function (res) {
        console.log("上传图片失败")
      },

      complete: function () {

      }
    })

  }

})