<template>
  <div class="page">
    <h1 class="page-title">精选研报</h1>
    <el-form ref="ruleForm" class="form-wrapper" :inline="true">
      <el-form-item label="" prop="name">
        <el-input v-model="name" placeholder="请输入公司名称"  size="medium" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" size="medium">搜索</el-button>
        <!-- <el-button type="primary" @click="upload" size="medium">上传</el-button> -->
      </el-form-item>
    </el-form>
    <el-table :data="userList" border align="center" class="table-wrapper">
      <!-- <el-table-column align="center" label="精选研报">
         <template slot-scope="scope">
          <i class="el-icon-star-off" v-if="scope.row.type === 2"></i>
        </template>
      </el-table-column> -->
      <el-table-column align="center" prop="id" label="编号"></el-table-column>
      <el-table-column align="center" prop="title" label="文章标题"></el-table-column>
      <el-table-column align="center" prop="code" label="股票代码"></el-table-column>
      <el-table-column align="center" prop="name" label="股票名称"></el-table-column>
      <el-table-column align="center" prop="reportTime" label="报告日期"></el-table-column>
      <el-table-column align="center" prop="rate" label="评级"></el-table-column>
      <el-table-column align="center" prop="category" label="行业"></el-table-column>
      <!-- <el-table-column align="center" prop="title" label="所属行业"></el-table-column> -->
      <el-table-column align="center" prop="author" label="作者"></el-table-column>
      <el-table-column align="center" prop="institution" label="作者机构"></el-table-column>
      <!-- <el-table-column align="center" prop="title" label="状态"></el-table-column> -->
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <!-- <el-button @click="featured(scope.row.id, 2)" type="text" v-if="scope.row.type === 1">加入精选</el-button> -->
          <el-button @click="featured(scope.row.id, 1)" type="text" style="color: red;">移除精选</el-button>
          <a :href="scope.row.url" target="__blank" class="preview">预览</a>
          <!-- <el-button @click="remove(scope.row.id)" type="text" style="color: red;">删除</el-button> -->
        </template>
      </el-table-column>
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
import { selectionReportLis, addReport, deleteReport } from '../common/api.js'
export default {
  data () {
    return {
      userList: [],
      name: '',
      page: 1,
      total: 0,
      size: 10
    }
  },
  created () {
    //
  },
  mounted () {
    this.getReportList()
  },
  methods: {
    remove (id) {
      this.$confirm('此操作将永久删除该研报, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteReport({
          id
        }).then(res => {
          const { code } = res.data
          if (code === 0) {
            this.$message({
              message: '删除研报成功！',
              type: 'success'
            });
            this.getReportList()
          }
        })
      })
    },
    upload () {
      this.$router.push('/index/upload')
    },
    // 加入精选研报
    featured (id, type) {
      addReport({
        type,
        id
      }).then(res => {
        const { code } = res.data
        if (code === 0) {
          this.$message({
            message: '操作成功！',
            type: 'success'
          });
          this.getReportList()
        }
      })
    },
    getReportList () {
      const { name, page, size } = this
      selectionReportLis({
        name,
        page,
        size
      }).then(res => {
        const { code, data } = res.data
        if (code === 0) {
          const { records, total } = data
          this.userList = records
          this.total = total
        }
      })
    },
    submitForm () {
      this.page = 1
      this.getReportList()
    },
    handleSizeChange (size) {
      this.page = 1
      this.size = size
      this.getReportList()
    },
    handleCurrentChange (page) {
      this.page = page
      this.getReportList()
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
    .table-wrapper
      .preview
        margin-left 10px
        color #409EFF
        font-weight 500
    .pagination-wrapper
      margin-top 20px
      text-align center
</style>
