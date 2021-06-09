<template>
  <div class="game">
    <div class="audio" @click="audioAutoPlay">
      <img v-if="!isAudioPlay" src="../assets/img/soundsize.png" alt="" />
      <img v-if="isAudioPlay" src="../assets/img/mute.png" alt="" />
      <audio
        id="audio"
        loop
        autoplay
        ref="audio"
        :src="require('../assets/audio/5d819f823d0ad30237.mp3')"
      ></audio
      ><audio
        id="audioSuccess"
        ref="audioSuccess"
        :src="require('../assets/audio/challenge-success.mp3')"
      ></audio
      ><audio
        id="audioError"
        ref="audioError"
        :src="require('../assets/audio/btn-audio.mp3')"
      ></audio>
      <audio
        id="audioDialog"
        ref="audioDialog"
        :src="require('../assets/audio/bingo-audio.mp3')"
      ></audio>
    </div>
    <div class="banner-img">
      <img src="../assets/img/zi.png" alt="" />
      <div class="grade-box">
        <img src="../assets/img/user-1p.png" alt="" />
        <div class="grabe">
          <div class="user-grabe">
            <i>当前官阶：一品</i><em @click="openDialog(0)"></em>
          </div>
          <div class="time">
            <span
              ><i>{{ physicalStrength }}</i></span
            >
            <span>{{ count }}</span>
          </div>
        </div>
        <div class="grabe-btn">
          <span class="btn-salary" @click="openDialog(1)">领俸禄</span>
          <span class="btn-strength" @click="onOpenMsg(0)">
            <i></i><i>领体力</i>
            <em>剩余次数:{{ numTimes }}</em>
          </span>
        </div>
      </div>
    </div>
    <!-- 游戏主体 -->
    <div class="game-main">
      <!-- 进度 -->
      <div class="progress-box">
        <div class="progress">
          <span>本轮进度</span>
          <div class="bar">
            <div class="bar-bg"></div>
            <div class="bar-speed" :style="{ width: roundProgress * 10 + '%' }">
              <i>{{ roundProgress }}/{{ totalProgress }}题</i>
            </div>
            <em @click="onOpenMsg(1)"></em>
          </div>
        </div>
      </div>
      <div class="game-slog">
        <span>再挑战{{ roundNum }}轮可以升官：</span>
        <span>{{ nextStage }}</span>
      </div>
      <div class="idioms">
        <div class="point" @click="onPoint"></div>
        <div class="rows">
          <div
            class="item"
            v-for="(v, i) in list[1]"
            :key="i"
            :style="{
              left: 14 * i + 'vw',
              top: 14 * gameInfo.idioms[1].position + 'vw',
              border: gameInfo.idioms[1].position == i ? '0' : '',
            }"
          >
            <span
              :class="
                gameInfo.idioms[1].position != i && gameInfo.keyWord != onFirst
                  ? 'item-bg'
                  : gameInfo.keyWord == onFirst && !isClikePoint
                  ? 'green'
                  : ''
              "
              >{{ v }}</span
            >
          </div>
        </div>
        <div class="cols">
          <div
            class="item"
            v-for="(v, i) in list[0]"
            :key="i"
            :style="{
              top: 14 * i + 'vw',
              left: 14 * gameInfo.idioms[0].position + 'vw',
              padding: gameInfo.idioms[0].position == i ? '2px' : '',
            }"
            :class="
              gameInfo.idioms[1].position == i &&
              gameInfo.keyWord != onFirst &&
              v != ''
                ? 'active animated'
                : gameInfo.idioms[1].position == i && v != ''
                ? 'active'
                : ''
            "
          >
            <i></i><i></i><i></i><i></i>
            <span
              :class="
                gameInfo.idioms[1].position == i && gameInfo.keyWord != onFirst
                  ? 'active item-bg'
                  : gameInfo.keyWord == onFirst && !isClikePoint
                  ? 'active green'
                  : 'item-bg'
              "
              >{{ v }}</span
            >
          </div>
        </div>
      </div>
      <div class="selsct-item">
        <span
          v-for="(item, index) in gameInfo.options"
          :key="index"
          :class="
            btnAtive == index && gameInfo.keyWord != onFirst
              ? 'active'
              : gameInfo.keyWord == onFirst && btnAtive == index
              ? 'on-true'
              : ''
          "
          @click="onSelect(item, index)"
        >
          {{ item }}
        </span>
      </div>
    </div>
    <!-- 位置 -->
    <div class="game-exceed">已经超越{{ address }}{{ overUsers }}的用户</div>
    <currentRank
      :currentRankDialog="currentRankDialog"
      @onCloseCurrentRank="onCloseCurrentRank"
    ></currentRank>
    <promotionBox
      :promotionDialog="promotionDialog"
      @onClosePromotionBox="onClosePromotionBox"
    ></promotionBox>
    <rewardBox
      :rewardBoxDialog="rewardBoxDialog"
      @onCloseRewardBox="onCloseRewardBox"
    ></rewardBox>
    <commonBox
      :commonBoxDialog="commonBoxDialog"
      @onClosecommon="onClosecommon"
    ></commonBox>
    <div v-if="isOpenMsg" class="point-box">{{ errorMsg }}</div>
  </div>
