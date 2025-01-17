import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js'
import connection from './config/db.js';
import cors from 'cors';

const app = express();


app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', routes);


connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {

    if (err) throw err;
    console.log('Banco de dados funcionando se = 2:', rows[0].solution);
});

app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});
