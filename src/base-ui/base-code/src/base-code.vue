<template>
  <div class="base-code">
    <pre class="bg">
      <code :class="`language${language}`" v-html="highlightCode"></code>
    </pre>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, ref, watchEffect } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

const props = withDefaults(
  defineProps<{
    language?: string
    code?: string
  }>(),
  {
    language: 'html',
    code: ''
  }
)

const highlightCode = ref('')

watchEffect(() => {
  highlightCode.value = hljs.highlight(props.code, {
    language: props.language
  }).value
})
</script>

<style lang="less" scoped>
.bg {
  padding: 10px;
  text-align: left;
  background: #f0f0f0;
}
</style>