</template>

<script>
import currentRank from "../components/currentRank";
import promotionBox from "../components/promotionBox";
import rewardBox from "../components/rewardBox";
import commonBox from "../components/commonBox";
export default {
  name: "home",
  components: {
    currentRank,
    promotionBox,
    rewardBox,
    commonBox,
  },
  data() {
    return {
      gameInfo: {},
      list: [],
      onFirst: "",
      btnAtive: null,
      currentGrade: 0, //当前官阶
      currentRankDialog: false, // 考取功名弹框
      promotionDialog: false, //升官发财
      rewardBoxDialog: false, //朝廷俸禄
      commonBoxDialog: false, //通用
      count: 0, // 倒计时
      seconds: 864000, // 10天的秒数
      timer: null, // 倒计时
      isAudioPlay: true, //是否播放音乐
      errorMsg: "", //弹框内容
      isOpenMsg: false, //是否显示消息弹框
      roundProgress: 10, //  本轮进度
      totalProgress: 10, // 总进度
      isClikePoint: false, // 是否点击提示
      numTimes: 4, //剩余次数
      physicalStrength: 4, // 体力
      address: "北京", //当前地址
      overUsers: "40%", // 超过多少用户
      roundNum: 0, //再挑战几轮
      nextStage: "", //下一官阶
      jsonUrl: require(`../assets/json.json`),
    };
  },
  mounted() {
    this.getIdioms();
    this.Time();
    this.audioAutoPlay();
  },
  methods: {
    audioAutoPlay() {
      this.$nextTick(() => {
        if (this.isAudioPlay) {
          this.$refs.audio.play();
          this.$refs.audio.volume = "0.4";
          this.isAudioPlay = false;
        } else {
          this.$refs.audio.pause();
          this.isAudioPlay = true;
        }
      });
    },
    onPoint() {
      //点击提示
       
      // this.onFirst = this.gameInfo.keyWord;
      // for (var i in this.gameInfo.options) {
      //   if (this.gameInfo.options[i] == this.onFirst) {
      //     this.btnAtive = i;
      //   }
      // }
      // this.isClikePoint = true;
      // setTimeout(() => {
      //   this.isClikePoint = false;
      // }, 1000);
      // console.log(this.onFirst, this.btnAtive);
    },
    onOpenMsg(v) {
      if (!this.isOpenMsg) {
        if (v == 0) {
          //领体力
          this.errorMsg = "当前体力已满";
        } else if (v == 1) {
          //点击宝箱
          this.errorMsg = "再答对10道题可获得宝箱";
        }
        this.isOpenMsg = true;
        setTimeout(() => {
          this.isOpenMsg = false;
          this.errorMsg = "";
        }, 3000);
      }
    },
    getIdioms() {
      this.list = [];
      let res = this.jsonUrl;
      console.log(res);
      if (res.code == 0) {
        this.gameInfo = res.data.gameInfo;
        this.numTimes = res.data.numTimes;
        this.physicalStrength = res.data.physicalStrength;
        this.address = res.data.address;
        this.overUsers = res.data.overUsers;
        this.roundProgress = res.data.roundProgress;
        this.totalProgress = res.data.totalProgress;
        this.currentGrade = res.data.currentGradel;
        this.seconds = res.data.time;
        this.roundNum = res.data.roundNum;
        this.nextStage = res.data.nextStage;
      }
      // this.$request.get({
      //   url: ``,
      //   done: (res) => {
      //     console.log(res)
      //   },
      // });
      for (let i = 0; i < this.gameInfo.idioms.length; i++) {
        this.list.push(this.gameInfo.idioms[i].word);
      }
      console.log(this.list);
    },
    onSelect(item, index) {
      this.onFirst = "";
      this.gameInfo.idioms[0].word[this.gameInfo.idioms[0].position] = item;
      this.onFirst = item;
      this.btnAtive = index;
      if (this.gameInfo.keyWord == item) {
        this.$refs.audioSuccess.play();
      } else {
        this.$refs.audioError.play();
      }
      this.getIdioms();
    },
    openDialog(v) {
      this.$refs.audioDialog.play();
      if (v == 0) {
        this.currentRankDialog = true; // 考取功名弹框
      } else if (v == 1) {
        this.rewardBoxDialog = true; //朝廷俸禄
      } else if (v == 2) {
        this.promotionDialog = true; //升官发财
      } else if (v == 3) {
        this.commonBoxDialog = true; //通用
      }
    },
    // 关闭弹框
    onCloseCurrentRank(v) {
      this.currentRankDialog = v;
    },
    onClosePromotionBox(v) {
      this.promotionDialog = v;
      this.rewardBoxDialog = true; //朝廷俸禄
      this.$refs.audioDialog.play();
    },
    onCloseRewardBox(v) {
      this.rewardBoxDialog = v;
    },
    onClosecommon(v) {
      this.commonBoxDialog = v;
    },
    //定时器没过1秒参数减1
    Time() {
      this.timer = setInterval(() => {
        this.seconds -= 1;
        if (this.seconds == 0) {
          clearInterval(this.timer);
        } else {
          this.count = this.$tools.countDown(this.seconds);
        }
      }, 1000);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.game {
  position: relative;
  width: 100vw;
  background: url(../assets/img/bg.png) no-repeat;
  background-size: 100%;
  .audio {
    width: 60px;
    height: 60px;
    background: rgba(0, 0, 0, 32%);
    border-radius: 50%;
    padding: 10px;
    position: fixed;
    right: 20px;
    top: 20px;
    z-index: 99;
    img {
      width: 100%;
    }
  }
  // banenr
  .banner-img {
    width: 100vw;
    padding-top: 100px;
    img {
      width: 608.33px;
    }
    .grade-box {
      height: 230px;
      width: 720px;
      background: url(../assets/img/banner.png) no-repeat;
      background-size: 100%;
      margin: 45.62px auto 0;
      display: flex;
      position: relative;
      img {
        width: 226px;
        height: 262px;
        position: relative;
        top: -58px;
        left: 54px;
      }
      .grabe {
        flex: 1;
        padding-top: 50px;
        .user-grabe {
          font-size: 28px;
          font-weight: bold;
          color: #b56023;
          line-height: 44px;
          font-family: Yuanti SC;
          i {
            font-style: inherit;
            display: inline-block;
            vertical-align: middle;
          }
          em {
            width: 24px;
            height: 24px;
            display: inline-block;
            margin-left: 10px;
            vertical-align: middle;
            background: url(../assets/img/icon_help.png) no-repeat;
            background-size: 100% 100%;
          }
        }
        .time {
          position: relative;
          top: 24.13px;
          width: 218px;
          margin: 0 auto;
          span:nth-child(1) {
            width: 60px;
            height: 70px;
            display: block;
            background: url(../assets/img/icon_lightning.png) no-repeat;
            background-size: 100%;
            position: absolute;
            left: -10px;
            top: -10px;

            i {
              -webkit-text-stroke: 2px #b55f23;
              color: #ffffff;
              font-weight: bold;
              font-size: 36px;
              line-height: 65px;
              font-style: inherit;
              position: relative;
              right: -4px;
            }
          }
          span:nth-child(2) {
            display: block;
            width: 210px;
            margin: 0 auto;
            height: 49px;
            border: 4px solid #b56023;
            border-radius: 25px;
            font-size: 25px;
            font-family: Yuanti SC;
            font-weight: bold;
            color: #b56023;
            line-height: 44px;
            padding-left: 30px;
          }
        }
      }
      .grabe-btn {
        width: calc(130px + 90px);
        padding-right: 90px;
        .btn-salary {
          width: 136px;
          height: 50px;
          background: #02afff;
          border: 3px solid #71431e;
          box-shadow: 0px 2px 0px 0px rgb(255 255 255 / 38%),
            0px 4px 0px 0px rgb(0 0 0 / 23%);
          border-radius: 23px;
          font-size: 26px;
          font-family: Yuanti SC;
          font-weight: bold;
          color: #ffffff;
          line-height: 50px;
          display: block;
          position: relative;
          top: 46.25px;
        }
        .btn-strength {
          position: relative;
          top: 56.25px;
          width: 136px;
          background: #ff9600;
          border: 3px solid #71431e;
          box-shadow: 0px 2px 0px 0px rgb(255 255 255 / 38%),
            0px 4px 0px 0px rgb(0 0 0 / 23%);
          border-radius: 30px;
          display: block;
          padding: 2px 4px;
          i,
          em {
            font-style: inherit;
          }
          i:nth-child(1) {
            width: 25px;
            height: 25px;
            display: inline-block;
            vertical-align: middle;
            background: url(../assets/img/icon_video.png) no-repeat;
            background-size: 100% 100%;
          }
          i:nth-child(2) {
            font-size: 20px;
            margin-left: 6px;
            font-weight: bold;
            display: inline-block;
            vertical-align: middle;
            color: #ffffff;
            line-height: 33px;
          }
          em {
            font-size: 16px;
            font-weight: bold;
            color: #b56023;
            display: block;
            line-height: 16px;
            transform: scale(0.85);
          }
        }
      }
    }
  }

  // 游戏区域
  .game-main {
    background: url(../assets/img/bg_game.png) no-repeat;
    background-size: 100%;
    width: 730.07px;
    margin: 0 auto;
    border-radius: 6px;
    // 游戏进度
    .progress-box {
      width: 90%;
      margin: 0 auto;
      padding-top: 90.69px;
      .progress {
        display: flex;
        span {
          font-size: 25px;
          font-family: Yuanti SC;
          font-weight: bold;
          color: #b56023;
          line-height: 40px;
          width: 123px;
        }
        .bar {
          width: 470px;
          height: 40px;
          border-radius: 20px;
          position: relative;
          .bar-bg {
            background: url(../assets/img/jindu.png) no-repeat;
            background-size: 100% 100%;
            width: 470px;
            height: 40px;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 99;
          }
          .bar-speed {
            background: #ffd400;
            border-radius: 20px 0px 0px 20px;
            width: calc(470px / 1);
            height: 40px;
            position: relative;
            z-index: 9;
            i {
              position: absolute;
              top: -50px;
              font-size: 26px;
              font-weight: bold;
              color: #b56023;
              line-height: 38px;
              font-style: inherit;
              right: -25px;
              width: 100px;
              &::after {
                content: "";
                display: block;
                width: 19px;
                height: 10px;
                background: url(../assets/img/icon_arrows_s.png) no-repeat;
                background-size: auto 100%;
                margin: 0 auto;
              }
            }
          }

          em {
            background: url(../assets/img/icon_box.png) no-repeat;
            background-size: auto 100%;
            width: 80px;
            height: 70px;
            position: absolute;
            right: -20px;
            top: -20px;
            z-index: 99;
          }
        }
      }
    }
    .game-slog {
      width: 488px;
      height: 69px;
      background: #fef4e8;
      border: 3px solid #b56023;
      border-radius: 17px;
      margin: 25.69px auto 0;
      span {
        font-size: 29px;
        font-family: Yuanti SC;
        font-weight: bold;
        color: #b56023;
        line-height: 69px;
        &:nth-child(2) {
          color: #e84106;
        }
      }
    }
    .idioms {
      position: relative;
      width: 55vw;
      height: 55vw;
      margin: 60px auto 0;
      .point {
        width: 70px;
        height: 80px;
        background: url(../assets/img/icon_tips.png) no-repeat;
        background-size: 100%;
        position: absolute;
        left: -100px;
        top: -20px;
      }
      div.rows {
        width: 55vw;
        height: 55vw;
        position: absolute;
        left: 0;
        top: 0;
      }
      div.cols {
        width: 55vw;
        height: 55vw;
        position: absolute;
        left: 0;
        top: 0;
      }
      div.rows .item,
      div.cols .item {
        overflow: hidden;
        width: 88px;
        height: 83px;
        position: absolute;
        background: url(../assets/img/bg_zi.png) no-repeat;
        background-size: 100% 100%;
        border-radius: 12px;
        // border: 1px solid #ce8122;
        // border-bottom: 3px solid #ce8122;
      }
      div.rows span,
      div.cols span {
        width: 88px;
        height: 83px;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        line-height: 77px;
        font-size: 45px;
        color: #965d18;
        border-radius: 10px;
        line-height: 83px;
      }
      div.rows span.item-bg,
      div.cols span.item-bg {
        // background: rgb(218, 196, 196);
      }
      div.rows span.green,
      div.cols span.green {
        background: url(../assets/img/bg_zi_lv.jpg) no-repeat;
        background-size: 100% 100%;
      }
      div.cols .item.animated {
        animation: upAnimation 0.5s linear;
        animation-delay: 0.25s;
      }
      div.cols .item.active {
        background: url(../assets/img/bg_zi_h.png) no-repeat;
        background-size: 100% 100%;
      }
      div.cols .item.active span.active {
        // background: url(../assets/img/bg_zi_h.png) no-repeat;
        // background-size: 100% 100%;
      }
      div.cols .item.active i {
        position: absolute;
        display: block;
        z-index: 99;
      }
      div.cols .item.active i:nth-child(1) {
        top: 0;
        left: 0;
        width: 20px;
        height: 6px;
        background: #ffffff;
        animation: animate1 1s linear infinite;
      }
      @keyframes animate1 {
        0% {
          left: -100%;
        }
        50%,
        100% {
          left: 100%;
        }
      }
      div.cols .item.active i:nth-child(2) {
        top: -100%;
        right: 0;
        width: 6px;
        height: 20px;
        background: #ffffff;
        animation: animate2 1s linear infinite;
        animation-delay: 0.5s;
      }
      @keyframes animate2 {
        0% {
          top: -100%;
        }
        50%,
        100% {
          top: 100%;
        }
      }
      div.cols .item.active i:nth-child(3) {
        bottom: 0;
        right: 0;
        width: 20px;
        background: #ffffff;
        animation: animate3 1s linear infinite;
      }
      @keyframes animate3 {
        0% {
          right: -100%;
          height: 4px;
        }
        50%,
        100% {
          height: 4px;
          right: 100%;
        }
      }
      div.cols .item.active i:nth-child(4) {
        bottom: -100%;
        left: 0;
        width: 4px;
        height: 20px;
        background: #ffffff;
        animation: animate4 1s linear infinite;
        animation-delay: 0.5s;
      }
      @keyframes animate4 {
        0% {
          bottom: -100%;
        }
        50%,
        100% {
          bottom: 100%;
        }
      }
    }
    .selsct-item {
      display: flex;
      justify-content: center;
      margin-top: 50px;
      padding-bottom: 55px;
      span {
        margin: 1vw;
        width: 88px;
        height: 83px;
        position: relative;
        background: url(../assets/img/bg_zi.png) no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
        border-radius: 10px;
        line-height: 77px;
        font-size: 45px;
        color: #965d18;
        border-radius: 10px;
        line-height: 83px;
        &.active {
          background: url(../assets/img/bg_zi_h.png) no-repeat;
          background-size: 100% 100%;
        }
        &.on-true {
          background: url(../assets/img/bg_zi_lv.jpg) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  .game-exceed {
    font-size: 33px;
    font-weight: 500;
    color: #9b6436;
    line-height: 55px;
    padding: 39px 0 40px 0;
  }
  .point-box {
    position: fixed;
    left: 50%;
    top: 50%;
    height: 50px;
    background: rgba(0, 0, 0, 62%);
    color: #ffffff;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    padding: 0 40px;
    border-radius: 25px;
    transform: translate(-50%, -50%);
    transition: all 2s;
    white-space: nowrap;
    line-height: 30px;
  }
}
@keyframes upAnimation {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  20% {
    transform: translate3d(-5px, 0, 0);
  }
  40% {
    transform: translate3d(5px, 0, 0);
  }
  60% {
    transform: translate3d(-5px, 0, 0);
  }
  80% {
    transform: translate3d(5px, 0, 0);
  }
}
</style>
