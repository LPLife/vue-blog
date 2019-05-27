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
  USER_IMG_LIST: `${host}/api/user/images`,
  //删除图片
  USER_DELETE_IMG: `${host}/api/user/images/delete`,
  // 用户日志列表
  USER_LOG: `${host}/api/user/log`,
  //用户日志更新
  USER_LOG_UPDATE: `${host}/api/user/log/update`,
  //获取留言列表
  USERS_NOTES: `${host}/api/users/notes`,
  //获取单个用户留言列表  
  USER_NOTE: `${host}/api/user/note`,
  //删除留言
  USER_NOTE_DELETE: `${host}/api/user/note/delete`,
  // 添加留言
  USER_NOTE_ADD: `${host}/api/user/note/add`,
  //上传博客
  USER_BLOG_ARTICLE: `${host}/api/blog/article`,
  //获取个人博客列表
  USER_BLOG_LIST: `${host}/api/blog/article/list`,
  // 获取全部用户博客列表
  USER_BLOG_LISTS: `${host}/api/blog/article/lists`,
  // 删除博客
  USER_BLOG_DELETE: `${host}/api/user/blog/delete`
};
module.exports = apiConfig;
