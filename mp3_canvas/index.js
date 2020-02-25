var LRC = {
  meetU: "[ti:]\r\n[ar:]\r\n[al:]\r\n[by:]\r\n[offset:0]\r\n[00:13.81]想见你 想见你 想见你\r\n[00:14.22]词曲：八三夭 阿璞\r\n[00:15.37]\r\n[00:16.75]当爱情遗落成遗迹 用象形刻划成回忆\r\n[00:24.22]想念几个世纪 才是刻骨铭心？\r\n[00:30.02]\r\n[00:31.03]若能回到冰河时期 多想把你抱紧处理\r\n[00:38.66]你的笑多疗愈 让人生也苏醒\r\n[00:44.68]\r\n[00:44.73]失去 你的风景 像座废墟 像失落文明\r\n[00:52.11]能否 一场奇迹 一线生机 能不能 有再一次 相遇\r\n[01:02.92]\r\n[01:03.50]想见你 只想见你 未来过去 我只想见你\r\n[01:10.65]穿越了 千个万个 时间线里 人海里相依\r\n[01:18.09]用尽了 逻辑心机 推理爱情 最难解的谜 \r\n[01:25.51]会不会 妳也 和我一样 在等待一句 我愿意\r\n[01:40.44]\r\n[01:41.24]任时光更迭了四季 任宇宙物换或星移\r\n[01:48.83]永远不退流行 是青涩的真心\r\n[01:54.66]\r\n[01:54.86]未来 先进科技 无法模拟 你拥抱暖意\r\n[02:01.86]如果 另个时空 另个身体 能不能 换另一种 结局\r\n[02:11.50]\r\n[02:13.23]想见你 只想见你 未来过去 我只想见你\r\n[02:20.60]穿越了 千个万个 时间线里 人海里相依\r\n[02:28.10]用尽了 逻辑心机 推理爱情 最难解的谜 \r\n[02:35.49]会不会 妳也 和我一样 在等待一句 我愿意\r\n[02:43.80]想见你 每个朝夕 想见你 每个表情\r\n[02:47.67]想穿越 每个平行 在未来 和过去 紧紧相依\r\n[02:51.33]想follow 每则IG  不错过 你的踪迹\r\n[02:54.98]会不会 你也一样 等待着那句 我愿意\r\n[02:57.94]想见你 只想见你 未来过去 我只想见你\r\n[03:05.18]穿越了 千个万个 时间线里 人海里相依\r\n[03:12.65]用尽了 逻辑心机 推理爱情 最难解的谜 \r\n[03:19.75]会不会 妳也 和我一样 在等待一句 我愿意\r\n[03:28.61]想见你 每个朝夕 想见你 每个表情\r\n[03:31.71]想穿越 每个平行 在未来 和过去 紧紧相依\r\n[03:35.43]想follow 每则IG  不错过 你的踪迹\r\n[03:39.03]会不会 你也一样 等待着那句 我愿意\r\n[03:43.72]"
}

var voiceLineW = 7

// 转化歌词：[时间：歌词]
function parseLyric(text) {
  //将文本分隔成一行一行，存入数组
  var lines = text.split('\n'),
      //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
      pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
      //保存最终结果的数组
      result = [];
  //去掉不含时间的行
  while (!pattern.test(lines[0])) {
      lines = lines.slice(1);
  };
  //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
  lines[lines.length - 1].length === 0 && lines.pop();
  lines.forEach(function(v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {
      //提取出时间[xx:xx.xx]
      var time = v.match(pattern),
          //提取歌词
          value = v.replace(pattern, '');
      //因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
      time.forEach(function(v1, i1, a1) {
          //去掉时间里的中括号得到xx:xx.xx
          var t = v1.slice(1, -1).split(':');
          //将结果压入最终数组
          result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
      });
  });
  //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
  result.sort(function(a, b) {
      return a[0] - b[0];
  });
  return result;
}

window.onload = () => {
  // 判断屏幕是否是竖屏
  var mql = window.matchMedia("(orientation: portrait)");

  // 获取播放源
  var audio = document.querySelector('audio')
  var audioCtx = new AudioContext()
  var audioSrc = audioCtx.createMediaElementSource(audio)
  var audioAnalyser = audioCtx.createAnalyser()
  audioSrc.connect(audioAnalyser)
  audioAnalyser.connect(audioCtx.destination)

  // canvas 绘制音频条（渐变色）
  var canvas = document.getElementById('g_canvas');
  var dWidth = window.innerWidth
  var dHeight = window.innerHeight

  if (mql.matches) {
    canvas.width = dHeight;
    canvas.height = dWidth;
  } else {
    canvas.width = dWidth;
    canvas.height = dHeight;
  }

  // 渐变背景
  canvas.style.background = 'linear-gradient(135deg , #7A88FF, #7AFFAF)'
  var cvsCtx = canvas.getContext('2d');

  var oW = canvas.width
  var oH = canvas.height

  var color = cvsCtx.createLinearGradient(oW/2, oH/2, oW/2, oH/2 - 100)

  color.addColorStop(0, '#000');
  color.addColorStop(.5, '#069');
  color.addColorStop(1, '#f6f');

  // 音频绘制条数
  var count = Math.floor(dHeight / voiceLineW)
  var voiceHeight = new Uint8Array(audioAnalyser.frequencyBinCount)

  setInterval(draw, 10)
  audio.play()

  // 获取歌词列表
  var meetUWordList = parseLyric(LRC.meetU)
  // 展示歌词
  var lyricContainer = document.getElementById('lyricContainer');
  //监听ontimeupdate事件
  audio.ontimeupdate = function(e) {
      //遍历所有歌词，看哪句歌词的时间与当然时间吻合
      for (var i = 0, l = meetUWordList.length; i < l; i++) {
          if (this.currentTime /*当前播放的时间*/ > meetUWordList[i][0]) {
              //显示到页面
              lyricContainer.textContent = meetUWordList[i][1];
          };
      };
  };

  function draw () {
    cvsCtx.clearRect(0, 0, oW, oH)
    // 取值的步长
    var step = Math.round(voiceHeight.length / count)
    for (var i = 0; i < count; i++) {
      var audioHeight = voiceHeight[step * i]
      cvsCtx.fillStyle = color;
      cvsCtx.fillRect(oW/2 + (i  * 10), oH/2, voiceLineW, -audioHeight);
      cvsCtx.fillRect(oW/2 - (i  * 10), oH/2, voiceLineW, -audioHeight);
      cvsCtx.fillRect(oW/2 + (i  * 10), oH/2, voiceLineW, audioHeight / 2);
      cvsCtx.fillRect(oW/2 - (i  * 10), oH/2, voiceLineW, audioHeight / 2);
    }
    audioAnalyser.getByteFrequencyData(voiceHeight)
  }
}
