var url = require("url");


module.exports = {
    registrarAtivoController: function (app, req, res) {
        console.log("[registrarAtivoController]");
        res.render('../views/ativo/registrar.ejs', { errors: null });
    },
    salvarAtivoController: function (app, req, res) {
        console.log("[registrarAtivoController]");
        let ativo = req.body;
        let connection = app.config.dbServer();
        console.log("[controller salvarAtivo obra > ", ativo);
        ativo = {
            tipo: ativo.tipo,
            marca: ativo.marca,
            modelo: ativo.modelo,
            serial_number: ativo.serial_number,
            disponibilidade: "Disponível",//se esta cadastrando o primeiro responsável é sempre o estoque
            desgaste: ativo.desgaste
        }
        setObrasDeArte(ativo, connection, function (error, result) {
            res.redirect('/');
        });
    },
    pesquisarAtivoController: function (app, req, res) {
        console.log("[pesquisarAtivoController]");
        res.render('../views/ativo/pesquisar.ejs', { errors: null, ativo: { tipo: '', marca: '', modelo: '', desgaste: '' } });
    },
    removerAtivoController: function (app, req, res) {
        console.log("[removerAtivoController]");
        res.render('../views/ativo/remover.ejs');
        /* setDeletarAtivo(ativo, connection, function (error, result) {
            if(result.affectedRows > 0){
                res.render('ativo.ejs', {ativo: ativo});
                homeListar(app, req, res);
            } else {
                const strResult = JSON.stringify(result);
                res.render('error.ejs', {error: 'Nao deletado! Provável ID inexistente. ', reuslt: strResult});                    
            }
        }); */
    },
    atualizarAtivoController: function (app, req, res) {
        console.log("[atualizarAtivoController]");
            /* var q = url.parse(req.url, true);
            let connection = app.config.dbServer();
            obra = {
                id_ativo: q.query['id'],
            } */
            console.log("[controller atualizarAtivo] > ");
            res.render('../views/ativo/atualizar.ejs', { errors: null });
            /* getObra(obra, connection, function (error, result) {
                if(result != 0 & error == null){
                    res.render('obra.ejs', {obra: result});
                } else {
                    const strResult = JSON.stringify(result);
                    res.render('error.ejs', {error: 'ID de pesquisa '+obra.id+' não encontado! ', result: strResult});                    
                }
            }); */
    },
} 