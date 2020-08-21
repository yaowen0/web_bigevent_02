$(function () {
    var form = layui.form;
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,16}$/, "密码必须6-16位,且不能输入空格"
        ],
        // 新旧不重复
        samePwd: function (value) {
            // value是新密码 旧密码需要获取
            if (value == $("input[name=oldPwd]").val()) {
                return "新密码和旧密码不能相同!"
            }
        },
        // 确认密码规则
        rePwd: function (value) {
            // value是再次输入的密码 新密码需要获取
            if (value !== $("input[name=newPwd]").val()) {
                return "两次新密码密码输入不一致!"
            }
        }
    })

    // 表单提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('修改密码成功');
                $('.layui-form')[0].reset();
            }
        })
    })
})
