# vue-load-script

### Install

``` js
# npm
npm install --save vue-load-script
``` 

``` js
# yarn
yarn add vue-load-script
``` 

### Use

``` js
import LoadScript from 'vue-load-script'
Vue.use(LoadScript)
``` 

``` js
Vue.$loadScript(url, script, maxTime, time)
```
url: 脚本路径地址

script: 脚本名字 加载完会生成的全局变量名 例如加载 wx-js 会有 window.wx

maxTime: 脚本加载最长时间

time: 轮询时长

### Demo

``` js
async created() {
  const isDone = await this.$loadScript('//res.wx.qq.com/open/js/jweixin-1.2.0.js', 'wx', 10000, 10)
  if (isDone) {
    console.log('script load done')
  }
}
```