const { setAtivo, setAtivoUpdate } = require('../../models/home');
const { getAtivo } = require('../../models/ativo');
const Joi = require('joi');

module.exports = {
    registrarAtivoController: function (app, req, res) {
        console.log("[registrarAtivoController]");
        res.render('../views/ativo/registrar.ejs', { errors: null });
    },
    salvarAtivoController: function (app, req, res) {
        const result_validate = validarDadosRegistroAtivo(req.body);
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
                res.redirect('../../views/error.ejs', { error: error });
            } else {
                res.redirect('/');
            }

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
        if (req.query['serial_number'] == '' || req.query['serial_number'] == null) {
            console.log('serial number = null');
            res.render('../views/ativo/atualizar.ejs', { ativo: null, error: null});
        } else {
            const connection = app.config.dbServer();
            console.log('serial number != null, SN: ' + req.query['serial_number']);
            ativo = { serial_number : req.query['serial_number']};
            getAtivo(ativo, connection, function (error, result) {
                if (error) {
                    console.log('erro na pesquisa atualizarAtivoController');
                    res.render('../views/error.ejs', { ativo : null, error: "Erro ao pesquisar serial number: " + error });
                } else if (result != 0 && error == null) {
                    console.log('pesquisa deu certo');
                    console.log(result);
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
                    console.log('nao encontrou o item atualizarAtivoController');
                    res.render('../views/ativo/atualizar.ejs', { ativo : null, error: 'Pesquisa pelo ativo ' + ativo.serial_number + ' não encontado!' });
                }
            });
        }
    },
    salvarAtualizaçãoAtivoController: function (app, req, res) {
        console.log("[salvarAtualizaçãoAtivoController]1");
        const result_validate = validarDadosAtualizaçãoAtivo(req.body);
        if (result_validate.error)
            return res.render('error.ejs', { error: 'Erro ao validar dados inseridos: ' + result_validate.error.details[0].message });

        console.log("[controller salvarAtivo > ", req.body);
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
                res.render('../views/error.ejs', { error: error });
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