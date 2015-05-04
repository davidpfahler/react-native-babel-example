'use strict'

import PouchDB from 'pouchdb'
import asyncadapter from 'pouchdb-async-storage'

let db = new PouchDB('exampledb', {adapter: 'asyncstorage'})
global.db = db
export default db
