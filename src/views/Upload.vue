<template>
  <div class="page">
    <h1 class="page-title">研报上传</h1>
    <el-form ref="form" class="form-wrapper" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="研报标题" prop="title">
        <el-input v-model="form.title" placeholder="如：面向未来，新常态与新布局"></el-input>
      </el-form-item>
      <el-form-item label="股票代码" prop="code">
        <el-input v-model="form.code" placeholder="如：300012"></el-input>
      </el-form-item>
      <el-form-item label="股票名称" prop="name">
        <el-input v-model="form.name" placeholder="如：华测检测"></el-input>
      </el-form-item>
      <el-form-item label="研报日期" prop="reportTime">
        <el-input v-model="form.reportTime" placeholder="如：2020-09-16"></el-input>
      </el-form-item>
      <el-form-item label="评级" prop="rate">
        <el-input v-model="form.rate" placeholder="如：增持"></el-input>
      </el-form-item>
      <el-form-item label="行业" prop="category">
        <el-input v-model="form.category" placeholder="如：综合行业"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="form.author" placeholder="如：罗立波,郭鹏"></el-input>
      </el-form-item>
      <el-form-item label="券商" prop="institution">
        <el-input v-model="form.institution" placeholder="如：广发证券"></el-input>
      </el-form-item>
      <el-form-item label="文件尺寸" prop="size">
        <el-input v-model="form.size" placeholder="如：2.80M"></el-input>
      </el-form-item>
      <el-form-item label="页数" prop="page">
        <el-input v-model="form.page" placeholder="如：50"></el-input>
      </el-form-item>
      <el-form-item label="格式" prop="format">
        <el-input v-model="form.format" placeholder="默认PDF" disabled></el-input>
      </el-form-item>
      <el-form-item label="文件" prop="file">
        <el-upload
          ref="fileUpload"
          class="upload-demo"
          drag
          action="https://www.yoohan.top/main/report/uploadReportFile"
          :headers="headers"
          :multiple="false"
          :file-list="fileLists"
          :on-change="handleChange"
          :on-remove="beforeRemove"
          :auto-upload="false"
          :on-success="handleSuc"
          :on-error="handleError"
          :on-exceed="handleExceed"
          :before-upload="beforeAvatarUpload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传PDF文件</div>
        </el-upload>
      </el-form-item>
      
      <!-- <el-form-item label="研报地址" prop="format">
        <el-upload
          class="report-uploader"
          action="#"
          ref="upload"
          :auto-upload="false"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即上传</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { uploadReportFile } from '../common/api.js'

export default {
  data () {
    return {
      file: null,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      fileLists: [],
      form: {
        title: '',
        code: '',
        name: '',
        reportTime: '',
        rate: '',
        category: '',
        author: '',
        institution: '',
        size: '',
        page: '',
        format: 'PDF',
        url: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入研报标题', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入股票代码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入股票名称', trigger: 'blur' }
        ],
        reportTime: [
          { required: true, message: '请输入研报日期', trigger: 'blur' }
        ],
        rate: [
          { required: true, message: '请输入研报评级', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请输入研报行业', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ],
        institution: [
          { required: true, message: '请输入券商', trigger: 'blur' }
        ],
        size: [
          { required: true, message: '请输入文件尺寸', trigger: 'blur' }
        ],
        page: [
          { required: true, message: '请输入页数', trigger: 'blur' }
        ],
        format: [
          { required: true, message: '请输入格式', trigger: 'blur' }
        ]
      }
    }
  },
  created () {

  },
  mounted () {
  },
  methods: {
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    handleChange(files, fileList) {
      console.log('handleChange')
      console.log(files)
      console.log(fileList)
      const { raw: { type }, status } = files
      if (type !== 'application/pdf') {
        this.$message.error('研报文件只能是 PDF 格式!')
        this.$refs.fileUpload.clearFiles()
        this.file = null
        return
      }
      if (status === 'ready') {
         //获取最后一次得到的文件
        const aa = fileList[fileList.length - 1]
        //覆盖上一次的文件
        this.fileLists = []
        this.fileLists.push(aa)
        this.file = aa.raw
      }
    },
    // 文件超出个数限制时的钩子
    handleExceed() {
      console.log('handleExceed')
      this.$notify.warning({
        title: '提示',
        message: '上传文件已存在,替换请先移除！',
        duration: 2000
      })
    },
    beforeRemove() {
      console.log('beforeRemove')
      //清空已上传的文件列表（该方法不支持在 before-upload 中调用）
      this.$refs.fileUpload.clearFiles()
      this.fileLists = []
    },
     //文件上传成功时的钩子
    handleSuc(response) {
      console.log('handleSuc')
      console.log(response)
      //上传成功处理
      if (response.code === 0) {
        this.$notify({
          title: '成功',
          message: '上传成功',
          type: 'success',
          duration: 2000
        })
        this.beforeClose()
        //上传完成以后，调用父组件的方法进行刷新页面操作
        this.$emit('refresh-table', '')
      } else {
        //上传失败处理
        this.$notify.error({
          title: '失败',
          message: response.msg,
          duration: 3000
        })
      }
    },
    handleError(err) {
      console.log('handleError')
      //上传失败处理
      this.$notify.error({
        title: '失败',
        message: err,
        duration: 3000
      })
    },
    // handleAvatarSuccess(res, file) {
    //   console.log(res)
    //   console.log(file)
    //   this.imageUrl = URL.createObjectURL(file.raw);
    // },
    beforeAvatarUpload(file) {
      console.log('beforeAvatarUpload')
      console.log(file)
      const isPDF = file.type === 'application/pdf'
      if (!isPDF) {
        this.$message.error('上传头像图片只能是 PDF 格式!')
        return false
      }
      return true
    },
    submitForm(formName) {
      console.log(formName)
      const { file } = this
      if (!file) {
        this.$message.error('请上传研报PDF文件!')
        return
      }
      this.$refs.fileUpload.submit()
      // 创建form对象
      // const formdata = new FormData()
      // formdata.append('file', this.file)
 
      // uploadReportFile(formdata).then(res => {
      //   console.log(res)
      // })
      // this.$refs.fileUpload.submit()
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     // alert('submit!');
      //     // 先上传文件
      //     this.$refs.upload.submit()
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
  .report-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .report-uploader .el-upload:hover {
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
