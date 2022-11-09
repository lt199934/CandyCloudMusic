//导入请求工具类
import request from '../../utils/request'

// pages/login/login.js
Page({

        /**
         * 页面的初始数据
         */
        data: {
                email:"",
                pass:""
        },
        //当表单内容发送改变时代回调
        userInput(event){
                //微信小程序双向绑定
                let id = event.currentTarget.id;
                let value = event.detail.value;
                this.setData({
                        [id]:value
                })
                //获取数据类型
                //let type = event.currentTarget.dataset.type;
                //console.log(type);
        },
        async login(){ //await必须在方法前加上async
                let {email, pass} = this.data;
                //判断邮箱
                if(!email){
                        //弹框
                        wx.showToast({
                                title: '手机号不能为空',
                                icon: 'error',
                                duration: 2000,
                                mask:true
                        })
                        return;
                }
                var regex = /^1[3456789]\d{9}$/;
                if(!regex.test(email)){
                        //弹框
                        wx.showToast({
                                title: '请输入正确的手机号码',
                                icon: 'error',
                                duration: 2000
                        })
                        return;
                }
                if(!pass){
                        wx.showToast({
                                title: '密码不能为空',
                                icon: 'error',
                                duration: 2000
                        })
                        return;
                }
                //通过了之后调用登录接口

                let login = await request("/login/cellphone",{phone:email,password:pass,isLogin:true});
                if(login.code == 200){
                        wx.showToast({
                                title: "登录成功！",
                                icon: 'success',
                                duration: 2000
                        });
                        //把用户数据存储到本地
                        wx.setStorageSync('userInfo', JSON.stringify(login.profile));                
                        //关闭所有页面，打开到应用内的某个页面
                        wx.reLaunch({
                          url: '/pages/my/my',
                        })
                }else if(login.code == 502){
                        wx.showToast({
                                title: "手机或"+login.msg,
                                icon: 'error',
                                duration: 2000
                        })
                }else{
                        wx.showToast({
                                title: login.msg,
                                icon: 'error',
                                duration: 2000
                        })
                        //return;
                }
                console.log(login);
        },
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                wx.initFaceDetect({//初始化引擎
                        success:(res)=>{
                                console.log("人脸引擎初始化成功");
                                //创建一个相机上下文
                                const context = wx.createCameraContext();
                                console.log("相机上下文成功");
                                //打开相机
                                const listener = context.onCameraFrame((frame) => {
                                        console.log(frame.data instanceof ArrayBuffer, frame.width, frame.height)
                                        //frame 帧
                                        wx.faceDetect({//调用人脸识别
                                                frameBuffer:frame.data,
                                                width:frame.width,
                                                height:frame.height,
                                                enablePoint:true,//当前图像的人脸
                                                success:(res)=>{
                                                        console.log(res);
                                                }
                                        })
                                },1000);//一秒读取一帧
                                console.log("配置完成");
                                //开始侦听
                                listener.start({
                                        fail:(e)=>{
                                                console.log("错误提示",e);
                                        }
                                });
                        },
                        fail:(res)=>{
                                console.log("人脸引擎启动失败");
                        }
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