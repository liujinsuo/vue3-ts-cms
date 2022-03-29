import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '标题',
      placeholder: '请输入标题'
    },
    {
      field: 'content',
      type: 'input',
      label: '内容',
      placeholder: '请输入内容'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
