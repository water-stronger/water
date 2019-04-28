<template>
  <div class="main">
    <div @click="back" class="back icon-back"></div>
    <div class="content" ref="aaa">
      <div class="title">
        <div class="albums">
          <img :src="item.albums" class="pic">
        </div>
        <div class="text">
          <div class="title">{{item.title}}</div>
          <div class="id">发布者：{{item.id}}</div>
          <div class="imtro">{{item.imtro}}</div>
          <div class="igs">
            <span class="size">用料：{{item.ingredients}}</span>
          </div>
        <div class="step" v-for="(stp, index) in item.steps" :key="index">
          <div><img :src="stp.img" class="img"></div>
          <div class="word">{{stp.step}}</div>
        </div>
      </div>
        <div class="comment">
          <comment-ratings></comment-ratings>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CommentRatings from './commentRatings'
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        item: {
        }
      }
    },
    created() {
      this.item = this.$route.params.item
      console.log(this.item)
      this.$nextTick(() => {
        this.contentscroll = new BScroll(this.$refs.aaa, {
          click: true
        })
      })
    },
    methods: {
      back() {
        this.$router.go(-1)
      }
    },
    components: {
      CommentRatings
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
.main
  width: 100%
  position: fixed
  top: 0
  left: 0
  bottom: 0
  background: white
  z-index: 51
  .back
    width: 100%
    font-size: 30px
    height: 35px
    line-height: 35px
    padding-left: 15px
    background: rgba(128, 128, 128, 0.15)
  .content
    position: fixed
    top: 45px
    left: 0
    bottom: 0
    overflow: hidden
    .title
      .albums
        width: 100%
        .pic
          border-bottom: 1px solid rgba(169, 169, 169, 0.4)
          padding-bottom: 40px
          width: 100%
      .text
        width: 100%
        text-align: center
        .title
          margin-top: 10px
          font-size: 20px
          font-weight: 700
        .id
          margin-bottom: 10px
          color: rgba(139, 0, 0, 0.7)
          padding-top: 10px
          font-size: 15px
        .imtro
          margin: 0 10px 30px 10px
          text-align: left
          letter-spacing: 2px
          font-style: oblique
          font-size: 14px
          color: rgb(130, 128, 128)
        .igs
          margin: 0 0  20px 40px
          text-align: left
          .size
            color: grey
            font-size: 15px
        .step
          margin-bottom: 30px
          .img
            width: 70%
          .word
            margin-top: 10px
            color: rgba(28, 28, 28, 0.8)
            font-size: 14px
</style>
