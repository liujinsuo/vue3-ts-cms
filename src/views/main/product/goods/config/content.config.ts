import { IContentTableConfig } from '@/components/page-content/src/types'

export const contentTableConfig: IContentTableConfig = {
  title: '商品',
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '150' },
    { prop: 'address', label: '地址', minWidth: '100' },
    { prop: 'oldPrice', label: '原价', minWidth: '50', slotName: 'oldPrice' },
    { prop: 'newPrice', label: '售价', minWidth: '50', slotName: 'newPrice' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'img' },
    {
      prop: 'categoryId',
      label: '商品分类',
      minWidth: '100',
      slotName: 'category'
    },
    { prop: 'saleCount', label: '已售数', minWidth: '80' },
    { prop: 'favorCount', label: '收藏数', minWidth: '80' },
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
