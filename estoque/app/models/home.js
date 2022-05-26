module.exports = {
    getAtivo: function (connection, callback) {
        let querysql = 'select * from ativo;';
        let querysql2 = 'select * from ativo_emprestado;';
        connection.query(querysql, callback);
    },
    setAtivo: function (obra, connection, callback) {
        sql = `INSERT INTO estoque.ativo (tipo, marca, modelo, serial_number, disponibilidade, desgaste) VALUES ("${obra.tipo}", "${obra.marca}", "${obra.modelo}","${obra.serial_number}", "${obra.disponibilidade}", "${obra.desgaste}");`
        connection.query(sql, callback);
    }
}