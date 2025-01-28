const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/index.js')
const connection = require('./config/db.js')
const cors = require('cors')
const cron = require('node-cron')
const path = require('path')
const { fork } = require('child_process')

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', routes)

cron.schedule('0 13 * * *', () => {
  console.log('Iniciando processamento diário de focos...')

  const scriptPath = path.join(__dirname, 'scraper', 'processaDadoDiario.js')

  const processDiario = fork(scriptPath)

  processDiario.on('exit', (code) => {
    if (code === 0) {
      console.log('Processamento diário concluído com sucesso.')
    } else {
      console.error(`Processamento diário falhou com código de saída ${code}`)
    }
  })
}, {
  scheduled: true,
  timezone: 'America/Sao_Paulo'
})

console.log('Cron job configurado para executar todos os dias às 12:00 (horário de Brasília)')

connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
  if (err) throw err
  console.log('Banco de dados funcionando se = 2:', rows[0].solution)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`)
})
