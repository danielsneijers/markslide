import React from 'react'
import Settings from 'config/settings'
import ProgressBar from 'components/ProgressBar'

export const getSetting = (key, defaultValue = null) => Settings[key] || defaultValue

export const getProgressBar = (props) => {
  return getSetting('progressBar')
    ? <ProgressBar {...props} />
    : null
}
