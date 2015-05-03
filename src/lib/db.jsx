'use strict'

import PouchDB from 'pouchdb'
import ldbAlt from './leveldb-alt'

const adapterConfig = {
  name: 'asyncstorage',
  // can this be smarter about react-native environment?
  valid () {
    return true
  },
  use_prefix: true
}

const adapterName = adapterConfig.name
const asyncAdapter = ldbAlt(adapterConfig)
PouchDB.adapter(adapterName, asyncAdapter)
// must be first, otherwise idb will be chosen
PouchDB.preferredAdapters.unshift(adapterName)

export default new PouchDB('exampledb', {adapter: 'asyncstorage'})
