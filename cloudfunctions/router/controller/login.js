// cloudfunctions\router\controller\login.js
const getUserInfoByOpenId = require('../unit/user');

const login = async (ctx, next) => {
  let res = await getUserInfoByOpenId(ctx.wxContext.OPENID)
  ctx.body.data = res;
  await next(); // 执行下一中间件
};
module.exports = login;
