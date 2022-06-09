const { getAtivo, getEmprestimo, getTransferencia } = require('../../models/home');
const logger = require('../../../config/logger');

module.exports.homeListar = function (app, req, res) {
    let connection = app.config.dbServer();
    getAtivo(connection, function (error, result) {
        if (error) {
            logger.log({
                level: 'error',
                message: error.message,
                timestamp: Date.now()
            });
            res.send("Problemas com a conexão: " +error.message);
        } else {
            const result_ativo = result;
            getEmprestimo(connection, function (error, result) {
                if (error) {
                    logger.log({
                        level: 'error',
                        message: error.message,
                        timestamp: Date.now()
                    });
                    res.send("Problemas com a conexão: " + error.message);
                } else {
                    const result_emprestimo = result;
                    getTransferencia(connection, function (error, result) {
                        if (error) {
                            logger.log({
                                level: 'error',
                                message: error.message,
                                timestamp: Date.now()
                            });
                            res.send("Problemas com a conexão: " + error.message);
                        } else {
                            res.render('home.ejs', { ativo: result_ativo, emprestimo: result_emprestimo, transferencia: result});
                        }
                    });
                }
            });
        }
    });
}

