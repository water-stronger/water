<template>
  <div class="ref" ref="menu">
    <div>
      <div class="icon-back" @click="reback"></div>
      <div v-for="(food,index) in foods" :key="index">
        <div v-if="food.name === msg" class="title">
          <div class="intro">你所搜索到的"{{food.name}}"的数量有：{{food.data.length}}</div>
          <div class="content" v-for="(item, index) in food.data" :key="index">
            <step-component @goBack="jump" v-if="search" :item="item"></step-component>
            <div @click="jump" class="click">
              <div class="albums">
                <img :src="item.albums" width="80" height="80">
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
              <span class="keep icon-collection">收藏</span>
            </div>
          </div>
        </div>
      </div>
      <div class="discoverError" v-if="isTrue">
        Sorry, 您所搜索的食物暂不存在！！
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import stepComponent from './stepComponent'

    export default {
      name: 'search',
      props: {
        isLogin: {
          type: Boolean
        }
      },
      data() {
          return {
            msg: {
              type: Object,
              required: true
            },
            foods: {},
            isTrue: false,
            search: false
          }
      },
      created() {
        this.msg = this.$route.params.msg
        this.foods = this.$route.params.foods
        this.$nextTick(() => {
          this.menuscroll = new BScroll(this.$refs.menu, {
            click: true
          })
        })
        // console.log(this.isTrue)
        this.isError()
      },
      methods: {
        jump() {
          this.search = !this.search
          // console.log('接受一次')
        },
        back(item) {
          if (this.isLogin === true) {
            this.$emit('accept', item)
          } else {
            this.$router.push('/mine')
          }
        },
        isError() {
          if (this.foods.length !== 0) {
            for (var i = 0; i < this.foods.length; i++) {
                if ((this.foods[i].name) !== this.msg) {
                  this.isTrue = !this.isTrue
                }
            }
          }
        },
        reback() {
          this.$router.go(-1)
        }
      },
      components: {
        stepComponent
      }
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
.ref
  width: 100%
  position: fixed
  top: 0
  bottom: 0
  overflow: hidden
  background: white
  z-index: 50
  .icon-back
    /*position: fixed*/
    top: 0
    left: 0
    width: 100%
    height: 20px
    padding: 10px 0 10px 20px
    background: rgba(233, 233, 233, 0.4)
    font-size: 25px
  .title
    .content
      position: relative
      margin: 0 6px 15px 20px
    .intro
      margin: 15px 0px 30px 0px
      padding: 25px
      text-align: center
      font-size: 23px
      color: rgba(0, 240, 255, 0.8)
      border-bottom: 2px solid rgba(128, 128, 128, 0.4)
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
      width: 60px
      height: 20px
      line-height: 20px
      text-align: center
      border-radius: 4px
  .discoverError
    margin: 100px 50px 0px 50px
    font-size: 25px
    text-align: center
    color: rgba(160, 180, 180, 0.9)
</style>
