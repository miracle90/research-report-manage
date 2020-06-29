<template>
  <div class="page">
    <h1 class="page-title">用户管理</h1>
    <el-form :model="searchInfo" ref="ruleForm" class="form-wrapper" :inline="true">
      <el-form-item label="" prop="phone">
        <el-input v-model="searchInfo.phone" placeholder="输入手机号查找" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" size="medium">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="userList" border align="center" class="table-wrapper">
      <el-table-column align="center" label="用户头像">
        <template slot-scope="scope">
          <img :src="scope.row.image" alt="" style="width: 50px; height: 50px;">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="nickname" label="昵称"></el-table-column>
      <!-- <el-table-column align="center" prop="title" label="用户名"></el-table-column> -->
      <!-- <el-table-column align="center" prop="title" label="性别"></el-table-column> -->
      <el-table-column align="center" prop="mobile" label="手机号"></el-table-column>
      <el-table-column align="center" prop="amount" label="付款总额"></el-table-column>
      <el-table-column align="center" prop="amountCount" label="付款次数"></el-table-column>
      <el-table-column align="center" prop="vipTime" label="vip到期日"></el-table-column>
      <el-table-column align="center" prop="createTime" label="注册时间"></el-table-column>
    </el-table>
    <el-pagination
      class="pagination-wrapper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { userList } from '../common/api.js'
export default {
  data () {
    return {
      userList: [],
      searchInfo: {
        phone: ''
      },
      page: 1,
      total: 0,
      size: 10
    }
  },
  created () {

  },
  mounted () {
    this.getUserList()
  },
  methods: {
    getUserList () {
      userList({
        page: 1,
        size: 10
      }).then(res => {
        const { code, data } = res.data
        if (code === 0) {
          const { records, total } = data
          console.log(records)
          this.userList = records
          this.total = total
        }
      })
    },
    submitForm () {
      //
    },
    handleSizeChange () {
      //
    },
    handleCurrentChange () {
      //
    }
  }
}
</script>

<style lang="stylus" scoped>
  .page
    margin-left 20px
    padding: 20px
    height 100%
    color rgba(16, 16, 16, 1)
    font-size 24px
    font-family Roboto
    border 1px solid rgba(187, 187, 187, 1)
    box-sizing border-box
    .page-title
      // text-align left
    .form-wrapper
      margin-top 20px
    .pagination-wrapper
      margin-top 20px
      text-align center
</style>
