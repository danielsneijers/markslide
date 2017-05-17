// @flow
import React, { PureComponent } from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { applyTheme } from 'config/themes'
import keyboardNavigation from 'higher-order-components/keyboardNavigation'
import ProgressBarContainer from 'containers/ProgressBarContainer'
import CSS from './style.css'

type Props = {
  routeContainer: React$Element<any>
};

class App extends PureComponent {
  props: Props;

  componentWillMount () {
    applyTheme()
  }

  render (): React$Element<any> {
    return (
      <div className={CSS.wrapper}>
        <ProgressBarContainer />
        <Switch>
          <Route path='/:slide' render={() => this.props.routeContainer} />
          <Redirect exact from='/' to='/1' />
        </Switch>
      </div>
    )
  }
}

export default keyboardNavigation(App)
