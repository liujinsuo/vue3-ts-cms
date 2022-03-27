<template>
  <div class="page-content">
    <base-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          type="primary"
          size="medium"
          @click="handleNewClick"
          >新建{{ contentTableConfig.title }}</el-button
        >
      </template>
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            icon="el-icon-edit"
            size="mini"
            type="text"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            icon="el-icon-delete"
            size="mini"
            type="text"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 在page-content中动态插入剩余的插槽 -->
      <!-- 跨组件插槽 为了组件的可扩展性 比如在user页面把插槽传入到page-content组件中,再传入到table组件中-->
      <!-- 比如页面中表格项需要图片展示，那么就在页面中单独使用展示图片的插槽 -->
      <!-- 上面的状态,时间,操作插槽相当于是公共插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName!]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </base-table>
  </div>
</template>

<script lang="ts" setup>
import BaseTable from '@/base-ui/table'
import {
  defineProps,
  defineEmits,
  defineExpose,
  watch,
  ref,
  computed
} from 'vue'
import { usePermission } from '@/hooks/use-permission'
import { useStore } from '@/store'
import { IContentTableConfig } from './types'

const props = defineProps<{
  contentTableConfig: IContentTableConfig
  pageName: string
}>()

const emit = defineEmits(['newBtnClick', 'editBtnClick'])
const store = useStore()

const isCreate = usePermission(props.pageName, 'create')
const isUpdate = usePermission(props.pageName, 'update')
const isDelete = usePermission(props.pageName, 'delete')
const isQuery = usePermission(props.pageName, 'query')

const pageInfo = ref({ currentPage: 1, pageSize: 10 })
watch(pageInfo, () => getPageData())

const getPageData = (queryInfo: any = {}) => {
  if (!isQuery) return
  store.dispatch('system/getPageListAction', {
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo
    }
  })
}
getPageData()

const dataList = computed(() =>
  store.getters[`system/pageListData`](props.pageName)
)
const dataCount = computed(() =>
  store.getters[`system/pageListCount`](props.pageName)
)

const otherPropSlots = props.contentTableConfig?.propList.filter(
  (item: any) => {
    if (item.slotName === 'status') return false
    if (item.slotName === 'createAt') return false
    if (item.slotName === 'updateAt') return false
    if (item.slotName === 'handler') return false
    return true
  }
)
const handleDeleteClick = (item: any) => {
  store.dispatch('system/deletePageDataAction', {
    pageName: props.pageName,
    id: item.id
  })
}
const handleNewClick = () => {
  console.log('contentTableConfig', props.contentTableConfig)
  console.log('title', props.contentTableConfig.title)
  emit('newBtnClick')
}
const handleEditClick = (item: any) => {
  emit('editBtnClick', item)
}

defineExpose({
  getPageData
})
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
