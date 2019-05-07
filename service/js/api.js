var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));
var DatabaseOperation = require('./connection');

//引用bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//设置跨域请求
app.all('*', function(req, res, next) {
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
        if (result.length == 0) {
            result = {
                code: '1000'
            }
        }
        res.json(result)
    });
});
//用户注册
app.get('/api/user/register', function(req, res) {
    DatabaseOperation.select('user', {
        "username": req.query.username,
    }, function(result) {
        if (result.length > 0) {
            result = {
                code: '1001'
            }
            res.json(result);
        } else {
            DatabaseOperation.insert('user', [{
                "username": req.query.username,
                "password": req.query.password
            }], function(result) {
                res.json(result)
            });
        }
    });
});
//图片上传
app.post('/api/file/upload/base64', function(req, res) {
    DatabaseOperation.insert('picture', [{
        "url": req.body.url,
        "user_id": req.body.user_id,
        "upload_date":req.body.upload_date
    }], function(result) {
        res.json(result)
    });
});
//获取图片列表
app.get('/api/user/images', function(req, res) {
    DatabaseOperation.select('picture', {
        "user_id": req.query.user_id,
    }, function(result) {
        if (result.length == 0) {
            result = {
                code: '1000'
            }
        }
        res.json(result)
    });
});
//删除图片
app.post('/api/user/images/delete', function(req, res) {
    DatabaseOperation.removeall('picture', {
        url: req.body.url,
        }, function(result) {
            console.log(result);
            res.json(result)

        })
});
//获取日志列表
app.get('/api/user/log', function(req, res) {
    DatabaseOperation.select('log', {
        "user_id": req.query.user_id,
    }, function(result) {
        if (result.length == 0) {
            result = {
                code: '1000'
            }
        }
        res.json(result)
    });
});
//更新日志
app.post('/api/user/log/USER_LOG_UPDATE', function(req, res) {
    DatabaseOperation.insert('log', [{
        "user_id": req.body.user_id,
        "upload_date":req.body.upload_date,
        "tip":req.body.tip,
        "date":req.body.date
    }], function(result) {
        res.json(result)
    });
});
const port = 8080;
app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});