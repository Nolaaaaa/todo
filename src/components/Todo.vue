<template>
  <div id="todo">
    <h1>TodoList</h1>
    <div class="nwTask">
      <el-input v-model="newTodo" placeholder="请输入内容" @keyup.enter.native="addTodo"></el-input>
    </div>
    <ol class="todos">
      <li v-for="todo in todoList" :key="todo.id">
        <el-checkbox v-model="checked">{{ todo.title }}</el-checkbox>
        <i class="el-icon-circle-close" @click="removeTodo(todo)"></i>
      </li>
      <!-- <span v-if="todo.done">已完成</span>
      <span v-else>未完成</span>-->
    </ol>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  data() {
    return {
      newTodo: '',
      todoList: [],
      checked: false,
    }
  },
  created: function(){
    // 页面刷新后依然保留数据
    window.onbeforeunload = ()=>{       //页面刷新或者关闭的时候调用
      let dataString = JSON.stringify(this.todoList)   //将todoList对象转化为JSON字符串 dataString
      window.localStorage.setItem('myTodos', dataString) //通过window.localStorage添加dataString数据到"myTodos"中
    }
    let oldDataString = window.localStorage.getItem('myTodos')  //通过window.localStorage读取"myTodos"中的数据
    let oldData = JSON.parse(oldDataString)  //将读取到的JSON字符串解析JSON字符串
    this.todoList = oldData || []    //把数据赋值给todoList对象
  },
  methods: {
    addTodo: function(){
      this.todoList.push({
        title: this.newTodo,
        createdAt: new Date(),
        done: false 
      })
      this.newTodo = ''
    },
    removeTodo: function(todo){
      let index = this.todoList.indexOf(todo) // Array.prototype.indexOf ES 5 新加的 API
      this.todoList.splice(index,1)
    }
  }
}
</script>

<style lang="scss">
#todo { 
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .nwTask { 
    width: 400px;
  }
  .todos { 
    width: 400px; 
    display: flex;
    justify-content: flex-start;  
    flex-direction: column;
    li {
      position: relative;
      .el-icon-circle-close {
        position: absolute;
        right: 0;
      }
    }
  }
} 
</style>
