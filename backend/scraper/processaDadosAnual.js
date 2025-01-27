const fs = require('fs')
const csv = require('csv-parser')
const connection = require('../config/db.js')
const path = require('path')
const { fileURLToPath } = require('url')
const axios = require('axios')
const unzipper = require('unzipper')

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

const csvDir = path.join(__dirname, 'extrato')
const dadosAgregados = new Map()

const BIOMAS = [
  'Amazônia',
  'Caatinga',
  'Cerrado',
  'Mata Atlântica',
  'Pampa',
  'Pantanal'
]

const estadosParaRegioes = {
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

const urls = [
  'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_sat_ref/focos_br_ref_2003.zip',
  'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_sat_ref/focos_br_ref_2004.zip',
  'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_sat_ref/focos_br_ref_2005.zip',
  'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_sat_ref/focos_br_ref_2006.zip',
  'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_sat_ref/focos_br_ref_2007.zip',
  'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_sat_ref/focos_br_ref_2008.zip',
  'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_sat_ref/focos_br_ref_2009.zip',
  'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_sat_ref/focos_br_ref_2010.zip',
  'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_sat_ref/focos_br_ref_2011.zip',
  'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_sat_ref/focos_br_ref_2012.zip',
  'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_sat_ref/focos_br_ref_2013.zip',
  'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_sat_ref/focos_br_ref_2014.zip',
  'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_sat_ref/focos_br_ref_2015.zip',
  'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_sat_ref/focos_br_ref_2016.zip',
  'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_sat_ref/focos_br_ref_2017.zip',
  'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_sat_ref/focos_br_ref_2018.zip',
  'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_sat_ref/focos_br_ref_2019.zip',
  'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_sat_ref/focos_br_ref_2020.zip',
  'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_sat_ref/focos_br_ref_2021.zip',
  'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_sat_ref/focos_br_ref_2022.zip',
  'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_sat_ref/focos_br_ref_2023.zip',
  'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_sat_ref/focos_br_ref_2024.zip'
]

function obterRegiao (estado) {
  return estadosParaRegioes[estado] || 'Desconhecida'
}

function inicializarDadosZerados (ano) {
  Object.entries(estadosParaRegioes).forEach(([estado, regiao]) => {
    for (let mes = 1; mes <= 12; mes++) {
      BIOMAS.forEach(bioma => {
        const chave = gerarChaveAgregacao(estado, bioma, regiao, mes, ano)

        if (!dadosAgregados.has(chave)) {
          dadosAgregados.set(chave, {
            estado,
            bioma,
            regiao,
            mes,
            ano,
            quantidade_focos: 0
          })
        }
      })
    }
  })
}

function gerarChaveAgregacao (estado, bioma, regiao, mes, ano) {
  return `${estado}|${bioma}|${regiao}|${mes}|${ano}`
}

function salvarNoBancoBatch (dadosAgregados) {
  return new Promise((resolve, reject) => {
    const valores = Array.from(dadosAgregados.values()).map(dado => [
      null,
      dado.estado,
      dado.bioma,
      dado.regiao,
      dado.mes,
      dado.quantidade_focos,
      dado.ano
    ])

    if (valores.length === 0) {
      resolve()
      return
    }

    const query = 'INSERT INTO focos (foco_id, estado, bioma, regiao, mes, quantidade_focos, ano) VALUES ? ' +
                     'ON DUPLICATE KEY UPDATE quantidade_focos = quantidade_focos + VALUES(quantidade_focos)'

    connection.query(query, [valores], (err) => {
      if (err) {
        console.error('Erro ao salvar no banco de dados:', err.message)
        return reject(err)
      }
      console.log(`${valores.length} registros agregados salvos com sucesso.`)
      resolve()
    })
  })
}

const downloadFile = async (url, outputPath) => {
  try {
    const response = await axios.get(url, { responseType: 'stream' })
    const writer = fs.createWriteStream(outputPath)

    return new Promise((resolve, reject) => {
      response.data.pipe(writer)
      writer.on('finish', () => {
        console.log('Arquivo baixado com sucesso para:', outputPath)
        resolve(outputPath)
      })
      writer.on('error', (error) => {
        console.error('Erro ao escrever o arquivo:', error)
        reject(error)
      })
    })
  } catch (error) {
    console.error('Erro ao baixar o arquivo:', error)
    throw error
  }
}

const extractCSV = async (zipFilePath, outputDir) => {
  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    return new Promise((resolve, reject) => {
      let csvEncontrado = false

      fs.createReadStream(zipFilePath)
        .pipe(unzipper.Parse())
        .on('entry', (entry) => {
          const entryName = entry.path

          if (entryName.endsWith('.csv')) {
            csvEncontrado = true

            const fileName = path.basename(entryName)
            const filePath = path.join(outputDir, fileName)

            entry.pipe(fs.createWriteStream(filePath))
              .on('finish', () => {
                console.log(`Arquivo CSV '${fileName}' extraído para: ${filePath}`)
                resolve(filePath)
              })
              .on('error', (error) => {
                console.error(`Erro ao extrair o arquivo CSV '${fileName}':`, error)
                reject(error)
              })
          } else {
            entry.autodrain()
          }
        })
        .on('close', () => {
          if (!csvEncontrado) {
            reject(new Error('Nenhum arquivo CSV encontrado no ZIP'))
          }
        })
        .on('error', (error) => {
          console.error('Erro ao extrair o arquivo ZIP:', error)
          reject(error)
        })
    })
  } catch (error) {
    console.error('Erro ao processar o arquivo:', error)
    throw error
  }
}

