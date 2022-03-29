<template>
  <div class="chat">
    <base-editor v-model:value="htmlString"></base-editor>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import BaseEditor from '@/base-ui/editor'

const htmlString = ref('你好啊')
</script>

<style lang="less" scoped>
.chat {
  text-align: left;
  margin-top: 20px;
}
</style>
