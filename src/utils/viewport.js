// @flow
import { compose } from 'ramda'
import { memoize } from 'lodash'

type ElementDimensions = {
  width: number,
  height: number
}

export const getElementSize = (element: HTMLElement): ElementDimensions => {
  const { width, height } = element.getBoundingClientRect()

  return {
    width: Math.floor(width),
    height: Math.floor(height)
  }
}

export const memoizedGetElementSize: Function = memoize(getElementSize)

export const dimensionsFitViewport = (elementDimensions: ElementDimensions): boolean => {
  const { width, height } = elementDimensions

  return window.innerWidth >= width && window.innerHeight >= height
}

export const elementOutOfBoundFraction = (elementDimensions: ElementDimensions): ElementDimensions => {
  const { width, height } = elementDimensions

  return {
    width: window.innerWidth / width,
    height: window.innerHeight / height
  }
}

export const scaleToFit = (outOfBoundFraction: ElementDimensions): number => {
  const { width, height } = outOfBoundFraction

  return width > height ? height : width
}

export const elementFitsViewport: Function = compose(dimensionsFitViewport, memoizedGetElementSize)
export const scaleElementToFit: Function = compose(scaleToFit, elementOutOfBoundFraction, memoizedGetElementSize)
