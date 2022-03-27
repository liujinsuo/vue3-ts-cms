import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  formItems: [
    {
      field: 'parentId',
      type: 'treeselect',
      label: '上级菜单',
      placeholder: '请选择菜单',
      otherOptions: {
        treeProps: {
          children: 'children',
          label: 'name'
        },
        nodeKey: 'id',
        multiple: false,
        isShowRemoveTag: false
      }
    },
    {
      field: 'name',
      type: 'input',
      label: '菜单名称',
      placeholder: '请输入菜单名称'
    },
    {
      field: 'type',
      type: 'radio',
      label: '类型',
      options: [
        { title: '目录', value: 1 },
        { title: '菜单', value: 2 },
        { title: '按钮', value: 3 }
      ]
    },
    {
      field: 'url',
      type: 'input',
      label: '菜单url',
      placeholder: '请输入菜单url',
      isHidden: false
    },
    {
      field: 'icon',
      type: 'input',
      label: '菜单icon',
      placeholder: '请输入菜单icon'
    },
    {
      field: 'permission',
      type: 'input',
      label: '按钮权限',
      placeholder: '请输入按钮权限'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
