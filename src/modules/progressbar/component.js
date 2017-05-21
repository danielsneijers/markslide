// @flow
import React from 'react'
import CSS from './style.css'
import type { ProgressBarProps } from './types'

const ProgressBar = ({ offset }: ProgressBarProps): React$Element<any> => {
  const style = { transform: `translateX(-${offset}%)` }

  return <span className={CSS.progressBar} style={style} />
}

export default ProgressBar
