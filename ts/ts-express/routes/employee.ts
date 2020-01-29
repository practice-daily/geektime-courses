import express from 'express'
import bodyParser from 'body-parser'
import query from '../models/query'
import { underline2camel } from '../utils/underline2camel'

const router = express.Router()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

let queryAllSQL = `SELECT t_employee.*, t_level.level, t_department.department
  FROM t_employee, t_level, t_department
  WHERE
    t_employee.level_id = t_level.id AND
    t_employee.department_id = t_department.id`

router.get('/getEmployee', async (req, res) => {
  let { name = '', departmentId } = req.query
  let conditions = `AND t_employee.name LIKE '%${name}%'`
  if (departmentId) {
    conditions += ` AND t_employee.department_id=${departmentId}`
  }
  let sql = `${queryAllSQL} ${conditions} ORDER BY t_employee.id DESC`
  try {
    let result = await query(sql)
    result.forEach((i: any) => {
      i.key = i.id
      i = underline2camel(i)
    })
    res.json({
      flag: 0,
      data: result
    })
  } catch (e) {
    res.json({
      flag: 1,
      msg: e.toString()
    })
  }
})

router.post('/createEmployee', urlencodedParser, async (req, res) => {
  let { name, departmentId, hireDate, levelId } = req.body
  let sql = `INSERT INTO t_employee (name, department_id, hire_date, level_id)
    VALUES ('${name}', '${departmentId}', '${hireDate}', '${levelId}')`
  try {
    let result = await query(sql)
    // console.log(result)
    res.json({
      flag: 0,
      data: {
        key: result.insertId,
        id: result.insertId
      }
    })
  } catch (e) {
    res.json({
      flag: 1,
      msg: e.toString()
    })
  }
})

export default router
