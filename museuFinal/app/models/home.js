module.exports = {
    getObrasDeArte: function (connection, callback) {
        let querysql = 'select * from ativo';
        connection.query(querysql, callback);
    },
    setObrasDeArte: function (obra, connection, callback) {
        sql = `INSERT INTO estoque.ativo (tipo, marca, modelo, disponibilidade, desgaste) VALUES ("${obra.tipo}", "${obra.marca}", "${obra.modelo}", "${obra.disponibilidade}", "${obra.desgaste}");`
        connection.query(sql, callback);
    }
}