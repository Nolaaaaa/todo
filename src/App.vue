<template>
    <div id="app">
        <!-- app vue 算是一个总的模版
        它里面有 todo 和 SignUpOrLogin 模块
        SignUpOrLogin 是一个包括 登录 和 注册的模块 代码不是很多就不需要拆
        todo 就是一个展示用户 todo 的模块
        一共两个模块即可 -->
        <SignUpOrLogin v-if="!currentUser" @signUp="signUp" @login="login"/> 
        <Todo v-else @logout="logout"/>
    </div>
</template>
<script>
import AV from 'leancloud-storage'
import Todo from './components/Todo'
import SignUpOrLogin from './components/SignUpOrLogin'
export default {
    name: 'App',
    components: {
        Todo,
        SignUpOrLogin,
    },
    data(){
        return{
            currentUser: {}
        }
    },
    created(){
        //保存用户登录状态
        this.currentUser = this.getCurrentUser()
    },
    methods: {
        getCurrentUser() {
            //检查用户是否登录
            let current = AV.User.current()
            if(current) {
                let {id,createdAt,attributes:{username}} = current
                return {id,username,createdAt}
            }
        },
        signUp(resource) {   //注册 _user
            var user = new AV.User();
            user.setUsername(resource.username); // 设置用户名
            user.setPassword(resource.password); // 设置密码
            user.signUp()
            .then( (loggedInUser)=>{   //箭头函数方便使用this
                // console.log(loggedInUser)
                console.log('注册成功')
                this.currentUser = this.getCurrentUser()  //把获取到的用户信息给loggedInUser
            },  (error)=>{
                console.log(error)
            });
        },
        login(resource) {
            AV.User.logIn(resource.username, resource.password)
            .then((loggedInUser) => {
                // console.log(loggedInUser)
                this.currentUser = this.getCurrentUser()
            }, function (error) {
                console.log(error)
            });
        },    
        logout() {
            AV.User.logOut()
            // 现在的 currentUser 是 null 了
            this.currentUser = null
        }
        
    }
}
</script>


