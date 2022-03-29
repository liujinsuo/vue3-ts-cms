<template>
  <div class="overview">
    <base-card title="关于">
      <div>
        Vue3Admin 是基于 Vue3、Vuex、VueRouter、Vue-cli、 ElementPlus
        、TypeScript、Echart5 等后台系统解决方案。
      </div>
    </base-card>

    <base-card title="技术栈">
      <base-text-link :text-arrs="technologyStacks"></base-text-link>
      <base-descriptions
        title="生产环境依赖"
        :column="2"
        :table-datas="dependencies"
      ></base-descriptions>
      <base-descriptions
        title="开发环境依赖"
        :column="2"
        :table-datas="devDependencies"
      ></base-descriptions>
    </base-card>

    <base-card title="项目结构">
      <base-code language="bash" :code="projectDir"></base-code>
    </base-card>
    <base-card title="项目规范">
      <base-descriptions
        title="文件命名规范"
        :column="1"
        width="50%"
        :table-datas="fileConventions"
      ></base-descriptions
      ><base-descriptions
        title="编写组件规范"
        :column="1"
        width="50%"
        :table-datas="componentConventions"
      ></base-descriptions>
    </base-card>

    <base-card title="Git提交规范">
      <base-descriptions
        :column="1"
        width="50%"
        :table-datas="gitConventions"
      ></base-descriptions>
    </base-card>
  </div>
</template>

<script lang="ts" setup>
import BaseCard from '@/base-ui/card'
import BaseTextLink from '@/base-ui/text-link'
import BaseDescriptions from '@/base-ui/descriptions'
import BaseCode from '@/base-ui/base-code'

import {
  technologyStacks,
  dependencies,
  devDependencies,
  projectDir,
  componentConventions,
  fileConventions,
  gitConventions
} from './config'
</script>

<style lang="less" scoped>
.overview {
  text-align: left;
  background: #f0f2f5;

  .el-card {
    margin-bottom: 20px;
    // ::v-deep 重写 element-plus 样式
    &:deep(.el-card__header span) {
      // ::v-deep .el-card__header span {
      font-weight: 700;
    }
  }

  .base-descriptions {
    // ::v-deep 重写 element-plus 样式
    :deep(.el-descriptions__content) {
      border: 1px solid #f0f0f0;
    }
    :deep(.el-descriptions__title) {
      font-weight: 400;
    }
    :deep(.el-descriptions__label) {
      border: 1px solid #f0f0f0;
    }
  }
}
</style>
