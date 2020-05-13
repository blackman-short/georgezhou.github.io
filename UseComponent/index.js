// 反馈按钮悬浮事件
function btn1BlurOver () {
  let ele = document.querySelector('p.btn1 span.extra')

  ele.style.transition = 'opacity .2s'
  ele.style.opacity = '1'
  
  setTimeout(() => {
    ele.style.display = 'inline'
  }, 200)
}

function btn1BlurOut (e) {
  let cEvent = e || window.Event

  // e.fromElement 兼容IE
  let eFromEle = cEvent.toElement || cEvent.relatedTarget
  let parentEle = document.querySelector('p.btn1')

  if (parentEle.contains(eFromEle)) return

  let ele = document.querySelector('p.btn1 span.extra')

  ele.style.transition = 'opacity .2s'
  ele.style.opacity = '0.1'

  setTimeout(() => {
    ele.style.display = 'none'
  }, 200)
}

function btn1BlurOver_1 () {
  let ele = document.querySelector('p.btn1_1 span.extra')

  ele.style.transition = 'opacity .2s'
  ele.style.opacity = '1'
  
  setTimeout(() => {
    ele.style.display = 'inline'
  }, 200)
}

function btn1BlurOut_1 (e) {
  let cEvent = e || window.Event

  // e.fromElement 兼容IE
  let eFromEle = cEvent.toElement || cEvent.relatedTarget
  let parentEle = document.querySelector('p.btn1_1')

  if (parentEle.contains(eFromEle)) return

  let ele = document.querySelector('p.btn1_1 span.extra')

  ele.style.transition = 'opacity .2s'
  ele.style.opacity = '0.1'

  setTimeout(() => {
    ele.style.display = 'none'
  }, 200)
}

function activeBtn2 (e) {
  let cEvent = e || window.Event
  let clickEle = cEvent.target

  // 其它置为inactive
  let btnElements = document.querySelectorAll('div.btn2 p')

  for (let btn of btnElements) {
    btn.className = clickEle === btn ? 'active' : ''
  }
}