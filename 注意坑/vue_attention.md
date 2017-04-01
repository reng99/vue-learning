<h4>这是自己在开发中遇到的问题的汇总</h4>

<ol>
	<li>
		使用Vue.nextTick(function(){}) <br>
		<p>使用这个事件，能够保证在dom更新之后对页面操作的成功</p>
	</li>
	<li>
		created钩子事件 <br>
		<p>这是创建完成的钩子事件，在这个钩子函数中created(){}实现对dom的操作没问题，已经创建出来了嘛</p>
	</li>
	<li>
		mounted钩子事件 <br>
		<p>这是挂载之后的钩子事件，在这个钩子函数中 mounted(){}，可以使用在index.html中引入的资源.js文件等</p>
	</li>
	<li>
		在使用v-model的时候，需要在data中进行初始化
	</li>
	<li>
		在使用事件的改变的时候要使用@change,vue中是没有@select的
	</li>
	<li>
		用冒号（:）绑定属性，这里是动态绑定的意思。 <br>
		<p>比如option的标签中，:value就是绑定option标签的value值， 这样获取到的值就是绑定的值了，本身的值就是text了</p>
	</li>
	<li>
		父组件传递消息给子组件<br/>
		<p>
			`
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
			`
		</p>
	</li>
	<li>
		子组件向父组件传递消息<br/>
		<p>
			`
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
			`
		</p>
	</li>
	<li>
		watch观察属性变化 <br>
		<p>一般用来观察计算属性产生的变化</p>
	</li>
	<li>
		有待补充... <br>
	</li>
</ol>
