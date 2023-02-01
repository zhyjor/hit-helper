const { update } = require('../unit/db');
const getUserInfoByOpenId = require('../unit/user');

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

const login = async (ctx, next) => {
  let res = await getUserInfoByOpenId(ctx.wxContext.OPENID)
  ctx.body.data = res;
  await next(); // 执行下一中间件
};

const updateUserInfo = async (ctx, next) => {
  let _userInfo = Object.assign({}, ctx.wxContext, ctx._req.event.data);
  let userData = await getUserInfoByOpenId(ctx.wxContext.OPENID)

  let res = await update({
    collect: 'userInfo',
    data: { ...userData, ..._userInfo },
    filter: {
      OPENID: ctx.wxContext.OPENID
    }
  });
  ctx.body.data = res;
  await next(); // 执行下一中间件
};

module.exports = { saveUserInfo, login, updateUserInfo };
