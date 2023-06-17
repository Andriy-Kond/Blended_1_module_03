module.exports = (error, req, res, next) => {
  // console.log('res.statusCode() :>> ', res.statusCode);

  const statusCode = res.statusCode || 500;
  const stack = error.stack; // звідки приходить помилка

  res.status(statusCode);
  res.json({
    code: statusCode,
    message: stack,
  });
};
