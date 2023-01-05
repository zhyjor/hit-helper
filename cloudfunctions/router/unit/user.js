const { find } = require('../unit/db');

const getUserInfoByOpenId = async (OPENID) => {
  let res = await find({
    collect: 'userInfo',
    filter: {
      OPENID,
    },
    field: {
      _id: false,
      country: true,
      province: true,
      city: true,
      gender: true,
      language: true,
      avatarUrl: true,
      nickName: true,
      OPENID: true,
    }
  });
  if (res.data[0]) {
    return res.data[0];
  }
  return {};
};

module.exports = getUserInfoByOpenId;
