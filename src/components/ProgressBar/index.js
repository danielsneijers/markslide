// @flow
import React from 'react'
import CSS from './style.css'

export type Props = {
  offset: number
}

const ProgressBar = ({ offset }: Props) => {
  const style = { transform: `translateX(-${offset}%)` }

  return <span className={CSS.progressBar} style={style} />
}

export default ProgressBar
