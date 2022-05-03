module.exports = {
    getObra: function (obra, connection, callback) {
        let querysql = sql = `select * from ativo where id_ativo = "${obra.id_ativo}";`
        //UPDATE Customers SET ContactName = 'Alfred Schmidt', City= 'Frankfurt' WHERE CustomerID = 1;
        connection.query(querysql, callback);
    },
    setDeletarObra: function (obra, connection, callback) {
        let querysql = `delete from ativo where id_ativo = "${obra.id_ativo}";`
        connection.query(querysql, callback);
    },
    getTodasObras: function (connection, callback) {
        let querysql = `select * from ativo;`
        connection.query(querysql, callback);
    }
}