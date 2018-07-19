<template>
  <div id="todo">
    <h1>TodoList</h1>
    <div class="nwTask">
      <el-input v-model="newTodo" placeholder="Add new Todo" @keyup.enter.native="addTodo"></el-input>
    </div>
    <ol class="todos">
      <li v-for="todo in todoList" :key="todo.id">
        <el-checkbox v-model="todo.checked">{{ todo.title }}</el-checkbox>
        <i class="el-icon-circle-close" @click="removeTodo(todo)"></i>
      </li>
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
    window.onbeforeunload = ()=>{       //页面刷新时调用
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
    @media (max-width: 500px) {width: 320px;}
    @media (max-width: 400px) {width: 280px;}
  }
  .todos { 
    width: 400px; 
    @media (max-width: 500px) {width: 320px;}
    @media (max-width: 400px) {width: 280px;}
    display: flex;
    justify-content: flex-start;  
    flex-direction: column;
    li {
      display: flex; 
      justify-content: space-between; //左右排布
      align-items: center;   //x轴居中对齐
      .el-icon-circle-close {   //删除按钮的样式
        color: rgb(250, 42, 15)
      }
      .el-checkbox__input.is-checked+.el-checkbox__label{ //更改已完成的字体的删除仙女及颜色
        color: #dcdfe6;
        text-decoration:line-through;
      }
      .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {  //已完成的框框的颜色
        background-color: #dcdfe6;
        border-color: #dcdfe6;
      }
    }
  }
} 
</style>
