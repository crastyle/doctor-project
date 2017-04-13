var cropper = require('./cropperController')
import $ from 'jquery'
import "../../styles/cropper.scss"
import resource from '../../resource'
export default {
  name: 'Cropper',
  data() {
    return {
      msg: 'Welcome to Cropper',
      cropperImagesOption: {
        image: '',
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        bucket: 'patient'
      },
      redirect: ''
    }
  },
  methods: {
    upload() {
      let _this = this
      this.cropperImagesOption.x = parseInt(this.cropperImagesOption.x)
      this.cropperImagesOption.y = parseInt(this.cropperImagesOption.y)
      this.cropperImagesOption.height = parseInt(this.cropperImagesOption.height)
      this.cropperImagesOption.width = parseInt(this.cropperImagesOption.width)
      resource.uploadImageWithCrop(this.cropperImagesOption).then(res => {
        let imgurl = res.body.result.imageUrl
        if(_this.redirect == "More") {
          resource.updateUserInfo({headImg: imgurl}).then(res => {
            if (res.body.code == 0) {
              _this.$router.replace(_this.redirect)
            }
            
          })
        } else {
          _this.$router.push({ name: _this.redirect, params: { imgurl: imgurl } })
        }
      })
    },
    change(event) {
      this.cropperImagesOption.image = event.target.files[0]
    }
  },
  mounted() {

    let _this = this
    _this.redirect = this.$route.query.redirect
    $(function () {
      var $image = $('#viewPic');  //预览图片的容器
      var $inputImage = $('#upload');  // 上传图片file控件
      var $uploadBtn = $('#J-submit');  // 保存按钮

      var options = {    // 裁剪的参数,正方形比例.
        aspectRatio: 1 / 1,
        crop: function (e) {
          _this.cropperImagesOption.x = e.x;
          _this.cropperImagesOption.y = e.y;
          _this.cropperImagesOption.width = e.width;
          _this.cropperImagesOption.height = e.height;
        }
      };

      $image.cropper(options);


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
    });
  }
}