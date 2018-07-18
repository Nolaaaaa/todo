import Vue from 'vue'
import Todo from './todo'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: { Todo },
  template: '<Todo/>',
  created(){
  },
  methods: {
    addTodo(){
      this.todoList.push({
        title: this.newTodo,
        createdAt: new Date(),
        done: false // 添加一个 done 属性
      })
      console.log(this.todoList)
      this.newTodo = ''
    },
  }
})

