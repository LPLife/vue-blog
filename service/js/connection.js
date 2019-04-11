const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var dataconfig = require('./dataconfig');
var DatabaseOperation = {
    /*
    @selectall 方法返回全部所有数据
    @dataname 数据库名称
    @dealdata 回调处理函数 格式function(result){};
    */
    selectall: function(dataname, dealdata) {
        const client = new MongoClient(dataconfig.dataurl);
        client.connect(function(err) {
            assert.equal(null, err);
            console.log("数据库连接成功");
            const db = client.db(dataconfig.dataname);
            db.collection(dataname).find({}).toArray(function(err, result) { // 返回集合中所有数据
                if (err) throw err;
                dealdata(result);
            });
            client.close();
        })
    },
    /*
    @selectone 查询符合条件的数据
    @dataname 数据库名称
    @selectlanguage 查询控制语句 格式{index:value,index,value};
    @dealdata 回调处理函数 格式function(result){};
    */
    select: function(dataname, selectlanguage, dealdata) {
        const client = new MongoClient(dataconfig.dataurl);
        client.connect(function(err) {
            assert.equal(null, err);
            console.log("数据库连接成功");
            const db = client.db(dataconfig.dataname);
            db.collection(dataname).find(selectlanguage).toArray(function(err, docs) {
                console.log('find');
                dealdata(docs);
                client.close();
            });
        })
    },
    /*
    @insert添加数据格式json格式
    @dataname 数据库名称
    @dealdata 回调函数处理函数有一个result参数
    */
    insert: function(dataname, insertlanguage, dealdata) {
        const client = new MongoClient(dataconfig.dataurl);
        client.connect(function(err) {
            assert.equal(null, err);
            console.log("数据库连接成功");
            const db = client.db(dataconfig.dataname);
            db.collection(dataname).insertMany(insertlanguage, function(err, result) {
                assert.equal(err, null);
                dealdata(result);
                client.close();
            });
        })
    },
    /*
@update 修改数据的方法
@update添加数据格式json格式
@dataname 数据库名称
@dealdata 回调函数处理函数有一个result参数
*/
    update: function(dataname, updatelanguage, updatecondition, dealdata) {
        const client = new MongoClient(dataconfig.dataurl);
        client.connect(function(err) {
            assert.equal(null, err);
            console.log("数据库连接成功");
            const db = client.db(dataconfig.dataname);
            db.collection(dataname).updateOne(updatelanguage, updatecondition, function(err, result) {
                assert.equal(err, null);
                dealdata(result);
                client.close();
            });
        })
    },
    /*
    @removeall 删除数据的方法
    @dataname 数据库名称
    @removelanguage 删除数据的条件
    @dealdata 回调函数处理函数有一个result参数
    */
    removeall: function(dataname, removelanguage, dealdata) {
        const client = new MongoClient(dataconfig.dataurl);
        client.connect(function(err) {
            assert.equal(null, err);
            console.log("数据库连接成功");
            const db = client.db(dataconfig.dataname);
            db.collection(dataname).deleteOne(removelanguage, function(err, result) {
                assert.equal(err, null);
                dealdata(result);
                client.close();
            });
        })
    },

};

// 测试用例
// DatabaseOperation.selectall('address', function(result) {
//         console.log("select查询结果");
//         console.log(result);
//     })
// DatabaseOperation.select('address', {
//     "addressid": "2"
// }, function(result) {
//     console.log("select查询结果");
//     console.log(result);
// });
// DatabaseOperation.insert('address', [{
//         "insert": "hello"
//     }], function(result) {
//         console.log('inserts插入结果');
//         console.log(result);
//     })
// DatabaseOperation.update('address', {
//         "insert": "hello"
//     }, {
//         $set: {
//             "insert": "https://www.runoob.com"
//         }
//     }, function(result) {
//         console.log(result);
//     })
// DatabaseOperation.removeall('address', {
//     "insert": "hello"
// }, function(result) {
//     console.log(result);
// })

module.exports = DatabaseOperation;