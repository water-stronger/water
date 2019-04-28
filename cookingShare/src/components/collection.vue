<template>
    <div class="main" ref="main">
      <div>
        <div class="add">收藏的私房菜有:{{(itemArr).length}}个</div>
        <div  v-for="(aaa, index) in itemArr"  :key="index" v-if="itemArr[index]" class="collection" >
          <div @click="jump(aaa)" class="click">
          <div class="albums">
            <img :src="aaa.albums" width="80" height="80">
          </div>
          <div class="text">
            <div class="title">{{aaa.title}}</div>
            <div class="igs">{{aaa.ingredients}}</div>
            <div class="id">
              <span>上传者：{{aaa.id}}</span>
            </div>
          </div>
        </div>
          <div class="del" @click="del(aaa)">删除</div>
        </div>
      </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    itemArr: {
      type: Array,
      required: true
    }
  },
  created() {
    this.$nextTick(() => {
    this.mainscroll = new BScroll(this.$refs.main, {
      click: true
    })
  })
  },
  data() {
    return {
      stepsFoods: false
    }
  },
  methods: {
    jump(item) {
      this.stepsFoods = !this.stepsFoods
      this.$router.push({name: 'steps', params: {item}})
    },
    del(aaa) {
     for (let i = 0; i < this.itemArr.length; i++) {
       if (this.itemArr[i] === aaa) {
         console.log(this.itemArr[i])
         this.itemArr.splice(i, 1)
       }
     }
      // console.log(typeof (this.itemArr))
      // console.log(this.itemArr)
    }
  },
  watch: {
    items() {
      this.many.push(this.items)
      // console.log(1)
    }
  }
  // updated() {
  //   // 注意这个
  //   // console.log(1)
  // }
}
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .main
    position: fixed
    top: 0
    bottom: 45px
    overflow: hidden
    margin: 0 10px 15px 20px
    width: 100%
    .add
      margin: 15px 0 30px 0
      padding: 25px
      text-align: center
      font-size: 23px
      color: rgba(0, 240, 255, 0.8)
      border-bottom: 2px solid rgba(128, 128, 128, 0.4)
    .collection
      position: relative
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
    .del
      position: absolute
      top: -12px
      right: 20px
      font-size: 15px
      padding: 2px
      margin: 10px 15px 15px
      width: 40px
      height: 20px
      line-height: 20px
      text-align: center
      background-color: rgba(0, 0, 0, 0.4)
      color: white
      border-radius: 4px
</style>
