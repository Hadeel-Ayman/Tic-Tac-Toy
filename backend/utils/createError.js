const createError = (statuse, message) => {
  const err = new Error();
  err.statuse = statuse;
  err.message = message;
  return err;
};
module.exports= createError;
