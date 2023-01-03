const { update } = require('../unit/db');

const saveUserInfo = async (ctx, next) => {
  let userInfo = Object.assign({}, ctx.wxContext, ctx._req.event.data);
  let res = await update({
    collect: 'userInfo',
    data: userInfo,
    filter: {
      OPENID: ctx.wxContext.OPENID
    }
  });
  ctx.body.data = res;
  await next(); // 执行下一中间件
};
module.exports = saveUserInfo;
