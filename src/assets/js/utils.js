import axios from 'axios'
import apiConfig from '../../assets/js/api'
export function uploadImgToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () { // 图片转base64完成后返回reader对象
      resolve(reader)
    }
    reader.onerror = reject
  })
}
export function time() {
  let nowDate = new Date();
  let year = nowDate.getFullYear(),
    month = nowDate.getMonth() < 9 ? `0${nowDate.getMonth()+1}` : `${nowDate.getMonth()+1}`,
    day = nowDate.getDate() < 10 ? `0${nowDate.getDate()}` : `${nowDate.getDate()+1}`,
    hours = nowDate.getHours() < 10 ? `0${nowDate.getHours()}` : `${nowDate.getHours()}`,
    minutes = nowDate.getMinutes() < 10 ? `0${nowDate.getMinutes()}` : `${nowDate.getMinutes()}`;
  let date = year + '-' + month + '-' + day + ' ' + hours + ":" + minutes;
  return date;
}
export function updateLog(tip) {
  console.log(tip, time());
  axios({
      method: 'post',
      url: apiConfig.USER_LOG_UPDATE,
      data: {
        user_id: localStorage.getItem('user_id'),
        tip: tip,
        date: time()
      }
    }

  ).then(res => {}

  ).catch(err => {

  })
}

// 获取链接参数
export function getQueryFromUrl(key) {
  let search = location.search,
    obj = {};
  search = decodeURIComponent(search.substring(1));
  let arr = search.split('&'),
    len = arr.length,
    i;
  if (len > 0) {
    for (i = 0; i < len; i++) {
      let subArr = arr[i].split('=');
      obj[subArr[0]] = subArr[1];
    }
  }
  return obj[key];
}
