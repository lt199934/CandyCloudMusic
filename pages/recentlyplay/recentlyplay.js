//导入请求工具类
import request from '../../utils/request'

// pages/recentlyplay/recentlyplay.js
Page({

        /**
         * 页面的初始数据
         */
        data: {
                playList:[]
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad:async function (options) {
                //1、获取本地缓存中的id
                let userInfo = wx.getStorageSync('userInfo');
                let user = JSON.parse(userInfo);
                let userId = user.userId;
                //2、去请求接口拿数据
                let song = await request("/user/record",{uid:userId,type:0});
                console.log("请求数据",song);
                //3、替换掉本地的数据
                this.setData({
                        playList:song
                })
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