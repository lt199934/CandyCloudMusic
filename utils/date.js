/** 
 * 时间戳格式化函数 
 * @param  {string} format    格式 
 * @param  {int}    timestamp 要格式化的时间 默认为当前时间 
 * @return {string}           格式化的时间字符串 
 */

export default function formatDateTime(inputTime) {    
    var date = new Date(inputTime);  //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var y = date.getFullYear();    
    var m = date.getMonth() + 1;    
    m = m < 10 ? ('0' + m) : m;    
    var d = date.getDate();    
    d = d < 10 ? ('0' + d) : d;    
    var h = date.getHours();  
    h = h < 10 ? ('0' + h) : h;  
    var minute = date.getMinutes();  
    var second = date.getSeconds();  
    minute = minute < 10 ? ('0' + minute) : minute;    
    second = second < 10 ? ('0' + second) : second;   
    return m + '月' + d + "日";    
};