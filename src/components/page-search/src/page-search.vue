<template>
  <div class="page-search">
    <base-form v-bind="searchFormConfig" v-model="formData">
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            icon="el-icon-search"
            @click="handleQueryClick"
            type="primary"
            >搜索</el-button
          >
        </div>
      </template>
    </base-form>
  </div>
</template>

<script lang="ts" setup>
import BaseForm from '@/base-ui/form'
import { defineProps, defineEmits, ref } from 'vue'
import { IForm } from '@/base-ui/form'

const props = defineProps<{
  searchFormConfig: IForm
}>()
const emit = defineEmits(['resetBtnClick', 'queryBtnClick'])

//获取到配置文件中的表单属性，遍历之后获得field字段，并绑定到formData中
const formItems = props.searchFormConfig?.formItems ?? []
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}
const formData = ref(formOriginData)

const handleResetClick = () => {
  formData.value = formOriginData
  emit('resetBtnClick')
}

const handleQueryClick = () => {
  emit('queryBtnClick', formData.value)
}
</script>

<style lang="less" scoped>
.header {
  color: red;
}
.handle-btns {
  display: flex;
  justify-content: flex-end;
  padding: 0 50px 20px 0;
}
</style>
