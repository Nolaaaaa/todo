<template>
    <div id="sign">
        <div>
          <label><input type="radio" name="type" value="signUp" v-model="actionType">注册</label>
          <label><input type="radio" name="type" value="login" v-model="actionType">登入</label>

            <!-- <el-button  value="signUp" v-model="actionType">注册</el-button>
            <el-button  value="login" v-model="actionType">登录</el-button> -->
        </div>
        <div class="signUp"  v-if="actionType == 'signUp'" >
          <form >  <!-- v-on:submit.prevent=signUp  -->
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
              <input type="submit" value="注册">
            </div>
          </form>
        </div>
        <div class="login" v-if="actionType == 'login'">
          <form>
            <div class="formRow">
              用户名<input type="text">
            </div>
            <div class="formRow">
              密码<input type="password">
            </div>
            <div class="formActions">
              <input type="submit" value="登入">
            </div>
          </form>
        </div>
    </div>
</template>

<script>
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
            var user = new AV.User();
            user.setUsername(this.formData.username); // 设置用户名
            user.setPassword(this.formData.password); // 设置密码
            user.signUp().then(function (loggedInUser) {
                console.log(loggedInUser);
            }, function (error) {
                console.log('cuole')
            });
        }
    }
}
</script>

<style>

</style>

