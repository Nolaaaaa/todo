<template>
  <div id='signUpOrLogin'>
    <section>
      <div class="button">
        <button @click="actionType = 'login'" class="login">Login</button>
        <button @click="actionType = 'signUp'" class="signUp">Sign up</button>
      </div>
      <div class="login" v-if="actionType == 'login'">
        <div class="formRow">
          <input type="text" v-model="formData.username" placeholder="输入登录名">
        </div>
        <div class="formRow">
          <input type="password" v-model="formData.password"
                   @keyup.enter="login" placeholder="密码">
        </div>
        <div class="formActions">
          <button value="" @click="login" class="login">Login</button>
        </div>
      </div>
      <div class="signUp" v-if="actionType == 'signUp'">
        <div class="formRow">
          <input type="text" v-model="formData.username" placeholder="注册用户名">
        </div>
        <div class="formRow">
          <input type="password" v-model="formData.password" @keyup.enter="signUp" placeholder="密码">
        </div>
        <div class="formActions">
          <button value="" @click="signUp" class="signUp" >Sign up</button>
        </div>
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
        actionType: '',
        formData: {
          username: '',
          password: '',
          comfirmPassword: '',
        },
      }
    },
    methods: {
      signUp() {   //注册 _user
        this.$emit("signUp", this.formData)
      },
      login() {
        this.$emit("login", this.formData)
      }
    }
  }
</script>
<style lang="scss">
  #signUpOrLogin { 
    background:  rgb(220, 224, 228) url(https://i.loli.net/2018/08/03/5b645445aa765.jpg) no-repeat center center; 
    background-size:100% 100%;
    display: flex; flex-direction: column;
    justify-content: center; align-items: center; height: 100vh;
    section { 
      // background: #fff; box-shadow: 0 10px 30px 0 rgba(0, 0, 0, .15); border-radius: 4px;
      // padding: 30px 20px; width: 400px;
      .formRow { border: 1px solid #dcdfe6; border-radius: 8px;
        &:first-child { border-bottom: 0; }
        input { 
          outline: none; border: 0;padding: 12px 8px; 
          background: transparent;color: black;
          width: 100%;
        }
        input::-webkit-input-placeholder{
            color:white;   //修改placeholder的颜色
        }

      }
      .formActions { 
        margin: 8px 0; 
      }
      .button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }
      button{
        padding: 8px;
        width: 80px;
        height: 40px;
        margin-right: 20px; 
        border-radius: 8px;
        border-radius: 8px;
        &.signUp {
          margin-right: 0;    
            color: #fff;
            background-color: #409eff;
            border-color: #409eff;
          &:hover,&focus{
            background: #66b1ff;
            border-color: #66b1ff;
            color: #fff;
          }
        }
        &.login {
          &:hover,&focus{
            background: #fff;
            border-color: #409eff;
            color: #409eff;
          }
        }
      }
    }
  }
</style>

