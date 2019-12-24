var mysql = require('mysql')

//连接池
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'demo'
})


//封装mysql请求-查询
let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {

          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = {
  pool: pool,
  query: query,
}