<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="(item, index) in panelData" :key="index">
        <el-col :md="12" :lg="6" :xl="6">
          <StatisticalPanel class="digital-panel" :panel-data="item" />
        </el-col>
      </template>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="7">
        <base-card title="分类商品数量">
          <PieEchart :pie-data="categoryGoodsCount" />
        </base-card>
      </el-col>
      <el-col :span="10">
        <base-card title="不同城市商品销量">
          <MapEchart :map-data="addressGoodsSale" />
        </base-card>
      </el-col>
      <el-col :span="7">
        <base-card title="分类商品数量">
          <RoseEchart :rose-data="categoryGoodsCount" />
        </base-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <base-card title="分类商品的销量">
          <LineEchart v-bind="categoryGoodsSale" />
        </base-card>
      </el-col>
      <el-col :span="12">
        <base-card title="分类商品的收藏">
          <BarEchart v-bind="categoryGoodsFavor" />
        </base-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useStore } from '@/store'

import BaseCard from '@/base-ui/card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'
import StatisticalPanel from '@/components/statistical-panel'

const store = useStore()
store.dispatch('dashboard/getDashboardDataAction')

const panelData = ref([
  {
    title: '销量1',
    tips: '苹果的销量',
    price: 124541,
    subTitle: '销售总量： ',
    number: 8233
  },
  {
    title: '销量2',
    tips: '苹果的销量',
    price: 24541,
    subTitle: '销售总量： ',
    number: 3133
  },
  {
    title: '销量3',
    tips: '苹果的销量',
    price: 4541,
    subTitle: '销售总量： ',
    number: 233
  },
  {
    title: '销量4',
    tips: '苹果的销量',
    price: 424541,
    subTitle: '销售总量： ',
    number: 1233
  }
])

const categoryGoodsCount = computed(() => {
  return store.state.dashboard.categoryGoodsCount.map((item: any) => {
    return { name: item.name, value: item.goodsCount }
  })
})

const categoryGoodsSale = computed(() => {
  const xLabels: string[] = []
  const values: any[] = []
  const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
  for (const item of categoryGoodsSale) {
    xLabels.push(item.name)
    values.push(item.goodsCount)
  }
  return { xLabels, values }
})

const categoryGoodsFavor = computed((): any => {
  const xLabels: string[] = []
  const values: any[] = []
  const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
  categoryGoodsFavor.map((item) => {
    xLabels.push(item.name)
    values.push(item.goodsFavor)
  })
  return { xLabels, values }
})

const addressGoodsSale = computed(() => {
  return store.state.dashboard.addressGoodsSale.map((item) => {
    return { name: item.address, value: item.count }
  })
})
</script>

<style lang="less" scoped>
.dashboard {
  background-color: #f5f5f5;
  .content-row {
    margin-top: 20px;
  }
  .digital-panel {
    height: 130px;
    margin-bottom: 20px;
    overflow: hidden;
    text-align: center;
  }
}
</style>
