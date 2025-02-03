const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/index.js')
const connection = require('./config/db.js')
const cors = require('cors')
const cron = require('node-cron')
const path = require('path')
const { fork } = require('child_process')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentação da API',
      version: '1.0.0',
      description: 'Documentação da API de foco de incêndios florestais'
    },
    servers: [
      {
        url: 'https://chama-control-95b7a5960e80.herokuapp.com/api',
        description: 'Servidor Heroku'
      },
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor Local'
      }
    ],
    tags: [
      {
        name: 'Focos',
        description: 'Endpoints relacionados a focos de incêndios florestais'
      },
      {
        name: 'Teste',
        description: 'Endpoints de teste'
      }
    ]
  },
  apis: ['./routes/*.js']
}

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', routes)

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

cron.schedule('0 12 * * *', () => {
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
