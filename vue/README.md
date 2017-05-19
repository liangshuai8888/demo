 .md   Markdown

 组件系统是 Vue 的另一个重要概念。 抽象,允许我们使用小型、自包含和通常可复用的组件构成大型应用。几乎任意类型的应用界面都可以抽象为一个组件树。
 在 Vue 里，一个组件本质上是一个拥有预定义选项的一个 Vue 实例
 // 定义名为 todo-item 的新组件
Vue.component('todo-item', {
  template: '<li>这是个待办项</li>'
})

我们可以使用 v-bind 指令将待办项传到每一个重复的组件中：
<div id="app-7">
  <ol>
    <!-- 现在我们为每个todo-item提供待办项对象    -->
    <!-- 待办项对象是变量，即其内容可以是动态的 -->
    <todo-item v-for="item in groceryList" v-bind:todo="item"></todo-item>
  </ol>
</div>

Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { text: '蔬菜' },
      { text: '奶酪' },
      { text: '随便其他什么人吃的东西' }
    ]
  }
})

将应用分割成了两个更小的单元，子单元通过 props 接口实现了与父单元很好的解耦。而不会影响到父单元。

Computed 计算属性  提供的函数将用作属性 vm.reversedMessage 的getter。  依赖于 vm.message，改变时，有依赖于 vm.reversedMessage 的绑定也会更新。 最妙的是我们已经以声明的方式创建了这种依赖关系：计算属性的 getter 是没有副作用，这使得它易于测试和推理。

Computed缓存 与 method
	1、最终的结果，两种方式是相同的
	2、计算属性是基于它们的依赖进行缓存的。 只有在它的相关依赖发生改变时才会重新求值。多次访问会立即返回之前的计算结果，而不必再次执行
	3、method，只要发生重新渲染，调用执行该函数，没有缓存
	4、模板内的表达式只用于简单的运算。模板中放入太多的逻辑会让模板过重且难以维护。

computed属性  VS watched属性
	watched属性：Vue提供通用的方式来观察和响应Vue实例上的数据变动。但当你有一些数据需要随着其它数据变动而变动时，通常更好的想法是使用 computed 属性而不是命令式的 watch 回调


计算setter
	计算属性默认只有 getter ，不过在需要时你也可以提供一个setter
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}

watched：
	然计算属性在大多数情况下更合适，但有时也需要一个自定义的 watcher 。当你想要在数据变化响应时，执行异步操作或开销较大的操作，这是很有用的。

var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 question 发生改变，这个函数就会运行
    question: function (newQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.getAnswer()
    }
  },
  methods: {
    // _.debounce 是一个通过 lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问yesno.wtf/api的频率
    // ajax请求直到用户输入完毕才会发出
    // 学习更多关于 _.debounce function (and its cousin
    // _.throttle), 参考: https://lodash.com/docs#debounce
    getAnswer: _.debounce(
      function () {
        var vm = this
        if (this.question.indexOf('?') === -1) {
          vm.answer = 'Questions usually contain a question mark. ;-)'
          return
        }
        vm.answer = 'Thinking...'
        axios .get('https://yesno.wtf/api')
          .then(function (response) {
            vm.answer = _.capitalize(response.data.answer)
          })
          .catch(function (error) {
            vm.answer = 'Error! Could not reach the API. ' + error
          })
      },
      // 这是我们为用户停止输入等待的毫秒数
      500
    )
  }
})

//使用 watch 选项允许我们执行异步操作（访问一个 API），限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。


class  style

对象语法：
<!-- v-bind:style 的对象语法十分直观，其实它是一个 JavaScript 对象。 CSS 属性名可以用驼峰式（camelCase）或短横分隔命名（kebab-case）： -->
//style通常绑定一个样式对象更好
	<div v-bind:style="styleObject"></div>
	data: {
	  styleObject: {
	    color: 'red',
	    fontSize: '13px'
	  }
	}
数组语法
<div v-bind:style="[baseStyles, overridingStyles]">
自动添加前缀
<!-- 	当 v-bind:style 使用需要特定前缀的 CSS 属性时，如 transform ，Vue.js 会自动侦测并添加相应的前缀。 -->
多重值  多个带前缀的值
<!-- <div :style="{ display: ["-webkit-box", "-ms-flexbox", "flex"] }"> -->


class
用在组件上   类将被添加到根元素上面，这个元素上已经存在的类不会被覆盖。
<!-- Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
}) -->

条件渲染
	<template> 中v-if条件组
	v-else     v-else-if
	#用key管理可复用的元素
		Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。
	<!-- 将不会清除用户已经输入的内容，两个模版使用了相同的元素，<input> 不会被替换掉——仅仅是替换了它的的 placeholder -->
		<template v-if="loginType === 'username'">
		  <label>Username</label>
		  <input placeholder="Enter your username">
		</template>
		<template v-else>
		  <label>Email</label>
		  <input placeholder="Enter your email address">
		</template>

	v-show,元素一定会渲染，简单的基于css切换

v-if  VS v-show
	v-if 是“真正的”条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
	v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
	相比之下， v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
	一般来说， v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件不太可能改变，则使用 v-if 较好。


当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。


v-for指令     列表渲染
	v-for 指令根据一组数组的选项列表进行渲染

