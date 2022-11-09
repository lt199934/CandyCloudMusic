//导入请求工具类
import request from '../../utils/request'
import time from "../../utils/time"

//控制音乐的对象
let innerAudioContext;
//拿到微信对象
let wxobj;
//定义点击初始位置
let startClick = 0;
//手指距离屏幕左边的坐标
let windowX = 0;
//屏幕可用最大宽度
let windowW = 0;
//线的宽度
let lineW = 0;
//是否被点击
let isClick = false;
//最大时间
let SongMaxTime = 0;
//线距离屏幕左侧的距离
let lineLeft = 0;
//拖拽计算出来的秒
let songTime = 0;

// pages/playmusic/playmusic.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        rotate:-30,//用于针头移动
        animation:"disc 4s linear infinite",//唱片旋转
        isPlay:true,//是否在播放
        progress:"0%",
        startTime:"00:00",
        stopTime:"00:00",
        title:"主标题",
        subheading:"副标题",
        musicImg:"http://p3.music.126.net/VUtLfAqLDYMn2dfy0qlRkw==/109951166118678136.jpg"
    },
    handlerStart(event){//手指按下
        isClick = true;
        windowX = event.touches[0].clientX;
        //通过系统信息拿到屏幕可用最大宽度
        const res = wx.getSystemInfoSync()
        windowW = res.windowWidth;
        //console.log("屏幕可用宽度"+windowW);
        //console.log("点击",startClick);
        //获取某个组件的宽高等属性
        const query = this.createSelectorQuery()
        query.select('#line').boundingClientRect().exec((res)=>{
            lineW = res[0].width;
            //因为是异步的操作，所以需要放在里面
            //线距离屏幕左侧的距离
            lineLeft = ((windowW - lineW)/2);
            let w = parseInt(((windowX - lineLeft) / lineW) * 100)
            songTime = (SongMaxTime * (w / 100));
            this.setData({
                startTime:time(songTime),
                progress:w+"%"
            })

            //String转int 可以用来去除符号并取整
            startClick = w;
        })

    },
    handlerMove(event){//手指移动
        //获取移动时当前位置坐标
        let moveX = event.touches[0].clientX;    
        //保证偏差永远为正
        let deviation = 0;
        //移动的距离屏幕左侧的距离 减去线距离屏幕左侧的距离
        deviation = moveX - lineLeft;

        let w = parseInt((deviation / lineW) * 100);
        //最大不能大于百分之百 最小不能小于0
        if(w>100){
            w = 100;
        }
        if(w<0){
            w = 0;
        }
        //计算百分比时间
        songTime = (SongMaxTime * (w / 100));
        this.setData({
            startTime:time(songTime),
            progress:w+"%"
        })
    },
    handlerEnd(event){//手指松开
        isClick = false;
        console.log("手指松开",parseInt(songTime/1000));
        innerAudioContext.seek(parseInt(songTime/1000));
    },
    //控制音乐播放暂停
    musicControl(){
        if(this.data.isPlay){//暂停
            innerAudioContext.pause();
            this.setData({
                isPlay:false,
                rotate:-30,
                animation:""
            });
        }else{//播放
            innerAudioContext.play();
            this.setData({
                isPlay:true,
                rotate:0,
                animation:"disc 4s linear infinite"
            });
        }    
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        //把url地址转换回来
        let musicObj = JSON.parse(decodeURIComponent(options.musicObj));
        console.log("解析之后",musicObj);
        //获取收到的id
        let musicInfo = await request("/song/url",{id:musicObj.musicid});
        console.log(musicInfo);
        this.setData({
            rotate:0,
            title:musicObj.name,
            subheading:musicObj.msg,
            musicImg:musicObj.musicImg
        })
        if(musicInfo.code == 200){
            //最新api播放歌曲
            innerAudioContext = wx.createInnerAudioContext();
            innerAudioContext.src=musicInfo.data[0].url;
            innerAudioContext.autoplay=true;
        }
        //获取歌曲详情（去拿播放时间）
        let songData = await request("/song/detail",{ids:musicObj.musicid});
        this.setData({
            stopTime:time(songData.songs[0].dt)
        })
        //歌曲的最大时间
        SongMaxTime = songData.songs[0].dt;

        wxobj = this;
        //算进度条 向下取整得到秒
        let MaxTime = songData.songs[0].dt / 1000;
        //监听音频播放事件
        innerAudioContext.onTimeUpdate(function callback(){
            //通过计算得到当前多少秒 取整四舍五入
            let s = Math.round(innerAudioContext.currentTime);
            //console.log("回调给的歌曲时间",s);
            //向下取整得到分钟 向下取整
            let minute = Math.floor((s/60))
            //获取多少秒 向下取整
            let second = Math.floor((s%60))
           //console.log("当前算出来的分",minute);
            //console.log("当前算出来的秒",second);
            let songStartTime;
            if(minute<10){
                songStartTime = "0"+ minute;
            }else{
                songStartTime = minute;
            }
            if(second<10){
                songStartTime += ":0"+second;
            }else{
                songStartTime += ":"+second;
            }

            //console.log("歌曲多少秒",MaxTime);
            let lineLength = ((s / MaxTime) * 100);
            //console.log("线",lineLength);
            if(!isClick){//圆点未被点击更新圆点位置
                wxobj.setData({
                    startTime:songStartTime,
                    progress:lineLength+"%"
                }) 
            }

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
        //暂时实现退出Bug
        innerAudioContext.stop();
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