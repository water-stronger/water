<template>
    <div class="title">
      <div class="main">
        <div class="top">
          <div @click="back" class="cancel">取消</div>
          <div class="center">创建菜谱</div>
          <div class="final" @click="getInput">发布菜谱</div>
        </div>
        <div class="content" ref="bbb">
          <div>
            <div class="content_top"><input type="file"></div>
            <div class="name">
              <input type="text" placeholder="菜的种类：如肉，蔬菜，水果等" class="input" value="肉">
              <input type="text" placeholder="添加菜谱的名字" class="input" value="炒牛肉">
            </div>
            <div class="id"><input type="text" placeholder="创造者" class="input" value="李大娘"></div>
            <div class="border_bottom"></div>
            <div class="story"><input type="text" placeholder="输入这道美食背后的故事" class="input" value="我想吃而已，味道还不错！！！"></div>
            <div class="food">
              <div style="margin-left: 8px">用料</div>
              <div class="burden" style="margin: 12px 0 10px 18px; color:grey">
                配料：<input type="text" class="input" style="width: 80%" placeholder="如：油,适量;盐,适量;鸡精,适量;蒜蓉,适量">
              </div>
              <div class="needFood" v-for="(i, index) in changeInput" :key="index">
                <div class="left">
                  <input type="text" placeholder="食材：如鸡蛋" class="input" value="牛肉">
                </div>
                <div class="right">
                  <input type="text" placeholder="用量：如一只" class="input" value="1顿">
                </div>
              </div>
            </div>
            <div class="touch">
              <div class="more" @click.stop="change_input('add')">增加一行</div>
              <div class="des" @click.stop="change_input('des')">减少一行</div>
            </div>

            <div class="foodStep" v-for="(i, index) in  stepInput" :key="index">
              <div class="step" style="margin-left: 8px">
                <div>步骤</div>
                <div class="pic">+步骤图,<span>清晰的步骤会让菜谱更加受欢迎</span></div>
                <div>添加步骤说明</div>
                <input type="text" class="input" value="放葱">
              </div>
            </div>
            <div class="stepMore">
              <div class="moreStep" @click.stop="change_step('add')">增加步骤</div>
              <div class="desStep" @click.stop="change_step('des')">减少步骤</div>
            </div>

            <div class="del" @click="del">删除这个菜谱</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  const $ = require('jquery')
    export default {
      name: 'makingMenu',
      data() {
        return {
          content: {
            'id': '',
            'title': '',
            'tags': '',
            'imtro': '',
            'ingredients': '',
            'burden': '',
            'albums': '',
            'steps': [
              {
                'img': '',
                'steps': ''
              }
            ]
          },
          changeInput: [{
            value1: '',
            value2: ''
          },
          {
            value1: '',
            value2: ''
          }
          ],
          stepInput: [
            {
              value: ''
            }
          ],
          aaa: [],
          // num: -1,
          name: ''
        }
      },
      created() {
        this.$nextTick(() => {
          this.menuscroll = new BScroll(this.$refs.bbb, {
            click: true
          })
        })
      },
      methods: {
        back() {
          this.$emit('goBack')
        },
        change_input(val) {
          switch (val) {
            case 'add':
              this.changeInput.push({
                value1: '',
                value2: ''
              })
              break
            case 'des':
              if (this.changeInput.length <= 2) {
                break
              }
              this.changeInput.pop()
              break
          }
        },
        change_step(val) {
          switch (val) {
            case 'add':
              this.stepInput.push({
                value: ''
              })
              this.num++
              break
            case 'des':
              if (this.stepInput.length <= 1) {
                break
              }
              this.stepInput.pop()
              break
          }
        },
        getInput() {
          for (var i = 0; i < $('.input').length; i++) {
            this.aaa.push($('.input').eq(i).val())
          }
          this.name = this.aaa[0]
          this.content.id = this.aaa[2]
          this.content.title = this.aaa[1]
          this.content.tags = this.aaa[3]
          this.content.burden = this.aaa[4]
          for (var j = 0; j < 2 * this.changeInput.length; j++) {
            if ((5 + j) % 2 !== 0) {
              this.content.ingredients += this.aaa[5 + j]
              this.content.ingredients += ','
            } else {
              this.content.ingredients += this.aaa[5 + j]
              this.content.ingredients += ';'
            }
          }
            var igs = 2 * this.changeInput.length + 5
            if (this.stepInput.length > 1) {
              for (var l = 1; l < this.stepInput.length; this.stepInput.length--) {
                this.content.steps.push({
                  'img': '',
                  'steps': ''
                })
              }
              console.log(this.content.steps.length)
              for (let n = 0; n < this.content.steps.length; n++) {
                // this.content.steps[n].img = this.aaa[igs + n]
                this.content.steps[n].steps = this.aaa[ igs + n ]
                this.content.steps[n].steps = this.content.steps[n].steps
              }
            } else {
               this.content.steps[0].steps = this.aaa[igs]
            }
            // this.$router.push({name: 'menu', params: this.content})  //跳转到主页，跳转不了？？！！
            this.$emit('backMenu', this.content)
            this.del()
        },
        del() {
          this.aaa = null
          for (var i = 0; i < $('.input').length; i++) {
            // $('.input').eq(i).value = ''
            $('.input').eq(i).attr('value', '')
          }
        }
      }
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .title
    position: fixed
    top: 0
    bottom: 0
    left: 0
    width: 100%
    /*margin-left: 4px*/
    background: white
    .top
      display: flex
      width: 100%
      height: 45px
      text-align: center
      /*background: rgba(128, 128, 128, 0.02)*/
      div
        flex: 1
        padding-top: 15px
        color: red
      .cancel
        text-align: left
        margin-left: 10px
      .center
        text-align: center
        color: rgba(0, 0, 0, 0.8)
        font-size: 19px
      .final
        text-align: right
        margin-right: 10px
    .content
      position: fixed
      width: 100%
      top: 50px
      bottom: 0
      left: 0
      overflow: hidden
      /*margin-top: 15px*/
      .content_top
        width: 95%
        margin: 10px auto 15px
        height: 300px
        /*line-height: 300px*/
        text-align: center
        background: rgba(128, 128, 128, 0.2)
        input
          width: 95%
          height: 300px
          /*text-align: center*/
      .name
        display: flex
        margin-top: 15px
        width: 100%
        text-align: center
        input
          flex: 1
          width: 100%
          height: 30px
          font-size: 13px
          text-align: center
      .id
        margin-top: 15px
        width: 100%
        text-align: center
        input
          font-size: 17px
          text-align: center
      .border_bottom
        width: 80%
        margin: 10px auto 15px
        border-bottom: 0.5px solid rgba(128, 128, 128, 0.6)
        text-align: center
      .story
        width: 100%
        input
          width: 100%
          height: 25px
          font-size: 16px
          margin-bottom: 20px
      .needFood
        display: flex
        margin-top: 10px
        width: 100%
        input
          border: none
          text-align: center
          width: 100%
          margin: 5px 10px 0px 10px
        .left
          flex: 1
        .right
          flex: 1

      .touch
        display: flex
        margin: 20px 0 20px 0
        color: red
        text-align: center
        .more
          flex: 1
        .des
          flex: 1
      .foodStep
        width: 100%
        margin: 10px 0 10px 0
        .pic
          width: 95%
          margin: 10px auto 15px
          height: 300px
          line-height: 300px
          text-align: center
          background: rgba(128, 128, 128, 0.2)
        .input
          margin: 10px auto
          height: 25px
          width: 100%
          border: none

      .stepMore
        display: flex
        color: red
        text-align: center
        margin-bottom: 20px
        .moreStep
          flex: 1
        .desStep
          flex: 1
      .del
        margin: 10px auto 0
        width: 100%
        height: 40px
        line-height: 40px
        font-size: 20px
        background: rgba(128, 128, 128, 0.8)
        text-align: center
        color: whitesmoke
</style>
