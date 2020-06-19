<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form-contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>研报小程序平台</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="role">
            <el-select v-model="loginForm.role" placeholder="登录角色">
              <el-option label="管理员" value="a"></el-option>
              <el-option label="企业" value="b"></el-option>
              <el-option label="平台" value="c"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
// import { loginApi } from '../common/api.js'

export default {
  data () {
    return {
      loginForm: {
        role: '',
        username: '',
        password: ''
      },
      rules: {
        role: [
          { required: true, message: '请选择登录角色', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      showLogin: false
    }
  },
  mounted () {
    this.showLogin = true
  },
  methods: {
    // submitForm (formName) {
    submitForm () {
      this.$router.push('/index')
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     loginApi({
      //       username: this.loginForm.username,
      //       password: this.loginForm.password
      //     }).then(res => {
      //       const { code, data } = res.data
      //       if (code === 0) {
      //         localStorage.setItem('MIDLogInfo', JSON.stringify(data))
      //         this.$router.push('/index')
      //       } else {
      //         this.$notify.error({
      //           title: '错误',
      //           message: '请输入正确的用户名密码',
      //           offset: 100
      //         })
      //       }
      //     }).catch(() => {
      //       this.$notify.error({
      //         title: '错误',
      //         message: '网络异常，请刷新重试',
      //         offset: 100
      //       })
      //     })
      //   } else {
      //     this.$notify.error({
      //       title: '错误',
      //       message: '请输入正确的用户名密码',
      //       offset: 100
      //     })
      //     return false
      //   }
      // })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .login_page
    position relative
    .form-contianer
      position absolute
      top 50%
      left 50%
      margin-top -165px
      margin-left -185px
      padding 25px
      width 320px
      height 210px
      border-radius 5px
      text-align center
      background-color #fff
      .manage_tip
        position absolute
        width 100%
        top -100px
        left 0
        p
          font-size 34px
          color #000000
      .submit_btn
        width 100%
        background #eb5a53
        border-color #eb5a53
        font-size 16px
    .form-fade-enter-active, .form-fade-leave-active
      transition all 1s
    .form-fade-enter, .form-fade-leave-active
      transform translate3d(0, -50px, 0)
      opacity 0
    .el-select
      width: 100%;
</style>
