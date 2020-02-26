window.onload = function() {
  var imgList = document.querySelectorAll('.swiper-img')
  var imgSrcList = []
  for (var img of imgList) {
    imgSrcList.push(img.src)
  }

  var data = {
    oUl: document.querySelector('ul'),
    aLi: document.querySelectorAll('li'),
    oSwiper: document.querySelector('.swiper'),
    bgImg: document.getElementById('swiperBgImg'),
    imgSrcList: imgSrcList,
    time: '0.3s'
  }

  swiper(data)

  function swiper (data) {
    data.oUl.style.width = data.aLi.length + '00vw'

    data.oSwiper.addEventListener('touchstart', swiperTouch, {passive: true})
    data.oSwiper.addEventListener('touchmove', swiperTouch, {passive: true})
    data.oSwiper.addEventListener('touchend', swiperTouch)
  
    data.oUl.ps = {}
    var x1, startX
    function swiperTouch (ev) {
      ev = ev || window.event
  
      switch (ev.type) {
        case 'touchstart':
          x1 = ev.changedTouches[0].clientX
          data.oUl.style.transition = '0s'
          startX = cssTransform(data.oUl, 'translateX')
          break;
        case 'touchmove':
          var x2 = ev.changedTouches[0].clientX
          var nowX = startX + x2 - x1
          data.oUl.translateX = nowX
          cssTransform(data.oUl, 'translateX', nowX)
          break;
        case 'touchend':
          var offset = cssTransform(data.oUl, 'translateX')
          offset = Math.min(offset, 0)
          offset = Math.max(-data.aLi[0].offsetWidth * (data.aLi.length - 1), offset)
  
          data.oUl.style.transition = data.time
          var moveNum = Math.round(offset / data.aLi[0].offsetWidth)
          cssTransform(data.oUl, 'translateX', moveNum * data.aLi[0].offsetWidth)
          changeBgImg(-moveNum)
          break;
        default:
          break;
      }
    }
  
    function cssTransform (obj, attr, val) {
      if (!obj.ps) obj.ps = {}
  
      switch (arguments.length) {
        case 2:
          return obj.ps[attr] || 0
          break;
        case 3:
          obj.ps[attr] = val
  
          var str = ''
          for (var key in obj.ps) {
            switch (key) {
              case 'translate':
              case 'translateX':
              case 'translateY':
              case 'translateZ':
                str += key + "(" + obj.ps[key] + 'px)'
                break;
              default:
                console.log('属性错误...')
                break;
            }
          }
          obj.style.transform = str
          break;
        default:
          break;
      }
    }

    function changeBgImg (imgIndex) {
      data.bgImg.src = data.imgSrcList[imgIndex]
    }
  }
}