<template>
  <div class="statistical-panel">
    <div class="header">
      <span>{{ panelData.title }}</span>
      <el-tooltip :content="panelData.tips" placement="top" effect="light">
        <i class="el-icon-warning-outline"></i>
      </el-tooltip>
    </div>
    <div class="content">
      <base-count-up
        :num="panelData.number"
        :option="contentOption"
      ></base-count-up>
    </div>
    <div class="footer">
      <span>
        {{ panelData.subTitle }}
        <base-count-up
          :num="panelData.number"
          :option="footerOption"
        ></base-count-up>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { CountUpOptions } from 'countup.js'
import BaseCountUp from '@/base-ui/count-up'
interface panelData {
  title: string
  tips: string
  price: number
  subTitle: string
  number: number
}
defineProps<{ panelData: panelData }>()

const contentOption: CountUpOptions = {
  decimalPlaces: 0,
  prefix: '￥'
}
const footerOption: CountUpOptions = {
  decimalPlaces: 0,
  prefix: ''
}
</script>

<style lang="less" scoped>
@h: 38px;

.statistical-panel {
  display: flex;
  padding: 0 20px;
  background: white;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0 2px 12px 0 rgb(0 0 0/10%);

  .header {
    display: flex;
    height: @h;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);

    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
  .content {
    display: flex;
    margin-left: -5px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .footer {
    display: flex;
    height: @h;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
}
</style>
