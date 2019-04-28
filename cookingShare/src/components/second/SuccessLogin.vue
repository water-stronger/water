<template>
  <div class="main">
    <div class="div">恭喜你，登录成功</div>
    <div @click="quit" class="quit" @acceptNum="quit">退出登录</div>
  </div>
</template>

<script>
  export default {
    methods: {
      quit() {
        this.$router.push('/mine')
        this.$emit('acceptNum')
        this.$emit('acceptClear')
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .main
    width: 100%
    height: 650px
    background: rgba(160, 160, 160, 0.4)
    .div
      padding: 40px 0px 30px 0px
      /*width: 100%*/
      text-align: center
      font-size: 20px
      color: #2e6da4
    .quit
      text-align: center

</style>
