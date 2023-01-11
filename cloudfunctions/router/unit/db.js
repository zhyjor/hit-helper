// cloudfunctions\router\unit\db.js
const cloud = require('wx-server-sdk');
cloud.init({
  traceUser: true,
  env: "hit-helper-3g7q095q412bef1b"
  // env: "hit-helper"
});

const db = cloud.database();

/**
 * 连接数据库 如果没有则创建
 * @param {string} collect 集合名称（表明）
 */
const connect = async collect => {
  return new Promise(async (resolve, reject) => {
    let _db;
    try {
      await db.createCollection(collect);
      _db = await db.collection(collect);
    } catch (error) {
      console.log(collect, '已存在');
    }
    _db = await db.collection(collect).add({ data: { msg: 'creat OK' } });
    resolve(_db);
  });
};

/**
 * 添加数据
 * @param {string} collect 需要更新的集合名称
 * @param {object} data 存储的数据
 */
const add = async ({ collect, data }) => {
  try {
    await db.createCollection(collect);
  } catch (error) {
    console.log(collect, '已存在');
  }
  data.createTime = formatTime(db.serverDate());
  data.updateTime = formatTime(db.serverDate());

  data.originalCreateTime = db.serverDate();
  data.originalUpdateTime = db.serverDate();
  let res = await db.collection(collect).add({ data });
  return res;
};

/**
 * 查找数据
 * @param {string} collect 需要更新的集合名称
 * @param {object} filter 过滤条件
 */
const orderBy = async ({
  collect,
  orderKey = 'updataTime',
  order = 'desc',
  field
}) => {
  try {
    await db.createCollection(collect);
  } catch (error) {
    console.log(collect, '已存在');
  }
  let res = await db
    .collection(collect)
    .orderBy(orderKey, order)
    .field(field)
    .get();
  return res;
};
/**
 * 查找数据
 * @param {string} collect 需要更新的集合名称
 * @param {object} filter 过滤条件
 */
const find = async ({ collect, filter, field }) => {
  try {
    await db.createCollection(collect);
  } catch (error) {
    console.log(collect, '已存在');
  }
  let res = await db
    .collection(collect)
    .where(filter)
    .field(field)
    .get();
  return res;
};

/**
 * 分页查找查找数据
 * @param {string} collect 需要更新的集合名称
 * @param {object} filter 过滤条件
 * @param {object} page 分页信息，{pageSize: number, }
 */
const findByPage = async ({ collect, filter, field, page }) => {
  try {
    await db.createCollection(collect);
  } catch (error) {
    console.log(collect, '已存在');
  }

  // 先取出集合记录总数
  const countResult = await db.collection(collect).count()
  const total = countResult.total

  const { pageSize = 20, pageNo = 1 } = page;
  const skip = pageSize * (pageNo - 1);

  console.log({ skip, pageSize });

  let res = await db
    .collection(collect)
    .where(filter)
    .skip(skip)
    .limit(pageSize)
    .field(field)
    .get();
  return { total, list: res };
};

/**
 * 更新数据，如果没有则创建
 * @param {string} collect 需要更新的集合名称
 * @param {object} filter 过滤条件
 * @param {object} data 新数据
 */
const update = async ({ collect, filter, data }) => {
  try {
    console.log({ collect, filter, data })
    await db.createCollection(collect);
  } catch (error) {
    console.log(collect, error);

    console.log(collect, '已存在');
  }

  data.updateTime = formatTime(db.serverDate());
  data.originalUpdateTime = db.serverDate();

  try {
    let res = await db
      .collection(collect)
      .where(filter)
      .get();
    console.log(res);
    if (res.data.length) {
      res = await db
        .collection(collect)
        .where(filter)
        .update({
          data
        });
    } else {
      data.createTime = db.serverDate();
      res = await db.collection(collect).add({
        data
      });
    }
    return res;
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  connect,
  add,
  find,
  orderBy,
  update,
  findByPage,
};


/**
 * 处理当前日期时间函数 获取主要是 new Date() 函数获取 本地系统时间对应的日期
 * 注意：不要用生成的订单日期 来进行活动群体享受相应的规则划分，他们调整手机或电脑时间将会出错
 * 参数：传入标准时间日期的格式 未传入默认为当前的日期格式
 * 返回：相应时间戳对应的日期，并按照一定格式拼凑 2020-03-02 01:38:01
 */
function formatTime(date) {
  //在小程序端，new Date() 的返回值是 Mon Mar 02 2020 20:33:42 GMT+0800 (中国标准时间)
  //由于返回的就是中国标准时间，所以我们不再需要添加时间毫秒数间隔进行转化，直接使用即可
  date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('.') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * //将时分秒转化成二位数格式 2020
 */
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n   //第二位存在的时候，说明不用转化
}
