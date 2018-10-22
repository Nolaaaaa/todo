<template>
<div>
    <section id="todo" >
        <div class="logout">
          <el-button @click="logout" type="info" >登出</el-button>
        </div>
        <h1>TodoList</h1>
        <div class="newTask">
          <el-input ref = 'input' v-model="newTodo" placeholder="Add new Todo"
          @keyup.enter.native="addTodo"></el-input>
        </div>
        <ol class="todos">
          <li v-for="(todo, index) in todoList" :key="todo.id">
            <div>
              <el-checkbox v-model="todo.checked" @click.native="changeDeleteStyle()">{{ todo.title }}
              </el-checkbox>
              <i class="el-icon-edit" @click="editContent(index)"></i>
            </div>
            <i class="el-icon-circle-close" @click="removeTodo(todo)"></i>
          </li>
        </ol>
    </section>
  </div>
</template>

<script>
import AV from 'leancloud-storage'

export default {
  name: 'Todo',
  props : ['currentUser'],
  data() {
    return {
      newTodo: '',
      todoList: [],
      checked: false,
      editIndex: null,
    }
  },
  mounted() {
    this.$refs['input'].focus()  //光标
    // 页面刷新后依然保留数据
    window.onbeforeunload = ()=>{       //页面刷新时调用
      let dataString = JSON.stringify(this.todoList)   //将todoList对象转化为JSON字符串 dataString
      window.localStorage.setItem('myTodos', dataString) //通过window.localStorage添加dataString数据到"myTodos"中
    }
    let oldDataString = window.localStorage.getItem('myTodos')  //通过window.localStorage读取"myTodos"中的数据
    let oldData = JSON.parse(oldDataString)  //将读取到的JSON字符串解析
    this.todoList = oldData || []    //把数据赋值给todoList对象

    //批量从云端获取AllTodos
    if(this.currentUser){
      var query = new AV.Query('AllTodos')
      query.find()
      .then( (todos) => {
        // console.log(todos) //打印出的是在云端的数组
        let avAllTodos = todos[0]
        let id = avAllTodos.id   //找到todos数组的第一个对象的id
        this.todoList = JSON.parse(avAllTodos.attributes.content) //解析attributes.content中的JSON字符串
        this.todoList.id = id  //把获取到的id给todoList.id
      }, function(error) {
        console.error(error)
      })
    }
  },
  methods: {
    updateAVTodo(){
      let dataString = JSON.stringify(this.todoList)
      let avTodos = AV.Object.createWithoutData('AllTodos', this.todoList.id)
      avTodos.set('content', dataString)
      avTodos.save().then(()=>{
        console.log('更新成功')
      })
    },
    changeDeleteStyle() {
      if(this.checked == false) return 
      // this.checked = !this.checked
    },
    saveAVTodo() {
      // 如果还没有对象，就新建一个对象到Lean，只会存在一个对象
      // 单用户权限设置
      // 新建一个对象
      let dataString = JSON.stringify(this.todoList)
      var AVTodos = AV.Object.extend('AllTodos')
      var avtodos = new AVTodos()
      avtodos.set('content', dataString)
      // 新建一个 ACL 实例
      var acl = new AV.ACL();
      acl.setPublicReadAccess(true);  //能读
      acl.setWriteAccess(AV.User.current(),true);  //能写
      // 将 ACL 实例赋予对象 设置访问控制
      avtodos.setACL(acl)
      //保存到云端
      avtodos.save().then((todo) => {
        console.log('保存成功')
        this.todoList.id = todo.id
      }, function (error) {
        console.log(error)
      })
    },
    saveOrUpdateTodo() {
      if(this.todoList.id){
        this.updateAVTodo()
      }else{
        this.saveAVTodo()
      }
    },
    addTodo() {
      // id 存不存在 这个列表中
      // 如果不存在 就push
      // 如果存在 就 edit
      if(!this.newTodo) return
      if(this.editIndex || this.editIndex === 0) {
        this.todoList[this.editIndex].title = this.newTodo
        this.newTodo = ''
        this.editIndex = null   //不写这句的话前一次的editIndex会一只存在导致不能添加新的Todo
      }else{
        this.todoList.push({
          title: this.newTodo,
          createdAt: new Date()
        })
        this.newTodo = ''
      }
      this.saveOrUpdateTodo()
    },
    removeTodo(todo) {
      let index = this.todoList.indexOf(todo) // Array.prototype.indexOf ES 5 新加的 API
      this.todoList.splice(index,1)
      this.saveOrUpdateTodo()
    },
    editContent(index){
      this.editIndex = index
      let todoTitle = this.todoList[index].title
      this.newTodo = todoTitle
      this.$refs['input'].focus()    //输入框自动获取焦点
    },
    logout() {   //注册 _user
      this.$emit("logout")
    },
  }
}
</script>

<style lang="scss">
#todo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {font-size: 32px; margin: 80px 0 30px;}
  .logout{
    .el-button {
      color: #8d8e91;
      position: absolute;
      top: 0;
      left: 0;
      color: white;
      padding: 8px 16px;
      margin: 8px;
    }
    .el-button:hover {
      background: black;
      color: white;
      border: black;
    }
    .el-button:focus {
      background: black;
      color: white;
    }
  }
  .newTask {
    width: 400px;
    @media (max-width: 500px) {width: 320px;}
    @media (max-width: 400px) {width: 240px;}
  }
  .todos {
    width: 400px;
    @media (max-width: 500px) {width: 320px;}
    @media (max-width: 400px) {width: 240px;}
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    margin: 10px;
    li {
      display: flex;
      justify-content: space-between; //左右排布
      align-items: center;   //x轴居中对齐
      margin: 10px 0;  
      .el-icon-edit:before{
        margin: 0 4px;
        color: #2d83da;
      }
      .el-icon-circle-close {   //删除按钮的样式
        color: rgb(250, 42, 15)
      }
      .el-checkbox__input.is-checked+.el-checkbox__label{ //给已完成的的todo添加删除线及改变其颜色颜色
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
