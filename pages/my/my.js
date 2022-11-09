// pages/my/my.js
Page({

        /**
         * 页面的初始数据
         */
        data: {
                userHeadUrl:"",//用户头像
                userName:"",//用户名
                noLogin:true//没有登录 为 true
        },
        message(){
                wx.navigateTo({
                        url: '/pages/message/message',
                })
        },
        //点击头像或文字跳转到登录页面
        loginPage(){
                if(this.data.noLogin){
                        wx.navigateTo({
                                url: '/pages/login/login',
                        })
                }else{
                        //个人信息页面
                } 
        },
        recentlyPlay(){
                if(this.data.noLogin){
                        //就去登录页面
                        wx.navigateTo({
                                url: '/pages/login/login',
                        })
                }else{
                        //如果登录了就去最近播放页面
                        wx.navigateTo({
                                url: '/pages/recentlyplay/recentlyplay',
                        })
                } 
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                //需要把本地存储的数据拿出来
                let userInfo = wx.getStorageSync('userInfo');
                //逻辑
                if(userInfo){
                        //赋值的时候注意
                        //替换头像和名称
                        //本地存储时用wx.setStorageSync
                        //本地获取时用wx.getStorageSync
                        //写入的时候用 JSON.stringify 取值的时候用JSON.parse
                        let user = JSON.parse(userInfo);
                        this.setData({
                                noLogin:false,
                                userName:user.nickname,
                                userHeadUrl:user.avatarUrl
                        })
                }
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