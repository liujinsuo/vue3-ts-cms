<template>
  <div class="base-form">
    <div class="header">
      <slot name="header"></slot>
    </div>

    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.title"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
              <template v-else-if="item.type === 'treeselect'">
                <tree-select
                  v-if="menus.length > 0"
                  :data="menus"
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></tree-select>
              </template>
              <template v-else-if="item.type === 'radio'">
                <el-radio-group
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-radio
                    v-for="r in item.options"
                    :label="r.value"
                    :key="r.value"
                    >{{ r.title }}</el-radio
                  >
                </el-radio-group>
              </template>
              <template v-else-if="item.type === 'inputNumber'">
                <el-input-number
                  :model-value="
                    modelValue[`${item.field}`]
                      ? +modelValue[`${item.field}`]
                      : 0
                  "
                  @update:modelValue="handleValueChange($event, item.field)"
                  :placeholder="item.placeholder"
                >
                </el-input-number>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits, computed } from 'vue'
import { IFormItem } from '../types'
import TreeSelect from '@/base-ui/treeselect'

import { useStore } from '@/store'

const props = withDefaults(
  defineProps<{
    modelValue: Record<string, any>
    formItems?: IFormItem[]
    labelWidth?: string
    itemStyle?: Record<string, any>
    colLayout?: Record<string, any>
  }>(),
  {
    formItems: () => [],
    labelWidth: '100px',
    itemStyle: () => ({ padding: '10px 40px' }),
    colLayout: () => ({ xl: 6, lg: 8, md: 12, sm: 24, xs: 24 })
  }
)

const store = useStore()
const menus = computed(() => store.state.entrieMenu)

const emit = defineEmits(['update:modelValue'])
const handleValueChange = (value: any, field: string) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
// const popoverHide = (checkedIds: any, )
</script>

<style lang="less" scoped>
.base-form {
  padding-top: 40px;
}
</style>
