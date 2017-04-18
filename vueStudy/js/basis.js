// 组件注册时要注意的问题： 要确保在初始化根实例之前注册组件
Vue.component('my-component', {
    template: '<p class="foo bar">组件注册1</p>'
});

Vue.component('my-component2', {
    template: '<p class="foo bar">组件注册2</p>'
});

Vue.component('todo-item', {
    template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">X</button>\
    </li>\
  ',
    props: ['title']
})

var vm = new Vue({
	el:"#app",
	data:{
		title:"cartShop",
        message: 'Hello',
		flag:true,
        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar',
        question: '',
        answer: 'I cannot give you an answer until you ask a question!',
        isActive: true,
        hasError: false,
        classObject: {
            activeSecond: true,
            'text-dangerSecond': false
        },
        error: null,
        activeClass: 'active',
        errorClass: 'text-danger',
        activeColor: 'red',
        fontSize: 30,
        styleObject: {
            color: 'green',
            fontSize: '25 px'
        },

		// v-if 中的属性
		ok:true,

        type:'B',

        loginType:'userName',
		nameOrEmailFlag:true,
        changeName:'点下换邮箱',

        parentMessage: 'Parent',
        items: [
            { message: 'Foo' },
            { message: 'Bar' }
        ],

        object: {
            FirstName: 'John',
            LastName: 'Doe',
            Age: 30
        },

        newTodoText: '',
        todos: [
            'Do the dishes',
            'Take out the trash',
            'Mow the lawn'
        ],

        counter:0,

        eventName:'eventGreat',

        boundMessage:'',

        checked:'true',

        // 存放数据的数组结构形式
        checkedNames:[
            'Jack',
            'John',
            'Mike'
        ],

        picked:'',

        selected1:'',

        selected2:'',

        selected3: 'A',
        options: [
            { text: 'One', value: 'A' },
            { text: 'Two', value: 'B' },
            { text: 'Three', value: 'C' }
        ],

        selected4: 'A',

        picked2:'',

        toggle:'',

        toggle2:'',

        pick:'',

        a:'testA',

        selected5:''
	},

	filters:{

	},

	// 计算属性的js测试
	// 计算属性也可以写在methods中，但是计算属性是基于它们的依赖进行缓存的
	// 计算属性只有在它的相关依赖发生改变时才会重新求值。
	computed: {
        // 实现字符的反转
        reversedMessage: function () {
            // `this` points to the vm instance
            return this.message.split('').reverse().join('')
        },

        // fullName: function () {
        //     return this.firstName + ' ' + this.lastName
        // }

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
        },

        classObject2: function () {
            return {
                active: this.isActive && !this.error,
                'text-danger': this.error && this.error.type === 'fatal',
            }
        }
    },

    watch: {
        // firstName: function (val) {
        //     this.fullName = val + ' ' + this.lastName
        // },
        // lastName: function (val) {
        //     this.fullName = this.firstName + ' ' + val
        // }

        // 如果 question 发生改变，这个函数就会运行
        question: function (newQuestion) {
            this.answer = 'Waiting for you to stop typing...'
            this.getAnswer()
        }
    },

	mounted:function(){
		// this.cartView();
	},

	methods:{
		// cartView:function(){
		// 	// this.title = "update title";
		// 	this.$http.get("data/cartData.json",{"id":123}).then(function (res) {
		//
         //    });
		// }

        // 实现标题的变换，点击变换标题内容
        updateTitle:function () {
        	if(this.flag){
                this.title = "hohoTT";
                this.flag = false;
			}
			else {
                this.title = "cartShop";
                this.flag = true;
			}
        },

        // _.debounce 是一个通过 lodash 限制操作频率的函数。
        // 在这个例子中，我们希望限制访问yesno.wtf/api的频率
        // ajax请求直到用户输入完毕才会发出
        // 学习更多关于 _.debounce function (and its cousin
        // _.throttle), 参考: https://lodash.com/docs#debounce
        getAnswer: _.debounce(
            function () {
                var vm = this;
                if (this.question.indexOf('?') === -1) {
                    vm.answer = 'Questions usually contain a question mark. ;-)';
                    return
                }
                vm.answer = 'Thinking...';
                axios.get('https://yesno.wtf/api')
                    .then(function (response) {
                        vm.answer = _.capitalize(response.data.answer)
                    })
                    .catch(function (error) {
                        vm.answer = 'Error! Could not reach the API. ' + error
                    })
            },
            // 这是我们为用户停止输入等待的毫秒数
            1000
        ),

        // 切换为用户还是邮箱的名称
        nameOrEmail:function () {
            if(this.nameOrEmailFlag){
				this.loginType = 'email';
				this.nameOrEmailFlag = false;
				this.changeName = '点下换用户名';
            }
            else{
                this.loginType = 'userName';
                this.nameOrEmailFlag = true;
                this.changeName = '点下换邮箱';
            }
        },

        addNewTodo: function () {
            this.todos.push(this.newTodoText)
            this.newTodoText = ''
        },

        greet: function (event) {
            // `this` 在方法里指当前 Vue 实例
            alert('Hello ' + this.eventName + '!')
            // `event` 是原生 DOM 事件
            alert(event.target.tagName)
        },

        say: function (message) {
            alert(message)
        },

        warn: function (message, event) {
            // 现在我们可以访问原生事件对象
            // 阻止默认事件的发生
            if (event) event.preventDefault()
            alert(message)
        },

        // 对应前端代码中input中按下键盘的回车键实现提交，即
        submit1:function () {
            alert('submit1');
        },

        submit2:function () {
            alert('submit2');
        }

    }

});
