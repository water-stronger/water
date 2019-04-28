<template>
    <div class="main">
      <div class="icon-back" @click="reverse"></div>
      <div class="name"><img src="../../public/img/kitchen.png"></div>
      <div class="content" @click="come">创建菜谱</div>
      <div class="menu">
        <making-menu v-if="num" @goBack="come" @backMenu="backMenu"></making-menu>
      </div>
    </div>
</template>

<script>
  import makingMenu from './makingMenu'
    export default {
      name: 'upLoading',
      data() {
        return {
          num: false,
          content: {}
        }
      },
      methods: {
          reverse() {
            this.$emit('returnValue')
            this.$emit('backMenuTwo', this.content)
            console.log(this.content)
          },
          come() {
            this.num = !this.num
            // console.log(111)
          },
          backMenu(content) {
            this.num = !this.num
            this.content = content
            // console.log(this.content)
          }
      },
      components: {
        makingMenu
      }
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
.main
  position: fixed
  top: 0
  left: 0
  bottom: 0
  width: 100%
  z-index: 50
  background: white
  .icon-back
    margin: 15px 0px 10px 20px
    font-size: 30px
  .name
    margin-top: 100px
    text-align: center
    /*border-radius: 50%*/
    img
      width: 120px
      height: 120px
  .content
    margin: 40px 0 20px 0
    width: 100%
    font-size: 20px
    color: rgba(107, 128, 90, 0.8)
    text-align: center

</style>
