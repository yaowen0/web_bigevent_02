$(function () {
    $("#link_reg").on("click", function () {
        $('.login_box').hide();
        $(".reg_box").show()
    })
    $("#link_login").on("click", function () {
        $('.login_box').show();
        $(".reg_box").hide()
    })
    var form = layui.form;
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,16}$/, "密码必须6-16位,且不能输入空格"
        ],
        // 确认密码规则
        repwd: function (value) {
            var pwd = $(".reg_box input[name=password]").val();
            if (pwd !== value) {
                return "两次密码输入不一致!"
            }
        }
    })
    // 注册功能
    var layer = layui.layer;
    $("#form_reg").on("submit", function (e) {
        // 阻止表单提交
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: "post",
            url: "/api/reguser",
            data: {
                username: $(".reg_box input[name=username]").val(),
                password: $(".reg_box input[name=password]").val()
            },
            success: function (res) {
                // 返回状态判断
                if (res.status != 0)return layer.msg(res.massage)
                layer.msg("注册成功,请登录!");
                // 手动切换到登录表单
                $("#link_login").click();
                // 重置form表单
                $("#form_reg")[0].reset();
            }
        })
    })
    // 登录功能
    $("#form_login").submit(function (e) {
        // 阻止表单提交
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: "post",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                // 返回状态判断
                if (res.status != 0)return layer.msg(res.massage)
                layer.msg("恭喜你,登录成功!");
                // 保存token 并跳转
                localStorage.setItem('token',res.token)
                location.href="/index.html"
            }
        })
    })
})