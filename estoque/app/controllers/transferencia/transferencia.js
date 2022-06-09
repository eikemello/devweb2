var url = require("url");

module.exports = {
    registrarTransferenciaController: function (app, req, res) {
        console.log("[registrarTransferenciaController]")
        res.render('../views/transferencia/registrar.ejs', { errors: null, transfer: { tipo: '', marca: '', modelo: '', desgaste: '' } });
    },
    salvarTransferenciaController: function (app, req, res) {
        console.log("[salvarTransferenciaController]")
        let ativo = req.body;
        let connection = app.config.dbServer();
        console.log("[controller salvartransferencia > ", ativo);
        ativo = {
            tipo: ativo.tipo,
            marca: ativo.marca,
            modelo: ativo.modelo,
            serial_number: ativo.serial_number,
            disponibilidade: "Disponível",//se esta cadastrando o primeiro responsável é sempre o estoque
            desgaste: ativo.desgaste
        }
        /* setAtivo(ativo, connection, function (error, result) {
            res.redirect('/');
        }); */
    },
    pesquisarTransferenciaController: function (app, req, res) {
        console.log("[pesquisarTransferenciaController]")
        res.render('./transferencia/pesquisar.ejs', { errors: null, transfer: { tipo: '', marca: '', modelo: '', desgaste: '' } });
    },
    removerTransferenciaController: function (app, req, res) {
        console.log("[removerTransferenciaController]")
        res.render('../views/transferencia/remover.ejs');
        /* var q = url.parse(req.url, true);
                let connection = app.config.dbServer();
                transfer = {
                    id_transfererencia: q.query['id'],
                }
                console.log("[controller pesquisarAtivo] > ", transfer);
                getAtivo(transfer, connection, function (error, result) {
                    if (result != 0 & error == null) {
                        res.render('./transferencia/remover.ejs', { transfer: result });
                    } else {
                        const strResult = JSON.stringify(result);
                        res.render('error.ejs', { error: 'ID de pesquisa ' + transfer.id_ativo + ' não encontado! ', result: strResult });
                    }
                }); */
        /* setDeletarAtivo(transferencia, connection, function (error, result) {
            if(result.affectedRows > 0){
                res.render('transferencia.ejs', {transferencia: transferencia});
                homeListar(app, req, res);
            } else {
                const strResult = JSON.stringify(result);
                res.render('error.ejs', {error: 'Nao deletado! Provável ID inexistente. ', reuslt: strResult});                    
            }
        }); */
    },
    atualizarTransferenciaController: function (app, req, res) {
        console.log("[atualizarTransferenciaController]")
            /* var q = url.parse(req.url, true);
            let connection = app.config.dbServer();
            ativo = {
                id_ativo: q.query['id'],
            } */
            res.render('../views/transferencia/atualizar.ejs', { errors: null });
            /* getAtivo(ativo, connection, function (error, result) {
                if(result != 0 & error == null){
                    res.render('ativo.ejs', {ativo: result});
                } else {
                    const strResult = JSON.stringify(result);
                    res.render('error.ejs', {error: 'ID de pesquisa '+ativo.id_ativo+' não encontado! ', result: strResult});                    
                }
            }); */
    },
} 