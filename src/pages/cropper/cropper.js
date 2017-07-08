var cropper = require('./cropperController')
import $ from 'jquery'
import "../../styles/cropper.scss"
import resource from '../../resource'
import base from '../../base'
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
      redirect: '',
      base64: ''
    }
  },
  methods: {
    upload() {
      let _this = this
      this.cropperImagesOption.x = parseInt(this.cropperImagesOption.x)
      this.cropperImagesOption.y = parseInt(this.cropperImagesOption.y)
      this.cropperImagesOption.height = parseInt(this.cropperImagesOption.height)
      this.cropperImagesOption.width = parseInt(this.cropperImagesOption.width)
      resource.uploadImageWithBase64Crop(this.cropperImagesOption, this.base64).then(res => {
        let imgurl = res.body.result.imageUrl
        if (_this.redirect == "More") {
          resource.updateUserInfo({ headImg: imgurl }).then(res => {
            if (res.body.code == 0) {
              _this.$router.replace({ name: _this.redirect })
            }
          })
        } else {
          _this.$router.replace({
            name: _this.redirect, params: { imgurl: imgurl }
          })
        }
      })
    }
  },
  mounted() {

    let _this = this
    _this.redirect = this.$route.query.redirect
    $(function () {
      var $image = $('#viewPic');  //预览图片的容器
     
      let width = document.documentElement.clientWidth;
      var options = {    // 裁剪的参数,正方形比例.
        aspectRatio: 1 / 1,
        cropBoxResizable: false,
        minCropBoxHeight: width,
        minCropBoxWidth: width,
        crop: function (e) {
          _this.cropperImagesOption.x = e.x;
          _this.cropperImagesOption.y = e.y;
          _this.cropperImagesOption.width = e.width;
          _this.cropperImagesOption.height = e.height;
        }
      };

      // Import image
      var URL = window.URL || window.webkitURL;
      var blobURL;
      base.uglyImage(_this.$route.query.src, function (url) {
        $image.cropper(options);
        $image.one('built.cropper', function () {

          // Revoke when load complete
          URL.revokeObjectURL(url);
          _this.base64 = url
       
        }).cropper('reset').cropper('replace', url);
      }, _this.$route.query.orient)
    });
  }
}