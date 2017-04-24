// @flow
import React, { PureComponent } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router'
import { applyTheme } from 'config/themes'
import SlidesContainer from 'containers/SlidesContainer'
import CSS from './style.css'

type AppProps = {
  history: { push: Function }
}

class App extends PureComponent {
  props: AppProps

  componentWillMount () {
    applyTheme()
  }

  /**
   * Need to call the history.push() in a parent component of the
   * slides container to trigger a rerender
   */
  navigateTo = (url) => {
    this.props.history.push(url)
  }

  render (): React$Element<any> {
    return (
      <div className={CSS.wrapper}>
        <Switch>
          <Route
            path='/:slide'
            render={
              () => <SlidesContainer navigateTo={this.navigateTo} />
            }
          />
          <Redirect exact from='/' to='/1' />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
