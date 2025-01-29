const axios = require('axios')
const fs = require('fs')
const fsPromises = require('fs/promises')
const csvParser = require('csv-parser')
const path = require('path')
const connection = require('../config/db.js')

const BASE_URL = 'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/diario/Brasil'
const OUTPUT_DIR = path.join(__dirname, 'extrato')

const getLastNDays = (n) => {
  const dates = []
  const today = new Date()
  const currentHour = today.getHours()
  let i = currentHour < 12 ? 2 : 1
  for (i; i < n; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    const formatted = date.toISOString().split('T')[0].replace(/-/g, '')
    dates.push(formatted)
  }
  return dates
}

const downloadCSV = async (date) => {
  const url = `${BASE_URL}/focos_diario_br_${date}.csv`
  const filePath = path.join(OUTPUT_DIR, `focos_diario_br_${date}.csv`)
  try {
    const response = await axios({ url, method: 'GET', responseType: 'stream' })
    const writer = fs.createWriteStream(filePath)
    response.data.pipe(writer)
    await new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    })
    console.log(`Arquivo baixado: ${filePath}`)
    return filePath
  } catch (error) {
    console.error(`Erro ao baixar ${url}:`, error.message)
    return null
  }
}

const processCSV = async (filePath, co) => {
  const agregados = new Map()

  try {
    const stream = fs.createReadStream(filePath).pipe(csvParser())

    const getRegiao = (estado) => {
      const regioes = {
        ACRE: 'Norte',
        AMAPÁ: 'Norte',
        AMAZONAS: 'Norte',
        PARÁ: 'Norte',
        RONDÔNIA: 'Norte',
        RORAIMA: 'Norte',
        TOCANTINS: 'Norte',
        ALAGOAS: 'Nordeste',
        BAHIA: 'Nordeste',
        CEARÁ: 'Nordeste',
        MARANHÃO: 'Nordeste',
        PARAÍBA: 'Nordeste',
        PERNAMBUCO: 'Nordeste',
        PIAUÍ: 'Nordeste',
        'RIO GRANDE DO NORTE': 'Nordeste',
        SERGIPE: 'Nordeste',
        'DISTRITO FEDERAL': 'Centro-Oeste',
        GOIÁS: 'Centro-Oeste',
        'MATO GROSSO': 'Centro-Oeste',
        'MATO GROSSO DO SUL': 'Centro-Oeste',
        'ESPÍRITO SANTO': 'Sudeste',
        'MINAS GERAIS': 'Sudeste',
        'RIO DE JANEIRO': 'Sudeste',
        'SÃO PAULO': 'Sudeste',
        PARANÁ: 'Sul',
        'RIO GRANDE DO SUL': 'Sul',
        'SANTA CATARINA': 'Sul'
      }
      return regioes[estado] || 'Desconhecida'
    }

    for await (const row of stream) {
      if (row.satelite !== 'AQUA_M-T') {
        continue
      }

      const dataHora = new Date(row.data_hora_gmt)
      const dia = dataHora.getDate()
      const mes = dataHora.getMonth() + 1
      const ano = dataHora.getFullYear()
      const estado = row.estado
      const bioma = row.bioma
      const regiao = getRegiao(estado)

      const chave = `${estado}|${bioma}|${regiao}|${dia}|${mes}|${ano}`

      if (!agregados.has(chave)) {
        agregados.set(chave, {
          estado,
          bioma,
          regiao,
          dia,
          mes,
          ano,
          quantidade_focos: 1
        })
      } else {
        const atual = agregados.get(chave)
        atual.quantidade_focos += 1
      }
    }

    const query = `
      INSERT INTO focosDiarios (
        estado, 
        bioma, regiao, dia, mes, quantidade_focos, ano
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)`

    for (const dados of agregados.values()) {
      await new Promise((resolve, reject) => {
        co.query(query, [
          dados.estado,
          dados.bioma,
          dados.regiao,
          dados.dia,
          dados.mes,
          dados.quantidade_focos,
          dados.ano
        ], (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })
    }

    console.log(`Dados do arquivo ${filePath} inseridos no banco.`)
  } catch (error) {
    console.error(`Erro ao processar o arquivo ${filePath}:`, error.message)
  } finally {
    await fsPromises.unlink(filePath)
    console.log(`Arquivo ${filePath} removido.`)
  }
}

const main = async () => {
  await fsPromises.mkdir(OUTPUT_DIR, { recursive: true })
  const dates = getLastNDays(31)

  for (const date of dates) {
    const filePath = await downloadCSV(date)
    if (filePath) {
      await processCSV(filePath, connection)
    }
  }

  await connection.end()
  console.log('Processo concluído.')
}

main().catch((error) => {
  console.error('Erro no processo principal:', error.message)
})
