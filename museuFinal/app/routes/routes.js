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
            try {
                res.render('./ativo/registrar.ejs', { errors: null });
            } catch (error) {
                res.render('error.ejs', { error: 'Erro ao carregar página de registro de ativos: ' + error });
            }
        });
    },
    salvarAtivo: function (app) {
        app.post('/ativo/salvar', function (req, res) {
            try {
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
            } catch (error) {
                res.render('error.ejs', { error: 'Erro ao registrar ativo: ' + error });
            }
        });
    },
    pesquisarAtivo: function (app) {
        app.get('/ativo/pesquisar', function (req, res) {
            try {
                res.render('./ativo/pesquisar.ejs', { errors: null, ativo: { tipo: '', marca: '', modelo: '', desgaste: '' } });
            } catch (error) {
                res.render('error.ejs', { error: 'Erro ao carregar página de pesquisa de ativos: ' + error });
            }
        });
    },
    atualizarAtivo: function (app) {
        app.get('/ativo/atualizar', function (req, res) {
            try {
                /* var q = url.parse(req.url, true);
                let connection = app.config.dbServer();
                obra = {
                    id_ativo: q.query['id'],
                } */
                console.log("[controller atualizarAtivo] > ");
                res.render('./ativo/atualizar.ejs', { errors: null });
                /* getObra(obra, connection, function (error, result) {
                    if(result != 0 & error == null){
                        res.render('obra.ejs', {obra: result});
                    } else {
                        const strResult = JSON.stringify(result);
                        res.render('error.ejs', {error: 'ID de pesquisa '+obra.id+' não encontado! ', result: strResult});                    
                    }
                }); */
            } catch (error) {
                res.render('error.ejs', { error: 'Erro ao carregar página de atualização de ativos: ' + error });
            }
        });
    },
    removerAtivo: function (app) {
        app.get('/ativo/remover', function (req, res) {
            try {
                console.log("[controller removerAtivo] > ");
                res.render('./ativo/remover.ejs');
                /* setDeletarAtivo(ativo, connection, function (error, result) {
                    if(result.affectedRows > 0){
                        res.render('ativo.ejs', {ativo: ativo});
                        homeListar(app, req, res);
                    } else {
                        const strResult = JSON.stringify(result);
                        res.render('error.ejs', {error: 'Nao deletado! Provável ID inexistente. ', reuslt: strResult});                    
                    }
                }); */
            } catch (error) {
                res.render('error.ejs', { error: 'Erro ao carregar página de remoção de ativos: ' + error });
            }
        });
    },
    //-----------------rotas transferência---------------------
    atualizarTransferencia: function (app) {
        app.get('/transferencia/atualizar', function (req, res) {
            try {
                res.render('./transferencia/atualizar.ejs', { errors: null, transfer: { tipo: '', marca: '', modelo: '', desgaste: '' } });
            } catch (error) {
                res.render('error.ejs', { error: 'Erro ao carregar página de atualização de transferência: ' + error });
            }
        });
    },
    pesquisarTransferencia: function (app) {
        app.get('/transferencia/pesquisar', function (req, res) {
            try {
                res.render('./transferencia/pesquisar.ejs', { errors: null, transfer: { tipo: '', marca: '', modelo: '', desgaste: '' } });
            } catch (error) {
                res.render('error.ejs', { error: 'Erro ao carregar página de pesquisa de transferências: ' + error });
            }
        });
    },
    registrarTransferencia: function (app) {
        app.get('/transferencia/registrar', function (req, res) {
            try {
                res.render('./transferencia/registrar.ejs', { errors: null, transfer: { tipo: '', marca: '', modelo: '', desgaste: '' } });
            } catch (error) {
                res.render('error.ejs', { error: 'Erro ao carregar página de registro de transferência: ' + error });
            }
        });

    },
    removerTransferencia: function (app) {
        app.get('/transferencia/remover', function (req, res) {
            try {
                var q = url.parse(req.url, true);
                let connection = app.config.dbServer();
                transfer = {
                    id_transfererencia: q.query['id'],
                }
                console.log("[controller pesquisarAtivo] > ", transfer);
                getObra(transfer, connection, function (error, result) {
                    if (result != 0 & error == null) {
                        res.render('./transferencia/remover.ejs', { transfer: result });
                    } else {
                        const strResult = JSON.stringify(result);
                        res.render('error.ejs', { error: 'ID de pesquisa ' + transfer.id_ativo + ' não encontado! ', result: strResult });
                    }
                });
            } catch (error) {
                res.render('error.ejs', { error: 'Erro ao carregar página de remoção de transferência: ' + error });
            }
        });
    },
    listarObra: function (app) {
        app.get('/ativo/listar', function (req, res) {
            try {
                let connection = app.config.dbServer();
                console.log("[controller listarAtivos] > ");
                getTodasObras(connection, function (error, result) {
                    if (result != 0 & error == null) {
                        res.render('obra.ejs', { obra: result });
                    } else {
                        const strResult = JSON.stringify(result);
                        res.render('error.ejs', { error: 'ID de pesquisa ' + obra.id + ' não encontado! ', result: strResult });
                    }
                });
            } catch (error) {
                res.render('error.ejs', { error: 'Erro ao carregar página de listagem de ativos: ' + error });
            }
        });
    }


}