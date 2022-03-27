import { ref, computed } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

export function useFold(emit: (event: any, ...args: any[]) => void) {
  const isFold = ref(false)
  const handleFoldClick: any = () => {
    isFold.value = !isFold.value
    emit('foldChange', isFold.value)
  }
  return [isFold, handleFoldClick]
}

export function useBreadcrumbs() {
  return computed(() => {
    const store = useStore()
    const userMenus = store.state.login.userMenus
    const route = useRoute()
    const currentPath = route.path
    // console.log('----', pathMapBreadcrumbs(userMenus, currentPath))
    return pathMapBreadcrumbs(userMenus, currentPath)
  })
}
