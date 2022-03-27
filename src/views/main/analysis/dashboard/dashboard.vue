<template>
  <div class="dashboard">
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
import BaseCard from '@/base-ui/card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'

import { useStore } from '@/store'
import { computed } from 'vue'

const store = useStore()
store.dispatch('dashboard/getDashboardDataAction')

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
.content-row {
  margin-top: 20px;
}
</style>
