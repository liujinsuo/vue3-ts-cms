<template>
  <div class="page-modal">
    <el-dialog
      title="新建"
      v-model="dialogVisible"
      width="30%"
      center
      destroy-on-close
    >
      <base-form v-model="formData" v-bind="modalConfig"></base-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button @click="handleConfirmClick" type="primary"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, withDefaults, defineExpose } from 'vue'
import { useStore } from '@/store'

import BaseForm, { IForm } from '@/base-ui/form'

const props = withDefaults(
  defineProps<{
    modalConfig: IForm
    defaultInfo?: Record<string, any>
    otherInfo?: Record<string, any>
    pageName: string
  }>(),
  {
    defaultInfo: () => ({}),
    otherInfo: () => ({})
  }
)

const dialogVisible = ref(false)
const formData = ref<any>({})

watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.modalConfig.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`]
    }
  }
)

const store = useStore()
const handleConfirmClick = () => {
  dialogVisible.value = false
  if (Object.keys(props.defaultInfo).length) {
    //编辑
    store.dispatch('system/editPageDataAction', {
      pageName: props.pageName,
      editData: { ...formData.value, ...props.otherInfo },
      id: props.defaultInfo.id
    })
  } else {
    //新建
    store.dispatch('system/createPageDataAction', {
      pageName: props.pageName,
      newData: { ...formData.value, ...props.otherInfo }
    })
  }
}
defineExpose({
  dialogVisible
})
</script>

<style lang="less" scoped></style>
