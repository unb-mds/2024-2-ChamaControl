import connection from '../../config/db.js'

export default class FocusRepository {

    async getCountByYear(ano) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT sum(quantidade_focos) FROM focos WHERE ano = ?';
            connection.query(query, [ano], (err, results) => {
                if (err) {
                    return reject(new Error('Erro ao obter dados: ' + err.message));
                }
                resolve(results);
            });
        });
    }

    async getMonthlyFocusByEstate(month, year) {
        const query = `
            SELECT estado, sum(quantidade_focos) AS quantidade_focos, mes, ano
            FROM focos
            WHERE mes = ? AND ano = ?
            GROUP BY mes, estado
            order by estado
        `;

        return new Promise((resolve, reject) => {
            connection.query(query, [month, year], (err, results) => {
                if (err) {
                    reject(new Error('Erro ao obter dados: ' + err.message));
                }
                resolve(results);
            });
        });
    }

    async getMonthlyFocusByRegion(month, year) {
        const query = `
            SELECT regiao, sum(quantidade_focos) as quantidade_focos, mes, ano
            FROM focos
            WHERE mes = ? AND ano = ?
            GROUP BY mes, regiao
            order by regiao;
        `;

        return new Promise((resolve, reject) => {
            connection.query(query, [month, year], (err, results) => {
                if (err) {
                    reject(new Error('Erro ao obter dados: ' + err.message));
                }
                resolve(results);
            });
        });
    }

    async getYearFocusFromRegion(region, year) {
        const query = `
            SELECT mes, regiao, sum(quantidade_focos) as quantidade_focos, ano
            FROM focos
            WHERE ano = ? AND regiao = ?
            GROUP BY mes
            ORDER BY mes;
        `;

        return new Promise((resolve, reject) => {
            connection.query(query, [year, region], (err, results) => {
                if (err) {
                    reject(new Error('Erro ao obter dados: ' + err.message));
                }
                resolve(results);
            });
        });
    }

    async getYearFocusFromEstate(estate, year) {
        const query = `
            SELECT mes, estado, sum(quantidade_focos) as quantidade_focos, ano
            FROM focos
            WHERE ano = ? AND estado = ?
            GROUP BY mes
            ORDER BY mes;
        `;

        return new Promise((resolve, reject) => {
            connection.query(query, [year, estate], (err, results) => {
                if (err) {
                    reject(new Error('Erro ao obter dados: ' + err.message));
                }
                resolve(results);
            });
        });
    }
}
