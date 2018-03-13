const mysql = require("mysql");

var pool = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'codix_app'
});

module.exports = {
    executeQuery: function (sql, callback) {
        pool.getConnection(function(err, connection) {
            // connected! (unless `err` is set)
            if(err){
                return callback(err);
            }

            connection.query(sql, function (error, results) {
                // And done with the connection.
                connection.release();

                // Handle error after the release.
                if (error) {
                    return callback(error);
                }

                callback(null,results);
            });
        });
    }  
};