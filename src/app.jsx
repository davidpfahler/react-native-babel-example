'use strict'

import React from 'react-native'
import Tiles from './components/tiles.jsx'

const {AppRegistry, NavigatorIOS} = React

const styles = {
  flex: 1,
  backgroundColor: 'white'
}
const ExampleApp = React.createClass({
  displayName: 'ExampleApp',
  render () {
    return (
      <NavigatorIOS
        style={styles}
        initialRoute={{
          title: 'Example',
          component: Tiles
        }} />
    )
  }
})

AppRegistry.registerComponent('example', () => ExampleApp)
