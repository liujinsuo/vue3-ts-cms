<template>
  <div class="pie-echart">
    <BaseEchart :options="options" />
  </div>
</template>

<script lang="ts" setup>
import BaseEchart from '@/base-ui/echart'
import { EChartsOption } from 'echarts'
import { computed, defineProps } from 'vue'
import { IDataType } from '../types'

const props = defineProps<{
  pieData: IDataType[]
}>()
const options = computed((): EChartsOption => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '分类商品数量',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0,0,0,0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
