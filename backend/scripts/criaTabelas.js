const fs = require('fs')
const connection = require('../config/db.js')

const sql = fs.readFileSync('./script-db.sql', 'utf8')

const queries = sql.split(';').filter(query => query.trim())

queries.forEach(query => {
  connection.query(query, (err, results) => {
    if (err) throw err
    console.log('Query executada com sucesso.')
  })
})

connection.end()
