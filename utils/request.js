//导入配置文件
import config from "./config"
//封装ajax请求
export default(url,data={},method='GET') => {
    //异步回调
    return new Promise((resolve,reject) => {
        wx.request({
            url: config.host+url, //仅为示例，并非真实的接口地址
            data,
            method,
            header:{//后续请求只需要把cookie携带上
                cookie:wx.getStorageSync('cookies')
            },
            success:(res) => {
                if(data.isLogin){//如果判断是登录
                    for(var i = 0;i<res.cookies.length;i++){
                        //判断是否是我们想要的cookie
                        if(res.cookies[i].indexOf("MUSIC_U") != -1){
                            console.log(res.cookies);
                            wx.setStorage({//如果是登录就把登录信息保存到cookie
                                key:"cookies",
                                data:res.cookies[i]
                            })
                        }
                    } 
                }
                resolve(res.data);
            },
            fail:(err) => {
                reject(err);
            }
        })
    })    
}