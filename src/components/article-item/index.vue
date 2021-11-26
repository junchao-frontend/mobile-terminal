<template>
  <div class="container">
    <van-cell class="article-item">
    <div slot="title">{{article.title}}</div>
    <div slot="label">
        <div class="cover-warp" v-if="article.cover.type === 3">
          <div class="cover-warp-item">
              <van-image
                width="110"
                height="70"
                fit="cover"
                v-for="(img,index) in article.cover.images"
                :key="index"
                :src="img"
                />
          </div>
        </div>
        <div class="label-warp">
            <span>{{article.aut_name}}</span>
            <span>{{article.comm_count}}</span>
            <span>{{article.pubdate}}</span>
        </div>
    </div>
    <div>
     <van-image
        v-if="article.cover.type === 1"
        width="60"
        height="60"
        fit="cover"
        :src="article.cover.images[0]"
        />
    </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      require: true
    }
  },
  components: {},
  data () {
    return {
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped>
</style>
