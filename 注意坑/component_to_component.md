## 组件挂载到组件的元素中


> 当需要在一个.vue组件中引入另外一个.vue组件内容，比如在弹窗中引入.vue组件。

例子回更加容易理解:

Test.vue

```bash
<template>
    <div id="test">
        this is the test
    </div>
</template>
<style lang='less' scoped>
    #test{
        color: blue;
    }
</style>
```

```javascript
import Test from '/path/to/Test.vue'
export default {
  methods: {
    adminLogin: function () {
      let vm = this;
      let wrapper = document.createElement('div');
      wrapper.id = 'myapp';
      vm.$nextTick(function(){
          swal({
              text:'登录',
              content: wrapper,
              buttons:{
                  signIn: '登录'
              }
          }).then((value)=>{
              if(value == 'signIn'){
                  console.log('login')
              }else{
                  console.log('hide the modal');
              }
          });
          new Vue(Test).$mount('#myapp') // 重点
       });
    }
  }
}
```

上面的代码我使用到了`sweetalert`，具体可以看[sweetalert官网](https://sweetalert.js.org/) 和 我上一次写的[vue 和 sweetalert结合使用的心得](./vue_and_sweetalert.md)
