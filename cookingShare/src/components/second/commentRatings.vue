<template>
  <div class="details">
    <div class="conScroll" ref="scroll">
      <div>
        <div>
          <div class="comment">
            <div class="comment_top">
              <span class="comCount">{{commentCount}}条评论</span>
            </div>
            <div class="showComment">
              <div v-for="(val, index) in commentData" :key="index" class="comFor">
                <img :src="val.img" width="20">
                <div class="comBox">
                  <div class="user">
                    <span class="userID">{{val.user}}</span>
                    <div class="comPraise_box" style="display: inline-block">
                      <span class="comPraise">{{val.praise}}</span>
                      <i class="icon-praise" @click="clickPraise(index,val.praiseCount)"></i>
                    </div>
                  </div>
                  <div class="text">{{val.text}}</div>
                  <div class="timeBox">
                    <span class="time">{{val.time}}</span>
                    <span class="reply" @click="replyMsg(index)">回复</span>
                  </div>
                  <div class="replyBox" v-for="(rep, index) in val.reply" :key="index">
                    <div class="replyBottom"><span class="replyId">{{rep.replyId}}：{{rep.replyText}}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="writeComment">
      <input ref="focusInput" type="text" placeholder="写评论" v-model="val" @keyup.enter="send">
      <span @click="send()">发送</span>
    </div>
    <!--<div class="showShare_bg" v-show="showShare" @click="showShareFun"></div>-->
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  const $ = require('jquery')
  export default {
    // props: ['focus'],
    created() {
      this.commentCount = this.commentData.length
      setTimeout(() => {
        this.$nextTick(() => {
          this.conScroll = new BScroll(this.$refs.scroll, {
            click: true
          })
        })
      }, 300)
    },
    data() {
      return {
        showShare: false,
        showFocus: false,
        praiseCount: 2412,
        trampleCount: 2,
        show: false,
        showDown: false,
        replys: false,
        'commentData': [
          {
          'img': 'http://juheimg.oss-cn-hangzhou.aliyuncs.com/cookbook/s/17/1653_21524810385ccabf.jpg',
          'user': '肉了解一下',
          'text': '好吃！牛逼！',
          'praise': 3209,
          'time': '1小时前',
          'reply': [{
            'replyId': '来自火星的我',
            'replyText': '当然不错'
          }, {
            'replyId': '天外飞人',
            'replyText': '了解一下'
          }]
        },
          {
            'img': 'http://juheimg.oss-cn-hangzhou.aliyuncs.com/cookbook/s/17/1653_96df885d8b8b428d.jpg',
            'user': '肉了解一下1',
            'text': '好吃！牛逼！',
            'praise': 3209,
            'time': '1小时前2',
            'reply': [{
              'replyId': '来自火星的我',
              'replyText': '当然不错'
            }, {
              'replyId': '天外飞人',
              'replyText': '了解一下'
            }]
          },
          {
            'img': 'http://juheimg.oss-cn-hangzhou.aliyuncs.com/cookbook/s/17/1653_1403990a03fa5367.jpg',
            'user': '肉了解一下3',
            'text': '好吃！牛逼！',
            'praise': 3209,
            'time': '1小时前',
            'reply': [{
              'replyId': '来自火星的我',
              'replyText': '当然不错'
            }, {
              'replyId': '天外飞人',
              'replyText': '了解一下'
            }]
          },
          {
            'img': 'http://juheimg.oss-cn-hangzhou.aliyuncs.com/cookbook/t/2/1989_716012.jpg',
            'user': '肉了解一下4',
            'text': '好吃！牛逼！',
            'praise': 3209,
            'time': '1小时前',
            'reply': [{
              'replyId': '来自火星的我',
              'replyText': '当然不错'
            }, {
              'replyId': '天外飞人',
              'replyText': '味道不错'
            }]
          },
          {
            'img': 'http://juheimg.oss-cn-hangzhou.aliyuncs.com/cookbook/s/20/1989_d1e5a7df41bd3fb0.jpg',
            'user': 'YTG牛逼',
            'text': '吃吃吃！',
            'praise': 429,
            'time': '3小时前',
            'reply': [{
              'replyId': '中国厨神',
              'replyText': 'delicious'
            }, {
              'replyId': '域外天魔',
              'replyText': '喜欢吃而已'
            }]
          }
        ],
        replyNum: 0,
        userId: '小吃货',
        val: '',
        praiseNum: 0
      }
    },
    methods: {
      showShareFun() {
        this.showShare = !this.showShare
        if (this.showShare) {
          $('.myShare').slideDown()
        } else {
          $('.myShare').slideUp()
        }
      },
      close() {
        this.$router.go(-1)
      },
      send() {
        if (this.val != null) {
          if (this.replys) {
            this.commentData[this.replyNum].reply.push({'replyId': this.userId, 'replyText': this.val})
            this.replys = false
          } else {
            this.commentData.push({'user': this.userId, 'text': this.val, 'praise': 0, 'time': '刚刚', 'reply': []})
          }
        }
        this.val = ''
      },
      clickPraise(i) {
        console.log(i)
        if ($('.comPraise_box').eq(i).hasClass('comPraiseColor')) {
          $('.comPraise_box').eq(i).removeClass('comPraiseColor')
          // this.commentData[i].praise--
          // console.log(33)
        } else {
          $('.comPraise_box').eq(i).addClass('comPraiseColor')
          this.commentData[i].praise++
        }
      },
      replyMsg(i) {
        this.replys = true
        this.replyNum = i
        this.$refs.focusInput.focus()
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .details
    /*position: fixed
    width: 100%
    background: #fff
    .conScroll
      top: 62px
      bottom: 45px
      width: 100%
      overflow: hidden
      .content
        padding: 10px 12px 0
        border-bottom: 6px solid #f6f6f6
        .text
          font-size: 17px
          line-height: 26px
          span
            display: block
        .imgs
          margin-top: 16px
          span
            margin: 1px
          img
            width: 109px
        .content_bottom
          margin: 0 30px
          padding: 14px 0
          .ask
            border-bottom: 1px solid #e6e6e6
            padding: 10px 0
            .icon
              display: inline-block
              width: 4px
              height: 4px
              border: 4px solid #4ba2dc
              border-radius: 50%
            .text
              font-size: 13px
              line-height: 16px
              vertical-align: top
              color: #4ba2dc
          .other
            display: flex
            margin-top: 10px
            height: 20px
            font-size: 14px
            & > div
              flex: 1
              text-align: center
              color: #595959
            .like, .trample
              span
                font-size: 8px
                vertical-align: top
            .redColor
              color: red
    .comment
      padding: 0 10px
      margin-bottom: 40px
      .comment_top
        display: flex
        margin: 26px auto
        font-size: 16px
        .comCount
          flex: 1
          font-weight: 600
      .showComment
        .comFor
          display: flex
          img
            flex: 0 0 26px
            width: 26px
            height: 26px
            vertical-align: center
          .comBox
            flex: 1
            margin-bottom: 30px
            .user
              display: flex
              .userID
                flex: 1
                margin-left: 4px
                font-size: 14px
                line-height: 30px
                vertical-align: top
              .comPraise
                margin-right: 1px
                font-size: 8px
                line-height: 30px
              i
                font-size: 18px
                line-height: 30px
              .comPraiseColor
                color: red
            .text
              padding: 10px 20px 20px 10px
            .timeBox
              margin-bottom: 10px
              .time
                font-size: 12px
                color: #ccc
              .reply
                font-size: 12px
                color: #444
            .replyBox
              padding: 6px 12px
              font-size: 14px
              line-height: 20px
              background: #f4f8fb
    .writeComment
      text-align: center
      position: fixed
      left: 0
      bottom: 8px
      display: flex
      width: 100%
      height: 40px

      input
        flex: 1
        height: 40px
        text-align: left
        line-height: 40px
        font-size: 18px
        box-shadow: none
        border-radius: 12px
        border: 1px solid rgba(128, 128, 128, 0.6)
      span
        flex: 0 0 40px
        height: 40px
        font-size: 18px
        color: blue
        background: skyblue
        line-height: 40px
        text-align: center
        border-radius: 4px

</style>
