<template>
  <div class="home-container">
    <van-nav-bar
      class="app-nav-bar">
    <div slot="title">
      <van-button
      class="search-btn"
      icon="search"
      round
      type="info"
      >搜索</van-button>
    </div>
    </van-nav-bar>
    <van-tabs>
     <van-tab v-for="(item,index) in channels" :title="item.name" :key="index">
    <articleList :channel="item" />
    </van-tab>
</van-tabs>
  </div>
</template>

<script>
import articleList from './components/articleList.vue'
import { getChannels } from '@/api/channel.js'
export default {
  components: {
    articleList
  },
  data () {
    return {
      channels: []
    }
  },
  computed: {},
  created () {},
  mounted () {
    this.loadChannels()
  },
  methods: {
    // 获取频道列表
    loadChannels () {
      getChannels().then(res => {
        this.channels = res.data.data.channels
        // console.log(this.channels)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.home-container{
  /deep/ .van-nav-bar__title{
    max-width: none;
  }
  .search-btn{
    border: none;
    height: 32px;
    width: 277px;
    background: #5babfb;
  }
}
</style>
