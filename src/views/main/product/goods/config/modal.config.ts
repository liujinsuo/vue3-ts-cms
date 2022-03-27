import { IForm } from '@/base-ui/form'
// address: "天津"
// categoryId: 6
// createAt: "2021-04-30T13:43:16.000Z"
// desc: "吊带背心女夏2018秋季新款内搭吊带衫短款性感修身针织打底衫上衣显瘦"
// favorCount: 3
// id: 183
// imgUrl: "http://s11.mogucdn.com/mlcdn/17f85e/180927_5i77e04lhaalbg3dai0j4588lbahh_640x960.jpg_560x999.jpg"
// inventoryCount: 6285
// name: "吊带背心女夏2018秋季新款内搭吊带衫短款性感修身针织打底衫上衣显瘦"
// newPrice: "30"
// oldPrice: "43"
// saleCount: 2
// status: 1
// updateAt: "2021-04-30T13:43:16.000Z"
export const modalConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '商品名称',
      placeholder: '请输入商品名称'
    },
    {
      field: 'address',
      type: 'input',
      label: '发货地',
      placeholder: '请输入发货地址'
    },
    {
      field: 'categoryId',
      type: 'select',
      label: '商品分类',
      placeholder: '请选择商品分类',
      options: []
    },
    {
      field: 'desc',
      type: 'input',
      label: '商品描述',
      placeholder: '请输入商品描述',
      otherOptions: {
        type: 'textarea'
      }
    },
    {
      field: 'oldPrice',
      type: 'inputNumber',
      label: '原价',
      placeholder: '请输入原价'
    },
    {
      field: 'newPrice',
      type: 'inputNumber',
      label: '售价',
      placeholder: '请输入售价'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
