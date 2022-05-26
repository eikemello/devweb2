module.exports = {
    getAtivo: function (connection, callback) {
        let querysql = 'select * from ativo;';
        connection.query(querysql, callback);
    },
    getEmprestimo: function (connection, callback) {
        let emprestado = 'SELECT P.tipo, P.modelo, P.serial_number, C.nome FROM ativo P INNER JOIN funcionario C ON P.id_ativo = C.id_funcionario;';
        connection.query(emprestado, callback);
    },
    setAtivo: function (obra, connection, callback) {
        let sql = `INSERT INTO estoque.ativo (tipo, marca, modelo, serial_number, disponibilidade, desgaste) VALUES ("${obra.tipo}", "${obra.marca}", "${obra.modelo}","${obra.serial_number}", "${obra.disponibilidade}", "${obra.desgaste}");`
        connection.query(sql, callback);
    }
}