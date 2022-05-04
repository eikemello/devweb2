module.exports = {
    getAtivo: function (obra, connection, callback) {
        let querysql = sql = `select * from ativo where id_ativo = "${obra.id_ativo}";`
        //UPDATE Customers SET ContactName = 'Alfred Schmidt', City= 'Frankfurt' WHERE CustomerID = 1;
        connection.query(querysql, callback);
    },
    deletaAtivo: function (obra, connection, callback) {
        let querysql = `delete from ativo where id_ativo = "${obra.id_ativo}";`
        connection.query(querysql, callback);
    },
    listarAtivos: function (connection, callback) {
        let querysql = `select * from ativo;`
        connection.query(querysql, callback);
    }
}