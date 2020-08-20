// 开发环境服务器地址
var baseUrl = "http://ajax.frontend.itheima.net";
// 拦截所有ajax请求
$.ajaxPrefilter(function (params) {
    // 拼接 对应环境的服务器地址
    params.url = baseUrl + params.url;
    if (params.url.indexOf("/my/") !== -1) {
        params.headers = {
            // 因为token保存时间为12个小时 需要重新登录 可能为空
            Authorization: localStorage.getItem("token") || ""
        }
    }
    params.complete = function (res) {
        console.log(res.responseJSON);
        var obj = res.responseJSON;
        if (obj.status == 1 && message == "身份认证失败！") {
            // 清空本地token
            localStorage.removeItem("token");
            // 页面跳转
            location.href = "/login.html";
        }
    }
})
