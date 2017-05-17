// @flow
export type MainProps = {
  +routeContainer: React$Element<any>,
  +index: number,
  +totalSlides: number
};

export type MainMerge = {
  +routeContainer: React$Element<any>,
  +index: number,
  +totalSlides: number,
  +nextSlide: Function,
  +previousSlide: Function
};
