## vue的生命周期解析

在学习vue框架构建前端项目的时候，需要用到vue提供的钩子，那么，应该什么时候去使用呢？这就涉及到了vue的生命周期了。在开题之前，先放上一张从官网下载的vue的生命周期的图片--

![vue_life_cycle](./imgs/vue_life_cycle.png)

为了方便解析，自己用vue_cli搭建了一个项目，只是改写了生成的`src/components/HelloWorld.vue`文件。改成如下内容--

```bash

<template>
  <div>
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'vue life cycle'
    }
  },
  beforeCreate(){
    console.log('\n-- 创建前 --');
    console.log("data msg --> "+this.msg);
    console.log(this.$el);
  },
  created(){
    console.log('\n-- 创建后 --');
    console.log("data msg --> "+this.msg);
    console.log(this.$el);
  },
  beforeMount(){
    console.log('\n-- 挂载前 --');
    console.log("data msg --> "+this.msg);
    console.log(this.$el);
  },
  mounted(){
    console.log('\n-- 挂载后 --');
    console.log("data msg --> "+this.msg);
    console.log(this.$el);
  },
  beforeUpdate(){
    console.log("\n-- 更新前 --");
    console.log("data msg --> "+this.msg);
    console.log(this.$el);
  },
  updated(){
    console.log("\n-- 更新后 --");
    console.log("data msg --> "+this.msg);
    console.log(this.$el);  
  },
  beforeDestroy(){
    console.log("\n-- 销毁前 --");
    console.log("data msg --> "+this.msg);
    console.log(this.$el);
  },
  destroy(){
    console.log("销毁后");
    console.log("data msg --> "+this.msg);
    console.log(this.$el);
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>


```

在上面的代码中，自己指示针对了两种情况在生命周期的不同阶段进行测试，来理解官网给出来的生命周期图，加深理解。两种情况如下：

1. 是否获取到data()里面的数据

2. 是否挂载了元素到页面上 $el
