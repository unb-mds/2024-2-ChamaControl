import fs from 'fs';
import csv from 'csv-parser';
import connection from '../config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvDir = path.join(__dirname, 'extrato');
const dadosBatch = [];

function obterRegiao(estado) {
    const estadosParaRegioes = {
        'ACRE': 'Norte',
        'AMAPÁ': 'Norte',
        'AMAZONAS': 'Norte',
        'PARÁ': 'Norte',
        'RONDÔNIA': 'Norte',
        'RORAIMA': 'Norte',
        'TOCANTINS': 'Norte',
        'ALAGOAS': 'Nordeste',
        'BAHIA': 'Nordeste',
        'CEARÁ': 'Nordeste',
        'MARANHÃO': 'Nordeste',
        'PARAÍBA': 'Nordeste',
        'PERNAMBUCO': 'Nordeste',
        'PIAUÍ': 'Nordeste',
        'RIO GRANDE DO NORTE': 'Nordeste',
        'SERGIPE': 'Nordeste',
        'DISTRITO FEDERAL': 'Centro-Oeste',
        'GOIÁS': 'Centro-Oeste',
        'MATO GROSSO': 'Centro-Oeste',
        'MATO GROSSO DO SUL': 'Centro-Oeste',
        'ESPÍRITO SANTO': 'Sudeste',
        'MINAS GERAIS': 'Sudeste',
        'RIO DE JANEIRO': 'Sudeste',
        'SÃO PAULO': 'Sudeste',
        'PARANÁ': 'Sul',
        'RIO GRANDE DO SUL': 'Sul',
        'SANTA CATARINA': 'Sul'
    };

    return estadosParaRegioes[estado] || 'Desconhecida';
}

function salvarNoBancoBatch(dadosBatch) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO focos (foco_id, lat, lon, data_pas, pais, estado, municipio, bioma, regiao, ano) VALUES ?';
        connection.query(query, [dadosBatch], (err) => {
            if (err) {
                console.error('Erro ao salvar no banco de dados em massa:', err.message);
                return reject(err);
            }
            console.log(`${dadosBatch.length} registros salvos com sucesso.`);
            resolve();
        });
    });
}

async function processarCSV(csvPath) {
    console.log(`Processando arquivo: ${csvPath}`);
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(csvPath)
            .pipe(csv())
            .on('data', (row) => {
                const valores = [
                    row.foco_id,
                    parseFloat(row.lat),
                    parseFloat(row.lon),
                    row.data_pas,
                    row.pais,
                    row.estado,
                    row.municipio,
                    row.bioma,
                    obterRegiao(row.estado),
                    parseInt(row.data_pas.slice(0, 4), 10)
                ];

                if (valores.length === 10) {
                    dadosBatch.push(valores);

                    if (dadosBatch.length >= 17000) {
                        stream.pause();
                        salvarNoBancoBatch(dadosBatch)
                            .then(() => {
                                dadosBatch.length = 0;
                                stream.resume();
                            })
                            .catch(reject);
                    }
                }
            })
            .on('end', async () => {
                if (dadosBatch.length > 0) {
                    await salvarNoBancoBatch(dadosBatch);
                }
                console.log(`Arquivo ${csvPath} processado com sucesso.`);
                dadosBatch.length = 0;
                resolve();
            })
            .on('error', (err) => {
                console.error(`Erro ao processar o arquivo ${csvPath}:`, err.message);
                reject(err);
            });
    });
}

async function apagarArquivos() {
    try {
        const files = fs.readdirSync(csvDir);
        for (const file of files) {
            const filePath = path.join(csvDir, file);
            fs.unlinkSync(filePath); // Remove o arquivo
            console.log(`Arquivo ${file} apagado com sucesso.`);
        }
        console.log('Todos os arquivos foram apagados da pasta.');
    } catch (err) {
        console.error('Erro ao apagar arquivos:', err.message);
    }
}

async function processarArquivosSequencialmente() {
    try {
        const files = fs.readdirSync(csvDir).filter((file) => file.endsWith('.csv'));

        for (const file of files) {
            const csvPath = path.join(csvDir, file);
            await processarCSV(csvPath);
        }

        console.log('Todos os arquivos CSV foram processados.');
        await apagarArquivos();
    } catch (err) {
        console.error('Erro ao processar os arquivos CSV:', err.message);
    } finally {
        connection.end();
    }
}

processarArquivosSequencialmente();