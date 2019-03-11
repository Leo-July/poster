# poster

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### need install package

```
npm install vue-html2canvas qrcode --save
```

### 文档

| props   | description                   | type    | default               |
| ------- | ----------------------------- | ------- | --------------------- |
| value   | v-model 双向绑定 是否显示海报 | Boolean | true                  |
| bgImage | 背景图片                      | String  | ''                    |
| local   | 背景图片是否是本地 base64     | Boolean | false                 |
| url     | 生成二维码的网址              | String  | 'http://leojuly.top/' |

#### Demo

- 背景网络图片

```
  <Poster bgImage="https://i.imgur.com/fRdrkI1.jpg"/>
```

- 背景本地 base64

```
  <Poster :bgImage="bgBase64" :local="true"/>
```

### QA

##### 为什么要把网络图片转成 base64？

###### 因为 canvas 合成图片必须是本地图片

##### 使用网络图片速度为什么那么慢

###### 消耗时间主要是在把背景网络图片转为 base64，解决办法

- 接口合成海报（这个方法就不用前端做什么工作了）
- 把背景图片直接转成 base64 存在项目的一个 js 文件导出（最简单暴力的做法）

##### 为什么使用的网络图片报跨域错误
###### 虽然代码中设置了`img.crossOrigin=''`,但是图片服务器也需要配置Access-Control-Allow-Origin信息


### 参考
[解决canvas图片getImageData,toDataURL跨域问题](https://www.zhangxinxu.com/wordpress/2018/02/crossorigin-canvas-getimagedata-cors/)
[js 图片转base64的方式](https://juejin.im/post/5addf74551882567395459e1)
[利用canvas实现保存图片时，拼上二维码的需求](https://segmentfault.com/a/1190000015547703)

