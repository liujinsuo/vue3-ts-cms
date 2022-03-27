<template>
  <div class="goods">
    <page-search
      :searchFormConfig="searchFormConfigRef"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    />
    <page-content
      ref="pageContentRef"
      page-name="goods"
      :content-table-config="contentTableConfig"
      @new-btn-click="handleNewData"
      @edit-btn-click="handleEditData"
    >
      <template #oldPrice="scope">{{ '¥' + scope.row.oldPrice }}</template>
      <template #newPrice="scope">{{ '¥' + scope.row.newPrice }}</template>
      <template #img="scope">
        <el-image
          style="width: 60px; height: 40px"
          :src="scope.row.imgUrl"
          :hide-on-click-modal="true"
          :preview-src-list="[scope.row.imgUrl]"
          fit="cover"
        />
      </template>
      <template #category="scope">
        {{ currentCategory(scope.row) }}
      </template>
    </page-content>
    <page-modal
      page-name="goods"
      :modal-config="modalConfig"
      :default-info="defaultInfo"
      ref="pageModalRef"
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
const categories = computed(() => store.state.entrieCategory)
const currentCategory = computed(() => {
  return (item: any) => {
    return categories.value.find((category) => category.id === item.categoryId)
      ?.name
  }
})
const searchFormConfigRef = computed(() => {
  //这里是给商品分类select下拉框选项赋值
  const categoryIdItem = searchFormConfig.formItems.find(
    (item) => item.field === 'categoryId'
  )
  categoryIdItem!.options = categories.value.map((item) => ({
    title: item.name,
    value: item.id
  }))
  return searchFormConfig
})

const newCallback = () => {
  const categoryIdItem = modalConfig.formItems.find(
    (f) => f.field === 'categoryId'
  )
  categoryIdItem!.options = categories.value.map((i) => ({
    title: i.name,
    value: i.id
  }))
}
const editCallback = () => {
  const categoryIdItem = modalConfig.formItems.find(
    (f) => f.field === 'categoryId'
  )
  categoryIdItem!.options = categories.value.map((i) => ({
    title: i.name,
    value: i.id
  }))
}
const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
  newCallback,
  editCallback
)
</script>

<style lang="less" scoped></style>
