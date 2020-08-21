// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

// 选择文件
$("#btnChooseImage").on("click", function () {
    $("#file").click()
})
// 修改裁剪文件
var layer = layui.layer;
$('#file').on("change", function (e) {
    // 拿到用户选择的文件
    var file = e.target.files[0];
    // 前端非空校验
    // if (file == undefined) {
    //     return layer("请选择图片")
    // }
    // 根据选择的文件,创建一个对应的url地址
    var imgUrl = URL.createObjectURL(file)
    // 先销毁旧的裁剪区域,再重新设置图片路径
    $image
    .cropper("destroy") //销毁旧的裁剪区域
    .attr('src',imgUrl) //重新设置图片路径
    .cropper(options) //重新初始化裁剪区域
})
$('#btnUpload').on('click', function () {
    // 获取base64类型的头像(字符串)
    var dataURL = $image
        .cropper("getCroppedCanvas", {
            width: 100,
            height: 100
        })
        .toDataURL('image/png');
    $.ajax({
        // 发送ajax
        method: "POST",
        url: "/my/update/avatar",
        data: {
            avatar:dataURL
        },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg("恭喜你,更换头像成功")
            window.parent.getUserInof()
        }
    })
})