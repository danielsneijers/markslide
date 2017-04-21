// @flow
import React from 'react'
import Settings from 'config/settings'
import ProgressBar from 'components/ProgressBar'

export const getSetting = (key: string, defaultValue?: string = ''): string =>
  Settings[key] || defaultValue

export const getProgressBar = (props: { offset: number }): React$Element<ProgressBar> | null =>
  getSetting('progressBar') ? <ProgressBar {...props} /> : null
