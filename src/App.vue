<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view />
    </el-config-provider>
  </div>
</template>
<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>
<style lang="less">
.app {
  height: 100%;
}
</style>
