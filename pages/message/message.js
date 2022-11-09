import request from '../../utils/request'
//时间转换工具类
import date from '../../utils/date'

// pages/message/message.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        messageList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        let message = await request("/msg/private",{limit:10});
        if(message.code == 200){
            //写个循环，转换一下再赋值
            for(var i=0;i<message.msgs.length;i++){
                message.msgs[i].lastMsgJSON = JSON.parse(message.msgs[i].lastMsg);
                //顺带解析时间戳为时间
               message.msgs[i].msgTime = date(message.msgs[i].lastMsgTime);
            }
            this.setData({
                messageList:message.msgs
            })
        }else{
            //弹框提示错误信息
           
        }
        console.log(message);
                       
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