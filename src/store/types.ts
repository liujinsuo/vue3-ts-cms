import { ILoginState } from './login/types'
import { IDashboardState } from './main/analysis/types'
import { ISystemState } from './main/system/type'

export interface IRootState {
  name: string
  age: number
  entrieDepartment: any[]
  entrieRole: any[]
  entrieMenu: any[]
  entrieCategory: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}
export type IStoreType = IRootState & IRootWithModule
