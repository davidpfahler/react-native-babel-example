'use strict'

import React from 'react-native'
import Dimensions from 'Dimensions'
import chunk from 'lodash/array/chunk'
const {ListView, View, Image, StyleSheet} = React

const tileWidth = Math.floor(Dimensions.get('window').width / 2)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  thumbnail: {
    flex: 1,
    height: tileWidth,
    width: tileWidth
  },
  row: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  }
})

const Tiles = React.createClass({
  displayName: 'Tiles',
  getInitialState () {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    let rows = new Array(500)
    return {
      dataSource: ds.cloneWithRows(chunk(rows, 2))
    }
  },
  renderRow (rowData) {
    let images = rowData.map(() => {
      let randomWidth = Math.floor(Math.random() * 400)
      return (
        <Image
          source={{uri: `http://lorempixel.com/${randomWidth}/${randomWidth}/`}}
          style={styles.thumbnail} />
      )
    })
    return (
      <View style={styles.row}>
        {images}
      </View>
    )
  },
  render () {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow} />
      </View>
    )
  }
})

export default Tiles
