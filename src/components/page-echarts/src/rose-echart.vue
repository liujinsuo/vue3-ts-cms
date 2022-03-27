<template>
  <div class="rose-echart">
    <BaseEchart :options="options" />
  </div>
</template>

<script lang="ts" setup>
import BaseEchart from '@/base-ui/echart'
import { EChartsOption } from 'echarts'
import { computed, defineProps } from 'vue'
import { IDataType } from '../types'

const props = defineProps<{ roseData: IDataType[] }>()

const options = computed((): EChartsOption => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    legend: {
      right: '100px',
      top: '5px'
    },
    series: [
      {
        name: '分类商品数量',
        type: 'pie',
        radius: [10, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
