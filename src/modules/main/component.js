// @flow
import React, { PureComponent } from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { applyTheme } from 'config/themes'
import { keyboardNavigation } from 'higher-order-components'
import { ProgressBarContainer } from 'modules/progressbar'
import CSS from './style.css'

type Props = {
  renderRouteContainer: () => React$Element<any>
};

export class Main extends PureComponent {
  props: Props;

  componentWillMount () {
    applyTheme()
  }

  render (): React$Element<any> {
    const { renderRouteContainer } = this.props

    return (
      <div className={CSS.wrapper}>
        <ProgressBarContainer />
        <Switch>
          <Route path='/:slide' render={renderRouteContainer} />
          <Redirect exact from='/' to='/1' />
        </Switch>
      </div>
    )
  }
}

export default keyboardNavigation(Main)
