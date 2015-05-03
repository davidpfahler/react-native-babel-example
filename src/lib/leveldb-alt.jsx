'use strict'

import LevelPouch from 'pouchdb/lib/adapters/leveldb/leveldb'
import utils from 'pouchdb/lib/utils'
import asyncdown from 'asyncstorage-down'

export default (adapterConfig) => {
  function LevelPouchAlt (opts, callback) {
    const _opts = utils.extend({
      db: asyncdown
    }, opts)

    LevelPouch.call(this, _opts, callback)
  }

  // overrides for normal LevelDB behavior on Node
  LevelPouchAlt.valid = () => {
    return adapterConfig.valid()
  }
  LevelPouchAlt.use_prefix = adapterConfig.use_prefix

  LevelPouchAlt.destroy = utils.toPromise((name, opts, callback) => {
    if (typeof opts === 'function') {
      callback = opts
      opts = {}
    }
    const _opts = utils.extend({
      db: asyncdown
    }, opts)

    return LevelPouch.destroy(name, _opts, callback)
  })
  return LevelPouchAlt

}
