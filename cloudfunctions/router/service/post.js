const { find } = require('../unit/db');

const detailsById = async (id) => {
  let res = await find({
    collect: 'post',
    filter: {
      id,
    },
    field: {
    }
  });
  return res.data[0];
}

module.exports = { detailsById };
