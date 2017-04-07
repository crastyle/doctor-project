var cropper = require('./cropperController')
import $ from 'jquery'
import "../../styles/cropper.scss"
export default {
  name: 'Cropper',
  data() {
    return {
      msg: 'Welcome to Cropper'
    }
  },
  mounted() {
    $(function () {
      var $image = $('#viewPic');  //预览图片的容器
      var $inputImage = $('#upload');  // 上传图片file控件
      var $uploadBtn = $('#J-submit');  // 保存按钮
      var cropperImagesOption = {   // 提交裁剪的参数
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        file: $inputImage[0]
      };
      var options = {    // 裁剪的参数,正方形比例.
        aspectRatio: 1 / 1,
        crop: function (e) {
          cropperImagesOption.x = e.x;
          cropperImagesOption.y = e.y;
          cropperImagesOption.width = e.width;
          cropperImagesOption.height = e.height;
        }
      };
      // Cropper
      $image.on({
        'build.cropper': function (e) {
          console.log(e.type);
        },
        'built.cropper': function (e) {
          console.log(e.type);
        },
        'cropstart.cropper': function (e) {
          console.log(e.type, e.action);
        },
        'cropmove.cropper': function (e) {
          console.log(e.type, e.action);
        },
        'cropend.cropper': function (e) {
          console.log(e.type, e.action);
        },
        'crop.cropper': function (e) {
          console.log(e.type, e.x, e.y, e.width, e.height, e.rotate, e.scaleX, e.scaleY);
        },
        'zoom.cropper': function (e) {
          console.log(e.type, e.ratio);
        }
      }).cropper(options);


      // Import image
      var URL = window.URL || window.webkitURL;
      var blobURL;

      $inputImage.change(function () {
        var files = this.files;
        var file;

        if (!$image.data('cropper')) {
          return;
        }

        if (files && files.length) {
          file = files[0];
          $uploadBtn.show();

          if (/^image\/\w+$/.test(file.type)) {
            blobURL = URL.createObjectURL(file);
            $image.one('built.cropper', function () {

              // Revoke when load complete
              URL.revokeObjectURL(blobURL);
            }).cropper('reset').cropper('replace', blobURL);

            $inputImage.val('');
          } else {
            window.alert('Please choose an image file.');
          }
        }
      });
      var form = new FormData();
      for (var key in cropperImagesOption) {
        form.append(key, cropperImagesOption[key]);
      }



      //关注这里就可以啦,点击提交的按钮,将图片提交到后台,url的接口由后台给你
      $uploadBtn.on('click', function () {
        $.ajax({
          url: 'upload.php',   //图片上传的接口
          method: 'post',
          dataType: 'json',
          data: form,
          processData: false,  // 告诉jQuery不要去处理发送的数据
          contentType: undefined,   // 告诉jQuery不要去设置Content-Type请求头
          success: function (data) {
            if (data.status == 1) {
              //上传成功
            }
          }
        })
      })
    });
  }
}