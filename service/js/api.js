var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({
  limit: '1mb'
}));
app.use(bodyParser.urlencoded({
  limit: '1mb',
  extended: true
}));
var DatabaseOperation = require('./connection');

//引用bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
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
app.post('/api/user/login', function (req, res) {
  DatabaseOperation.select('user', {
    "username": req.body.username,
    "password": req.body.password
  }, function (result) {
    if (result.length == 0) {
      result = {
        code: '1000'
      }
    }
    res.json(result)
  });
});
//用户注册
app.get('/api/user/register', function (req, res) {
  DatabaseOperation.select('user', {
    "username": req.query.username,
  }, function (result) {
    if (result.length > 0) {
      result = {
        code: '1001'
      }
      res.json(result);
    } else {
      DatabaseOperation.insert('user', [{
        "username": req.query.username,
        "password": req.query.password
      }], function (result) {
        res.json(result)
      });
    }
  });
});
//图片上传
app.post('/api/file/upload/base64', function (req, res) {
  DatabaseOperation.insert('picture', [{
    "url": req.body.url,
    "user_id": req.body.user_id,
    "upload_date": req.body.upload_date
  }], function (result) {
    res.json(result)
  });
});
//获取图片列表
app.get('/api/user/images', function (req, res) {
  DatabaseOperation.select('picture', {
    "user_id": req.query.user_id,
  }, function (result) {
    if (result.length == 0) {
      result = {
        code: '1000'
      }
    }
    res.json(result)
  });
});
//删除图片
app.post('/api/user/images/delete', function (req, res) {
  DatabaseOperation.removeall('picture', {
    url: req.body.url,
  }, function (result) {
    console.log(result);
    res.json(result)

  })
});
//获取日志列表
app.get('/api/user/log', function (req, res) {
  DatabaseOperation.select('log', {
    "user_id": req.query.user_id,
  }, function (result) {
    if (result.length == 0) {
      result = {
        code: '1000'
      }
    }
    res.json(result)
  });
});
//更新日志
app.post('/api/user/log/update', function (req, res) {
  DatabaseOperation.insert('log', [{
    "tip": req.body.tip,
    "user_id": req.body.user_id,
    "date": req.body.date
  }], function (result) {
    res.json(result)
  });
});
//获取留言列表
app.get('/api/users/notes', function (req, res) {
  DatabaseOperation.select('note', function (result) {
    if (result.length == 0) {
      result = {
        code: '1000'
      }
    }
    res.json(result)
  });
});
//获取单个用户留言列表
app.get('/api/user/note', function (req, res) {
  DatabaseOperation.select('note', {
    "user_id": req.query.user_id,
  }, function (result) {
    if (result.length == 0) {
      result = {
        code: '1000'
      }
    }
    res.json(result)
  });
});
//删除留言
app.post('/api/user/note/delete', function (req, res) {
  console.log(req.body.id);
  DatabaseOperation.removeall('note', {
    _id: require('mongodb').ObjectID(req.body._id),
  }, function (result) {
    res.json(result)
  })
});
//添加留言
app.post('/api/user/note/add', function (req, res) {
  DatabaseOperation.insert('note', [{
    "message": req.body.message,
    "user_id": req.body.user_id,
    "upload_date": req.body.upload_date,
  }], function (result) {
    res.json(result)
  });
});
//写入博客
app.post('/api/blog/article', function (req, res) {
  DatabaseOperation.insert('blogs', [{
    "data": req.body.article,
    "upload_date": req.body.date,
    "user_id": req.body.user_id,
    "title": req.body.title,
    "original": req.body.original,
  }], function (result) {
    res.json(result)
  });
});
//个人博客列表
app.get('/api/blog/article/list', function (req, res) {
  DatabaseOperation.select('blogs', {
    "user_id": req.query.user_id,
  }, function (result) {
    if (result.length == 0) {
      result = {
        code: '1000'
      }
    }
    res.json(result)
  });
});
// 获取全部用户博客列表
app.get('/api/blog/article/lists', function (req, res) {
  DatabaseOperation.select('blogs', {

  }, function (result) {
    if (result.length == 0) {
      result = {
        code: '1000'
      }
    }
    res.json(result)
  });
});
//删除博客
app.post('/api/user/blog/delete', function (req, res) {
  console.log(req.body.id);
  DatabaseOperation.removeall('blogs', {
    _id: require('mongodb').ObjectID(req.body._id),
  }, function (result) {
    res.json(result)
  })
});
// 修改博客
app.post('/api/user/blog/update', function (req, res) {
  DatabaseOperation.update('blogs', {
    _id: require('mongodb').ObjectID(req.body._id),
  }, {
    $set: {
      "data": req.body.article,
      "upload_date": req.body.date,
      "user_id": req.body.user_id,
      "title": req.body.title,
      "original": req.body.original,
    }
  }, function (result) {
    res.json(result)
  })
});
const port = 8080;
app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});
