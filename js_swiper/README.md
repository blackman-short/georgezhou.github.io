## 原生js实现swiper效果
[预览效果](https://blackmangeorgezhou.github.io/js_swiper/indx.html 'swiper效果')

---

#### 注册事件
```javascript
data.oSwiper.addEventListener('touchstart', swiperTouch, {passive: true})
data.oSwiper.addEventListener('touchmove', swiperTouch, {passive: true})
data.oSwiper.addEventListener('touchend', swiperTouch)
```
#### 滑动距离
```css
translateX(100px)
```