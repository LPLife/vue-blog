var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var supervisor = require('supervisor');
var DatabaseOperation = require('./connection');

//引用bodyParser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//设置跨域请求
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// 配置服务端口
//用户登录验证
app.post('/api/user/login', function(req, res) {

    DatabaseOperation.select('user', {
        "username": 'admin',
        "password": 'admin'
    }, function(result) {
        console.log("select查询结果");
        userinfo = result;
        console.log(userinfo);
        res.json(req.body);
    });
});
const port = 8888;
app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});