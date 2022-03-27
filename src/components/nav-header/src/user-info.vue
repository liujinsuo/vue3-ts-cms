<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span class="title">{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-circle-close" @click="handleLogout">
            退出登录
          </el-dropdown-item>
          <el-dropdown-item divided> 用户信息 </el-dropdown-item>
          <el-dropdown-item> 系统管理 </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/store'
import localCache from '@/utils/cache'
import { useRouter } from 'vue-router'

const store = useStore()
const name = computed(() => store.state.login.userInfo.name)

const router = useRouter()
const handleLogout = () => {
  localCache.deleteCache('token')
  router.push('/main')
}
</script>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  .title {
    margin-left: 10px;
  }
}
</style>
