import mysql from 'mysql'
import dbconfig from '../config/db'

const pool = mysql.createPool(dbconfig)

const query = (sql: string) => {
  return new Promise<any>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }
      connection.query(sql, (err, results) => {
        if (err) {
          return reject(err)
        }
        resolve(results)
        connection.release()
      })
    })
  })
}

export default query
