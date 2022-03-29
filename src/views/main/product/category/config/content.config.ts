import { IContentTableConfig } from '@/components/page-content/src/types'

export const contentTableConfig: IContentTableConfig = {
  title: '商品分类',
  propList: [
    { prop: 'name', label: '分类名称', minWidth: '200' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
