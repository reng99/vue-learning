## vue的生命周期解析

在学习vue框架构建前端项目的时候，需要用到vue提供的钩子，那么，应该什么时候去使用呢？这就涉及到了vue的生命周期了。在开题之前，先放上一张从官网下载的vue的生命周期的图片--

![vue_life_cycle](./imgs/vue_life_cycle.png)

为了方便解析，自己用vue_cli搭建了一个项目，只是改写了生成的`src/components/HelloWorld.vue`文件和`src/main.js`。改成如下内容--

HelloWorld.vue

```bash

<template>
  <h1>hello world</h1>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>


```

main.js

```javascript

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  data () {
    return {
      msg: 'vue life cycle'
    }
  },
  methods:{
  	sayHi: function(){
  		return "hello";
  	}
  },
  beforeCreate: function(){
    console.log('\n-- 创建前 --');
    console.log("data msg --> "+this.msg); // 获取不到data的属性
    console.log(this.$el);	// 获取不到所挂载的元素 
  },
  created: function(){
    console.log('\n-- 创建后 --');
    console.log("data msg --> "+this.msg); // 开始可以获取到data的属性
    console.log(this.$el);	// 获取不到所挂载的元素
    console.log(this.sayHi()); // 开始获取到方法
  },
  beforeMount: function(){
    console.log('\n-- 挂载前 --');
    console.log("data msg --> "+this.msg);
    console.log(this.$el);	// 开始获取到所挂在的元素
  },
  mounted: function(){
    console.log('\n-- 挂载后 --');
    console.log("data msg --> "+this.msg);
    console.log(this.$el);  // el 被新创建的vm.$el替换
  },
  beforeUpdate: function(){
  	
  },
  updated: function(){  

  },
  beforeDestroy: function(){ 

  },
  destroy: function(){

  }
});



```

本讲解是在结合官网的基础上进行的解析。[详细参考官网](https://cn.vuejs.org/v2/api/#beforeCreate)