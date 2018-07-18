<template>
  <div id="todo">
    <h1>TodoList</h1>
    <div class="nwTask">
      <el-input v-model="newTodo" placeholder="请输入内容" @keyup.enter.native="addTodo"></el-input>
    </div>
    <ol class="todos">
      <li v-for="todo in todoList" :key="todo.id">{{ todo.title }}</li>
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
    }
  },
  methods: {
    addTodo(){
      console.log(11111111)
      this.todoList.push({
        title: this.newTodo,
        createdAt: new Date(),
        done: false // 添加一个 done 属性
      })
      this.newTodo = ''
    },
  }
}
</script>

<style>
#todo {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 50px;
}
#todo { 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 } 
.nwTask { width: 400px; }
.todos { 
  width: 400px; 
  display: flex;
  justify-content: flex-start;  
  flex-direction: column;
}
ul,ol,li{list-style: none; padding: 0}
</style>
