<template>
  <el-container class="index">
    <el-header class="header">研报小程序后台管理系统<span class="quit" @click="quit"><i class="el-icon-refresh"></i>退出</span></el-header>
    <el-container class="container">
      <el-aside width="200px" class="aside">
        <el-menu
          :default-active="defaultActive"
          :default-openeds="defaultOpeneds"
          router
        >
          <el-submenu index="1">
            <template slot="title">统计</template>
            <el-menu-item index="1-1">用户分析</el-menu-item>
            <el-menu-item index="1-2">订单分析</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">管理</template>
            <el-menu-item index="2-1">用户管理</el-menu-item>
            <el-menu-item index="2-2">vip管理</el-menu-item>
            <el-menu-item index="2-3">文章管理</el-menu-item>
            <el-menu-item index="2-4">订单管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">设置</template>
            <el-menu-item index="3-1">平台信息</el-menu-item>
            <el-menu-item index="3-2">账户权限</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    defaultActive () {
      return this.$route.path.replace('/', '')
    },
    defaultOpeneds () {
      return ['1']
    }
  },
  mounted () {
    // console.log('1')
  },
  methods: {
    quit () {
      localStorage.removeItem('MIDLogInfo')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus">
  .index
    height 100%
    .header
      height 60px
      line-height 60px
      background  #f8f8f8
      font-size 15px
      font-weight 600
      color rgba(77, 77, 77, 1)
      font-family SourceHanSansSC-regular
      .quit
        float right
        left 1361px
        color rgba(255, 87, 34, 1)
        font-size 12px
        font-family SourceHanSansSC-regular
        cursor pointer
        i
          margin-right 10px
    .container
      padding 20px
    .aside
      background #f8f8f8
      h3
        height 70px
        line-height 70px
        text-indent 11px
        font-size 16px
        i
          margin-right 10px
      .el-submenu__title
        font-size 16px
        font-weight 700
        background #f8f8f8
      .el-menu-item
        text-indent 20px
        background #f8f8f8
    .main
      padding 0
</style>
