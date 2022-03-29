<template>
  <div class="base-descriptions">
    <el-descriptions :title="title" :column="column" border>
      <template v-for="(item, index) in tableDatas" :key="index">
        <el-descriptions-item :width="width">
          <template #label>{{ item.name }}</template>
          <el-tag size="small">{{ item.description }}</el-tag>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps } from 'vue'
import { DescriptionProp } from './types'

withDefaults(
  defineProps<{
    title?: string
    column?: number
    tableDatas?: DescriptionProp[]
    width?: number | string
  }>(),
  {
    title: '',
    column: 1,
    tableDatas: () => [],
    width: '25%'
  }
)
</script>

<style lang="less" scoped>
.base-descriptions {
  margin-bottom: 20px;
}
</style>
