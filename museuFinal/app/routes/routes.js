const { homeListar } = require('../controllers/home');
const { tarsilaListar } = require('../controllers/tarsila');
const { setObrasDeArte } = require('../models/home');
const { getObra, setDeletarObra, getTodasObras } = require('../models/obra');
var url = require("url");

module.exports = {
    home: function (app) {
        app.get('/', function (req, res) {
            homeListar(app, req, res);
        });
    },
    //---------------rotas ativos-------------------------
    registrarAtivo: function (app) {
        app.get('/ativo/registrar', function (req, res) {
            res.render('./ativo/registrar.ejs', { errors: null});
        });
    },
    salvarAtivo: function (app) {
        app.post('/ativo/salvar', function (req, res) {
            let obra = req.body;
            let connection = app.config.dbServer();
            console.log("[controller salvarObra obra > ", obra);
            obra = {
                tipo: obra.tipo,
                marca: obra.marca,
                modelo: obra.modelo,
                serial_number: obra.serial_number,
                disponibilidade: "Disponível",//se esta cadastrando o primeiro responsável é sempre o estoque
                desgaste: obra.desgaste
            }
            setObrasDeArte(obra, connection, function (error, result) {
                res.redirect('/');
            });
        });
    },
    pesquisarAtivo: function (app) {
        app.get('/ativo/pesquisar', function (req, res) {
            res.render('./ativo/pesquisar.ejs', { errors: null, obra: { tipo: '', marca: '', modelo: '', desgaste: ''}});
        });
    },
    atualizarAtivo: function (app) {
        app.get('/ativo/atualizar', function (req, res) {
            /* var q = url.parse(req.url, true);
            let connection = app.config.dbServer();
            obra = {
                id_ativo: q.query['id'],
            } */
            console.log("[controller atualizarAtivo] > ");
            res.render('./ativo/atualizar.ejs', { errors: null});
            /* getObra(obra, connection, function (error, result) {
                if(result != 0 & error == null){
                    res.render('obra.ejs', {obra: result});
                } else {
                    const strResult = JSON.stringify(result);
                    res.render('error.ejs', {error: 'ID de pesquisa '+obra.id+' não encontado! ', result: strResult});                    
                }
            }); */
        });
    },
    removerAtivo: function (app) {
        app.get('/ativo/remover', function (req, res) {
            console.log("[controller removerAtivo] > ");
            res.render('./ativo/remover.ejs');
            /* setDeletarObra(obra, connection, function (error, result) {
                if(result.affectedRows > 0){
                    res.render('obra.ejs', {obra: obra});
                    homeListar(app, req, res);
                } else {
                    const strResult = JSON.stringify(result);
                    res.render('error.ejs', {error: 'Nao deletado! Provável ID inexistente. ', reuslt: strResult});                    
                }
            }); */
        });
    },
    //-----------------rotas transferência---------------------
    atualizarTransferencia: function (app) {
        app.get('/transferencia/atualizar', function (req, res) {
            res.render('./transferencia/atualizar.ejs', { errors: null, obra: { tipo: '', marca: '', modelo: '', desgaste: ''}});
        });
    },
    pesquisarTransferencia: function (app) {
        app.get('/transferencia/pesquisar', function (req, res) {
            res.render('./transferencia/pesquisar.ejs', { errors: null, obra: { tipo: '', marca: '', modelo: '', desgaste: ''}});
        });
    },
    registrarTransferencia: function (app) {
        app.get('/transferencia/registrar', function (req, res) {
            res.render('./transferencia/registrar.ejs', { errors: null, obra: { tipo: '', marca: '', modelo: '', desgaste: ''}});
        });
    },
    removerTransferencia: function (app) {
        app.get('/transferencia/remover', function (req, res) {
            var q = url.parse(req.url, true);
            let connection = app.config.dbServer();
            obra = {
                id_ativo: q.query['id'],
            }
            console.log("[controller pesquisarAtivo] > ", obra);
            getObra(obra, connection, function (error, result) {
                if(result != 0 & error == null){
                    res.render('./transferencia/remover.ejs', {obra: result});
                } else {
                    const strResult = JSON.stringify(result);
                    res.render('error.ejs', {error: 'ID de pesquisa '+obra.id_ativo+' não encontado! ', result: strResult});                    
                }
            });
        });
    },
    listarObra: function (app) {
        app.get('/ativo/listar', function (req, res) {
            let connection = app.config.dbServer();
            console.log("[controller listarAtivos] > ");
            getTodasObras(connection, function (error, result) {
                if(result != 0 & error == null){
                    res.render('obra.ejs', {obra: result});
                } else {
                    const strResult = JSON.stringify(result);
                    res.render('error.ejs', {error: 'ID de pesquisa '+obra.id+' não encontado! ', result: strResult});                    
                }
            });
        });
    }
}