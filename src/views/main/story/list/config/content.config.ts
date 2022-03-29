import { IContentTableConfig } from '@/components/page-content/src/types'

export const contentTableConfig: IContentTableConfig = {
  title: '故事',
  propList: [
    { prop: 'name', label: '标题', minWidth: '100' },
    { prop: 'content', label: '内容', minWidth: '100' },
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
