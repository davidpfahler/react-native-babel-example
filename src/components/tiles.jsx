'use strict'

import React from 'react-native'
import Dimensions from 'Dimensions'
import chunk from 'lodash/array/chunk'
import sortBy from 'lodash/collection/sortBy'
import db from '../lib/db'
import replication from '../lib/replication'
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
    return { dataSource: ds.cloneWithRows([[{
      uri: 'http://lorempixum.com/600/600',
      created_at: Date.now()
    }, {
      uri: 'http://lorempixum.com/700/700',
      created_at: Date.now()
    }]]) }
  },
  componentDidMount () {
    let feed = replication()
    feed.on('change', this.updateRows)
    this.updateRows()
  },
  updateRows () {
    db.allDocs({ include_docs: true, descending: true}).then((res) => {
      let rows = res.rows.map((row) => { return row.doc })
      rows = sortBy(rows, 'created_at').reverse()
      this.updateDataSource(rows)
    }).catch((e) => {
      console.log(e)
    })
  },
  updateDataSource (rows) {
    this.setState({dataSource: this.state.dataSource.cloneWithRows(chunk(rows, 2))})
  },
  renderRow (rowData) {
    let images = rowData.map((item) => {
      return (
        <Image
          key={item.uri + item.created_at}
          source={{uri: item.uri}}
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
