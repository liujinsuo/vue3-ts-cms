<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    />
    <page-content
      ref="pageContentRef"
      page-name="role"
      :content-table-config="contentTableConfig"
      @new-btn-click="handleNewData"
      @edit-btn-click="handleEditData"
    ></page-content>
    <page-modal
      page-name="role"
      :modal-config="modalConfig"
      :other-info="otherInfo"
      :default-info="defaultInfo"
      ref="pageModalRef"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        ></el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { menuMapLeafKeys } from '@/utils/map-menus'

import { ElTree } from 'element-plus'

const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

const elTreeRef = ref<InstanceType<typeof ElTree>>()

const store = useStore()
const menus = computed(() => store.state.entrieMenu)

const otherInfo = ref({})
const handleCheckChange = (data1: any, data2: any) => {
  const checkedKeys = data2.checkedKeys
  const halfCheckedKeys = data2.halfCheckedKeys
  const menuList = [...checkedKeys, ...halfCheckedKeys]
  otherInfo.value = { menuList }
}

const editCallback = (item: any) => {
  const leafKeys = menuMapLeafKeys(item.menuList)
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(leafKeys, false)
  })
}
const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
  undefined,
  editCallback
)
</script>

<style lang="less" scoped>
.menu-tree {
  margin-left: 25px;
}
</style>
