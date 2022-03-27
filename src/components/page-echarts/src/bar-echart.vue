<template>
  <div class="bar-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script lang="ts" setup>
import BaseEchart from '@/base-ui/echart'
import { EChartsOption } from 'echarts'
import { computed, defineProps, withDefaults } from 'vue'
// import * as echarts from 'echarts'

const props = withDefaults(
  defineProps<{ title?: string; xLabels: string[]; values: any[] }>(),
  {
    title: ''
  }
)

const options = computed((): EChartsOption => {
  return {
    xAxis: {
      data: props.xLabels,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //   { offset: 0, color: '#83bff6' },
          //   { offset: 0.5, color: '#188df0' },
          //   { offset: 1, color: '#188df0' }
          // ])
          color: function (params) {
            // build a color map as your need.
            var colorList = [
              '#C1232B',
              '#B5C334',
              '#FCCE10',
              '#E87C25',
              '#27727B',
              '#FE8463',
              '#9BCA63',
              '#FAD860',
              '#F3A43B',
              '#60C0DD',
              '#D7504B',
              '#C6E579',
              '#F4E001',
              '#F0805A',
              '#26C0C0'
            ]
            return colorList[params.dataIndex]
          }
        },
        emphasis: {
          itemStyle: {
            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   { offset: 0, color: '#2378f7' },
            //   { offset: 0.7, color: '#2378f7' },
            //   { offset: 1, color: '#83bff6' }
            // ])
          }
        },
        data: props.values
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
