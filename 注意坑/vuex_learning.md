## the learning part

> this is the project's learning 

## vuex 

this part is the learning about vuex

准备工作

> 引入相关的vuex ，然后在webpack的入口文件中添加vuex 

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import store from '/path/to/vuex'
const initApp = new Vue({
    store: store
});
```


在入口程序中输入了相关的`store`之后，在整一个的应用的根部就可以有一个`$store`那个挂在点了，直接通过`this.$store`进行调用。

### state

> 基本是依照官网的来

> 我现在在`state.js`里面放一个user的数据结构：

```javascript
export default {
    user:{
        account: '123',
        mail: '1837895991@qq.com',
        name: 'reng99',
        sex: 'male',
        phone: '18819473489',
        uid: '123'
    }
}
```

获取state里面的数据，可以通过下面的两种方法进行：

**method 1: computed中不使用映射访问**

demo直接进行:

```javascript
computed: {
    sex:function () {
        return this.$store.state.user.sex;
    }
}
```

**methos 2: 通过mapState辅助函数进行映射的访问**

```javascript
<script>
    import {mapState} from 'vuex'
    export default {
        computed: mapState({
            user: state => state.user
        })
    }
</script>
```

### getters

使用`getters`，这里我在state中建立了相关的数据结构（层级为一级）

```javascript
todos: [
        {id: 1, text: 'reng test1',done: true},
        {id: 2, text: 'reng test2',done: false},
        {id: 3, text: 'reng test3',done: true},
    ]
```

然后在新建的`getters.js`文件中进行下面的操作:

```javascript
export default {
    doneTodos(state,getters,rootState){
        return state.todos.filter(todo => todo.done);
    }
}
``` 

紧接着就是在相关的组件的`computed`属性中进行调用了。

```javascript
computed: {
    doneTodos: function (){
        return this.$store.getters.doneTodos;
    }
}
```

也有mapGetters进行映射，如果需要用到，自行查看手册就行了，这里不讲。

### mutation

mutation 是去更改向光的state的值。这里演示使用mutation-type.js和不使用它的情况。

> 使用mutation-types.js主要是为了方便管理

**不使用mutation-typs.js的情况**

⚠️ 注意啊，不能漏了映射，这个还得我郁闷了些时间

直接来demo吧：

```javascript
// mutations.js
const INCREASE = INCREASE; // 不能漏啊
export default {
    [INCREASE] (state,data) {
        state.music.num++;
    }
}
```

**使用mutation-type.js**

同样，直接上demo：

```javascript
// mutation-types.js
export const INCREASE = 'INCREASE'
```

```javascript
// mutations.js
import { INCREASE } from './mutation-types'
export default {
    [INCREASE] (state,data) {
        state.music.num++;
    }
}
```

上面两个写好，都是通过在相关的组件中触发:

```javascript
methods: {
    increase: function () {
        var vm = this;
        vm.$store.commit('INCREASE');
    }
}
```

### actions

actions跟mutations相似，都是改变state，不同点看官网介绍，我这里直接上demo:

在相关的组件中

```javascript
methods: {
    decrease: function () {
        this.$store.dispatch('decrease');
    }
}
```

然后我在actions.js中进行下面的编写:

```javascript
export const decrease = ({dispatch,commit,state},query) => {
    state.music.num--;
}
```

### 结尾

到这里已经讲完了相关的内容，我这里放出自己的目录结构吧： 

```bash
src
    components
        demo.vue
    js
        index.js
    router
        index.js
    store
        actions.js
        getters.js
        index.js
        mutation-types.js
        mutations.js
        state.js
```

每个文件的代码如下：（因为比较少，全放了）

```javascript
// components/demo.vue
<template>
    <div id="demo">
        this is the demo 二二
        <button @click="show">button</button>
        <!--<h1>{{user.mail}}</h1>
        <h1>{{user.name}}</h1>-->
        <h1 v-for="item in doneTodos">{{item.text}}</h1>
        <button @click="increase">increase</button>
        <button @click="decrease">decrease</button>
        <h1>{{num}}</h1>
    </div>
</template>

<script>
    export default {
        name:'demo',
        data () {
            return {
                
            }
        },
        methods: {
            show: function () {
                console.log("reng99");
            },
            increase: function (){
                this.$store.commit('INCREASE');
            },
            decrease: function () {
                this.$store.dispatch('decrease');
            }
        },
        created: function () {

        },
        components:{

        },
        computed:{
            doneTodos: function () {
                return this.$store.getters.doneTodos;
            },
            num: function () {
                return this.$store.state.music.num;
            }
        }
       
    }
</script>
<style lang="less" scoped>
    #demo{
        color: blue;
        h1{
            color: red;
        }
    }
</style>
```

```javascript
// js/index.js js入口文件
import Vue from 'vue'

import router from '../router/index.js'

import store from '../store/index'

const initApp = new Vue(
    {
        router: router,
        store: store
    }
).$mount('#app')
```

```javascript
// router/index.js  路由文件
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import demo from '../components/demo.vue'

const router = new VueRouter({
    routes:[
        {
            path:'/',
            name:'demo',
            component: demo
        }
    ]
});

export default router
```

```javascript
//  store/actions.js
export const decrease = ({dispatch,commit,state},query) => {
    state.music.num--;
}

// store/getters.js
export default {
    doneTodos(state,getters,rootState){
        return state.todos.filter(todo => todo.done);
    }
}

// store/index.js vuex的入口文件
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import state from './state' // state
import getters from './getters' // getter
import mutations from './mutations' // mutations
import * as actions from './actions' // actions

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

// store/mutation-types.js
export const INCREASE = 'INCREASE'

// store/mutations.js
import { INCREASE } from './mutation-types'
export default {
    [INCREASE] (state,data) {
        state.music.num++;
    }
}

// store/state.js
export default {
    user:{
        account: '123',
        mail: '1837895991@qq.com',
        name: 'reng99',
        sex: 'male',
        phone: '18819473489',
        uid: '123'
    },
    todos: [
        {id: 1, text: 'reng test1',done: true},
        {id: 2, text: 'reng test2',done: false},
        {id: 3, text: 'reng test3',done: true},
    ],
    music:{
        num: 0
    }
}
```
