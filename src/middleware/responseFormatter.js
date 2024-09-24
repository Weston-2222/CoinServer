//所有response的middleware
const responseFormatter = (req, res, next) => {
  res.sendFormattedJson = function (data, additionalMetadata) {
    this.json({
      status: 'success',
      message: '操作成功',
      data: data,
      metadata: {
        timestamp: new Date().toISOString(),
        ...additionalMetadata,
      },
    });
  };
  next();
};

module.exports = responseFormatter;
