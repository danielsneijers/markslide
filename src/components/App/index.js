import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, withRouter } from 'react-router'
import SlidesContainer from 'containers/SlidesContainer'
import CSS from './style.css'

class App extends PureComponent {
  constructor () {
    super()

    this.navigateTo = this.navigateTo.bind(this)
  }

  /**
   * Need to call the history.push() in a parent component of the
   * slides container to trigger a rerender
   */
  navigateTo (url) {
    this.props.history.push(url)
  }

  render () {
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

App.propTypes = {
  history: PropTypes.object
}

export default withRouter(App)
