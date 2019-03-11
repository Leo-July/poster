<template>
  <div v-if="value"
       class="poster-wrapper no-select">
    <div class="content"
         @click.stop="stop">
      <a :href="output">
        <figure class="poster">
          <img width="100%"
               :src="output">
        </figure>
      </a>

      <div ref="printMe"
           class="bg">
        <img v-if="bg"
             class="bg"
             :src="bg"
             width="100%"
             :ref="bg">
        <img width="100%"
             :src="code"
             class="code"
             :ref="code">
      </div>

    </div>
  </div>
</template>
<script>
import QRCode from 'qrcode'

export default {
  name: 'Poster',
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    local: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: 'http://leojuly.top/'
    },
    value: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      output: null,
      code: '',
      bg: ''
    }
  },
  methods: {
    stop () {

    },
    /**
 *
 * @param url 图片路径
 */
    getUrlBase64 (imageURL) {
      if (this.local) {
        this.bg = this.bgImage
      } else {
        return new Promise((resolve, reject) => {
          try {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            var img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = function () {
              canvas.width = img.naturalWidth;
              canvas.height = img.naturalHeight;
              context.drawImage(img, 0, 0);
              context.getImageData(0, 0, 1, 1);
              resolve(canvas.toDataURL())
            };
            img.onerror = function (err) {
              reject(err)
            }
            img.src = imageURL;
          } catch (e) {
            reject(e)
          }

        }).then(res => {
          this.bg = res
        })
      }

    },
    generatorCode () {
      QRCode.toDataURL(this.url)
        .then(async (url) => {
          this.code = url
        })
    },
  },
  mounted () {
    this.$nextTick(() => {
      // this.getUrlBase64()
      Promise.all([this.getUrlBase64(this.bgImage), this.generatorCode()]).then(() => {
        const el = this.$refs.printMe
        const options = {
          type: 'dataURL',
          Length: 'auto'
        }
        this.$nextTick(async () => {
          let res = await this.$html2canvas(el, options)
          this.output = res
        })
      })
    }
    )
  }
}
</script>
<style lang="less" scoped>
.poster-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background: rgba(68, 70, 85, 0.9);
  z-index: 999;
}
.no-select {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}
figure {
  margin: 0;
}
.content {
  position: relative;
  left: 50%;
  flex: 1;
  width: 300px;
  margin: 54px 0;
  overflow-x: hidden;
  overflow-y: auto;
  transform: translateX(-50%);
}
.bg {
  position: relative;
  width: 100%;
  height: 400px;
  z-index: -1;
}
.code {
  position: absolute;
  width: 60px;
  left: 50%;
  bottom: 60px;
  transform: translate3d(-50%, 0, 0);
}
.poster {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 400px;
  background: rgba(68, 70, 85, 1);
}
</style>
