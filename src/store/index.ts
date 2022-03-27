import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'
import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootState>({
  state() {
    return {
      name: '',
      age: 10,
      entrieDepartment: [],
      entrieRole: [],
      entrieMenu: [],
      entrieCategory: []
    }
  },
  mutations: {
    changeEntrieDepartment(state, list) {
      state.entrieDepartment = list
    },
    changeEntrieRole(state, list) {
      state.entrieRole = list
    },
    changeEntrieMenu(state, list) {
      state.entrieMenu = list
    },
    changeEntrieCategory(state, list) {
      state.entrieCategory = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      //获取所有部门数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      //获取所有角色数据
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      //获取所有菜单数据
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data
      //获取所有商品分类数据
      const categoryResult = await getPageListData('/category/list', {
        offset: 0,
        size: 1000
      })
      const { list: categoryList } = categoryResult.data

      commit('changeEntrieDepartment', departmentList)
      commit('changeEntrieRole', roleList)
      commit('changeEntrieMenu', menuList)
      commit('changeEntrieCategory', categoryList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
