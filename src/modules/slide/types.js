// @flow
export type SlideProps = {
  +content: HTMLElement,
  +meta: {
    +class: string
  },
  +index: number,
  +totalSlides: number
};

export type SlideMerge = {
  +content: HTMLElement,
  +meta: {
    +class: string
  },
  +index: number,
  +totalSlides: number,
  +nextSlide: Function
};
