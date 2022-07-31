<template>
  <div class="swiper-container">
    <div class="swiper-image" :style="{backgroundImage:'url('+ bg + ')'}"></div>
    <div class="swiper-paginator">
      <span v-for="(slide , index) in slides" :key="index" class="paginator-item"
            :class="{'paginator-current':index === value}"
            @mouseover="toggleIndex(index)" @mouseout="initTimer"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    slides: {
      // 用于接收切换的图片数组
      type: Array,
      validator(value) {
        return value.every(item => Object.prototype.toString.call(item) === '[object String]')
      }
    },
    interval: {
      type: Number,
      default: 4
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      timer: null
    }
  },
  computed: {
    bg() {
      return this.slides[this.value]
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.initTimer()
    })
  },

  methods: {
    initTimer() {
      this.timer = setInterval(() => {// 设置定时器，定时切换幻灯片
        // ② 自定义v-model，通知父级修改当前页码
        this.$emit('input', (this.value + 1) % this.slides.length)
      }, this.interval * 1000)
    },
    toggleIndex(index) { // 当鼠标划过幻灯片切换按钮时
      this.$emit('input', index) // ② 自定义v-model，通知父级修改当前页码
      clearInterval(this.timer) // 清楚定时器
    }
  }
}
</script>

<style scoped>
.swiper-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.swiper-image {
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}

.swiper-paginator {
  margin-top: -30px;
  padding-right: 5px;
  text-align: right;
  list-style: none;
}

.paginator-item {
  cursor: pointer;
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-left: 5px;
  border-radius: 50%;
  background-color: #000;
  opacity: 0.3;
}

.paginator-current {
  background-color: #fff; /* 当前激活的幻灯片切换按钮样式 */
  opacity: .6;
}
</style>
