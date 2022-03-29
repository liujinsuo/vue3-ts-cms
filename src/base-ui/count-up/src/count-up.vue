<template>
  <span ref="counterRef"></span>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, ref, onMounted, watch } from 'vue'
import { CountUp, CountUpOptions } from 'countup.js'

const props = withDefaults(
  defineProps<{ num: number; option: Record<string, any> }>(),
  {
    num: 0,
    option: () => ({})
  }
)

const defaultOptions: CountUpOptions = {
  decimalPlaces: 2, //保留两位
  duration: 2, //动画时长
  separator: ',', //千位分割
  decimal: '.', //小数分割
  prefix: '￥' //单位
}
const counterRef = ref<HTMLElement | null>(null)
const instance = ref<CountUp | null>(null)

onMounted(() => {
  createCounter()
})
watch(
  () => props.num,
  () => {
    update(props.num)
  }
)
const createCounter = () => {
  if (!counterRef.value) return
  const opts: CountUpOptions = Object.assign(defaultOptions, props.option)
  instance.value = new CountUp(counterRef.value, props.num, opts)
  start()
}

const start = () => {
  if (!instance.value) return
  instance.value.start()
}
const update = (num: number) => {
  if (!instance.value) return
  instance.value.update(num)
}
</script>

<style lang="less" scoped></style>
