<template>
  <div id='signUpOrLogin'>
    <section>
      <div class="button">
        <el-button @click="actionType = 'login'">Login</el-button>
        <el-button @click="actionType = 'signUp'">Sign up</el-button>
      </div>
      <div class="signUp" v-if="actionType == 'signUp'">
        <div class="formRow">
          <input type="text" v-model="formData.username" placeholder="注册用户名">
        </div>
        <div class="formRow">
          <input type="password" v-model="formData.password" @keyup.enter="signUp" placeholder="密码">
        </div>
        <!-- <div class="formRow">
            确认密码<input type="password" v-model="formData.comfirmPassword" >
        </div> -->
        <div class="formActions">
          <!-- <button value="" @click="signUp">注册</button> -->
        </div>
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
          <!-- <button value="" @click="login">登录</button> -->
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
        actionType: 'login',
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
      },

    }
  }
</script>
<style lang="scss">
  #signUpOrLogin { background: white; display: flex; flex-direction: column;
    justify-content: center; align-items: center; height: 100vh;
    section { background: #fff; box-shadow: 0 10px 30px 0 rgba(0, 0, 0, .15); border-radius: 4px;
      padding: 30px 20px; width: 400px;
      .formRow { border: 1px solid #dcdfe6; border-radius: 4px;
        &:first-child { border-bottom: 0; }
        input { outline: none; border: 0;padding: 12px 8px; }
      }
      .formActions { margin: 8px 0; }
      .button{
        .el-button {
          color: black;
          margin-bottom: 16px;
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
    }
  }
</style>

