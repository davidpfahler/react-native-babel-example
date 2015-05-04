'use strict'

import db from './db'

let remoteUrl = 'http://localhost:3000/db/exampledb'

function start () {
  return db.replicate.from(remoteUrl, {
    live: true,
    retry: true
  })
}

export default start
