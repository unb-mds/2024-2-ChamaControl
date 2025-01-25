const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/index.js')
const connection = require('./config/db.js')
const cors = require('cors')

const app = express()

// a
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', routes)

connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
  if (err) throw err
  console.log('Banco de dados funcionando se = 2:', rows[0].solution)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`)
})
