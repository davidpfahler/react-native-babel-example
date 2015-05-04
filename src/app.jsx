'use strict'

import React from 'react-native'
import Tiles from './components/tiles.jsx'

const {AppRegistry, NavigatorIOS, StyleSheet} = React

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
    backgroundColor: 'white'
  }
})

const ExampleApp = React.createClass({
  displayName: 'ExampleApp',
  render () {
    return (
      <NavigatorIOS
        style={styles.navigator}
        initialRoute={{
          title: 'Example',
          component: Tiles
        }} />
    )
  }
})

AppRegistry.registerComponent('example', () => ExampleApp)
