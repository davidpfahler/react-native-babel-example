'use strict'

import PouchDB from 'pouchdb'
import asyncadapter from 'pouchdb-async-storage'
import Base64 from 'Base64'

global.atob = Base64.atob
global.btoa = Base64.btoa

let db = new PouchDB('exampledb', {adapter: 'asyncstorage'})
global.db = db
export default db
