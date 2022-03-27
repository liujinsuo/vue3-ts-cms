export interface IPropList {
  prop?: string
  label: string
  minWidth?: string
  slotName?: string
  [propName: string]: any
}
export interface IContentTableConfig {
  title?: string
  propList: IPropList[]
  showIndexColumn?: boolean
  showSelectColumn?: boolean
  childrenProps?: any
  showFooter?: boolean
}
