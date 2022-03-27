<template>
  <div class="menu">
    <page-content
      ref="pageContentRef"
      page-name="menu"
      :content-table-config="contentTableConfig"
      @new-btn-click="handleNewData"
      @edit-btn-click="handleEditData"
    >
      <template #type="scope">
        <template v-if="scope.row.type == 1">目录</template>
        <template v-if="scope.row.type == 2">菜单</template>
        <template v-if="scope.row.type == 3">按钮</template>
      </template>
    </page-content>
    <page-modal
      page-name="menu"
      :modal-config="modalConfig"
      :default-info="defaultInfo"
      ref="pageModalRef"
    ></page-modal>
  </div>
</template>

<script lang="ts" setup>
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageModal } from '@/hooks/use-page-modal'

const newCallback = () => {
  console.log('执行回调')
}
const editCallback = (item: any) => {
  console.log(item)
  const parentIdItem = modalConfig.formItems.find((v) => {
    return v.field === 'parentId'
  })
  if (item.type === 1) {
    parentIdItem!.isHidden = true
  } else {
    parentIdItem!.isHidden = false
  }
}

const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
  newCallback,
  editCallback
)
</script>

<style lang="less" scoped></style>
