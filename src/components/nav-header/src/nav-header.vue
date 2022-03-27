<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick"
    ></i>
    <div class="content">
      <div><my-breadcrumb :breadcrumbs="breadcrumbs"></my-breadcrumb></div>
      <div><user-info /></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue'
import { useFold, useBreadcrumbs } from './hooks'
import MyBreadcrumb from '@/base-ui/breadcrumb'
import UserInfo from './user-info.vue'

const emit = defineEmits(['foldChange'])
//切换隐藏菜单的hook
const [isFold, handleFoldClick] = useFold(emit)

//面包屑, 利用computed做响应式
const breadcrumbs = useBreadcrumbs()
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
