// for (var i = 0; i < 3; i++) {
//     setTimeout(function() {
//         console.log('timeout' + i);
//     })
// }

// new Promise(function(resolve) {
//     console.log('promise1');
//     for (var i = 0; i < 1000; i++) {
//         i == 99 && resolve();
//     }
//     console.log('promise2');
// }).then(function() {
//     console.log('then1');
// })

// console.log('global1');

var axios = require('axios');

var url = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10';


function getJSON(url) {

    // return new Promise(function(resolve, reject) {
    axios({
            method: 'GET',
            url: url,
            params: { age: 1 },
            dataType: 'json'
        }).then(res => {
            console.log(res.data);
        }).catch(err => {

        })
        // })
}

function getJSONs(url) {
    axios({
        method: 'GET',
        url: url,
        params: { age: 1 },
        dataType: 'json'
    }).then(res => {
        console.log(res.data);
    }).catch(err => {

    })

}

// getJSON(url).then(resp => console.log(resp));
getJSON(url)
axios.all([getJSON(url), getJSONs(url)])
    .then(axios.spread(function(acct, perms) {
        //两个请求现已完成
    }));
