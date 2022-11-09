//导入请求工具类
import request from '../../utils/request'

// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerList:[
            {pic:"http://p1.music.126.net/pm1swF0zA-acRQ4VC8jB9Q==/109951166584123019.jpg",targetId:0}
        ],
        recoSongs:[
            {name:'',picUrl:''}
        ],
        searchValue:""
    },
    scanCode(){
        //只能通过点击添加，不能通过扫码添加
        wx.addPhoneRepeatCalendar({
            startTime: "1637825400",
            title: "下课啦",
        success: (res) => {
                console.log("下课提醒添加成功");
        },
        fail:(res) => {
                console.log("日历调用失败",res);
            }
        })

        wx.scanCode({
          onlyFromCamera: true,
          success:(res)=>{
              //扫码成功过后的震动
              wx.vibrateLong({
                success: (res) => {
                    console.log("震动成功");
                },
              })
              let data = JSON.parse(res.result);
              console.log(data);
              if(data.code == 1){//跳转到听歌页面
                    console.log("跳转到听歌页面");
                    let musicobj = {
                        "musicid":data.musicid,
                        "name":data.name,
                        "msg":data.msg,
                        "musicImg":encodeURIComponent(data.musicImg)//对url进行编码
                    }
                    wx.navigateTo({//json数据格式
                      url: '/pages/playmusic/playmusic?musicObj='+JSON.stringify(musicobj)
                    })
              }else if(data.code == 2){//打电话功能
                    wx.makePhoneCall({
                        phoneNumber: data.phone
                    })
              }
          }
        })
    },
    dailysong(){//跳转到每日推荐
        wx.navigateTo({
          url: '/pages/dailysong/dailysong',
        })
    },
    searchPage(){//挑战到搜索页面
        wx.navigateTo({
          url: '/pages/Search/Search',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:async function (options) {
        //一进小程序就把页面亮度调到0.5
        wx.setScreenBrightness({
            value: 0.5
        })
        let isLogin = await request("/login/status");
        console.log(isLogin)
        //使用工具类请求
        //请求banner
        let banner = await request("/banner",{type:2});
        //推荐歌单
        let recoSong = await request("/personalized",{limit:8});

        var wxObj = this;
        //通过剪切板去获取内容
        //用户的剪切板做大数据分析
        wx.getClipboardData({
            success (res){
              console.log(res.data)
              wxObj.setData({
                searchValue : res.data
              })
            }
        })

        this.setData({
            bannerList : banner.banners,
            recoSongs : recoSong.result
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        console.log("用户下拉页面了");
        console.log("跳转到抢红包页面");
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})