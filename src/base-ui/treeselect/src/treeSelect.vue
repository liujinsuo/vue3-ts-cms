<template>
  <div class="treeSelect">
    <el-popover
      placement="bottom-start"
      v-model:visible="isShowSelect"
      :width="width"
      @hide="popoverHide"
    >
      <el-tree
        class="common-tree"
        :style="style"
        ref="treeRef"
        :data="data"
        :props="treeProps"
        :show-checkbox="multiple"
        :node-key="nodeKey"
        :check-strictly="checkStrictly"
        default-expand-all
        :expand-on-click-node="false"
        :default-checked-keys="defaultCheckedKeys"
        :highlight-current="true"
        @node-click="handleNodeClick"
        @check-change="handleCheckChange"
      ></el-tree>
      <template #reference>
        <el-select
          :style="selectStyle"
          ref="selectRef"
          v-model="selectedData"
          :placeholder="placeholder"
          :multiple="multiple"
          clearable
          class="tree-select"
          @clear="clearSelect"
          @click="isShowSelect = !isShowSelect"
          @remove-tag="(e) => handleRemoveTag(e)"
          ><el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option
        ></el-select>
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { ElSelect, ElTree } from 'element-plus'
import {
  computed,
  defineProps,
  defineEmits,
  onMounted,
  ref,
  watch,
  withDefaults
} from 'vue'

type strFnType = string | ((data: any, node: any) => void)

interface ITreeProps {
  label?: strFnType
  children?: string
  disabled?: strFnType
  isLeaf?: strFnType
  class?: strFnType
}

const props = withDefaults(
  defineProps<{
    data: any[]
    width?: number
    height?: number
    multiple?: boolean
    treeProps?: ITreeProps
    nodeKey?: string
    checkStrictly?: boolean
    modelValue: any
    isShowRemoveTag?: boolean
    placeholder?: string
  }>(),
  {
    width: 250,
    height: 300,
    multiple: false,
    treeProps: () => ({}),
    nodeKey: 'id',
    checkStrictly: false,
    isShowRemoveTag: true,
    placeholder: '请选择菜单'
  }
)

const defaultCheckedKeys = ref<any[]>([])
const style = computed(() => {
  return `width:${props.width}px; height:${props.height}px;`
})
const selectStyle = computed(() => `width:${props.width + 24}px`)
const options = ref<any>([])
const isShowSelect = ref(false)
const selectedData = ref<any[]>([])
const checkedIds = ref<any[] | undefined>([])
const checkedData = ref<any>([])

const selectRef = ref<InstanceType<typeof ElSelect>>()
const treeRef = ref<InstanceType<typeof ElTree>>()

const showRemoveTag = computed(() =>
  props.isShowRemoveTag ? 'inline-block' : 'none'
)

onMounted(() => {
  if (props.multiple) {
    if (props.modelValue) {
      defaultCheckedKeys.value = props.modelValue
      selectedData.value = props.modelValue.map((item: any) => {
        const node = treeRef.value?.getNode(item)
        return node.label
      })
    }
  } else {
    if (props.modelValue) {
      const item: any = props.modelValue
      treeRef.value?.setCurrentKey(item)
      const node = treeRef.value?.getNode(item)
      selectedData.value = node.label
    }
  }
})

const handleNodeClick = (data: any, node: any) => {
  if (!props.multiple) {
    options.value = []
    options.value.push({ value: node.key, label: node.label })
    selectedData.value = node.label
    isShowSelect.value = !isShowSelect.value
  }
}

const handleCheckChange = () => {
  const checkedKeys = treeRef.value?.getCheckedKeys(false)
  options.value = checkedKeys?.map((item) => {
    const node = treeRef.value?.getNode(item)
    return { value: node.key, label: node.label }
  })

  selectedData.value = (options.value as Array<any>).map((item) => item.label)
}

const emit = defineEmits(['update:modelValue'])
const popoverHide = () => {
  if (props.multiple) {
    checkedIds.value = treeRef.value?.getCheckedKeys(false)
    checkedData.value = treeRef.value?.getCheckedNodes(false, false)
  } else {
    checkedIds.value = treeRef.value?.getCurrentKey()
    checkedData.value = treeRef.value?.getCurrentNode()
  }
  emit('update:modelValue', checkedIds.value, checkedData.value)
}

const handleRemoveTag = (val: any) => {
  //获取现在所有勾选到的
  const allChecked = treeRef.value?.getCheckedNodes(false, false)
  const currentNode = allChecked?.find((item) => item.name === val)

  const ids = new Set()
  function _recurseGetChecked(currentNode: any): any {
    if (currentNode?.children) {
      ids.add(currentNode.id)
      ids.add(currentNode?.parentId)
      for (const item of currentNode.children) {
        _recurseGetChecked(item)
      }
    } else {
      ids.add(currentNode.id)
      ids.add(currentNode.parentId)
      const parentNode = allChecked?.find(
        (item) => item.id === currentNode.parentId
      )
      if (parentNode?.parentId) {
        ids.add(parentNode.parentId)
        const grandfaNode = allChecked?.find(
          (item) => item.id === parentNode.parentId
        )
        if (grandfaNode?.parentId) {
          ids.add(grandfaNode.parentId)
        }
      }
    }
  }

  _recurseGetChecked(currentNode)
  const filterChecked = allChecked?.filter((checked) => {
    return ![...ids].includes(checked.id)
  })
  treeRef.value?.setCheckedNodes(filterChecked as any, false)
  popoverHide()
}

const clearSelect = () => {
  treeRef.value?.setCheckedNodes([], false)
  popoverHide()
}

watch(
  () => isShowSelect.value,
  () => {
    //隐藏select自带的下拉框
    selectRef.value?.blur()
  }
)
</script>

<style lang="less" scoped>
.common-tree {
  overflow: auto;
}
:deep(.tree-select .el-select__tags .el-tag .el-tag__close) {
  display: v-bind(showRemoveTag);
}
:deep(.tree-select .el-select__tags .el-tag .el-icon-close) {
  display: v-bind(showRemoveTag);
}
</style>
