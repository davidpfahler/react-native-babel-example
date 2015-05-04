'use strict'

var express = require('express')
var app = express()
var PouchDB = require('pouchdb')
var InMemPouchDB = PouchDB.defaults({db: require('memdown')})

app.use('/db', require('express-pouchdb')(InMemPouchDB))
// exposes /db/exampledb
var exampledb = new InMemPouchDB('exampledb', {})

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function createImages (amount) {
  return Array.apply(null, {length: amount}).map(function () {
    var size = getRandomInt(736, 800)
    return {
      uri: 'http://lorempixel.com/' + size + '/' + size,
      created_at: Date.now()
    }
  })
}

// generate 2 images on startup
exampledb.bulkDocs(createImages(2)).then(function (res) {
  console.log('Inserted 2 inital images into db.')
}).catch(function (e) {
  console.log('>>> Error inserting initial images: ', e)
})

// keep adding 1 image very 10 seconds
function addImageRecursive () {
  setTimeout(function () {
    exampledb.bulkDocs(createImages(1)).then(function (res) {
      console.log('Inserted one more images.')
      addImageRecursive()
    }).catch(function (e) {
      console.log('>>> Error: ', e)
      addImageRecursive()
    })
  }, 5000)
}
addImageRecursive()

console.log('Listening on port 3000')
app.listen(3000)
