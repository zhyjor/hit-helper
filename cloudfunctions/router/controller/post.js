const { add, findByPage, find } = require('../unit/db');
const getUserInfoByOpenId = require('../unit/user');

const postCreate = async (ctx, next) => {
  let userInfo = await getUserInfoByOpenId(ctx.wxContext.OPENID);
  const postInfo = Object.assign(
    {
      disableComment: false,
      isAnonymous: false,
      isDraft: false,
    },
    // 添加用户的信息
    { OPENID: userInfo.OPENID, nickName: userInfo.nickName, avatarUrl: userInfo.avatarUrl },
    ctx._req.event.data
  );
  let res = await add({
    collect: 'post',
    data: postInfo,
  });
  ctx.body.data = res;
  await next(); // 执行下一中间件
};

const postDetails = async (ctx, next) => {
  const { id } = ctx._req.event.data;
  let res = await find({
    collect: 'post',
    filter: {
      _id: id,
    },
    field: {
    }
  });
  ctx.body.data = res.data[0];

  await next(); // 执行下一中间件
}

const postList = async (ctx, next) => {
  const { pageNo, pageSize } = ctx._req.event.data;
  let { list, total } = await findByPage({
    collect: 'post',
    filter: {
      // OPENID: ctx.wxContext.OPENID,
    },
    field: {
    },
    page: {
      pageSize,
      pageNo,
    }
  });
  ctx.body.data = list.data;
  ctx.body.page = {
    pageSize,
    pageNo,
    total,
  };

  await next(); // 执行下一中间件
}


module.exports = { postCreate, postList, postDetails };
