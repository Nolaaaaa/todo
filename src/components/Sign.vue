<template>
    <div id="sign">
        <div>
          <label><input type="radio" name="type" value="signUp" v-model="actionType">注册</label>
          <label><input type="radio" name="type" value="login" v-model="actionType">登录</label>

            <!-- <el-button  value="signUp" v-model="actionType">注册</el-button>
            <el-button  value="login" v-model="actionType">登录</el-button> -->
        </div>
        <div class="signUp"  v-if="actionType == 'signUp'" >
            <div class="formRow"> 
              用户名<input type="text" v-model="formData.username">
            </div>
            <div class="formRow">
              密码<input type="password" v-model="formData.password" >
            </div>
            <div class="formRow">
              确认密码<input type="password" v-model="formData.comfirmPassword">
            </div>
            <div class="formActions">
              <button value="" @click="signUp">注册</button>
            </div>
        </div>
        <div class="login" v-if="actionType == 'login'">
            <div class="formRow">
              用户名<input type="text">
            </div>
            <div class="formRow">
              密码<input type="password">
            </div>
            <div class="formActions">
              <button value="">登录</button>
            </div>
        </div>
    </div>
</template>

<script>
import AV from 'leancloud-storage'


export default {
    data() {
        return {
            actionType: 'signUp',
            formData: {
                username: '',
                password: '',
                comfirmPassword: '',
            }
        }
    },
    created() {
    },
    methods: {
        signUp() {   //注册 _user
        console.log(11111)
            var user = new AV.User();
            user.setUsername(this.formData.username); // 设置用户名
            user.setPassword(this.formData.password); // 设置密码
            user.signUp()
            .then( (loggedInUser)=>{
                console.log(loggedInUser);
            },  (error)=>{
                console.log()
            });
        }
    }
}
</script>

<style>

</style>

