import { get } from 'lodash'

export function getFromRouterProps (props, param) {
  return get(props, `match.params.${param}`)
}

export const getParamFromRouterProps = (param) => (props) => getFromRouterProps(props, param)
