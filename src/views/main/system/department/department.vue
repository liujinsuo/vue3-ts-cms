<template>
  <div class="department">
    <tree-select
      v-if="menus.length > 0"
      :data="menus"
      :treeProps="treeProps"
      :multiple="false"
      :is-show-remove-tag="false"
      :nodeKey="nodeKey"
      v-model="checkedKeys"
    ></tree-select>
    {{ checkedKeys }}
  </div>
</template>

<script lang="ts" setup>
import TreeSelect from '@/base-ui/treeselect'
import { useStore } from '@/store'
import { computed, ref } from 'vue'

const store = useStore()
const menus = computed(() => store.state.entrieMenu)

const treeProps = ref({ children: 'children', label: 'name' })
const nodeKey = ref('id')
const checkedKeys = ref(null)
</script>

<style lang="less" scoped></style>
