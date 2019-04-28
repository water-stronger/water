<template>
  <div id="app">
    <div class="tab">
      <div class="tab-item" >
        <router-link to="/menu"  class="icon-house">菜谱</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/collection" class="icon-collection-another">收藏</router-link>
      </div>
      <div class="tab-item">
        <div @click="Login" class="icon-mine">自己</div>
      </div>
    </div>
    <router-view @acceptTwo="comeback" @acceptClear="clearData" @accept="comeback" @acceptNum="changeLogin" :data="data"  :itemArr="countTwo" :isLogin="isLogin"></router-view>
  </div>
</template>

<script>
  // const $ = require('jquery')
export default {
  name: 'App',
  data() {
    return {
      countTwo: [],
      isLogin: true,
      login: false,
      // isActive: false,
      'data': ''
    }
  },
  methods: {
    comeback(count) {
      console.log(count)
      //  原始方式去重，注意别把字符串的数据和数字型数据区分来
      if (this.countTwo) {
            let del = 0
        for (var i = 0; i < this.countTwo.length; i++) {
          if (this.countTwo[i].id === count.id) {
            del++
          }
        }
        if (del === 0) {
          this.countTwo.push(count)
        }
        // for (var i = 0; i < this.countTwo.length; i++) {
        //   var num = this.countTwo[i]
        //   for (var j = i + 1; j < this.countTwo.length; j++) {
        //     if (num === this.countTwo[j]) {
        //       this.countTwo.splice(j, 1)
        //     }
        //   }
        // }
        // let set = new Set(this.countTwo)
        // this.countTwo = [...set]
      }
      // console.log(1)
      // console.log(this.countTwo)
    },
    clearData() {
      this.countTwo = []
    },
  //   bbb() {
  //     this.isLogin = !this.isLogin
  //     if (this.isLogin === true) {
  //       this.data = '成功'
  //     } else {
  //       this.data = '退出'
  //     }
  // }
    Login() {
      if (this.isLogin === false) {
        this.$router.push('/mine')
      } else {
        this.$router.push('/success')
      }
      // $('.isActive').css('color', 'F01414')
      },
    changeLogin() {
      this.isLogin = !this.isLogin
    }
    }
}
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
#app
  .tab
    position: fixed
    bottom: 0
    display: flex
    width: 100%
    height: 40px
    background: skyblue

    .tab-item
      flex: 1
      text-align: center
      /*line-height: 40px*/
      .icon-kitchen, .icon-colection, .icon-mine
        font-size: 18px
        line-height: 40px
        color: rgb(77, 85, 93)
      & > a
        display: block
        font-size: 16px
        color: rgb(77, 85, 93)
        text-decoration: none
        line-height: 40px
        &.active
          color: rgb(240, 20, 20)
</style>
