这是自己在开发中遇到的问题的汇总

1.使用Vue.nextTick(function(){})
	使用这个事件，能够保证在dom更新之后对页面操作的成功

2.created钩子事件
	这是创建完成的钩子事件，在这个钩子函数中created(){}实现对dom的操作没问题，已经创建出来了嘛

3.mounted钩子事件
	这是挂载之后的钩子事件，在这个钩子函数中 mounted(){}，可以使用在index.html中引入的资源.js文件等

4.在使用v-model的时候，需要在data中进行初始化

5.在使用事件的改变的时候要使用@change,vue中是没有@select的

6.用冒号（:）绑定属性，这里是动态绑定的意思。
	比如option的标签中，:value就是绑定option标签的value值， 这样获取到的值就是绑定的值了，本身的值就是text了

7.父组件传递消息给子组件<br/>
这里给出简单的例子：<br/>
在父组件中:<br/>
...<br/>
`<child-component :title="title"></child-component>`//这里的:title是传递到子组件内的属性，而title是父组件数据<br/>
...<br/>
data(){<br/>
	return {<br/>
		title:"rengjia"<br/>
	}<br/>
}<br/>
...<br/>
在子组件中:<br/>
`<h1>{{title}}</h1>`<br/>
...<br/>
props:{<br/>
	title:{//可以在里面设置默认值<br/>
		type:String<br/>
	}<br/>
}<br/>
...<br/>

8.子组件向父组件传递消息<br/>
这里给出简单的例子:<br/>
在父组件中:<br/>
...<br/>
`<child-component v-on:child-say="listenToMyChild"></child-component>`<br/>
`<p>{{msg}}</p>`<br/>
...<br/>
data(){<br/>
		return{<br/>
			msg:''<br/>
		}<br/>
},<br/>
methods:{<br/>
	listenToMyChild(data){<br/>
		this.msg=data;<br/>
	}<br/>
}<br/>
...<br/>
在子组件中：<br/>
...<br/>
`<button @click="toParent"></button>`<br/>
...<br/>
data(){<br/>
	return {<br/>
		message:"this is the child message";<br/>
	}<br/>
},<br/>
methods:{<br/>
	toParent(){<br/>
		this.$emit("child-say",this.message);<br/>
	}<br/>
}<br/>
...<br/>

9.未完待续...
