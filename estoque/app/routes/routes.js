const { homeListar } = require('../controllers/home/home');

const { registrarAtivoController, salvarAtivoController, atualizarAtivoController,
    pesquisarAtivoController, salvarAtualizaçãoAtivoController,
    removerAtivoController, removerAtivoControllerPOST } = require('../controllers/ativo/ativo');

const { registrarTransferenciaController, salvarTransferenciaController,
    pesquisarTransferenciaController, atualizarTransferenciaController,
    removerTransferenciaController } = require('../controllers/transferencia/transferencia');

module.exports = {
    homeRoute: function (app) {
        app.get('/', function (req, res) {
            homeListar(app, req, res);
        });
    },

    //---------------rotas ativos-------------------------
    registrarAtivoRoute: function (app) {
        app.get('/ativo/registrar', function (req, res) {
            try {
                registrarAtivoController(app, req, res);
            } catch (error) {
                res.render('error.ejs', { error: 'Erro ao carregar página de registro de ativos: ' + error });
            }
        });
    },

    salvarAtivoRoute: function (app) {
        app.post('/ativo/salvar', function (req, res) {
            try {
                salvarAtivoController(app, req, res);
            } catch (error) {
                res.render('error.ejs', { error: 'Erro ao registrar ativo: ' + error });
            }
        });
    },

    pesquisarAtivoRoute: function (app) {
        app.get('/ativo/pesquisar', function (req, res) {
            try {
                pesquisarAtivoController(app, req, res);
            } catch (error) {
                res.render('error.ejs', { error: 'Erro ao carregar página de pesquisa de ativos: ' + error });
            }
        });
    },

    atualizarAtivoRoute: function (app) {
        app.get('/ativo/atualizar', function (req, res) {
            try {
                atualizarAtivoController(app, req, res);
            } catch (error) {
                res.render('error.ejs', { error: 'Erro ao carregar página de atualização de ativos: ' + error });
            }
        });
    },

    salvarAtualizaçãoAtivoRoute: function (app) {
        app.post('/ativo/atualizar/salvar', function (req, res) {
            try {
                salvarAtualizaçãoAtivoController(app, req, res);
            } catch (error) {
                res.render('error.ejs', { error: 'Erro ao carregar página de atualização de ativos: ' + error });
            }
        });
    },
    removerAtivoRouteGET: function (app) {
        app.get('/ativo/remover', function (req, res) {
            try {
                removerAtivoController(app, req, res);
            } catch (error) {
                res.render('error.ejs', { error: 'Erro ao carregar página de remoção de ativos: ' + error });
            }
        });
    },
    removerAtivoRoutePOST: function (app) {
        app.post('/ativo/remover/remover', function (req, res) {
            try {
                removerAtivoControllerPOST(app, req, res);
            } catch (error) {
                res.render('error.ejs', { error: 'Erro ao carregar página de remoção de ativos: ' + error });
            }
        });
    },

    //-----------------rotas transferência---------------------
    atualizarTransferenciaRoute: function (app) {
        app.get('/transferencia/atualizar', function (req, res) {
            try {
                atualizarTransferenciaController(app, req, res)
            } catch (error) {
                res.render('error.ejs', { error: 'Erro ao carregar página de atualização de transferência: ' + error });
            }
        });
    },

    pesquisarTransferenciaRoute: function (app) {
        app.get('/transferencia/pesquisar', function (req, res) {
            try {
                pesquisarTransferenciaController(app, req, res);
            } catch (error) {
                res.render('error.ejs', { error: 'Erro ao carregar página de pesquisa de transferências: ' + error });
            }
        });
    },

    registrarTransferenciaRoute: function (app) {
        app.get('/transferencia/registrar', function (req, res) {
            try {
                registrarTransferenciaController(app, req, res);
            } catch (error) {
                res.render('error.ejs', { error: 'Erro ao carregar página de registro de transferência: ' + error });
            }
        });

    },

    removerTransferenciaRoute: function (app) {
        app.get('/transferencia/remover', function (req, res) {
            try {
                removerTransferenciaController(app, req, res);
            } catch (error) {
                res.render('error.ejs', { error: 'Erro ao carregar página de remoção de transferência: ' + error });
            }
        });
    },
    /* listarObraRoute: function (app) {
        app.get('/ativo/listar', function (req, res) {
            try {
                let connection = app.config.dbServer();
                console.log("[controller listarAtivos] > ");
                listarAtivos(connection, function (error, result) {
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
    } */
}