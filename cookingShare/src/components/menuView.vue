<template>
    <div class="foods">
      <div class="discover">
        <div class="icon-more" @click="upLoading"></div>
        <up-loading  v-if="load" @returnValue="upLoading" @backMenuTwo="backMenu"></up-loading>
        <div class="input">
          <i class="icon-discover"></i>
          <input type="text" ref="input" placeholder="请输入要搜索的菜的种类：如肉，蔬菜等">
        </div>
        <div @click="discover" class="go">搜索</div>
      </div>
        <div class="show">
          <div class="food" v-for="(food, index) in foods" :key="index">
            <div @click="nowFood(food, index)" class="nowFood" :class="{show: index === nowActive}">
              {{food.name}}
            </div>
          </div>
          <div class="showFoods" ref="menu">
              <div>
                <show-foods :food="now" :loginPass="isLogin" @accept="comeback"></show-foods>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import showFoods from './second/showFoods.vue'
import upLoading from './second/upLoading'
// const $ = require('jquery')

export default {
  name: 'keep-alive',
  props: {
    isLogin: {
      type: Boolean
    }
  },
  data() {
    return {
      foods: [],
      now: {},
      getFood: [],
      showFoods: false,
      nowActive: 0,
      msg: {
        type: Object,
        required: true
      },
      load: false,
      content: {}
    }
  },
  created() {
    this.axios.get('/api/foods')
      .then(res => {
        res = res.data
        if (res.errno === 0) {
          this.foods = res.data
          this.now = res.data[0]
          this.getFood = res.data
          this.$nextTick(() => {
            this.menuscroll = new BScroll(this.$refs.menu, {
              click: true
            })
          })
        }
      })
  },
  methods: {
    nowFood(food, index) {
      this.now = food
      // this.showFoods = !this.showFoods
      // $('.nowFood').eq(index).css('color', 'red').siblings().css('color', '4D555D')
      // console.log(food)
      // $('.nowFood').eq(index).addClass('show').siblings().removeClass('show')
      this.nowActive = index
    },
    comeback(arr) {
      // console.log(this.count)
      this.$emit('acceptTwo', arr)
    },
    discover() {
      var msg = this.$refs.input.value
      var foods = this.getFood
      this.$router.push({name: 'search', params: {msg, foods}})
    },
    upLoading() {
      this.load = !this.load
      // console.log(this.load)
    },
    /* 这里再次细化还要重新弄多一边 */
    backMenu(content) {
      this.content = content
      this.foods[1].data.push(this.content)
      console.log(this.foods[1].data)
      // console.log(content[1])
    }
  },
  components: {
    showFoods,
    upLoading
  }
}
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
 .foods
  .discover
    margin: 8px
    display: flex
    height: 30px
    .icon-more
      width: 25px
      text-align: center
      line-height: 30px
      margin-right: 8px
    .input
      flex: 1
      display: flex
      border: 1px solid rgba(128, 128, 128, 0.2)
      border-radius: 6px
      i
        line-height: 30px
        padding: 0 5px 0 5px
      input
        flex: 1
        border: none
    .go
      display: inline-block
      line-height: 30px
      width: 40px
      text-align: center
      background-color: rgba(0, 210, 240, 0.4)
      border-radius: 2px
  .show
    width: 100%
    margin-top: 4px
    .food
      display: inline-block
      width: 20%
      text-align: center
      &:nth-child(5) > .nowFood
        border-right: none
      .nowFood
        padding-bottom: 10px
        font-size: 15px
        color: rgba(77, 85, 93, 0.8)
        border-right: 1px solid rgba(128, 128, 128, 0.3)
        &.show
          border-bottom: 1px solid rgba(240, 120, 0, 0.8)
          color: red
    .showFoods
      width: 100%
      position: fixed
      top: 95px
      bottom: 45px
      overflow: hidden

</style>
