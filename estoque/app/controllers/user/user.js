const crypto = require('crypto');
const Joi = require('joi');
const { criaUsusario, validaUsuario } = require('../../models/user');
let result_validate = null;

module.exports = {
    validarUsuarioController: function (app, req, res) {
        console.log("[validarUsuarioController]");
        result_validate = validarDadosAutenticaUsuario(req.body);
        if (result_validate.error) {
            return res.render('error.ejs', { error: 'Erro ao validar dados inseridos: ' + result_validate.error.details[0].message });
        } else {
            let password = req.body.password;
            let passwordCrypted = crypto.createHash("md5").update(password).digest("hex");
            var user = {
                email: req.body.email,
                password_user: passwordCrypted
            };
            validaUsuario(user, app.config.dbServer(), function (error, result) {
                if (error) {
                    res.render('../views/error.ejs', { error: "Erro ao validar usuário: " + error });
                } else if (result == null) {
                    res.send("Problemas na autenticação");
                } else {
                    req.session.authorized = true;
                    res.redirect('/');
                }
            });
        }
    },
    criarUsuarioController: function (app, req, res) {
        console.log("[criarUsuarioController]");
        result_validate = validarDadosCriarUsuario(req.body);

        if (result_validate.error) {
            return res.render('error.ejs', { error: 'Erro ao validar dados inseridos: ' + result_validate.error.details[0].message });
        } else {
            let password = req.body.password;
            let passwordCrypted = crypto.createHash("md5").update(password).digest("hex");
            var user = {
                nome: req.body.nome,
                email: req.body.email,
                password_user: passwordCrypted
            };
            criaUsusario(user, app.config.dbServer(), function (error, result) {
                if (error) {
                    res.redirect('../../views/error.ejs', { error: "Erro ao salvar usuário: " + error });
                } else {
                    res.render('../views/login/login.ejs');
                }
            });
        }
    },
}

const validarDadosCriarUsuario = (data) => {
    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(3).max(15).required(),
        nome: Joi.string().min(1).max(50).required(),
    });
    return schema.validate(data);
}

const validarDadosAutenticaUsuario = (data) => {
    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(3).max(15).required(),
    });
    return schema.validate(data);
}