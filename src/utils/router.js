// @flow
import { get } from 'lodash'

export type RouterProps = {
  match: {
    params: { }
  }
};

export const getFromRouterProps = (props: RouterProps, param: string): string => {
  return get(props, `match.params.${param}`)
}

export const getParamFromRouterProps = (param: string): Function => (props: RouterProps): string => {
  return getFromRouterProps(props, param)
}

export const getSlideIndexFromProps: Function = getParamFromRouterProps('slide')