template v-for 
	渲染多个元素块
	<ul>
	  <template v-for="item in items">
	    <li>{{ item.msg }}</li>
	    <li class="divider"></li>
	  </template>
	</ul>

对象迭代 v-for 通过一个对象的属性来迭代
	<ul id="repeat-object" class="demo">
	  <li v-for="value in object">  //对象
	    {{ value }}   //对象属性，迭代
	  </li>
	</ul>

	//更多的参数   值   键名  索引
<!-- 	<div v-for="(value, key, index) in object">
  {{ index }}. {{ key }} : {{ value }}
</div> -->
 	//按Object.keys() 的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下是一致的
 整数迭代 v-for
 	v-for 也可以取整数。在这种情况下，它将重复多次模板。
 <!-- 	<div>
 	  <span v-for="n in 10">{{ n }}</span>    1 2 3 4 5 6.。 
 	</div> -->

 组件 和 v-for
 	组件和普通元素，v-for用法一样。但是不能自动传递数据到组件里。组件有自己独立的作用域。用 props属性接受

 v-for width v-if
 	同一节点，v-for的优先级比v-if高，意味着 v-if 将分别重复运行于每个 v-if 循环中


数组更新检测
变异方法
	[mjuː'teɪʃ(ə)n]  突变 变化
	变异方法(mutation method)，顾名思义，会改变被这些方法调用的原始数组
	Vue包含一组 观察 数组的变异方法，所以它们也会触发视图更新

    push() 
    pop()
    shift()  删除 返回删除值
    unshift() 添加到数组开头 返回长度
    splice()
    sort()
    reverse()
	
	你打开控制台，然后用前面例子的 items 数组调用变异方法：example1.items.push({ message: 'Baz' })

重塑数组
	filter(), concat(), slice() 不会改变原始数组，但总是返回一个新数组。
	Vue 实现了一些智能启发式方法来最大化 DOM 元素重用
	不会重新渲染整个列表  
	example1.items = example1.items.filter(function (item) {
	  return item.message.match(/Foo/)
	})


事件修饰符
	//尽管我们可以在 methods 中轻松实现这点，但更好的方式是：methods 只有纯粹的数据逻辑，而不是去处理 DOM 事件细节
	 v-on 提供了 事件修饰符
    .stop
    .prevent
    .capture
    .self
    .once  新增 2.0

    <!-- 阻止单击事件冒泡 -->
<a v-on:click.stop="doThis"></a>
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>
<!-- 修饰符可以串联  -->
<a v-on:click.stop.prevent="doThat"></a>
<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>
<!-- 添加事件侦听器时使用事件捕获模式 -->
<div v-on:click.capture="doThis">...</div>
<!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
<div v-on:click.self="doThat">...</div>
<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>


按键修饰符
	在监听键盘事件时，我们经常需要监测常见的键值。 Vue 允许为 v-on 在监听键盘事件时添加按键修饰符
	1、监测常见的键值
	2、Vue 为最常用的按键提供了别名

	全部的按键别名：
    .enter 13
    .tab
    .delete (捕获 “删除” 和 “退格” 键)
    .esc
    .space
    .up
    .down
    .left
    .right
		2.1.0新增
    .ctrl
    .alt
    .shift
    .meta



	//可以通过全局 config.keyCodes 对象自定义按键修饰符别名：
    // 可以使用 v-on:keyup.f1
		Vue.config.keyCodes.f1 = 112


为什么在HTML中监听事件
	你可能注意到这种事件监听的方式违背了关注点分离（separation of concern）传统理念。不必担心，因为所有的 Vue.js 事件处理方法和表达式都严格绑定在当前视图的 ViewModel 上，它不会导致任何维护上的困难。实际上，使用 v-on 有几个好处：

    扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。

    因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。

    当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何自己清理它们。


表单控件绑定
	 v-model 指令在表单控件元素上创建双向数据绑定，根据控件类型自动选取正确的方法来更新元素， 本质上不过是语法糖，它负责监听用户的输入事件以更新数据，并特别处理一些极端的例子。
	 v-model 并不关心表单控件初始化所生成的值。因为它会选择 Vue 实例数据来作为具体的值
	 如果你也想实现更新，请使用 input事件。

	 <span>Multiline message is:</span>
<p style="white-space: pre">{{ message }}</p>   //不换行 white-space
<br>
<textarea v-model="message" placeholder="add multiple lines"></textarea>

修饰符
	.lazy
	.number
	.trim

<!-- 在 "change" 而不是 "input" 事件中更新 -->
<input v-model.lazy="msg" >
<!-- 输入值转为number类型，NaN返回原值 -->
<input v-model.number="age" type="number">
<!-- 自动过滤输入的首尾空格 -->
<input v-model.trim="msg">

	.lazy
		在默认情况下， v-model 在 input 事件中同步输入框的值与数据 (除了上述 IME 部分)，但你可以添加一个修饰符 lazy ，从而转变为在 change 事件中同步：
	.number
		如果想自动将用户的输入值转为 Number 类型（如果原值的转换结果为 NaN 则返回原值）
		
		这通常很有用，因为在 type="number" 时 HTML中输入的值也总是会返回字符串类型。
	.trim
		自动过滤用户输入的首尾空格


v-modal 与组件
	Vue 的组件系统允许你创建一个具有自定义行为可复用的 input 类型，这些 input 类型甚至可以和 v-model 一起使用