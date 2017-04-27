// @flow
import React from 'react'
import Settings from 'config/settings'
import ProgressBar from 'components/ProgressBar'
import type { Props } from 'components/ProgressBar'

export const getSetting = (key: string, defaultValue?: string = ''): string =>
  Settings[key] || defaultValue

export const getProgressBar = ({ offset }: Props): React$Element<any> | null =>
  getSetting('progressBar') ? <ProgressBar offset={offset} /> : null
