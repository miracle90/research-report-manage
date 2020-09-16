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
      <el-form-item label="研报地址" prop="format">
        <el-upload
          class="report-uploader"
          action="#"
          ref="upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即上传</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { userList } from '../common/api.js'

export default {
  data () {
    return {
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
    handleAvatarSuccess(res, file) {
      console.log(res)
      console.log(file)
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    submitForm(formName) {
      console.log(formName)
      this.$refs.upload.submit()
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
