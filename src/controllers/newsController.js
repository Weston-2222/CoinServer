const { News } = require('../models');

async function findPage(page, pageSize) {
  try {
    // 获取总记录数
    const { count, rows } = await News.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [['published', 'DESC']],
    });
    const totalPages = Math.ceil(count / pageSize); // 计算总页数
    return {
      total: count,
      totalPages: totalPages,
      currentPage: Number(page),
      pageSize: Number(pageSize),
      data: rows.map((item) => item.toJSON()),
    };
  } catch (error) {
    console.error('獲取所有新聞時出錯:', error);
    throw error;
  }
}

module.exports = {
  findPage,
};
