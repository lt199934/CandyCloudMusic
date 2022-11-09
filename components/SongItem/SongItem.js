
// components/SongItem/SongItem.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        name:String,
        msg:String,
        musicid:Number,
        musicImg:String
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        playmusic(){//跳转到播放页面
            //可以在这里写任意多个参数
            let musicobj = {
                "musicid":this.data.musicid,
                "name":this.data.name,
                "msg":this.data.msg,
                "musicImg":encodeURIComponent(this.data.musicImg)//对url进行编码
            }

            wx.navigateTo({//json数据格式
              url: '/pages/playmusic/playmusic?musicObj='+JSON.stringify(musicobj),
            })
        }
    }
})
