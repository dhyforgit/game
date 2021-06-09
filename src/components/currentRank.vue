<template>
  <div class="dialog-box" v-if="currentRankDialog">
    <div class="dialog-bg" @click="close"></div>
    <div class="dialog" :class="currentRankDialog ? 'anim' : ''">
      <div class="close" @click="close"></div>
      <div class="list">
        <div
          class="item"
          v-for="(item, index) in list"
          :key="index"
          :class="item.current ? 'current' : ''"
        >
          <span>{{ item.name }}</span>
          <i v-if="!item.isCarry">完成{{ item.carryNum }}轮挑战</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentRankDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list: [],
      jsonUrl: require(`../assets/json1.json`),
    };
  },
  mounted() {
    this.getList();
    
  },
  methods: {
    getList() {
      this.list = [];
      let res = this.jsonUrl;
      console.log(res);
      if (res.code == 0) {
        this.list = res.data;
      }
    },
    close() {
      this.$emit("onCloseCurrentRank", false);
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
    height: 930px;
    background: url(../assets/img/pop-up-windows-gongming.png) no-repeat;
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
      height: calc((110px * 6) + (15px * 6));
      overflow-y: auto;
      overflow-x: hidden;
      margin: 140px auto 0;
      .item {
        width: 100%;
        height: 110px;
        display: flex;
        background: url(../assets/img/bg_s.png) no-repeat;
        background-size: 100%;
        margin-bottom: 15px;
        &.current {
          background: url(../assets/img/bg_l.png) no-repeat;
          background-size: 100%;
        }
        span {
          text-align: left;
          flex: 1;
          font-size: 38px;
          font-weight: bold;
          color: #c2723a;
          line-height: 110px;
          padding-left: 30px;
        }
        i {
          font-style: inherit;
          font-size: 23px;
          font-weight: bold;
          color: #c2723a;
          line-height: 110px;
          opacity: 0.7;
          padding-right: 30px;
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