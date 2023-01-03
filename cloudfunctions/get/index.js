const cloud = require('wx-server-sdk')

// ...
exports.main = async (event, context) => {
  // ...
  const wxContext = cloud.getWXContext()

  return {
    sum: event.a + event.b,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
