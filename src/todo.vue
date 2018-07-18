<template>
  <div id="app">
    <span>TodoList</span>
    <div class="newTask">
        <input type="text" v-model="newTodo" @keypress.enter="addTodo()">
    </div>
    <ol class="todos">
        <li v-for="todo in todoList" :key="todo.id">
          {{ todo.title }}
        </li>
    </ol>
  </div>
</template>

<script>
export default {
  // name: 'todo',
  data() {
    return {
      newTodo: '',
      todoList: []
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
