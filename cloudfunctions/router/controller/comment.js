const { add, findByPage, find, update } = require('../unit/db');
const getUserInfoByOpenId = require('../unit/user');

// 设计的ID有三个，所属的帖子ID，所属的根评论ID，评论的评论ID
const commentCreate = async (ctx, next) => {
  // 获取本人的信息
  let userInfo = await getUserInfoByOpenId(ctx.wxContext.OPENID);
  // 判断是评论给帖子，还是评论给评论
  const { postId, parentCommentId, body } = ctx._req.event.data;

  const commentBaseInfo = {
    body,
    OPENID: userInfo.OPENID, nickName: userInfo.nickName, avatarUrl: userInfo.avatarUrl,
    isAnonymous: false,
    children: null,
    childrenCount: 0,
    hasPower: true,
  }

  if (parentCommentId) {
    // 再查询一下所属的评论的信息
    const belongCommentInfoList = await find({ collect: 'comment', filter: { _id: parentCommentId } });
    let belongCommentInfo = belongCommentInfoList.data[0];
    let rootCommentInfo = belongCommentInfo;
    // 先判断一下是否有rootCommentId
    if (belongCommentInfo.rootCommentId) {
      const rootCommentInfoList = await find({ collect: 'comment', filter: { _id: belongCommentInfo.rootCommentId } });
      rootCommentInfo = rootCommentInfoList.data[0];
      commentBaseInfo.rootCommentId = belongCommentInfo.rootCommentId;
    } else {
      // 没有rootCommentId的时候，需要设置为parentCommentId
      commentBaseInfo.rootCommentId = parentCommentId;
    }

    commentBaseInfo.parentCommentId = parentCommentId;
    commentBaseInfo.floor = belongCommentInfo.floor;
    commentBaseInfo.postId = belongCommentInfo.postId;

    // 评论者的
    commentBaseInfo.receiverOpenId = belongCommentInfo.OPENID;
    commentBaseInfo.receiverNickName = belongCommentInfo.nickName;
    commentBaseInfo.receiverAvatarUrl = belongCommentInfo.avatarUrl;
    //
    // 新增数据
    let res = await add({
      collect: 'comment',
      data: commentBaseInfo,
    });
    commentBaseInfo._id = res._id;
    // 更新一下所属评论
    if (rootCommentInfo.children) {
      rootCommentInfo.children.push(commentBaseInfo);
      rootCommentInfo.childrenCount = rootCommentInfo.children.length;
    } else {
      rootCommentInfo.children = [commentBaseInfo];
      rootCommentInfo.childrenCount = 1;
    }

    // ID不能包含
    delete rootCommentInfo._id;
    await update({ collect: 'comment', filter: { _id: commentBaseInfo.rootCommentId }, data: rootCommentInfo });

    ctx.body.data = res;
  } else {
    // 先查询一下所属的帖子
    const belongPostInfoList = await find({ collect: 'post', filter: { _id: postId } });
    const belongPostInfo = belongPostInfoList.data[0];
    if (belongPostInfo.OPENID === userInfo.OPENID) {
      // 是自己的帖子
      commentBaseInfo.postId = postId;
      commentBaseInfo.floor = belongPostInfo.commentCount + 1;
    }
    // 更新一下帖子信息
    const commentCount = belongPostInfo.commentCount !== undefined ? belongPostInfo.commentCount + 1 : 1;

    // belongPostInfo.commentCount = belongPostInfo.commentCount !== undefined ? belongPostInfo.commentCount + 1 : 1;
    await update({ collect: 'post', filter: { _id: postId }, data: { commentCount } });
    // 新增数据
    let res = await add({
      collect: 'comment',
      data: commentBaseInfo,
    });
    // 再去更新一下ID
    ctx.body.data = res;
  }

  await next(); // 执行下一中间件
};

const commentDetails = async (ctx, next) => {
  const { id } = ctx._req.event.data;
  let res = await find({
    collect: 'comment',
    filter: {
      _id: id,
    },
    field: {
    }
  });
  ctx.body.data = res.data[0];

  await next(); // 执行下一中间件
}

const commentList = async (ctx, next) => {
  const { pageNo, pageSize, postId } = ctx._req.event.data;
  let { list, total } = await findByPage({
    collect: 'comment',
    filter: {
      postId: postId,
      rootCommentId: null,
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


module.exports = { commentCreate, commentList, commentDetails };
