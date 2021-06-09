<template>
  <div class="dialog-box" v-if="promotionDialog">
    <div class="dialog-bg"></div>
    <div class="dialog" :class="promotionDialog ? 'anim':''">
      <div class="dialog-info">
        <div class="title">
          <span>恭喜官阶提升至知府</span>
          <span>可领取更多俸禄</span>
        </div>
        <div class="officer-box">
          <img src="../assets/img/user-1p.png" alt="" />
          <img src="../assets/img/icon_arrows_b.png" alt="" />
          <img src="../assets/img/user-2p.png" alt="" />
        </div>
        <div class="btn" @click="close">马上领取俸禄</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    promotionDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("onClosePromotionBox", false);
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
    width: 613.75px;
    height: 930px;
    background: url(../assets/img/pop-up-windows.png) no-repeat;
    background-size: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .dialog-info {
      width: 500px;
      margin: 0 auto;
      padding-top: 162.69px;
      span:nth-child(1) {
        font-size: 38px;
        font-weight: bold;
        color: #a74f0f;
        line-height: 63px;
        display: block;
      }
      span:nth-child(2) {
        font-size: 31px;
        font-weight: bold;
        color: #ef2d22;
        line-height: 51px;
        display: block;
      }
    }
    .officer-box {
      width: 500px;
      margin: 0 auto;
      padding-top: 32px;
      display: flex;
      align-items: center;
      img:nth-child(1),
      img:nth-child(3) {
        width: 236px;
        height: 253px;
        flex: 1;
      }
      img:nth-child(2) {
        width: 36px;
        height: 40px;
      }
    }
    .btn {
      width: 458px;
      height: 88px;
      margin: 45.69px auto 0;
      background: #ff9b2c;
      border: 4px solid #813c06;
      border-radius: 44px;
      font-size: 33px;
      font-weight: 600;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
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
  0%,
  30%,
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
  15% {
    transform: translate(-50%, -50%) scale(1.15);
  }
}
</style>