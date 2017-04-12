import { get } from 'lodash'

export const getFromRouterProps = (props, param) => {
  return get(props, `match.params.${param}`)
}

export const getParamFromRouterProps = (param) => (props) => {
  return getFromRouterProps(props, param)
}

export const getSlideIndexFromProps = getParamFromRouterProps('slide')
