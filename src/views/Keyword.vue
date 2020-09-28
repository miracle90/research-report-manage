<template>
  <div class="page">
    <h1 class="page-title">关键词管理</h1>
    <el-form ref="ruleForm" class="form-wrapper" :inline="true">
      <el-form-item label="" prop="mobile">
        <el-input v-model="word" placeholder="输入要添加的关键词" style="width: 200px;" size="medium"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save('')" size="medium">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="keywords" border align="center" class="table-wrapper">
      <el-table-column align="center" prop="word" label="关键词"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="update(scope.row.id)">更新</el-button>
          <el-button type="danger" size="mini" @click="remove(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="关键词" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="名称" label-width="120px">
          <el-input v-model="name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getKeyword, removeKeyword, saveKeyword } from '../common/api.js'
export default {
  data () {
    return {
      keywords: [],
      word: '',
      name: '',
      dialogFormVisible: false,
      params: {

      }
    }
  },
  created () {

  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      getKeyword().then(res => {
        const { code, data } = res.data
        if (code === 0) {
          this.keywords = data
        }
      })
    },
    confirm () {
      if (!this.name) {
        this.$message({
          message: '名称不得为空！',
          type: 'warning'
        });
        return
      }
      this.params.word = this.name
      saveKeyword(this.params).then(res => {
        const { code } = res.data
        if (code === 0) {
          this.$message({
            message: '关键词设置成功！',
            type: 'success'
          });
          this.dialogFormVisible = false
          this.word = ''
          this.getList()
        }
      })
    },
    cancel () {
      this.dialogFormVisible = false
      this.name = ''
    },
    update (id) {
      this.dialogFormVisible = true
      this.params = { id }
    },
    save () {
      let params = {}
      // 为空判断
      if (!this.word) {
        this.$message({
          message: '关键词不得为空！',
          type: 'warning'
        });
        return
      }
      if (this.keywords.find(item => item.word === this.word)) {
        this.$message({
          message: '关键词已存在！',
          type: 'warning'
        });
        return
      }
      params.word = this.word
      saveKeyword(params).then(res => {
        const { code } = res.data
        if (code === 0) {
          this.$message({
            message: '关键词设置成功！',
            type: 'success'
          });
          this.word = ''
          this.getList()
        }
      })
    },
    remove(id) {
      removeKeyword({
        id
      }).then(res => {
        const { code } = res.data
        if (code === 0) {
          this.$message({
            message: '删除成功！',
            type: 'success'
          });
          this.getList()
        }
      })
    },
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
