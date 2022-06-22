var querysql = null;
module.exports = {
    getAtivo: function (ativo, connection, callback) {
        querysql = `SELECT id_ativo, marca, tipo, modelo, serial_number, desgaste, registrado_em, disponibilidade FROM ativo WHERE serial_number = "${ativo.serial_number}";`;
        connection.query(querysql, callback);
    },
    removeAtivo: function (ativo, connection, callback) {
        querysql = `DELETE FROM estoque.ativo WHERE id_ativo = "${ativo.id_ativo}";`;
        connection.query(querysql, callback);
    },
}