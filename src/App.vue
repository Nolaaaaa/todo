<template>
    <div id="app">
        <SignUpOrLogin v-if="!currentUser" @signUp="signUp" @login="login"/>
        <Todo v-else @logout="logout" :currentUser="currentUser"/>
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
                // console.log(error)
            });
        },
        login(resource) {
            AV.User.logIn(resource.username, resource.password)
            .then((loggedInUser) => {
                // console.log(loggedInUser)
                this.currentUser = this.getCurrentUser()
            }, function (error) {
                // console.log(error)
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
<style>
* {
    overflow: hidden;
}
</style>



