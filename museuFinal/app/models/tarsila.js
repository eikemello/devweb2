module.exports = {
    getObrasDeArteTarsila: function (connection, callback) {
        let querysql = "select * from obrasdearte where artista like 'Tarsila do Amaral'";
        connection.query(querysql, callback);
    }
}