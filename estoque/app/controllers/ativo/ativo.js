const { setAtivo } = require('../../models/home')
const Joi = require('joi');

module.exports = {
    registrarAtivoController: function (app, req, res) {
        console.log("[registrarAtivoController]");
        res.render('../views/ativo/registrar.ejs', { errors: null });
    },
    salvarAtivoController: function (app, req, res) {
        const result_validate = validateData(req.body);
        if (result_validate.error)
            return res.render('error.ejs', { error: 'Erro ao registrar ativo: ' + result_validate.error.details[0].message });

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
        /* var q = url.parse(req.url, true);
        let connection = app.config.dbServer();
        ativo = {
            id_ativo: q.query['id'],
        } */
        console.log("[controller atualizarAtivo] > ");
        res.render('../views/ativo/atualizar.ejs', { errors: null });
        /* getAtivo(ativo, connection, function (error, result) {
            if(result != 0 & error == null){
                res.render('autalizar.ejs', {ativo: result});
            } else {
                const strResult = JSON.stringify(result);
                res.render('error.ejs', {error: 'ID de pesquisa '+ativo.id_ativo+' não encontado! ', result: strResult});                    
            }
        }); */
    },
}

const validateData = (data) => {
    const schema = Joi.object({
        tipo: Joi.string().min(1).max(50).required(),
        marca: Joi.string().min(1).max(25).required(),
        modelo: Joi.string().min(1).max(30).required(),
        serial_number: Joi.string().min(1).max(50).required(),
        desgaste: Joi.string().min(1).max(20).alphanum().required(),
    });
    return schema.validate(data);
}