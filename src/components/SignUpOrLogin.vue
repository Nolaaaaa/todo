<template>
    <div id='signUpOrLogin'>
        <section>
            <div class="signUp"  v-if="actionType == 'signUp'" >
                <div class="formRow"> 
                    用户名<input type="text" v-model="formData.username">
                </div>
                <div class="formRow">
                    密码<input type="password" v-model="formData.password"
                    @keyup.enter="signUp" >
                </div>
                <!-- <div class="formRow">
                    确认密码<input type="password" v-model="formData.comfirmPassword" >
                </div> -->
                <div class="formActions">
                    <button value="" @click="signUp">注册</button>
                </div>
            </div>
            <div class="login" v-if="actionType == 'login'">
                <div class="formRow">
                    用户名<input type="text"  v-model="formData.username">
                </div>
                <div class="formRow">
                    密码<input type="password" v-model="formData.password"
                    @keyup.enter="login">
                </div>
                <div class="formActions">
                    <button value="" @click="login">登录</button>
                </div>
            </div>
            <div class="button">
                <el-button @click.native="actionType = 'signUp'" >注册</el-button>
                <el-button @click.native="actionType = 'login'">登录</el-button>
            </div>
        </section>
    </div>
</template>

<script>
import AV from 'leancloud-storage'
export default {
    name: 'SignUpOrLogin',
    data() {
        return {
            actionType: 'signUp',
            formData: {
                username: '',
                password: '',
                comfirmPassword: '',
            },
        }
    },
    methods: {
        signUp() {   //注册 _user
            this.$emit("signUp",this.formData)
        },
        login() {
            this.$emit("login",this.formData)
        },
        
    }   
}
</script>
<style lang="scss">
#signUpOrLogin {
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    section{
        background: white;
        padding: 50px;
    }
}

</style>

