const express = require('express');
const router = express.Router();
let model = require('../model');

//获取全体员工数据
router.get('/list', (req, res) => {
    const sql = "SELECT * FROM employee";
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//根据工号删除员工信息
router.get('/delete', (req, res) => {
    const sql = "DELETE FROM employee WHERE workid="+req.query.id;
    model.querySQL(sql).then(() => {
        res.send({status: 0, msg: "删除员工成功"})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//根据姓名或者工号搜索
router.get('/search', (req, res) => {
    let sql = '';
    if(isNaN(req.query.value)){
        sql = "SELECT * FROM employee WHERE name LIKE '%"+req.query.value+"%'"
    }else{
        sql = model.getSearchSQL('employee', {workid: req.query.value})
    }
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//新增员工
router.post('/add', (req, res) => {
    const sql = model.getAddSQL('employee', req.body);
    model.querySQL(sql).then((ret) => {
        res.send({status: 0, msg: "新增成功"})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//根据工号workid更新数据
router.post('/update', (req, res) => {
    const sql = model.getUpdateSQL('employee', req.body);
    model.querySQL(sql).then(() => {
        res.send({status: 0, msg: '更新成功'})
    }, err => {
        res.send({status: 1, msg: err})
    })
});



module.exports = router;






















