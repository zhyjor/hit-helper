// cloudfunctions\router\controller\login.js
const { find } = require('../unit/db');

const login = async (ctx, next) => {
  let res = await find({
    collect: 'userInfo',
    filter: {
      OPENID: ctx.wxContext.OPENID
    },
    field: {
      _id: false,
      country: true,
      province: true,
      city: true,
      gender: true,
      language: true,
      avatarUrl: true,
      nickName: true
    }
  });
  if (res.data[0]) {
    ctx.body.data = res.data[0];
  }
  await next(); // 执行下一中间件
};
module.exports = login;
