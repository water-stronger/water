<template>
  <div class="main">
    <div class="content" v-for="(item, index) in food.data" :key="index">
        <div @click="jump(item)" class="click">
          <div class="albums">
            <img :src="item.albums"  height="80">
          </div>
          <div class="text">
            <div class="pick">
              <div class="title">{{item.title}}</div>
              <div class="igs">{{item.ingredients}}</div>
              <div class="id">
              <span>上传者：{{item.id}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="back" @click="back(item)">
          <!--<i class="icon-collection-another" :class="{active:favorite}"></i>-->
          <i class="icon-collection" ></i>
          <!--<span class="keep">{{favoriteText}}</span>-->
          <span class="keep">收藏</span>
        </div>
    </div>
  </div>
</template>

<script>
  // const $ = require('jquery')
  export default {
    props: {
      food: {
        type: Object,
        required: true
      },
      showStep: {
        type: Boolean,
        default: false
      },
      loginPass: {
        type: Boolean
      }
    },
    data() {
      return {
        now: {},
        stepsFoods: false,
        showShare: false,
        arr: [],
        isClick: false,
        favorite: false
      }
      },
    // computed: {
    //   favoriteText() {
    //     return this.favorite ? '已收藏' : '收藏'
    //   }
    // },
    methods: {
      jump(item) {
        this.stepsFoods = !this.stepsFoods
        this.$router.push({name: 'steps', params: {item}})
      },
      back(item) {
        if (this.loginPass === true) {
          this.arr = item
          this.$emit('accept', this.arr)
          this.favorite = !this.favorite
        } else {
          // console.log('收藏失败')
          this.$router.push('/mine')
        }
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .main
    width: 100%
    .content
      position: relative
      margin: 0 6px 15px 20px
      .click
        width: 100%
        display: flex
        border-bottom: 1px solid rgba(169, 169, 169, 0.6)
        margin-bottom: 25px
        &.show
          display: none
        .albums
          flex: 0 0 80px
          img
            border-radius: 8px
            width: 100px
        .text
          flex: 1
          padding-left: 25px
          width: 100%
          .pick
            .title
              margin-bottom: 12px
              color: rgba(255, 6, 34, 0.5)
              font-size: 15px
            .igs
              color: rgba(0, 0, 0, 0.5)
              margin-bottom: 10px
              padding: 0 6px
              max-width: 180px
              font-size: 9px
              vertical-align: bottom
              white-space: nowrap
              overflow: hidden
              text-overflow: ellipsis
              color: rgb(147, 153, 159)
            .id
              width: 100%
              color: rgba(0,0,0,0.6)
              font-size: 16px
      .back
        position: absolute
        top: -12px
        right: 0
        font-size: 15px
        padding: 2px
        margin: 10px 15px 15px
        width: 70px
        height: 20px
        line-height: 20px
        text-align: center
        /*border: 1px solid red*/
        border-radius: 4px
        color: rgb(60, 60, 60)
        i
          &.active
            color: rgb(240, 20, 20)
</style>
