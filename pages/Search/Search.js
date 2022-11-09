import request from '../../utils/request'

// pages/Search/Search.js
Page({

        /**
         * 页面的初始数据
         * 第一条数据获取它的播放地址
         */
        data: {
                searchData:"",
                searchOK:"none",
                searchSuggest:[],
                searchResult:[],
                firstVideoUrl:""
        },
        searchInput(event){
                let value = event.detail.value;
                //假如值为空，把搜索结果页面的display改为none
                if(value==""){
                        this.setData({
                                searchData:value,
                                searchOK:"none"
                        })
                }else{
                        this.setData({
                                searchData:value
                        })
                        //调用后台，拿到搜索建议 不为空时调用
                        getResult(this);
                }

                //内部方法
                async function getResult(obj){
                        //简单版
                        //let resultSuggest = await request("/search/suggest",{keywords:value,type:"mobile"});
                        let resultSuggest = await request("/search/suggest",{keywords:value});
                       
                        obj.setData({
                                searchSuggest:resultSuggest
                        })
                }
                
                //渲染页面
        },
        // 点击键盘上的搜索
        bindconfirm:async function(e){
                var that=this;
                var discountName=e.detail.value['search - input'] ?e.detail.value['search - input'] : e.detail.value 
                console.log('e.detail.value', discountName)
                //请求后端
                let searchServerResult = await request("/search",{keywords:discountName,type:1014,offset:0,limit:10});
                console.log(searchServerResult);
                //请求获取第一个数据的播放地址
                //如果是数字id就去调用mv的视频播放地址 否则就调用视频的
                //判断如果是纯数字就去调用mv
                let reg = "^\+?[1-9][0-9]*$";
                let playUrl;
                //对搜索结果的第一条进行类型判断
                if(searchServerResult.result.videos[0].type == 0){
                        playUrl = await request("/mv/url",{id:searchServerResult.result.videos[0].vid});
                        //请求的结果给data
                        this.setData({
                                searchResult:searchServerResult,
                                firstVideoUrl:playUrl.data.url
                        })
                }else{
                        playUrl = await request("/video/url",{id:searchServerResult.result.videos[0].vid});
                        //请求的结果给data
                        this.setData({
                                searchResult:searchServerResult,
                                firstVideoUrl:playUrl.urls[0].url
                        })
                }
                console.log("playUrl",playUrl);
                
                //页面渲染

                //改变页面结构
                this.setData({
                        searchOK:'display'
                })
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {

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
         * 和 open-type="share"
         * 效果（思想） 中文
         */
        onShareAppMessage: function ({from}) {
                if(from == 'button'){
                        //标题 页面  图片
                        return {
                                title: '通过按钮 分享音乐',
                                path: '/pages/index/index',
                                imageUrl: 'https://p1.music.126.net/b_xx7JRbTvFOXBQTByS4Yg==/18808245906747912.jpg'
                        }
                }else{
                        return {
                                title: '通过页面 分享音乐',
                                path: '/pages/index/index',
                                imageUrl: 'https://p1.music.126.net/b_xx7JRbTvFOXBQTByS4Yg==/18808245906747912.jpg'
                        }
                }
        }
})