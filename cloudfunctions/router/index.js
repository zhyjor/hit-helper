// 云函数入口文件 cloudfunctions\router\index.js
// 微信sdk
const cloud = require('wx-server-sdk');
// 上古项目 给小程序云函数加个路由
const TcbRouter = require('tcb-router');
// 登录方法
const login = require('./controller/login');
// 保存用户信息方法
const saveUserInfo = require('./controller/saveUserInfo');
const { postCreate, postList, postDetails } = require('./controller/post');
const { commentCreate, commentList, commentDetails } = require('./controller/comment');

// 日志中间件
const log = require('./unit/log');
cloud.init({
  traceUser: true,
  // env: "hit-helper-3g7q095q412bef1b"
  env: "hit-helper"
});

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({ event });
  // app.use 表示该中间件会适用于所有的路由
  app.use(log);
  // 登录路由
  app.router('login', login);
  // 保存用户信息
  app.router('saveUserInfo', saveUserInfo);
  app.router('postCreate', postCreate);
  app.router('postList', postList);
  app.router('postDetails', postDetails);
  app.router('commentCreate', commentCreate);
  app.router('commentList', commentList);
  app.router('commentDetails', commentDetails);

  //
  return app.serve();
};
