const { getObrasDeArteTarsila } = require('../models/tarsila.js');

module.exports.tarsilaListar = function (app, req, res) {
    let connection = app.config.dbServer();
    getObrasDeArteTarsila(connection, function (error, result) {
        if (error) {
            res.send("Problemas com a conexão!!!");
        } else {
            console.log(result);
            res.render('tarsila.ejs', { obrasdearte: result });
        }
    });
}

