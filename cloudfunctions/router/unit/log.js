const cloud = require('wx-server-sdk');
const log = async (ctx, next) => {
  ctx.data = {};
  ctx.body = {
    code: 200
  };
  ctx.wxContext = cloud.getWXContext();
  // 请求的url
  const url = ctx._req.url;
  // 启动处理时间
  const start = new Date();
  console.log(`${start} =>[${url}]`);
  await next();
  // 结速处理时间
  const endT = new Date();
  const ms = endT - start;
  // 输出日志 ctx.method 请求方式 ctx.url 请求地址
  console.log(`${endT} <=[${url}] [${ms}ms] \n`);
};

module.exports = log;
