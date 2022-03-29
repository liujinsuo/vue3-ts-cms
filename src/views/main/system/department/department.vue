<template>
  <div class="department">
    <page-search
      :search-form-config="searchFormConfig"
      @query-btn-click="handleQueryClick"
      @reset-btn-click="handleResetClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      page-name="department"
      :content-table-config="contentTableConfig"
      @new-btn-click="handleNewData"
      @edit-btn-click="handleEditData"
    >
      <template #parent="scope">
        {{ parentName(scope.row.parentId) }}
      </template>
    </page-content>
    <page-modal
      page-name="department"
      :modal-config="modalConfigRef"
      ref="pageModalRef"
      :default-info="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { useStore } from '@/store'

const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

const store = useStore()
const parentName = computed(() => {
  return (parentId: any) => {
    return (
      store.state.entrieDepartment.find((item) => item.id === parentId)?.name ??
      '无'
    )
  }
})

const modalConfigRef = computed(() => {
  const parentItem = modalConfig.formItems.find(
    (item) => item.field === 'parentId'
  )
  parentItem!.options = store.state.entrieDepartment.map((item) => ({
    title: item.name,
    value: item.id
  }))
  return modalConfig
})

const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
  usePageModal()
</script>

<style lang="less" scoped></style>
