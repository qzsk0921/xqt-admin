<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <h3 class="title">合拍-兴趣通商家管理后台</h3>

        <el-tabs type="border-card" class="tabs" @tab-click="handleSwitchLoginTab">
            <el-tab-pane label="代理商" value="1">
                <el-form-item prop="username">
                <span class="svg-container">
                    <svg-icon icon-class="user" />
                </span>
                    <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="username" />
                </el-form-item>
                <el-form-item prop="password">
                    <span class="svg-container">
                        <svg-icon icon-class="password" />
                    </span>
                    <el-input
                            :type="pwdType"
                            v-model="loginForm.password"
                            name="password"
                            auto-complete="on"
                            placeholder="password"
                            @keyup.enter.native="handleLogin" />
                        <span class="show-pwd" @click="showPwd">
                            <svg-icon icon-class="eye" />
                        </span>
                </el-form-item>
                <el-form-item>
                    <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
                        Sign in
                    </el-button>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商家" value="2">
                <el-form-item prop="username">
                <span class="svg-container">
                    <svg-icon icon-class="user" />
                </span>
                    <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="username" />
                </el-form-item>
                <el-form-item prop="password">
                    <span class="svg-container">
                        <svg-icon icon-class="password" />
                    </span>
                    <el-input
                            :type="pwdType"
                            v-model="loginForm.password"
                            name="password"
                            auto-complete="on"
                            placeholder="password"
                            @keyup.enter.native="handleLogin" />
                    <span class="show-pwd" @click="showPwd">
                            <svg-icon icon-class="eye" />
                        </span>
                </el-form-item>
                <el-form-item>
                    <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
                        Sign in
                    </el-button>
                </el-form-item>
            </el-tab-pane>
        </el-tabs>

      <!--<div class="tips">-->
        <!--<span style="margin-right:20px;">username: admin</span>-->
        <!--<span> password: admin</span>-->
      <!--</div>-->
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import { setLocalStorage, getLocalStorage } from "../../utils/commonUtils"

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
          adminType: 1,
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    // localUserName (adminType, userName) {
    //     let localUserName = getLocalStorage('localUsername')

    //     if (localUserName == null || localUserName[adminType] == null) {
    //         setLocalStorage('localUsername', adminType == 1 ? {1: userName} : {2: userName})
    //     } else {
    //         return localUserName[adminType]
    //     }
    // },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            // this.localUserName(this.adminType, this.loginForm.username)
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
      handleSwitchLoginTab(tabs){
        switch (tabs.label) {
            case '商家':
                this.loginForm.adminType = 2
                break;
            case '代理商':
                this.loginForm.adminType = 1
                break;
            default:
                break;
        }

        // this.loginForm.username = this.localUserName(tabs.label)
      }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {

    .tabs{
        border: none;
        background-color: #2d3a4b;

        .el-tabs__header{
            background-color: #2d3a4b;
            border: none;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);

            .is-active{
                background-color: #2d3a4b;
                border: none;
            }

            .el-tabs__item{
                background-color: #2d3a4b;
                border: none;

            }
        }
    }

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
