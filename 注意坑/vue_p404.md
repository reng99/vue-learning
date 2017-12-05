## 404页面的跳转

在路由的js中添加下面的判断

```javascript

//未在路由表中的 重定向到首页或者p404
router.beforeEach((to, from, next) => {
  if (to.matched.length ===0) {//是否在路由表内
    // from.name ? next({ name:from.name }) : next('/p404');
    next('/p404');
  }
  if (to.meta.requireAuth) {//是否需要登录权限
        if (getcookie("logindata")) {
            next();
        }else {
            next("/login");
        }
    }else {
        next();
    }
});

```

不可使用`{path: '*', component: p404}`,因为它对二级的pathname不起作用

比如`/none`有作用，`/none/none`后页面就是乱糟糟的布局
