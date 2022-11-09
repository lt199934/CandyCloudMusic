//歌曲时长工具类
export default function formatSongTime(inputTime) {    
    var date = new Date(inputTime);  //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var minute = date.getMinutes();  
    var second = date.getSeconds();  
    minute = minute < 10 ? ('0' + minute) : minute;    
    second = second < 10 ? ('0' + second) : second;   
    return minute + ':' + second;    
};