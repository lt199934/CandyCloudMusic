import request from '../../utils/request'
let startY = 0;//手指起始位置
let moveY = 0;//手指移动位置
let moveDistance = 0;//手指移动的距离
Page({

    /**
     * 页面的初始数据
     */
    data: {
        topbg:"https://p1.music.126.net/b_xx7JRbTvFOXBQTByS4Yg==/18808245906747912.jpg",
        day:"",
        mouth:"",
        songsList:[],
        transform:"translateY(0)",//滑动的距离
        coverTransition:"",//滑动之后的回弹
        isCover:false//判断是否滑动
    },
    handlerStart(event){//当手指按下时触发
        //获取手指真正的起始位置
        startY = event.touches[0].clientY;
        this.setData({
            coverTransition:'',
            isCover:false
        })
    },
    handlerMove(event){//当手指移动时触发
        moveY = event.touches[0].clientY;
        //移动的位置减去起始的位置
        moveDistance = moveY - startY;
        //往上滑动的BUG
        if(moveDistance < 0){
            return;
        }
        //滑动距离过远的BUG
        if(moveDistance >= 100){
            this.setData({
                isCover:true
            })
            return;
        }
        this.setData({
            transform:`translateY(${moveDistance}rpx)`
        })
    },
    handlerEnd(){//松开手指时触发
        this.setData({
            transform:`translateY(0rpx)`,
            coverTransition:'transform 0.7s linear'
        })
        //动画效果执行完成之后再刷新歌单
        setTimeout(async ()=>{
            //判断是否该更新歌单
            if(this.data.isCover){
                let songs = await request("/recommend/songs",{});
                console.log(songs); 
                //获取当前时间
                this.setData({
                    songsList:songs.recommend
                });
            }
        },700); 
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:async function (options) {
        let songs = await request("/recommend/songs",{});
        console.log(songs); 
        //获取当前时间
        this.setData({
            mouth:new Date().getMonth()+1,//获取当前月份
            day:new Date().getDate(),//获取当前日期
            songsList:songs.data.dailySongs
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