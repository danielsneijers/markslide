// @flow
export type MainProps = {
  +index: number,
  +totalSlides: number,
  +slideContent: string
};

export type MainMerge = {
  +index: number,
  +totalSlides: number,
  +renderRouteContainer: () => React$Element<any>,
  +nextSlide: Function,
  +previousSlide: Function
};
