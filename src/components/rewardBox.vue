<template>
  <div class="dialog-box" v-if="rewardBoxDialog">
    <div class="dialog-bg" @click="close"></div>
    <div class="dialog" :class="rewardBoxDialog ? 'anim' : ''">
      <div class="close" @click="close"></div>
      <div class="list">
        <div class="title">每天定时发放 记得回来领取</div>
        <div class="dialog-info">
          <span
            >当前官阶：<i>{{ current }}</i></span
          >
          <span
            >可领取俸禄数：<i>{{ available }}</i></span
          >
          <span
            >离升官状元还差：<i>{{ rounds }}轮</i></span
          >
        </div>
        <div
          class="item-box"
          v-for="(item, index) in list"
          :key="index"
          :class="item.received ? 'received' : ''"
        >
          <div class="item">
            <div class="officer">{{ item.name }}</div>
            <div class="gold"></div>
            <div
              class="btn"
              :class="
                item.btnType == 1
                  ? 'time'
                  : item.btnType == 2
                  ? 'receive'
                  : item.btnType == 3
                  ? 'receive-video'
                  : 'upgrade'
              "
            >
              {{ countdown[index] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rewardBoxDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list: [],
      countdown: [],
      timer: null,
      current: "榜眼",
      available: 5,
      rounds: 23,
      jsonUrl: require(`../assets/json2.json`),
    };
  },
  watch: {
    rewardBoxDialog(v) {
      if (v) {
        this.getList();
      }
    },
  },
  created() {},
  methods: {
    getList() {
      this.list = [];
      let res = this.jsonUrl;
      console.log(res);
      if (res.code == 0) {
        this.list = res.data.list;
        this.current = "榜眼";
        this.available = 5;
        this.rounds = 23;
        this.list.forEach((item, index) => {
          if (item.time != "") {
            this.Time(item.time, index);
          }
        });
      }
    },
    //定时器没过1秒参数减1
    Time(seconds, index) {
      this.timer = setInterval(() => {
        seconds -= 1;
        if (seconds == 0) {
          clearInterval(this.timer);
        } else {
          this.$set(this.countdown, index, this.$tools.countDown(seconds));
        }
      }, 1000);
    },
    close() {
      clearInterval(this.timer);
      this.$emit("onCloseRewardBox", false);
    },
  },
};
</script>

<style lang="less" scoped>
.dialog-box {
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .dialog-bg {
    background: rgba(0, 0, 0, 44%);
    width: 100%;
    height: 100%;
  }
  .dialog {
    width: 658px;
    height: 1030px;
    background: url(../assets/img/pop-up-windows-fenglu.png) no-repeat;
    background-size: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .close {
      width: 66px;
      height: 66px;
      position: absolute;
      right: -10px;
      top: 40px;
      background: url(../assets/img/icon_close.png) no-repeat;
      background-size: 100%;
    }
    .list {
      width: 569px;
      height: calc(278px * 3);
      overflow-y: auto;
      overflow-x: hidden;
      margin: 140px auto 0;
      .title {
        font-size: 29px;
        font-weight: bold;
        color: #a74f0f;
        line-height: 54px;
      }
      .dialog-info {
        background: url(../assets/img/bg_m.png) no-repeat;
        background-size: 100%;
        padding: 25px 40px;
        text-align: left;
        span {
          font-size: 27px;
          font-weight: bold;
          color: #eac8a3;
          line-height: 54px;
          display: inline-block;
          width: 49%;
          i {
            color: #a74f0f;
            font-style: inherit;
          }
          &:nth-child(3) {
            display: block;
            width: 100%;
          }
        }
      }
      .item-box {
        width: 49%;
        display: inline-block;
        vertical-align: middle;
        .item {
          width: 171px;
          height: 175px;
          margin: 19.86px auto 0;
          background: #f7d4ae;
          border-radius: 8px;
          padding-top: 27.94px;
          position: relative;
          .officer {
            width: 50px;
            height: 88px;
            background: url(../assets/img/guanzhi.png) no-repeat;
            background-size: 100%;
            font-size: 22px;
            font-weight: bold;
            color: #a74f0f;
            line-height: 26px;
            position: absolute;
            left: -25px;
            top: 0;
            padding: 0 10px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .gold {
            background: url(../assets/img/icon_gold.png) no-repeat;
            background-size: 100%;
            width: 103px;
            height: 103px;
            margin: 0 auto;
          }
          .btn {
            width: 136px;
            height: 44px;
            margin: 0 auto;
            position: relative;
            top: -10px;
          }
          .time {
            background: #ff9b2c;
            border: 3px solid #813c06;
            border-radius: 22px;
            font-size: 23px;
            font-weight: bold;
            color: #a74f0f;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .receive {
            background: url(../assets/img/kelingqu.png) no-repeat;
            background-size: 100%;
          }
          .receive-video {
            background: url(../assets/img/kelingqu2.png) no-repeat;
            background-size: 100%;
          }
          .upgrade {
            background: url(../assets/img/shengguan.png) no-repeat;
            background-size: 100%;
          }
        }
        &.received {
          opacity: 0.6;
        }
      }
    }
    &.anim {
      animation-name: openDialog;
      animation-duration: 1.5s;
      animation-timing-function: ease-in-out;
      animation-delay: 0s;
      animation-iteration-count: 1;
      animation-direction: normal;
      animation-fill-mode: none;
      animation-play-state: running;
    }
  }
}
@keyframes openDialog {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  30%,
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
  15% {
    transform: translate(-50%, -50%) scale(1.15);
  }
}
</style>