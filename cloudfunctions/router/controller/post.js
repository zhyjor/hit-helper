const { add, findByPage, find, update } = require('../unit/db');
const getUserInfoByOpenId = require('../unit/user');
const { detailsById } = require('../service/post');

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


const postAttitude = async (ctx, next) => {
  const { id } = ctx._req.event.data;
  const postDetails = await detailsById(id);
  let userInfo = await getUserInfoByOpenId(ctx.wxContext.OPENID);

  const isAttitude = !(postDetails.attitudeUserList || []).map(i => i.OPENID).includes(userInfo.OPENID);

  if (isAttitude) {
    // 点赞
    postDetails.attitudeUserList = (postDetails.attitudeUserList || [])
      .filter(i => i.OPENID !== userInfo.OPENID)
      .concat([{ OPENID: userInfo.OPENID, nickName: userInfo.nickName }]);
  } else {
    // 取消点赞
    postDetails.attitudeUserList = (postDetails.attitudeUserList || [])
      .filter(i => i.OPENID !== userInfo.OPENID);
  }

  // 更新数据
  await update({
    collect: 'post', filter: { id: postDetails.id }, data: {
      attitudeUserList: postDetails.attitudeUserList,
    }
  });


  ctx.body.data = {
    attitude: isAttitude,
    message: `${isAttitude ? '点赞' : '取消点赞'}成功`
  }
  await next(); // 执行下一中间件
}

const postFavorite = async (ctx, next) => {
  const { id } = ctx._req.event.data;
  let userInfo = await getUserInfoByOpenId(ctx.wxContext.OPENID);

  const postDetails = await detailsById(id);
  const isFavorite = !(postDetails.favoriteUserList || []).map(i => i.OPENID).includes(userInfo.OPENID);

  if (isFavorite) {
    // 点赞
    postDetails.favoriteUserList = (postDetails.favoriteUserList || [])
      .filter(i => i.OPENID !== userInfo.OPENID)
      .concat([{ OPENID: userInfo.OPENID, nickName: userInfo.nickName }]);
  } else {
    // 取消点赞
    postDetails.favoriteUserList = (postDetails.favoriteUserList || [])
      .filter(i => i.OPENID !== userInfo.OPENID);
  }

  // 更新数据
  await update({
    collect: 'post', filter: { id: postDetails.id }, data: {
      favoriteUserList: postDetails.favoriteUserList,
    }
  });
  ctx.body.data = {
    favorite: isFavorite,
    message: `${isFavorite ? '收藏' : '取消收藏'}成功`
  }
  await next(); // 执行下一中间件
}

const postView = async (ctx, next) => {
  const { id } = ctx._req.event.data;
  const postDetails = await detailsById(id);
  if (postDetails) {
    if (postDetails.viewCount) {
      postDetails.viewCount += 1;
    } else {
      postDetails.viewCount = 1;
    }
  }
  await update({
    collect: 'post', filter: { id: postDetails.id }, data: {
      viewCount: postDetails.viewCount,
    }
  });
  ctx.body.data = postDetails.viewCount;
  await next(); // 执行下一中间件
}

const postDetails = async (ctx, next) => {
  const { id } = ctx._req.event.data;
  const postDetails = await detailsById(id);
  let userInfo = await getUserInfoByOpenId(ctx.wxContext.OPENID);
  postDetails.attitude = (postDetails.attitudeUserList || []).map(i => i.OPENID).includes(userInfo.OPENID);
  postDetails.favorite = (postDetails.favoriteUserList || []).map(i => i.OPENID).includes(userInfo.OPENID);

  ctx.body.data = postDetails;

  await next(); // 执行下一中间件
}

const postList = async (ctx, next) => {
  const { pageNo, pageSize, mine, favorite } = ctx._req.event.data;
  const filter = {};

  // 我的帖子
  if (mine) filter.OPENID = ctx.wxContext.OPENID;
  // 我的收藏
  if (favorite) filter['favoriteUserList.OPENID'] = ctx.wxContext.OPENID;

  let data = await findByPage({
    collect: 'post',
    filter,
    field: {
    },
    page: {
      pageSize,
      pageNo,
    }
  });
  ctx.body.data = data;
  await next(); // 执行下一中间件
}


module.exports = { postCreate, postList, postDetails, postAttitude, postFavorite, postView };
