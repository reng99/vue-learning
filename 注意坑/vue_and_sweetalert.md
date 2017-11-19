## vue和sweetalert的结合使用心得

本篇文章是基于[sweetalert](https://sweetalert.js.org/)2.0版本和[vuejs](https://cn.vuejs.org/)2.0版本结合使用的讲解。

**引入外部的html代码**

`sweetalert`2.0是不支持 html属性的，在2.0上面content中使用html,下面是一个集合vue的demo

```javascript

alertMeg: function(msg){
  let wrapper = document.createElement("div");
  wrapper.innerHTML = `<h1 style="color:red;">this is HTML Wrapper</h1>`;
  
  swal({
    text: msg,
    content: wrapper,
    button: ["cancel","I know"],
    dangerMode: true
  }).then();
}


```

