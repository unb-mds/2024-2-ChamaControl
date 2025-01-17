import fs from 'fs';
import path from 'path';
import axios from 'axios';
import unzipper from 'unzipper';
import { fileURLToPath } from 'url';

const downloadFile = async (url, outputPath) => {
    try {
        const response = await axios.get(url, { responseType: 'stream' });
        const writer = fs.createWriteStream(outputPath);

        return new Promise((resolve, reject) => {
            response.data.pipe(writer);
            writer.on('finish', () => {
                console.log('Arquivo baixado com sucesso para:', outputPath);
                resolve(outputPath);
            });
            writer.on('error', (error) => {
                console.error('Erro ao escrever o arquivo:', error);
                reject(error);
            });
        });
    } catch (error) {
        console.error('Erro ao baixar o arquivo:', error);
        throw error;
    }
};

const extractCSV = async (zipFilePath, outputDir) => {
    try {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        return new Promise((resolve, reject) => {
            fs.createReadStream(zipFilePath)
                .pipe(unzipper.Parse())
                .on('entry', (entry) => {
                    const entryName = entry.path;

                    if (entryName.endsWith('.csv')) {
                        const filePath = path.join(outputDir, entryName);
                        entry.pipe(fs.createWriteStream(filePath))
                            .on('finish', () => {
                                console.log(`Arquivo CSV '${entryName}' extraído para: ${filePath}`);
                            })
                            .on('error', (error) => {
                                console.error(`Erro ao extrair o arquivo CSV '${entryName}':`, error);
                                reject(error);
                            });
                    } else {
                        entry.autodrain();
                    }
                })
                .on('close', () => {
                    console.log('Extracção do arquivo ZIP completa.');
                    resolve();
                })
                .on('error', (error) => {
                    console.error('Erro ao extrair o arquivo ZIP:', error);
                    reject(error);
                });
        });
    } catch (error) {
        console.error('Erro ao processar o arquivo:', error);
        throw error;
    }
};

const deleteFile = async (filePath) => {
    try {
        fs.unlinkSync(filePath);
        console.log(`Arquivo ZIP '${filePath}' deletado com sucesso.`);
    } catch (error) {
        console.error(`Erro ao deletar o arquivo ZIP '${filePath}':`, error);
    }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    'https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_sat_ref/focos_br_ref_2023.zip'
];

const outputDir = path.join(__dirname, 'extrato');

for (const fileUrl of urls) {
    const fileName = path.basename(fileUrl);
    const outputPath = path.join(__dirname, fileName);

    try{
        console.log(`Baixando arquivo de: ${fileUrl}`);
        await downloadFile(fileUrl, outputPath);

        console.log(`Baixando arquivo de: ${fileUrl}`);
        await extractCSV(outputPath, outputDir);

        console.log(`Baixando arquivo de: ${fileUrl}`);
        await deleteFile(outputPath);
    } catch (error) {
        console.error(`Erro ao processar o arquivo: ${fileUrl}`, error);
    }
}