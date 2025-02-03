const connection = require('../../config/db.js')

class FocusRepository {
  async getCountByYear (ano) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT sum(quantidade_focos) FROM focos WHERE ano = ?'
      connection.query(query, [ano], (err, results) => {
        if (err) {
          return reject(new Error('Erro ao obter dados: ' + err.message))
        }
        resolve(results)
      })
    })
  }

  async getMonthlyFocusByEstate (month, year) {
    const query = `
            SELECT estado, sum(quantidade_focos) AS quantidade_focos, mes, ano
            FROM focos
            WHERE mes = ? AND ano = ?
            GROUP BY mes, estado
            order by estado
        `

    return new Promise((resolve, reject) => {
      connection.query(query, [month, year], (err, results) => {
        if (err) {
          reject(new Error('Erro ao obter dados: ' + err.message))
        }
        resolve(results)
      })
    })
  }

  async getFocusByRegion (year) {
    const query = `
            SELECT regiao, sum(quantidade_focos) as quantidade_focos, ano
            FROM focos
            WHERE ano = ?
            GROUP BY regiao
            order by regiao;
        `

    return new Promise((resolve, reject) => {
      connection.query(query, [year], (err, results) => {
        if (err) {
          reject(new Error('Erro ao obter dados: ' + err.message))
        }
        resolve(results)
      })
    })
  }

  async getFocusFromBiomes (year) {
    const query = `
            SELECT bioma, sum(quantidade_focos) as quantidade_focos, ano
            FROM focos
            WHERE ano = ?
            GROUP BY bioma
            order by bioma;
        `

    return new Promise((resolve, reject) => {
      connection.query(query, [year], (err, results) => {
        if (err) {
          reject(new Error('Erro ao obter dados: ' + err.message))
        }
        resolve(results)
      })
    })
  }

  async getYearFocusFromEstate (estate, year) {
    const query = `
            SELECT mes, estado, sum(quantidade_focos) as quantidade_focos, ano
            FROM focos
            WHERE ano = ? AND estado = ?
            GROUP BY mes
            ORDER BY mes;
        `

    return new Promise((resolve, reject) => {
      connection.query(query, [year, estate], (err, results) => {
        if (err) {
          reject(new Error('Erro ao obter dados: ' + err.message))
        }
        resolve(results)
      })
    })
  }

  async getAllYearsFocusFromEstate (estate) {
    const query = `
            SELECT mes, estado, sum(quantidade_focos) as quantidade_focos, ano
            FROM focos
            WHERE estado = ?
            GROUP BY mes, ano
            ORDER BY mes;
        `

    return new Promise((resolve, reject) => {
      connection.query(query, [estate], (err, results) => {
        if (err) {
          reject(new Error('Erro ao obter dados: ' + err.message))
        }
        resolve(results)
      })
    })
  }

  async getDailyFocusByEstateMonth (estate, month) {
    const query = `
            SELECT dia, mes, estado, SUM(quantidade_focos) AS quantidade_focos, ano
            FROM focosDiarios
            WHERE estado = ? and mes = ? and ano = 2025
            GROUP BY dia, ano
            ORDER BY dia;
        `

    return new Promise((resolve, reject) => {
      connection.query(query, [estate, month], (err, results) => {
        if (err) {
          reject(new Error('Erro ao obter dados: ' + err.message))
        }
        resolve(results)
      })
    })
  }

  async getDailyFocusFromEstatesByMonth (month) {
    const query = `
            SELECT mes, estado, SUM(quantidade_focos) AS quantidade_focos, ano
            FROM focosDiarios
            WHERE mes = ? and ano = 2025
            GROUP BY estado
            ORDER BY estado;
        `

    return new Promise((resolve, reject) => {
      connection.query(query, [month], (err, results) => {
        if (err) {
          reject(new Error('Erro ao obter dados: ' + err.message))
        }
        resolve(results)
      })
    })
  }
}

module.exports = FocusRepository
