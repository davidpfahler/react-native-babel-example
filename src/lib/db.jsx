'use strict'

import PouchDB from 'pouchdb'
import asyncadapter from 'pouchdb-async-storage'
export default new PouchDB('exampledb', {adapter: 'asyncstorage'})
