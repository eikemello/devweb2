var querysql = null;
module.exports = {
    getAtivo: function (connection, callback) {
        querysql = 'select * from ativo;';
        connection.query(querysql, callback);
    },
    getEmprestimo: function (connection, callback) {
        querysql = 'SELECT A.tipo, A.modelo, A.serial_number, F.nome FROM ativo A INNER JOIN funcionario F ON A.id_ativo = F.id_funcionario;';
        connection.query(querysql, callback);
    },
    getTransferencia: function (connection, callback) {
        querysql = 'SELECT T.id_transfererencia, T.id_novo_responsavel,  T.id_antigo_responsavel, F.nome, A.tipo, A.serial_number FROM ativo A INNER JOIN transferencia T ON T.id_ativo = A.id_ativo JOIN funcionario F ON T.id_novo_responsavel = F.id_funcionario;';
        connection.query(querysql, callback);
    },
    setAtivo: function (obra, connection, callback) {
        querysql = `INSERT INTO estoque.ativo (tipo, marca, modelo, serial_number, disponibilidade, desgaste) VALUES ("${obra.tipo}", "${obra.marca}", "${obra.modelo}","${obra.serial_number}", "${obra.disponibilidade}", "${obra.desgaste}");`
        connection.query(querysql, callback);
    }
}