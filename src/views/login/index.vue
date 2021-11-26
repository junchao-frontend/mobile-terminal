<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登录"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form
    ref="login-form"
    validate-first
    :show-error="false"
    :show-error-message="false"
    @submit="onLogin"
    @failed="onFailed"
    >
    <van-field
      v-model="form.mobile"
      icon-prefix='toutiao'
      left-icon="shouji"
      name="mobile"
      :rules="formrules.mobile"
      placeholder="请输入手机号"
    />
    <van-field
      v-model="form.code"
      clearable
      left-icon="guide-o"
      name="code"
      :rules="formrules.code"
      placeholder="请输入验证码"
    >
    <template #button>
    <van-count-down @finish='isCountdown = false' v-if="isCountdown" :time="1000 * 60" format=" ss s" />
    <van-button v-else size="small" round class="send-btn" @click.prevent="onSendcode" :loading="isBtnloading">发送验证码</van-button>
    </template>
    </van-field>
    <div class="login-btn-wrap">
     <van-button class="login-btn" type="info" block >登录</van-button>
    </div>
    </van-form>
  </div>
</template>

<script>
import { login, getCode } from '../../api/user'
export default {
  components: {},
  data () {
    return {
      form: {
        mobile: '',
        code: ''
      },
      formrules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountdown: false, // 用来显示获取验证码按钮和时间
      isBtnloading: false // 按钮加载状态
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
    onClickLeft () {},
    async onLogin () {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0 // 持续展示 toast
      })
      try {
        const res = await login(this.form)
        console.log(res)
        this.$toast.success('登录成功')
        this.$store.commit('SetUser', res.data.data)
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        this.$toast.fail('登录失败,手机号或验证码错误')
        console.log('登录失败', err)
      }
    },
    onFailed (err) {
      if (err.errors[0]) {
        this.$toast({
          message: err.errors[0].message,
          position: 'top'
        })
      }
    },
    async onSendcode () {
      // validate 验证表单，支持传入 name 来验证单个或部分表单项 返回值是promise对象
      try {
        await this.$refs['login-form'].validate('mobile')
        // 验证通过 获取验证码
        this.isBtnloading = true
        const res = await getCode(this.form.mobile)
        this.isCountdown = true
        console.log(res, 'code')
      } catch (error) {
        // try 里面任何代码的错误都会进入catch
        // 不同的错误需要有不同的提示
        let message = ''
        if (error && error.response && error.response.status === 429) {
          message = '发送太频繁了，请稍后重试'
        } else if (error.name === 'mobile') {
          message = error.message
        } else {
          message = '发送失败,请稍后重试'
        }
        // console.dir(error, 'error')
        this.$toast({
          message,
          position: 'top'
        })
      }
      this.isBtnloading = false
    }
  }
}
</script>

<style lang='less' scoped>
.login-btn-wrap{
  padding: 26px 16px;
  .login-btn{
    background-color: #6db4fb;
    border: none;
    .van-button__text{
      color: #fff;
      font-size: 16px;
  }
  }
}
.send-btn{
  width: 78px;
  height: 25px;
  background-color: #ededed;
  .van-button__text{
    font-size: 11px;
    color: #666666;
  }
}

</style>
