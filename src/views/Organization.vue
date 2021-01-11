<template>
  <div class="course">
    <h3 class="title">机构风向标</h3>
    <el-button type="primary" size="medium" class="btn" @click="addGoods">新增文章</el-button>
    <el-table
      :data="goodsList"
      border
      style="width: 100%; margin-top: 20px;"
      align="center"
    >
      <el-table-column
        align="center"
        prop="id"
        label="ID"></el-table-column>
      <el-table-column
        align="center"
        prop="title"
        label="文章标题"></el-table-column>
      <el-table-column
        align="center"
        prop="articleDate"
        label="最近操作时间"></el-table-column>
      <el-table-column
        align="center"
        prop="articleUrl"
        label="文章地址"></el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="modify(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteItem(scope.row.id)" type="text" size="small" style="color: red;">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px">
      <!-- <div>文章需要配置标题、类型、对应公众号内文章地址，轮播图只要配置图片即可</div> -->
      <el-form :model="goodsInfo" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="goodsInfo.title" placeholder="请填写文章标题"></el-input>
        </el-form-item>
        <el-form-item label="文章地址（公众号）" prop="articleUrl">
          <el-input v-model.number="goodsInfo.articleUrl" placeholder="请填写文章地址"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" size="medium">确定</el-button>
          <el-button @click="resetForm('ruleForm')" size="medium">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { saveArticle, deleteArticle, getArticleList } from '../common/api'

export default {
  data () {
    return {
      goodsList: [],
      currentPage: 1,
      total: 0,
      pageSize: 10,
      dialogTitle: '新增文章',
      dialogVisible: false,
      goodsInfo: {
        id: '',
        title: '',
        articleUrl: '',
        articleDate: ''
      },
      rules: {
        title: [
          { required: true, message: '请填写文章标题', trigger: 'blur' }
        ],
        articleUrl: [
          { required: true, message: '请输入文章地址', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 修改商品信息
    modify (r) {
      const { id, title, articleUrl } = r
      this.goodsInfo = {
        id,
        title,
        articleUrl,
      }
      this.dialogTitle = '编辑文章'
      this.dialogVisible = true
    },
    // 新增商品提交
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { title, articleUrl } = this.goodsInfo
          saveArticle({
            id: this.goodsInfo.id || null,
            title,
            articleUrl,
            articleDate: new Date().toJSON()
          }).then(res => {
            const { code } = res.data
            if (code === 0) {
              this.$notify({
                title: '成功',
                message: '配置文章成功',
                type: 'success'
              })
              this.dialogVisible = false
              this.getList()
            } else {
              this.$notify.error({
                title: '错误',
                message: '配置文章失败，请刷新重试',
                offset: 100
              })
            }
          }).catch(() => {
            this.$notify.error({
              title: '错误',
              message: '网络异常，请刷新重试',
              offset: 100
            })
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    addGoods () {
      this.goodsInfo = {
        id: '',
        title: '',
        articleUrl: '',
        articleDate: ''
      }
      this.dialogTitle = '新增文章'
      this.dialogVisible = true
    },
    // handleCurrentChange (val) {
    //   this.currentPage = val
    //   this.getList()
    // },
    // handleSizeChange (val) {
    //   this.pageSize = val
    //   this.getList()
    // },
    deleteItem (id) {
      deleteArticle({
        id
      }).then(res => {
        const { code } = res.data
        if (code === 0) {
          this.$notify({
            title: '成功',
            message: '删除素材成功',
            type: 'success'
          })
          this.getList()
        } else {
          this.$notify.error({
            title: '错误',
            message: '删除素材失败，请刷新重试',
            offset: 100
          })
        }
      }).catch(() => {
        this.$notify.error({
          title: '错误',
          message: '网络异常，请刷新重试',
          offset: 100
        })
      })
    },
    getList () {
      getArticleList({
        current: 1,
        size: 100
        // size: this.pageSize,
        // page: this.currentPage
      }).then(res => {
        const { code, data } = res.data
        if (code === 0) {
          this.goodsList = data.records
          // this.courseList.map(item => (item.state = true))
        } else {
          this.$notify.error({
            title: '错误',
            message: '查询数据失败，请刷新重试',
            offset: 100
          })
        }
      }).catch(() => {
        this.$notify.error({
          title: '错误',
          message: '网络异常，请刷新重试',
          offset: 100
        })
      })
    }
  }
}
</script>

<style lang="stylus">
  .course
    margin-left 20px
    .title
      padding-bottom 20px
      border-bottom 1px solid #e8e8e8
    .btn
      margin: 20px 0
    // ul
    //   li
    //     .el-input
    //       margin-right 20px
    //       width 200px
    //       height 60px
    //       line-height 60px
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
