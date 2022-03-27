<template>
  <div class="base-echart">
    <div ref="echartRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, ref, onMounted, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import userEchart from '../hooks/useEchart'

const props = withDefaults(
  defineProps<{ options: EChartsOption; width?: string; height?: string }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const echartRef = ref<HTMLElement>()

onMounted(() => {
  const { setOptions } = userEchart(echartRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style lang="less" scoped></style>
