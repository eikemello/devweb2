const { getAtivoTodos, getEmprestimo  } = require('../models/home');
const logger = require('../../config/logger');

module.exports.homeListar = function (app, req, res) {
    getAtivoTodos(app.config.dbServer(), function (error, result) {
        if (error) {
            logger.log({
                level: 'error',
                message: error.message,
                timestamp: Date.now()
            });
            res.send("Problemas com a conexão: " + error.message);
        } else {
            const result_ativo = result;
            getEmprestimo(app.config.dbServer(), function (error, result) {
                if (error) {
                    logger.log({
                        level: 'error',
                        message: error.message,
                        timestamp: Date.now()
                    });
                    res.send("Problemas com a conexão: " + error.message);
                } else {
                    const result_emprestimo = result;
                    console.log(result_emprestimo);
                    res.render('home.ejs', { ativo: result_ativo, emprestimo: result_emprestimo });
                }
            });
        }
    });
}

