// @flow
export type DefaultSlideProps = {
  +content: HTMLElement,
  +meta: {
    +class: string
  },
  +index: number,
  +totalSlides: number
};

export type DefaultSlideMerge = {
  +content: HTMLElement,
  +meta: {
    +class: string
  },
  +index: number,
  +totalSlides: number,
  +nextSlide: Function
};
