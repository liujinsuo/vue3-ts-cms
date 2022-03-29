import { IContentTableConfig } from '@/components/page-content/src/types'

export const contentTableConfig: IContentTableConfig = {
  title: '部门',
  propList: [
    { prop: 'name', label: '部门名称', minWidth: '100' },
    { prop: 'leader', label: '负责人', minWidth: '100' },
    {
      prop: 'parentId',
      label: '上级部门',
      minWidth: '100',
      slotName: 'parent'
    },
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
