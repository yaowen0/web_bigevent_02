// 入口函数
$(function () {
    // 获取用于信息
    getUserInof();
    $('#btnLogout').on("click", function () {
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
            // 清空本地token
            localStorage.removeItem("token");
            // 页面跳转
            location.href = "/login.html";
            // 关闭询问框
            layer.close(index);
        });
    })
})
// 获取用于信息
// 因为后面 user页面 还需要调用这个函数 所以封装到全局
function getUserInof() {
    $.ajax({
        url: "/my/userinfo",
        // headers: {
        //     // 因为token保存时间为12个小时 需要重新登录 可能为空
        //     Authorization: localStorage.getItem("token") || ""
        // },
        // 判断状态码
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // 请求成功 渲染用户头像信息
            renderAvatar(res.data)
        }
    })
}
// 封装用户头像渲染函数
function renderAvatar(user) {
    // 用户名(昵称优先,没有的话先用username)
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    // 用户头像
    if (user.user_pic !== null) {
        // 有头像 头像展示 纯色圈隐藏
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".user-avatar").hide();
    }
    else {
        // 没有头像
        $(".layui-nav-img").hide()
        var text = name[0].toUpperCase()
        $(".user-avatar").show().html(text);
    }
}