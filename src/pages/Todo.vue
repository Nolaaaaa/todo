<template>
  <div>
  <section id="todo" >
    <div class="logout">
      <!-- <el-button @click="logout" type="info" >登出</el-button> -->
    </div>
    <h1>TodoList</h1>
    <div class="newTask">
      <el-input ref = 'input' v-model="newTodo" :placeholder="placeholder"
      @keyup.enter.native="addTodo"></el-input>
    </div>

    <ol class="todos" v-if="todoList">
      <DragWrap :list="todoList" @newList="getNewList">
        <DragItem v-for="(todo, index) in todoList" :key="todo.id">
          <li>
            <div class="check-container">
              <div class="checkbox" v-bind:class="{checked:todo.checked}" @click="changeChecked(todo)"></div>
              <div class="content"  :class="{checked:todo.checked}">{{ todo.title }}</div>
              <i class="el-icon-edit" @click="editContent(index)"></i>
            </div>
            <i class="el-icon-circle-close" @click="removeTodo(todo)" v-if="editIndex != index"></i>
          </li>
        </DragItem>
      </DragWrap>
    </ol>
    
  </section>
  <!-- 落叶动画 -->
  <Leaves/>
  </div>
</template>

<script>
import AV from 'leancloud-storage'
import Leaves from '@/components/Leaves'
import DragWrap from '@/components/DragWrap'
import DragItem from '@/components/DragItem'

export default {
  name: 'Todo',
  props : ['currentUser'],
  data() {
    return {
      newTodo: '',
      todoList: [],
      newTodoList: '',
      editIndex: null,
    }
  },    
  computed: {
    placeholder() {
      let isNull = Object.prototype.toString.call(this.editIndex) === "[object Null]"
      return !isNull?'Edit new Todo':'Add new Todo'
    }
  },
  components: {
    Leaves, DragWrap, DragItem, 
  },
  mounted() {
    this.$refs['input'].focus()  //光标
    this.getTodoList()
  },
  methods: {
    getNewList(e) {  
      this.newTodoList = e
    },
    
    getTodoList() {
      window.onbeforeunload = () => { 
        let newTodoList = this.newTodoList
        let todoList = this.todoList
        if(newTodoList) { todoList =  newTodoList }
        window.localStorage.setItem('myTodos', JSON.stringify(todoList)) 
      }
      let oldDataString = window.localStorage.getItem('myTodos')
      let oldData = JSON.parse(oldDataString)  
      this.todoList = oldData || []  

      // 批量从云端获取AllTodos
      if(AV.User.current()) {
        var query = new AV.Query('AllTodos')
        query.find().then( (todos) => {
          // console.log(todos) //打印出的是在云端的数组
          let avAllTodos = todos[0]
          let id = avAllTodos.id   //找到todos数组的第一个对象的id
          this.todoList = JSON.parse(avAllTodos.attributes.content) //解析attributes.content中的JSON字符串
          this.todoList.id = id  //把获取到的id给todoList.id
        }, function(error) {
          console.log(error)
        })
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
      } else {
        this.todoList.push({
          title: this.newTodo,
          checked: false,
          createdAt: new Date().toLocaleString()
        })
        this.newTodo = ''
      }
      this.saveOrUpdateTodo()
    },

    editContent(index){
      this.editIndex = index
      // 编辑的时候恢复未选中状态
      this.todoList[index].checked = false
      let todoTitle = this.todoList[index].title
      this.newTodo = todoTitle
      this.$refs['input'].focus()    //输入框自动获取焦点
    },

    removeTodo(todo) {
      let index = this.todoList.indexOf(todo) // Array.prototype.indexOf ES 5 新加的 API
      this.todoList.splice(index,1)
      this.saveOrUpdateTodo()
    },
    
    
    saveOrUpdateTodo() {
      if(this.todoList.id){
        this.updateAVTodo()
      }else{
        this.saveAVTodo()
      }
    },

    changeChecked(todo) {
      let index = this.todoList.indexOf(todo) // Array.prototype.indexOf ES 5 新加的 API
      this.todoList[index].checked = !this.todoList[index].checked
      this.updateAVTodo()
    },

    logout() {   //注册 _user
      this.$emit("logout")
    },

    updateAVTodo(){
      let dataString = JSON.stringify(this.todoList)
      let avTodos = AV.Object.createWithoutData('AllTodos', this.todoList.id)
      avTodos.set('content', dataString)
      avTodos.save().then(()=>{
        console.log('更新成功')
      })
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
  }
}
</script>

<style lang="scss" scoped>
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
    margin: 10px;
    height: calc(100vh - 300px);
    overflow: auto;

    /*滚动条样式*/
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: rgba(0,0,0,0.2);
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 0;
      background: rgba(0,0,0,0.1);
    }

    .check-container {
      display: flex;
      flex-direction: row;
      align-items: center;   //x轴居中对齐
      cursor: pointer;
      .content {
        max-width: 340px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;  
        margin-left: 8px;
        &.checked {
          color: #dcdfe6;
          text-decoration:line-through;
        }
      }
      .checkbox {
        display: inline-block;
        position: relative;
        border: 1px solid #dcdfe6;
        border-radius: 2px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 14px;
        height: 14px;
        background-color: #fff;
        -webkit-transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
        transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
        &:hover {
          border-color: #409EFF;
        }
        &.checked {
          background-color: #dcdfe6;
          border-color: #dcdfe6;
        }
      }
    }
    li {
      display: flex;
      justify-content: space-between; //左右排布
      align-items: center;   //x轴居中对齐
      margin: 10px 0;  
      .el-icon-edit {
        line-height: 19rpx;
        margin: 0 4px;
        color: #2d83da;
      }
      .el-icon-circle-close {   //删除按钮的样式
        color: rgb(250, 42, 15)
      }
    }
  }
}
</style>
