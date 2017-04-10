### 下面是自己在使用vue开发的过程中遇到的问题

- [使用vue.nextTick](https://cn.vuejs.org/v2/api/#Vue-nextTick)

在框架中和其他技术，比如`webpack`一起使用的时候，应当这样使用`this.$nextTick(function(){})`，这里的this就是vue对象`vm`
使用这个钩子事件，能够保证在dom更新完之后对页面进行操作
```bash 

自己尝试在created 和 mounted 钩子事件中直接调用this.$nextTick(function(){}),发现无效。
在定义的事件里面进行的时候是有效的

```


- [使用created钩子](https://cn.vuejs.org/v2/api/#created)

这是创建完成的钩子事件，在这个钩子事件中实现对dom的操作，顾名思义，在这里是dom已经被创建出来了


- [使用mounted钩子](https://cn.vuejs.org/v2/api/#mounted)

这是挂载完成的钩子事件，在这个钩子事件中，可以使用在`index.html`中引入的各种资源，比如.css,.js。


- [使用v-model](https://cn.vuejs.org/v2/guide/forms.html#v-model-与组件)

在使用v-model的时候，需要在data中进行初始化，而这个v-model是对表单进行使用。
```bash

eg:
	在template中
	<input v-model="msg"/>
	<div>{{msg}}</div>
	在script中
	data(){
		return{
			msg:''   //需要进行初始化
		}
	}

```


- [@change的使用](https://cn.vuejs.org/v2/guide/migration.html#vm-watch-changed)

在使用事件的改变的时候，要使用@change,vue中是没有@select的，所以在使用select的标签的时候需要注意


- [使用冒号:绑定属性](https://cn.vuejs.org/v2/api/#v-bind)

使用(:)绑定属性，这里是动态绑定的意思。
```bash

eg:
	在option的标签中，:value就是半丁option标签的value值，这样获取到的值就是绑定的值，本省的值就是text了。

```


- [父组件传递消息给子组件](#parentToChild)

<a id="parentToChild"></a>
这里给出个简单的例子
```bash

eg:
	在父组件中：
		template中
		<child-component :title=title></child-component>  <!--这是将父titel传给子title,通过绑定属性:冒号实现-->
		script中
		import childComponent from './path-to-child.vue'  //这里是child组件的路径
		data(){
			return{
				title:'from parent'  //父title
			}
		},
		components:{
			childComponent:childComponent  //这里可以简写为childComponent
		}
	在子组件中：
		template中
		<div>{{title}}</div>  <!--这里将显示从父组件传过来的title,也就是‘from parent’-->
		script中
		props:{
			title:{
				type:String,  //这里是设置字段title的类型
				default:'child'  //这里是设置字段title的默认值，在进行数据交互时候需要将它删除，这里是需要删除的
			}
		}

```


- [子组件向父组件传递消息](#childToParent)

<a id="childToParent"></a>
这里给出一个简单的例子：
```bash

eg:
	在父组件中
		template中
		<child-component v-on:child-say="listenToMyChild"></child-component><!--child-say是从子组件传递过来的事件-->
		<div>{{msg}}</div><!--这里将显示从子组件传递过来的信息msg，也就是‘this is the child message’-->
		script中
		import childComponent from './path-to-child.vue'  //这里是child组件的路径
		data(){
			return{
				msg:''  //这里要进行字段msg初始化
			}
		},
		methods:{
			listenToMyChild(data){
				this.msg = data;	//这个data参数是从子组件传递过来的数据
			}
		},
		components:{
			childComponent:childComponent  //这里可以简写为childComponent
		}
	在子组件中：
		template中
		<button @click="toParent">toParent</button>
		script中
		data(){
			return{
				message:'this is child message'
			}
		},
		methods:{
			toParent(){
				var vm = this;
				this.$emit('child-say',this.message);
			}
		}

```


- [watch使用](https://cn.vuejs.org/v2/guide/transitioning-state.html#状态动画-与-watcher)

watch是用来观察属性的变化
watch一般是用于观察计算属性产生的变化


- [类名和style的使用](https://cn.vuejs.org/v2/guide/class-and-style.html#main)

类名和style的使用一般用于动态改变样式，所以也要用到绑定属性。下面给出个简单的例子
```bash
eg:
	在template中
	<template v-for="server in servers">
		<div class="box-header with-border" :class="{'active':server===currentId}">server</div>
	</template>
	<!--这里的server时假设渲染的时候得到的数据-->
	在script中
	data(){
		return{
			servers:['0','1','2','3'],
			currentId:"1"//当然这里的字段的数值也可以在store中获取，这里为了方便，写在了data中
		}
	}
	在style中
	.active{
		color:red;
	}

按照上面的解说进行执行的话，会在渲染出来的页面中看到下面的结果
0
1
2
3
//其中'1'的颜色时红色的，其他的是默认的颜色

```


- [style中scoped的讲解](#style)

<a id="style"></a>
在style中般都会加上scoped来限制当前组将中样式名，防止发生样式名发生冲突。
```bash
eg:
	在component1.vue中
	<template>
		<div id="reng">red</div>
	</template>
	<style lang="less" scoped>
		#reng{
			color:red;
		}
	</style>

	在component2.vue中
	<template>
		<div id="reng">yellow</div>
	</template>
	<style lang="less" scoped>
		#reng{
			color:yellow;
		}
	</style>

//执行上面的两个组件，虽然组件里面都有相同的id为reng,但是她们互不影响，这就是添加scoped的好处。

```


- [注意代码的简化](#simple)

<a id="simple"></a>
```bash

eg：
	error-example:
	template中
	<button @click="showTemplate(arg0,arg1,arg2,arg3)"></button>
	<div>{{tinyName.join("  / ")}}</div>
	script中
	data(){
		return{
			tinyName:[]
		}
	}
	methods:{
		showTemplate(listId,firstLevelName,secondLevelName,assignName){
			let vm = this;
			vm.tinyName.push(firstLevelName);
			vm.tinyName.push(secondLevelName);
			vm.tinyName.unshift(assignName);
			...
		}
	}

	right-example:
	template中
	<button @click="showTemplate(arg0,arg1,arg2,arg3)"></button>
	<div>{{tinyName.join("  / ")}}</div>
	script中
	data(){
		return{
			tinyName:[]
		}
	}
	methods:{
		showTemplate(listId,firstLevelName,secondLevelName,assignName){
			let vm = this;
			vm.tinyName=[assignName,firstLevelName,secondLevelName]
			...
		}
	}

```

- [有待补充...]















