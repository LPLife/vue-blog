var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var DatabaseOperation = require('./connection');

//引用bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
//设置跨域请求
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// 配置服务端口
//用户登录验证
app.post('/api/user/login', function(req, res) {    
    DatabaseOperation.select('user', {
        "username": req.body.username,
        "password": req.body.password
    }, function(result) {
        if(result.length == 0) {
            result = {
                code:'1000'
            }
        }
        res.json(result)
    });
});
//用户注册
app.get('/api/user/register', function(req, res) {    
    DatabaseOperation.insert('user', [{
        "username": req.query.username,
        "password": req.query.password
    },{unique:true}], function(result) {
        if(result.length == 0) {
            result = {
                code:'1000'
            }
        }
        res.json(result)
    });
});
const port = 8080;
app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});