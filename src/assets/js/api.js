let host = 'http://localhost:8080'
const apiConfig = {
    // 用户登录
    LOGIN: `${host}/api/user/login`,
    //用户注册
    REGISTER: `${host}/api/user/register`,
    //列表
    USERINFO: `${host}/api/user/info`,
    //上传图片
    UPLOADTMG: `${host}/api/file/upload/base64`,
    //获取图片
    USER_IMG_LIST:`${host}/api/user/images`
};
module.exports = apiConfig;