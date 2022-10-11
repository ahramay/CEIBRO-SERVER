import { ActionInterface } from '../reducers'

interface CreateAction {
  body?: any
  params?: any
  success?: (res: any, action: ActionInterface) => void
  onFailAction?: (err: any) => void
  finallyAction?: () => void
  showErrorToast?: boolean // by default showErrorToast will be true in apiCall.ts
  other?: any
}

// Generic method for action dispatch and for apiCall.js templatee
export function createAction(type: string) {
  return (payload: CreateAction = {}) => ({
    type,
    payload: {
      body: payload.body,
      params: payload.params,
      success: payload.success,
      onFailAction: payload.onFailAction,
      finallyAction: payload.finallyAction,
      other: payload.other,
      showErrorToast: payload.showErrorToast,
    },
  })
}
