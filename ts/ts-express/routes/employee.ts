import express from 'express'
import bodyParser from 'body-parser'
import nodeExcel from 'excel-export'
import query from '../models/query'
import { underline2camel } from '../utils/underline2camel'

const router = express.Router()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

let queryAllSQL = `
  SELECT
    t_employee.*,
    t_level.level,
    t_department.department
  FROM
    t_employee,
    t_level,
    t_department
  WHERE
    t_employee.level_id = t_level.id
    AND
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
    console.log('createEmployee===', result)
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

router.post('/updateEmployee', async (req, res) => {
  const { id, name, departmentId, hireDate, levelId } = req.body
  const sql = `UPDATE t_employee
    SET
      name='${name}',
      department_id=${departmentId},
      hire_date='${hireDate}',
      level_id=${levelId}
    WHERE
      id=${id}`
  try {
    const result = await query(sql)
    console.log('updateEmployee===', result)
    res.json({
      flag: 0,
    })
  } catch (e) {
    res.json({
      flag: 1,
      msg: e.toString()
    })
  }
})

router.post('/deleteEmployee', async (req, res) => {
  const { id } = req.body
  const sql = `DELETE FROM t_employee WHERE id=${id}`
  try {
    const result = await query(sql)
    console.log('deleteEmployee===', result)
    res.json({
      flag: 0
    })
  } catch (e) {
    res.json({
      flag: 1,
      msg: e.toString()
    })
  }
})

router.get('/downloadEmployee', async (req, res) => {
  let conf: nodeExcel.Config = {
    cols: [
      { caption: '员工ID', type: 'number' },
      { caption: '姓名', type: 'string' },
      { caption: '部门', type: 'string' },
      { caption: '入职时间', type: 'string' },
      { caption: '职级', type: 'string' },
    ],
    rows: []
  }
  const sql = queryAllSQL + ' ORDER BY id DESC'
  try {
    const result = await query(sql)
    conf.rows = result.map((i: any) => [i.id, i.name, i.department, i.hire_date, i.level])
    const resultExcel = nodeExcel.execute(conf)
    res.setHeader('Content-Type', 'application/vnd.openxmlformats')
    res.setHeader('Content-Disposition', 'attachment; filename=employee.xlsx')
    res.end(resultExcel, 'binary')
  } catch (e) {
    res.send(e.toString())
  }
})

export default router
