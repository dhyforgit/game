let timer = null;
export default {
  // 天 时 分 秒 格式化函数
  countDown(seconds) {
    let d = parseInt(seconds / (24 * 60 * 60));
    d = d < 10 ? "0" + d : d;
    let h = parseInt((seconds / (60 * 60)) % 24);
    h = h < 10 ? "0" + h : h;
    let m = parseInt((seconds / 60) % 60);
    m = m < 10 ? "0" + m : m;
    let s = parseInt(seconds % 60);
    s = s < 10 ? "0" + s : s;
    return h + ":" + m + ":" + s;
  },
  //定时器没过1秒参数减1
  Time(seconds) {
    timer = setInterval(() => {
      seconds -= 1;
      if (seconds == 0) {
        clearInterval(timer);
      } else {
        seconds = this.countDown(seconds)
      }
      return seconds;
    }, 1000);
  }
};
