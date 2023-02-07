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
      isDeleted: false,
    },
    // 添加用户的信息
    { OPENID: userInfo.OPENID, nickName: userInfo.nickName, avatarUrl: userInfo.avatarUrl },
    ctx._req.event.data
  );
  let res;
  if (postInfo.id) {
    // 获取信息
    const currentPostInfo = await detailsById(postInfo.id);
    const _postInfo = { ...currentPostInfo, ...postInfo };
    res = await update({
      collect: 'post',
      data: _postInfo,
      filter: {
        id: _postInfo.id,
      }
    });
  } else {
    res = await add({
      collect: 'post',
      data: postInfo,
    });
  }

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
  const { pageNo, pageSize, mine, favorite, isEssence } = ctx._req.event.data;
  const filter = {};

  // 精华帖
  if(isEssence) filter.isEssence = isEssence;
  // 我的帖子
  if (mine) filter.OPENID = ctx.wxContext.OPENID;
  // 我的收藏
  if (favorite) filter['favoriteUserList.OPENID'] = ctx.wxContext.OPENID;
  // 只查询未删除的帖子
  filter.isDeleted = { '$in': [undefined, false] };
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

// 软删除
const postDeleted = async (ctx, next) => {
  const { id } = ctx._req.event.data;
  const res = await update({
    collect: 'post', filter: { id }, data: {
      isDeleted: true,
    }
  });
  ctx.body.data = res;
  await next(); // 执行下一中间件
}

// 加精/取消加精
const postEditEssence = async (ctx, next) => {
  const { id, isEssence } = ctx._req.event.data;
  const res = await update({
    collect: 'post', filter: { id }, data: {
      isEssence,
    }
  });
  ctx.body.data = res;
  await next(); // 执行下一中间件
}


module.exports = { postCreate, postList, postDetails, postAttitude, postFavorite, postView, postDeleted, postEditEssence };
