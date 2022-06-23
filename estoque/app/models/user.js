var querysql = null;
module.exports = {
    criaUsusario: function (user, connection, callback) {
        querysql = `INSERT INTO estoque.usuarios (nome, email, password_user) VALUES ("${user.nome}","${user.email}", "${user.password_user}");`;
        connection.query(querysql, callback);
    },
    validaUsuario: function (user, connection, callback) {
        querysql = `SELECT * FROM estoque.usuarios WHERE email = "${user.email}" AND password_user = "${user.password_user}";`;
        connection.query(querysql, callback);
    },
}