const deleteFile = async (filePath) => {
  try {
    fs.unlinkSync(filePath)
    console.log(`Arquivo '${filePath}' deletado com sucesso.`)
  } catch (error) {
    console.error(`Erro ao deletar o arquivo '${filePath}':`, error)
  }
}

async function processarCSV (csvPath) {
  console.log(`Processando arquivo: ${csvPath}`)
  let anoAtual = null

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        const data = new Date(row.data_pas)
        const mes = data.getMonth() + 1
        const ano = data.getFullYear()
        anoAtual = ano
        const estado = row.estado
        const bioma = row.bioma
        const regiao = obterRegiao(estado)

        const chave = gerarChaveAgregacao(estado, bioma, regiao, mes, ano)

        if (!dadosAgregados.has(chave)) {
          dadosAgregados.set(chave, {
            estado,
            bioma,
            regiao,
            mes,
            ano,
            quantidade_focos: 1
          })
        } else {
          const dado = dadosAgregados.get(chave)
          dado.quantidade_focos++
        }
      })
      .on('end', async () => {
        try {
          if (anoAtual) {
            inicializarDadosZerados(anoAtual)
          }

          await salvarNoBancoBatch(dadosAgregados)
          dadosAgregados.clear()

          console.log(`Arquivo ${csvPath} processado e salvo com sucesso.`)
          resolve()
        } catch (err) {
          reject(err)
        }
      })
      .on('error', (err) => {
        console.error(`Erro ao processar o arquivo ${csvPath}:`, err.message)
        reject(err)
      })
  })
}

async function processarArquivo (url) {
  const fileName = path.basename(url)
  const zipPath = path.join(__dirname, fileName)
  let csvPath = null

  try {
    console.log(`\n=== Iniciando processamento do arquivo ${fileName} ===`)

    console.log(`Baixando arquivo: ${fileName}`)
    await downloadFile(url, zipPath)

    console.log(`Extraindo arquivo: ${fileName}`)
    csvPath = await extractCSV(zipPath, csvDir)

    console.log(`Removendo arquivo ZIP: ${fileName}`)
    await deleteFile(zipPath)

    console.log('Processando os dados do CSV...')
    await processarCSV(csvPath)

    console.log('Removendo arquivo CSV...')
    await deleteFile(csvPath)

    console.log(`\n=== Arquivo ${fileName} completamente processado ===\n`)
  } catch (error) {
    console.error(`Erro ao processar o arquivo ${fileName}:`, error)

    try {
      if (fs.existsSync(zipPath)) {
        await deleteFile(zipPath)
      }
      if (csvPath && fs.existsSync(csvPath)) {
        await deleteFile(csvPath)
      }
    } catch (cleanupError) {
      console.error('Erro ao limpar arquivos:', cleanupError)
    }
    throw error
  }
}

async function processarTodosArquivos () {
  let arquivosProcessados = 0
  const totalArquivos = urls.length

  try {
    for (const url of urls) {
      try {
        await processarArquivo(url)
        arquivosProcessados++
        console.log(`\nProgresso: ${arquivosProcessados}/${totalArquivos} arquivos processados`)
      } catch (error) {
        console.error(`Falha ao processar URL: ${url}`, error)
      }
    }
    console.log('\nProcessamento de todos os arquivos concluído!')
  } catch (err) {
    console.error('Erro durante o processamento:', err)
  } finally {
    connection.end(() => {
      console.log('Conexão com o banco de dados encerrada.')
      process.exit(0)
    })
  }
}

processarTodosArquivos()
