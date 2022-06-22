var querysql = null;
module.exports = {
    getAtivo: function (ativo, connection, callback) {
        console.log("getAtivo SN: " + ativo.serial_number);
        querysql = `SELECT id_ativo, marca, tipo, modelo, serial_number, desgaste, registrado_em, disponibilidade FROM ativo WHERE serial_number = "${ativo.serial_number}";`;
        connection.query(querysql, callback);
    }
}