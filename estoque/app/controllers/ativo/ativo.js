const { setAtivo, setAtivoUpdate } = require('../../models/home');
const { getAtivo, removeAtivo } = require('../../models/ativo');
const Joi = require('joi');
let result_validate = null;
module.exports = {
    registrarAtivoController: function (app, req, res) {
        console.log("[registrarAtivoController]");
        res.render('../views/ativo/registrar.ejs', { errors: null });
    },
    salvarAtivoController: function (app, req, res) {
        result_validate = validarDadosRegistroAtivo(req.body);
        if (result_validate.error)
            return res.render('error.ejs', { error: 'Erro ao validar dados inseridos: ' + result_validate.error.details[0].message });

        console.log("[controller salvarAtivo > ", req.body);
        ativo = {
            tipo: req.body.tipo,
            marca: req.body.marca,
            modelo: req.body.modelo,
            serial_number: req.body.serial_number,
            disponibilidade: "Disponível",//se esta cadastrando o primeiro responsável é sempre o estoque, então, disponível.
            desgaste: req.body.desgaste
        }
        setAtivo(ativo, app.config.dbServer(), function (error, result) {
            if (error) {
                res.redirect('../../views/error.ejs', { error: "Erro ao salvar dados: " + error });
            } else {
                res.redirect('/');
            }

        });
    },
    pesquisarAtivoController: function (app, req, res) {
        console.log("[pesquisarAtivoController]");
        res.render('../views/ativo/pesquisar.ejs', { error: null, ativo: null });
    },
    removerAtivoController: function (app, req, res) {
        console.log("[removerAtivoController]");
        if (req.query['serial_number'] == '' || req.query['serial_number'] == null) {
            res.render('../views/ativo/remover.ejs', { error: null, ativo: null });
        } else {
            ativo = { serial_number: req.query['serial_number'] };
            getAtivo(ativo, app.config.dbServer(), function (error, result) {
                if (error) {
                    res.render('../views/error.ejs', { ativo: null, error: "Erro ao pesquisar serial number: " + error });
                } else if (result != 0 && error == null) {
                    ativo = JSON.parse(JSON.stringify(result));
                    ativo = {
                        id_ativo: ativo[0].id_ativo,
                        tipo: ativo[0].tipo,
                        marca: ativo[0].marca,
                        modelo: ativo[0].modelo,
                        serial_number: ativo[0].serial_number,
                        disponibilidade: ativo[0].disponibilidade,
                        desgaste: ativo[0].desgaste,
                    };
                    res.render('../views/ativo/remover.ejs', { error: null, ativo: ativo });
                } else {
                    res.render('../views/ativo/remover.ejs', { ativo: null, error: 'Pesquisa pelo ativo ' + ativo.serial_number + ' não encontado!' });
                }
            });
        }
    },
    removerAtivoControllerPOST: function (app, req, res) {
        console.log("[removerAtivoControllerPOST]");
        removeAtivo(req.body, app.config.dbServer(), function (error, result) {
            if (error) {
                res.render('../views/error.ejs', { error: "Erro ao remover ativo: " + error });
            } else {
                res.redirect('/');
            }
        });
        return;
    },
    atualizarAtivoController: function (app, req, res) {
        console.log("[atualizarAtivoController]");
        if (req.query['serial_number'] == '' || req.query['serial_number'] == null) {
            res.render('../views/ativo/atualizar.ejs', { ativo: null, error: null });
        } else {
            ativo = { serial_number: req.query['serial_number'] };
            getAtivo(ativo, app.config.dbServer(), function (error, result) {
                if (error) {
                    res.render('../views/error.ejs', { ativo: null, error: "Erro ao pesquisar serial number: " + error });
                } else if (result != 0 && error == null) {
                    ativo = JSON.parse(JSON.stringify(result));
                    ativo = {
                        id_ativo: ativo[0].id_ativo,
                        tipo: ativo[0].tipo,
                        marca: ativo[0].marca,
                        modelo: ativo[0].modelo,
                        serial_number: ativo[0].serial_number,
                        disponibilidade: ativo[0].disponibilidade,
                        desgaste: ativo[0].desgaste,
                        registrado_em: ativo[0].registrado_em
                    };
                    res.render('../views/ativo/atualizar.ejs', { ativo: ativo, error: null });
                } else {
                    res.render('../views/ativo/atualizar.ejs', { ativo: null, error: 'Pesquisa pelo ativo ' + ativo.serial_number + ' não encontado!' });
                }
            });
        }
    },
    salvarAtualizaçãoAtivoController: function (app, req, res) {
        console.log("[salvarAtualizaçãoAtivoController]1");
        result_validate = validarDadosAtualizaçãoAtivo(req.body);
        if (result_validate.error)
            return res.render('error.ejs', { error: 'Erro ao validar dados inseridos: ' + result_validate.error.details[0].message });

        ativo = {
            id_ativo: req.body.id_ativo,
            tipo: req.body.tipo,
            marca: req.body.marca,
            modelo: req.body.modelo,
            serial_number: req.body.serial_number,
            disponibilidade: req.body.disponibilidade,
            desgaste: req.body.desgaste
        }
        setAtivoUpdate(ativo, app.config.dbServer(), function (error, result) {
            if (error) {
                res.render('../views/error.ejs', { error: "Erro ao atualizar dados: " + error });
            } else {
                res.redirect('/');
            }
        });
    },
}

const validarDadosRegistroAtivo = (data) => {
    const schema = Joi.object({
        tipo: Joi.string().min(1).max(50).required(),
        marca: Joi.string().min(1).max(25).required(),
        modelo: Joi.string().min(1).max(30).required(),
        serial_number: Joi.string().min(1).max(50).required(),
        desgaste: Joi.string().min(1).max(20).required(),
    });
    return schema.validate(data);
}

const validarDadosAtualizaçãoAtivo = (data) => {
    const schema = Joi.object({
        id_ativo: Joi.number().min(1).required(),
        tipo: Joi.string().min(1).max(50).required(),
        marca: Joi.string().min(1).max(25).required(),
        modelo: Joi.string().min(1).max(30).required(),
        serial_number: Joi.string().min(1).max(50).required(),
        desgaste: Joi.string().min(1).max(20).required(),
        disponibilidade: Joi.string().min(1).max(20).required(),
    });
    return schema.validate(data);
}