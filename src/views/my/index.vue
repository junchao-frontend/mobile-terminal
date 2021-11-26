<template>
  <div class="container">
    <van-cell-group
      v-if="user"
      class="my-info">
      <van-cell
      :border="false"
      class="base-info"
      center
      title="单元格"
      value="内容"
      >
      <div slot="icon">
        <van-image
          class="avator"
          round
          width="60px"
          height="60px"
          :src="avator"
        />
      </div>
      <div class="name" slot="title">
        小潮
      </div>
      <van-button class="update-button" round size="small">编辑资料</van-button>
      </van-cell>
      <van-grid :border="false" class="data-info">
        <van-grid-item class="data-info-item" text="文字">
          <div class="count" slot="text">
            {{CurrentUser.art_count}}
          </div>
          <div class="text" slot="text">
            头条
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item" text="文字">
          <div class="count" slot="text">
            {{CurrentUser.follow_count}}
          </div>
          <div class="text" slot="text">
            关注
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item" text="文字">
          <div class="count" slot="text">
            {{CurrentUser.fans_count}}
          </div>
          <div class="text" slot="text">
            粉丝
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item" text="文字">
          <div class="count" slot="text">
            {{CurrentUser.like_count}}
          </div>
          <div class="text" slot="text">
            获赞
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div v-else class="not-login">
      <div class="not-login-warp" @click="toLogin()">
      <div class="not-login-img">
        <img style="width:65px;height:65px" src="./手机.png" alt="">
      </div>
      <div class="not-login-text">
        登录/注册
      </div>
      </div>
    </div>
    <van-grid :column-num="2" class="nav-grid mb-5" :border="false">
      <van-grid-item class="nav-grid-shoucang" icon="star-o" text="收藏"></van-grid-item>
      <van-grid-item class="nav-grid-lishi" icon="browsing-history-o" text="历史"></van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link url="/" />
    <van-cell class="mb-5" title="小智同学" is-link to="/" />
    <van-cell v-if="user" class="logout-cell" title="退出登录" @click="toLogout()" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user.js'
export default {
  components: {},
  data () {
    return {
      avator: require('./avator.jpg'), // 用户头像
      CurrentUser: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {},
  mounted () {
    this.loadUser()
  },
  methods: {
    // 展示当前用户信息
    loadUser () {
      getCurrentUser().then(res => {
        this.CurrentUser = res.data.data
        console.log(res)
      })
    },
    toLogin () {
      this.$router.push('/login')
    },
    // 退出登录
    toLogout () {
      this.$dialog.confirm({
        title: '标题',
        message: '弹窗内容'
      })
        .then(() => {
          // on confirm
          this.$store.commit('SetUser', null)
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  .my-info{
    background: url("./banner.png") no-repeat;
    background-size: cover;
  }
  .base-info{
    height: 115px;
    padding-top: 30px;
    box-sizing: border-box;
    background-color: unset;
    .avator{
      border: 1px solid white;
    }
    .update-button{
      height: 19px;
      font-size: 12px;
    }
    .name{
      margin-left: 10px;
      font-size: 17px;
      color: white;
    }
  }
  .data-info{
    .data-info-item{
      display: flex;
      justify-content: center;
      align-items: center;
      .count{
        font-size: 26px;
      }
      .text{
        font-size: 12px;
      }
      color: white;
    }
  }
  .nav-grid{
    background-color: white;
    .nav-grid-shoucang{
      /deep/ .van-grid-item__icon{
        color: #eb5253;
      }
    }
    .nav-grid-lishi{
      /deep/ .van-grid-item__icon{
        color: #ff9d1d;
      }
    }
    /deep/ .van-grid-item__text{
      font-size: 12px;
      color: black;
    }
  }
  .logout-cell{
    color: #eb5253;
    text-align: center;
  }
  .not-login{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
    height: 180px;
    background: url('./banner.png') no-repeat;
    background-size: cover;
    .not-login-warp{
      cursor: pointer;
      // margin: 0 auto;
      // width: 68px;
      // width: 20px;
      .not-login-text{
      margin-left: -10px;
      font-size: 18px;
      color: white;
    }
    }
  }
  /deep/ .van-grid-item__content{
    background-color: unset;
  }
  .mb-5{
    margin-bottom: 5px;
  }
}
</style>
