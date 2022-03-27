<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
import { IBreadcumb } from '../types'

withDefaults(
  defineProps<{
    breadcrumbs: IBreadcumb[]
  }>(),
  {
    breadcrumbs: () => []
  }
)
</script>

<style lang="less" scoped></style>
