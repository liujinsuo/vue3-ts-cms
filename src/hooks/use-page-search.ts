import { ref, Ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch(): [
  Ref<InstanceType<typeof PageContent>>,
  () => void,
  (queryInfo: any) => void
] {
  //页面中的page-content组件需绑定的ref属性
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }
  return [pageContentRef, handleResetClick, handleQueryClick]
}
