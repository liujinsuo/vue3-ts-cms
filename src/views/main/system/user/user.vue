<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    />
    <page-content
      ref="pageContentRef"
      page-name="users"
      :content-table-config="contentTableConfig"
      @new-btn-click="handleNewData"
      @edit-btn-click="handleEditData"
    ></page-content>
    <page-modal
      page-name="users"
      :modal-config="modalConfigRef"
      :default-info="defaultInfo"
      ref="pageModalRef"
    ></page-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

//数组解构需注意顺序
const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

const store = useStore()
const modalConfigRef = computed(() => {
  //这里是给弹出框的部门角色select下拉框选项赋值
  const departmentItem = modalConfig.formItems.find(
    (item) => item.field === 'departmentId'
  )
  departmentItem!.options = store.state.entrieDepartment.map((item) => ({
    title: item.name,
    value: item.id
  }))
  const roleItem = modalConfig.formItems.find((item) => item.field === 'roleId')
  roleItem!.options = store.state.entrieRole.map((item) => ({
    title: item.name,
    value: item.id
  }))
  return modalConfig
})

//usePageModal hook方法的回调,主要为了解决密码框显示与隐藏
const newCallback = () => {
  const passwordItem = modalConfig.formItems.find(
    (item) => item.field === 'password'
  )
  passwordItem!.isHidden = false
}
const editCallback = () => {
  const passwordItem = modalConfig.formItems.find(
    (item) => item.field === 'password'
  )
  passwordItem!.isHidden = true
}

const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
  newCallback,
  editCallback
)
</script>

<style lang="less" scoped></style>
