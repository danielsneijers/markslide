// @flow
export const getDisplayName = (WrappedComponent: { [string]: string }) =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component'
